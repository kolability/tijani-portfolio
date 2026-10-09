document.querySelectorAll('.ticker-track, .logo-track').forEach(track => {
  const copy = track.firstElementChild.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  copy.querySelectorAll('img').forEach(image => { image.alt = ''; });
  track.append(copy);
});

const heroGroup = document.querySelector('.ticker-group');
const logoTrack = document.querySelector('.logo-track');
const logoGroup = logoTrack.firstElementChild;

function matchTickerSpeed() {
  // Match visible pixels per second, including the hero's mobile scaling.
  const heroSpeed = heroGroup.getBoundingClientRect().width / 51.2;
  const logoWidth = logoGroup.getBoundingClientRect().width;
  logoTrack.style.setProperty('--logo-duration', `${logoWidth / heroSpeed}s`);
  logoTrack.style.setProperty('--logo-distance', `${-logoWidth}px`);
}

matchTickerSpeed();
const tickerResizeObserver = new ResizeObserver(matchTickerSpeed);
tickerResizeObserver.observe(document.documentElement);
tickerResizeObserver.observe(heroGroup);
tickerResizeObserver.observe(logoGroup);

const workCursor = document.querySelector('.work-cursor');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const workCards = document.querySelectorAll('.work-category');
function hideWorkCursor() {
  workCursor.classList.remove('is-visible');
  workCards.forEach(card => card.classList.remove('is-cursor-active'));
}
workCards.forEach(card => {
  card.addEventListener('pointermove', event => {
    if (!finePointer.matches || event.pointerType === 'touch') return;
    workCursor.style.setProperty('--cursor-x', `${event.clientX}px`);
    workCursor.style.setProperty('--cursor-y', `${event.clientY}px`);
    card.classList.add('is-cursor-active');
    workCursor.classList.add('is-visible');
  });
  card.addEventListener('pointerleave', hideWorkCursor);
});
window.addEventListener('scroll', hideWorkCursor, { passive: true });
window.addEventListener('blur', hideWorkCursor);
document.addEventListener('keydown', event => {
  if (event.key === 'Tab' || event.key === 'Escape') hideWorkCursor();
});
finePointer.addEventListener('change', hideWorkCursor);

const workVideo = document.querySelector('.work-video');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let videoVisible = false;
function updateVideoPlayback() {
  if (videoVisible && !document.hidden && !reducedMotion.matches) {
    workVideo.play().then(() => workVideo.classList.add('is-ready')).catch(() => {});
  } else {
    workVideo.pause();
    if (reducedMotion.matches) workVideo.classList.remove('is-ready');
  }
}
new IntersectionObserver(entries => {
  videoVisible = entries[0].isIntersecting;
  updateVideoPlayback();
}, { threshold: .05 }).observe(workVideo);
reducedMotion.addEventListener('change', updateVideoPlayback);
document.addEventListener('visibilitychange', updateVideoPlayback);

const reviewTabs = [...document.querySelectorAll('.review-tab')];
const reviewPanels = [...document.querySelectorAll('.review-panel')];
function selectReview(index, focus = false) {
  reviewTabs.forEach((tab, i) => {
    const active = i === index;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    reviewPanels[i].classList.toggle('is-active', active);
    reviewPanels[i].setAttribute('aria-hidden', String(!active));
    reviewPanels[i].inert = !active;
  });
  document.querySelector('#review-number').textContent = String(index + 1).padStart(2, '0');
  if (focus) reviewTabs[index].focus();
}
reviewTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectReview(index));
  tab.addEventListener('keydown', event => {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % reviewTabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + reviewTabs.length - 1) % reviewTabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = reviewTabs.length - 1;
    else return;
    event.preventDefault();
    selectReview(next, true);
  });
});

// Choreograph text and media separately, keeping native scrolling intact.
const motionTargets = [];
const motionGroups = [
  ['.intro', 'h1, p, .pill'],
  ['.trusted', 'h2, .logo-ticker'],
  ['.work-categories', '.work-category'],
  ['.about-section', 'h2, .about-body p, .about-email, .about-portrait'],
  ['.reviews-section', '.reviews-header, .reviews-stage, .review-tab'],
  ['.site-footer', '.footer-name, .footer-links']
];
const entranceAnimations = new Map();
let motionObserver;
function finishEntrance(element) {
  entranceAnimations.get(element)?.cancel();
  entranceAnimations.delete(element);
  element.classList.remove('motion-pending');
  motionObserver?.unobserve(element);
}
function enter(element, delay = 0) {
  if (!element.classList.contains('motion-pending')) return;
  if (reducedMotion.matches || !element.animate) return finishEntrance(element);
  const media = element.matches('.work-category, .about-portrait');
  element.classList.remove('motion-pending');
  motionObserver?.unobserve(element);
  const animation = element.animate([
    { opacity: 0, translate: `0 ${media ? 64 : 32}px`, scale: media ? '.96' : '1', filter: media ? 'blur(0px)' : 'blur(5px)' },
    { opacity: 1, translate: '0 0', scale: '1', filter: 'blur(0px)' }
  ], { duration: media ? 1150 : 900, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
  entranceAnimations.set(element, animation);
  animation.finished.catch(() => {}).finally(() => entranceAnimations.delete(element));
}
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  motionObserver = new IntersectionObserver(entries => {
    const arriving = entries.filter(entry => entry.isIntersecting);
    arriving.forEach((entry, index) => enter(entry.target, Math.min(index * 95, 285)));
  }, { threshold: .06, rootMargin: '0px 0px -5% 0px' });
  motionGroups.forEach(([sectionSelector, targetSelector]) => {
    const section = document.querySelector(sectionSelector);
    section.querySelectorAll(targetSelector).forEach(element => {
      motionTargets.push(element);
      element.classList.add('motion-pending');
      motionObserver.observe(element);
    });
    section.addEventListener('focusin', () => {
      motionTargets.filter(element => section.contains(element)).forEach(finishEntrance);
    });
  });
}
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) motionTargets.forEach(finishEntrance);
});
window.addEventListener('pageshow', event => {
  if (event.persisted) motionTargets.forEach(finishEntrance);
});

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
const siteToast = document.querySelector('.site-toast');
let toastTimeout;
function showComingSoon() {
  clearTimeout(toastTimeout);
  siteToast.textContent = 'More projects are on the way. Check back soon.';
  siteToast.classList.add('is-visible');
  toastTimeout = setTimeout(() => siteToast.classList.remove('is-visible'), 4000);
}
workCards.forEach(card => {
  card.addEventListener('click', showComingSoon);
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showComingSoon(); }
  });
});
