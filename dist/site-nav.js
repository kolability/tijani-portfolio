(() => {
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileBreakpoint = matchMedia('(max-width: 824px)');
let menuClosing = false;
function openMenu() {
  if (mobileMenu.open || menuClosing || !mobileBreakpoint.matches) return;
  mobileMenu.showModal();
  document.body.classList.add('menu-is-open');
  menuToggle.setAttribute('aria-expanded', 'true');
  if (!reducedMotion.matches) {
    mobileMenu.animate([{ opacity: 0, transform: 'translateY(-18px) scale(.97)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }], { duration: 380, easing: 'cubic-bezier(.16,1,.3,1)' });
  }
}
async function closeMenu(returnFocus = true) {
  if (!mobileMenu.open || menuClosing) return;
  menuClosing = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.add('is-closing');
  if (!reducedMotion.matches) {
    await mobileMenu.animate([{ opacity: 1, transform: 'translateY(0) scale(1)' }, { opacity: 0, transform: 'translateY(-12px) scale(.98)' }], { duration: 220, easing: 'ease-in', fill: 'forwards' }).finished.catch(() => {});
  }
  mobileMenu.close();
  mobileMenu.getAnimations().forEach(animation => animation.cancel());
  mobileMenu.classList.remove('is-closing');
  document.body.classList.remove('menu-is-open');
  menuClosing = false;
  if (returnFocus && mobileBreakpoint.matches) menuToggle.focus();
}
menuToggle.addEventListener('click', openMenu);
mobileMenu.querySelector('.menu-close').addEventListener('click', () => closeMenu());
mobileMenu.addEventListener('cancel', event => { event.preventDefault(); closeMenu(); });
mobileMenu.addEventListener('click', event => {
  if (event.target !== mobileMenu) return;
  const box = mobileMenu.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeMenu();
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', async event => {
  const target = link.getAttribute('href');
  if (target.startsWith('#')) {
    event.preventDefault();
    await closeMenu(false);
    location.hash = target;
    const section = document.querySelector(target);
    section.setAttribute('tabindex', '-1');
    section.focus({ preventScroll: true });
    section.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  } else closeMenu();
}));
mobileBreakpoint.addEventListener('change', () => { if (!mobileBreakpoint.matches) closeMenu(false); });

})();
