// Open Desk: a new score written for this website. No recordings, samples or imported melodies.
export const beatSeconds = 1.35;
const chords = [
  [50, 57, 60, 64],
  [48, 55, 62, 65],
  [45, 52, 59, 62],
  [43, 50, 57, 60],
] as const;
const upperNotes = [62, 64, 67, 69, 72, 74, 76];
export const frequency = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
export function scoreAt(step: number) {
  const phrase = Math.floor(step / 8);
  return {
    chord: step % 8 === 0 ? chords[phrase % chords.length] : [],
    note: step % 2 === 0 ? upperNotes[((step / 2) * 3 + phrase * 2) % upperNotes.length] : undefined,
  };
}
export const interfaceNotes = {
  open: [74, 81],
  close: [69, 62],
  select: [76],
  copy: [79, 86],
  hover: [81],
} as const;
