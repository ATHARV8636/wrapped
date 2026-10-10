import { WrappedPayload } from "./types";

const PREFIX = "wrapped:";

export function saveWrapped(payload: WrappedPayload) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(`${PREFIX}${payload.id}`, JSON.stringify(payload));
  } catch {
    // localStorage can fail in private browsing / storage-full states.
    // The story screen still works from in-memory navigation state.
  }
}

export function loadWrapped(id: string): WrappedPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(`${PREFIX}${id}`);
    return raw ? (JSON.parse(raw) as WrappedPayload) : null;
  } catch {
    return null;
  }
}
