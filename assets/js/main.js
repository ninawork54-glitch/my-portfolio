const root = document.documentElement;
const themeButton = document.getElementById('theme');
const menuButton = document.getElementById('menu');
const links = document.getElementById('links');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let preference = null;
try { preference = localStorage.getItem('nina-bee-theme'); } catch {}
if (!['light', 'dark'].includes(preference)) preference = null;
function applyTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  document.querySelector('meta[name="theme-color"]').content = dark ? '#141e1b' : '#f6f5f0';
}
applyTheme(preference || (systemTheme.matches ? 'dark' : 'light'));
themeButton.addEventListener('click', () => {
  preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(preference);
  try { localStorage.setItem('nina-bee-theme', preference); } catch {}
});
systemTheme.addEventListener('change', event => { if (!preference) applyTheme(event.matches ? 'dark' : 'light'); });
function closeMenu() { links.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  links.classList.toggle('open', expanded);
});
links.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', event => { if (!event.target.closest('nav')) closeMenu(); });
window.matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();
