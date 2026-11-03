// theme-init.js — blocking, first-party head script (CSP-safe: script-src 'self').
// Runs before the stylesheet paints so the theme is applied with no flash:
// the saved choice wins, otherwise the system preference, otherwise light.
let dark = false;
try {
  dark = matchMedia('(prefers-color-scheme: dark)').matches;
} catch {
  /* no matchMedia — keep the light default */
}
try {
  const saved = localStorage.getItem('binthere:theme');
  if (saved) dark = saved === 'dark';
} catch {
  /* private-mode / storage disabled — fall back to the system preference */
}
document.documentElement.classList.toggle('dark', dark);
// Keep the browser chrome (mobile address bar) on the navbar color.
const meta = document.querySelector('meta[name="theme-color"]');
if (meta) meta.content = dark ? '#0f1113' : '#212529';
