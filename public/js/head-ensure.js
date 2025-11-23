// Ensure the document has a head element to avoid appends during SSR/hydration times
try {
  (function () {
    if (typeof document !== 'undefined' && !document.head) {
      var head = document.createElement('head');
      document.documentElement.insertBefore(head, document.body);
    }
  })();
} catch {
  // intentional no-op
}
