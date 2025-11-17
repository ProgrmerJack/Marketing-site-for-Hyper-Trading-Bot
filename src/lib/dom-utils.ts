/**
 * Safe DOM helper utilities used to guard append operations
 */
export function appendToHead(node: Node | null) {
  try {
    if (typeof document !== 'undefined' && document.head && node) {
      document.head.appendChild(node);
      return true;
    }
  } catch (err) {
    // swallow - best-effort append to avoid runtime errors during SSR
    console.debug('appendToHead: failed to append node', err);
  }
  return false;
}

export function appendToBody(node: Node | null) {
  try {
    if (typeof document !== 'undefined' && document.body && node) {
      document.body.appendChild(node);
      return true;
    }
  } catch (err) {
    console.debug('appendToBody: failed to append node', err);
  }
  return false;
}
