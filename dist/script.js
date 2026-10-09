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
  const heroSpeed = heroGroup.getBoundingClientRect().width / 80;
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

// Reveal content once on arrival, with pointer and keyboard entry support.
// Content stays readable if animation or observation is unavailable.
const sectionReveals = [
  ['.trusted', '.trusted h2, .logo-ticker'],
  ['.work-categories', '.work-category'],
  ['.about-section', '.about-copy, .about-portrait'],
  ['.reviews-section', '.reviews-header, .reviews-stage, .review-tabs'],
  ['.site-footer', '.footer-name, .footer-links']
];
const revealedContent = new WeakSet();
const revealAnimations = new Set();
function revealContent(element, delay = 0) {
  if (revealedContent.has(element)) return;
  revealedContent.add(element);
  if (reducedMotion.matches || !element.animate) return;
  const animation = element.animate([
    { opacity: 0, translate: '0 16px' },
    { opacity: 1, translate: '0 0' }
  ], { duration: 650, delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
  revealAnimations.add(animation);
  animation.finished.catch(() => {}).finally(() => revealAnimations.delete(animation));
}
const contentObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    revealContent(entry.target);
    contentObserver.unobserve(entry.target);
  });
}, { threshold: .08 }) : null;
sectionReveals.forEach(([sectionSelector, contentSelector]) => {
  const section = document.querySelector(sectionSelector);
  const content = [...document.querySelectorAll(contentSelector)];
  content.forEach(element => contentObserver?.observe(element));
  section.addEventListener('pointerenter', () => {
    content.filter(element => {
      const box = element.getBoundingClientRect();
      return box.top < innerHeight && box.bottom > 0;
    }).forEach((element, index) => revealContent(element, index * 70));
  }, { once: true });
  section.addEventListener('focusin', () => {
    content.forEach(element => revealedContent.add(element));
    revealAnimations.forEach(animation => animation.cancel());
  });
});
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) revealAnimations.forEach(animation => animation.cancel());
});
