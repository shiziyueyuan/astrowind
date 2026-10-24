import { beatSeconds, frequency, interfaceNotes, scoreAt } from './audio-score';

interface SoundPreferences {
  music: boolean;
  effects: boolean;
  volume: number;
}
type Sound = keyof typeof interfaceNotes;
type Voices = Map<OscillatorNode, GainNode>;
const storageKey = 'shea-sound-v1';

// Astro's client router keeps this module alive while the translated DOM changes.
let audio: ReturnType<typeof createDesktopAudio> | undefined;
export function initDesktopAudio() {
  audio ??= createDesktopAudio();
  audio.bind();
}

function createDesktopAudio() {
  let controls:
    | {
        root: HTMLDetailsElement;
        power: HTMLButtonElement;
        status: HTMLElement;
        copy: Record<string, string>;
      }
    | undefined;
  let controlsLifetime: AbortController | undefined;
  const preferences: SoundPreferences = { music: true, effects: true, volume: 28 };
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
    if (saved && typeof saved === 'object') {
      if (typeof saved.music === 'boolean') preferences.music = saved.music;
      if (typeof saved.effects === 'boolean') preferences.effects = saved.effects;
      if (typeof saved.volume === 'number' && Number.isFinite(saved.volume))
        preferences.volume = Math.max(0, Math.min(100, saved.volume));
    }
  } catch {
    /* Preferences are optional. Sound always starts off. */
  }
  let context: AudioContext | undefined;
  let master: GainNode;
  let musicBus: GainNode;
  let effectsBus: GainNode;
  let enabled = false;
  let failed = false;
  let busy = false;
  let disposed = false;
  let scheduler = 0;
  let step = 0;
  let next = 0;
  let lastEffect = 0;
  let lastHover: Element | null = null;
  let suspendTimer = 0;
  const musicVoices: Voices = new Map();
  const effectVoices: Voices = new Map();
  const playingMedia = new Set<HTMLMediaElement>();
  const available = typeof window.AudioContext === 'function';
  const quiet = () => document.hidden || playingMedia.size > 0;
  const save = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(preferences));
    } catch {
      /* Optional storage. */
    }
  };
  const refresh = (error = failed) => {
    if (!controls) return;
    const { root, power, status, copy } = controls;
    const active = enabled && preferences.volume > 0 && (preferences.music || preferences.effects);
    root.dataset.active = String(active && !quiet());
    power.textContent = enabled ? copy.stop : copy.start;
    power.setAttribute('aria-pressed', String(enabled));
    power.disabled = busy || !available;
    status.textContent =
      error || !available
        ? copy.unavailable
        : !enabled || !preferences.volume
          ? copy.off
          : !preferences.music && !preferences.effects
            ? copy.empty
            : quiet()
              ? copy.paused
              : copy.on;
  };
  const stopVoices = (voices: Voices) => {
    const now = context?.currentTime ?? 0;
    for (const [voice, envelope] of voices) {
      try {
        const level = envelope.gain.value;
        envelope.gain.cancelScheduledValues(now);
        envelope.gain.setValueAtTime(level, now);
        envelope.gain.linearRampToValueAtTime(0, now + 0.05);
        voice.stop(now + 0.06);
      } catch {
        /* An ended voice is already silent. */
      }
    }
    voices.clear();
  };
  const stopMusic = () => {
    window.clearInterval(scheduler);
    scheduler = 0;
    stopVoices(musicVoices);
  };
  const voice = (
    midi: number,
    when: number,
    duration: number,
    level: number,
    bus: GainNode,
    voices: Voices,
    type: OscillatorType = 'sine'
  ) => {
    if (!context) return;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency(midi);
    const attack = Math.min(0.7, duration * 0.18);
    envelope.gain.setValueAtTime(0, when);
    envelope.gain.linearRampToValueAtTime(level, when + attack);
    envelope.gain.exponentialRampToValueAtTime(0.0001, when + duration);
    oscillator.connect(envelope).connect(bus);
    voices.set(oscillator, envelope);
    oscillator.onended = () => {
      oscillator.disconnect();
      envelope.disconnect();
      voices.delete(oscillator);
    };
    oscillator.start(when);
    oscillator.stop(when + duration + 0.02);
  };
  const schedule = () => {
    if (!context || context.state !== 'running') return;
    // Do not catch up a long queue after a sleeping browser tab.
    if (next < context.currentTime) next = context.currentTime + 0.04;
    while (next < context.currentTime + 0.55) {
      const score = scoreAt(step);
      for (const note of score.chord) {
        voice(note, next, beatSeconds * 8.6, 0.065, musicBus, musicVoices);
        voice(note + 12, next + 0.03, beatSeconds * 7.8, 0.012, musicBus, musicVoices);
      }
      if (score.note !== undefined) voice(score.note, next, 3.2, 0.058, musicBus, musicVoices);
      next += beatSeconds;
      step++;
    }
  };
  const reconcile = () => {
    if (!context) {
      refresh();
      return;
    }
    master.gain.setTargetAtTime(enabled ? preferences.volume / 100 : 0, context.currentTime, 0.04);
    const shouldPlay =
      enabled && preferences.music && preferences.volume > 0 && !quiet() && context.state === 'running';
    if (!shouldPlay) stopMusic();
    else if (!scheduler) {
      next = context.currentTime + 0.06;
      step -= step % 8;
      schedule();
      scheduler = window.setInterval(schedule, 250);
    }
    if (!enabled || quiet() || !preferences.effects || !preferences.volume) stopVoices(effectVoices);
    refresh();
  };
  const playEffect = (sound: Sound) => {
    if (!enabled || !preferences.effects || !preferences.volume || quiet() || context?.state !== 'running') return;
    const now = performance.now();
    if (now - lastEffect < (sound === 'hover' ? 180 : 45)) return;
    lastEffect = now;
    interfaceNotes[sound].forEach((note, index) =>
      voice(
        note,
        context!.currentTime + index * 0.055,
        sound === 'hover' ? 0.045 : 0.12,
        sound === 'hover' ? 0.018 : 0.1,
        effectsBus,
        effectVoices
      )
    );
  };
  const createContext = () => {
    if (context) return;
    context = new AudioContext({ latencyHint: 'interactive' });
    master = context.createGain();
    master.gain.value = 0;
    const limiter = context.createDynamicsCompressor();
    limiter.threshold.value = -16;
    limiter.knee.value = 12;
    limiter.ratio.value = 5;
    limiter.attack.value = 0.01;
    limiter.release.value = 0.3;
    musicBus = context.createGain();
    effectsBus = context.createGain();
    const tone = context.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 1800;
    musicBus.connect(tone).connect(master);
    effectsBus.connect(master);
    master.connect(limiter).connect(context.destination);
  };
  const suspendSoon = () => {
    window.clearTimeout(suspendTimer);
    suspendTimer = window.setTimeout(() => {
      if (context && (!enabled || document.hidden)) void context.suspend().catch(() => {});
    }, 90);
  };
  const bind = () => {
    const root = document.querySelector<HTMLDetailsElement>('[data-sound-controls]');
    if (root === controls?.root) return;
    controlsLifetime?.abort();
    controls = undefined;
    lastHover = null;
    // A removed video must not keep the next page's music paused.
    for (const media of playingMedia) if (!media.isConnected || media.paused) playingMedia.delete(media);
    document.querySelectorAll<HTMLMediaElement>('video, audio').forEach((media) => {
      if (!media.paused && !media.ended) playingMedia.add(media);
    });
    if (!root) {
      reconcile();
      return;
    }
    controlsLifetime = new AbortController();
    const { signal } = controlsLifetime;
    const copy: Record<string, string> = JSON.parse(root.dataset.copy ?? '{}');
    const power = root.querySelector<HTMLButtonElement>('[data-sound-power]')!;
    const music = root.querySelector<HTMLInputElement>('[data-sound-music]')!;
    const effects = root.querySelector<HTMLInputElement>('[data-sound-effects]')!;
    const volume = root.querySelector<HTMLInputElement>('[data-sound-volume]')!;
    const output = root.querySelector<HTMLOutputElement>('[data-sound-volume-value]')!;
    const status = root.querySelector<HTMLElement>('[data-sound-status]')!;
    controls = { root, power, status, copy };
    music.checked = preferences.music;
    effects.checked = preferences.effects;
    volume.value = String(preferences.volume);
    output.value = `${preferences.volume}%`;
    root
      .querySelectorAll<HTMLInputElement | HTMLButtonElement>('input, button')
      .forEach((control) => (control.disabled = !available));
    power.addEventListener(
      'click',
      async () => {
        if (busy) return;
        if (enabled) {
          enabled = false;
          reconcile();
          suspendSoon();
          return;
        }
        busy = true;
        failed = false;
        power.disabled = true;
        window.clearTimeout(suspendTimer);
        let resumeTimer = 0;
        try {
          createContext();
          await Promise.race([
            context!.resume(),
            new Promise((_, reject) => {
              resumeTimer = window.setTimeout(() => reject(new Error('Audio could not start')), 6000);
            }),
          ]);
          if (disposed) return;
          if (context?.state !== 'running') throw new Error('Audio is unavailable');
          enabled = true;
          reconcile();
          playEffect('open');
        } catch {
          enabled = false;
          failed = true;
          refresh(true);
        } finally {
          window.clearTimeout(resumeTimer);
          busy = false;
          refresh();
        }
      },
      { signal }
    );
    music.addEventListener(
      'change',
      () => {
        preferences.music = music.checked;
        save();
        reconcile();
      },
      { signal }
    );
    effects.addEventListener(
      'change',
      () => {
        preferences.effects = effects.checked;
        save();
        reconcile();
        playEffect('select');
      },
      { signal }
    );
    volume.addEventListener(
      'input',
      () => {
        preferences.volume = Number(volume.value);
        output.value = `${preferences.volume}%`;
        save();
        reconcile();
      },
      { signal }
    );
    root.addEventListener(
      'keydown',
      (event) => {
        if (event.key === 'Escape' && root.open) {
          event.preventDefault();
          event.stopPropagation();
          root.open = false;
          root.querySelector('summary')?.focus();
        }
      },
      { signal }
    );
    // Rebinding controls must leave the existing context, voices and score clock running.
    reconcile();
  };
  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const root = controls?.root;
    if (root?.open && target && !root.contains(target)) root.open = false;
    if (!target || root?.contains(target)) return;
    if (target.closest('[data-close-window]')) playEffect('close');
    else if (target.closest('[data-open-window]')) playEffect('open');
    else if (target.closest('[data-arrange-windows], [data-replay-intro], a')) playEffect('select');
  });
  document.addEventListener('pointerover', (event) => {
    const target = event.target instanceof Element ? event.target.closest('[data-open-window]') : null;
    if (target && target !== lastHover) playEffect('hover');
    lastHover = target;
  });
  document.addEventListener('change', (event) => {
    if (event.target instanceof Element && event.target.matches('#theme-select')) playEffect('select');
  });
  document.addEventListener('shea:copied', () => playEffect('copy'));
  const mediaChange = (event: Event) => {
    if (!(event.target instanceof HTMLMediaElement)) return;
    if (event.type === 'play') playingMedia.add(event.target);
    else playingMedia.delete(event.target);
    reconcile();
  };
  for (const event of ['play', 'pause', 'ended', 'emptied']) document.addEventListener(event, mediaChange, true);
  document.addEventListener('visibilitychange', () => {
    if (!context) return;
    if (document.hidden) {
      reconcile();
      suspendSoon();
    } else if (enabled) {
      window.clearTimeout(suspendTimer);
      void context
        .resume()
        .then(reconcile)
        .catch(() => {
          enabled = false;
          failed = true;
          reconcile();
          refresh(true);
        });
    }
  });
  const dispose = () => {
    disposed = true;
    enabled = false;
    window.clearTimeout(suspendTimer);
    stopMusic();
    stopVoices(effectVoices);
    playingMedia.clear();
    if (context) void context.close().catch(() => {});
    context = undefined;
    refresh();
  };
  window.addEventListener('pagehide', dispose);
  window.addEventListener('pageshow', () => {
    disposed = false;
    refresh();
  });
  document.addEventListener('astro:after-swap', bind);
  return { bind };
}
