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
