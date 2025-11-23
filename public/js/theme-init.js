// Ensure we can read local storage and set initial theme class before hydration
try {
  (function () {
    var stored = null;
    try {
      stored = localStorage.getItem('hyper-theme');
    } catch {
      // ignore
    }
    var systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored === 'dark' || (stored !== 'light' && systemPrefersDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  })();
} catch {
  // defensive
}
