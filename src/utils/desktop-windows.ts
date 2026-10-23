export interface Point {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface Viewport extends WindowSize {
  left: number;
  top: number;
}

export interface WindowLayout {
  version: 1;
  windows: { id: string; position: Point }[];
}

export const windowGutter = 12;

/** Keep the entire window visible; oversized windows retain a reachable title bar. */
export function constrainPosition(point: Point, size: WindowSize, viewport: Viewport): Point {
  const left = viewport.left + windowGutter;
  const top = viewport.top + windowGutter;
  const right = Math.max(left, viewport.left + viewport.width - size.width - windowGutter);
  const bottom = Math.max(top, viewport.top + viewport.height - size.height - windowGutter);
  return {
    x: Math.min(right, Math.max(left, Number.isFinite(point.x) ? point.x : left)),
    y: Math.min(bottom, Math.max(top, Number.isFinite(point.y) ? point.y : top)),
  };
}

export function cascadePosition(index: number, size: WindowSize, viewport: Viewport): Point {
  return constrainPosition(
    {
      x: viewport.left + (viewport.width - size.width) / 2 + index * 30,
      y: viewport.top + Math.min(96, (viewport.height - size.height) / 2) + index * 26,
    },
    size,
    viewport
  );
}

export function focusOrder<T extends string>(order: readonly T[], id: T): T[] {
  return [...order.filter((item) => item !== id), id];
}

/** Session storage is untrusted: accept only known IDs and finite coordinates. */
export function parseWindowLayout(value: unknown, allowedIds: readonly string[]): WindowLayout {
  const empty: WindowLayout = { version: 1, windows: [] };
  if (!value || typeof value !== 'object' || !('version' in value) || value.version !== 1) return empty;
  if (!('windows' in value) || !Array.isArray(value.windows)) return empty;
  const seen = new Set<string>();
  for (const item of value.windows) {
    if (!item || typeof item !== 'object' || typeof item.id !== 'string') continue;
    if (!allowedIds.includes(item.id) || seen.has(item.id)) continue;
    const point = item.position;
    if (!point || typeof point !== 'object' || !Number.isFinite(point.x) || !Number.isFinite(point.y)) continue;
    seen.add(item.id);
    empty.windows.push({ id: item.id, position: { x: point.x, y: point.y } });
  }
  return empty;
}
