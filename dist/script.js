const track = document.querySelector('.ticker-track');
const copy = track.firstElementChild.cloneNode(true);
copy.setAttribute('aria-hidden', 'true');
copy.querySelectorAll('img').forEach(image => { image.alt = ''; });
track.append(copy);
