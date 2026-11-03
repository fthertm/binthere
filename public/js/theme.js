// theme.js — wires the navbar light/dark toggle (deferred, first-party, CSP-safe).
// theme-init.js already applied the saved preference before paint; this handles
// clicks: flip the class on <html>, persist the choice, keep the a11y state in sync.
(function () {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const root = document.documentElement;

  const sync = function (dark) {
    btn.setAttribute('aria-pressed', String(dark));
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? '#0f1113' : '#212529';
  };

  // theme-init.js runs in <head>, before the button exists, so the a11y state
  // is reflected here.
  sync(root.classList.contains('dark'));

  btn.addEventListener('click', function () {
    const dark = !root.classList.contains('dark');
    root.classList.toggle('dark', dark);
    sync(dark);
    try {
      localStorage.setItem('binthere:theme', dark ? 'dark' : 'light');
    } catch {
      /* storage disabled — the toggle still works for this page load */
    }
  });
})();
