(() => {
  const categories = [
    { id: 'brand-identity', label: 'Brand identity', full: 'Brand identity & logo design', description: 'Identities built to feel like the brands behind them.' },
    { id: 'marketing', label: 'Marketing & campaigns', full: 'Marketing & campaigns', description: 'Marketing and event flyers, book covers, YouTube thumbnails, carousel designs, and more.' },
    { id: 'video-editing', label: 'Video editing', full: 'Video editing', description: 'Stories told through motion, rhythm and perspective.' },
    { id: 'photography', label: 'Photography', full: 'Photography', description: 'People, products and moments, thoughtfully framed.' }
  ];
  // Replace null media sources with supplied assets; the layout needs no changes.
  const placeholderAssets = (count, kind = 'Image') => Array.from({ length: count }, (_, i) => ({ label: `${kind} ${String(i + 1).padStart(2, '0')}`, src: null, alt: '' }));
  const projects = [
    { id: 'metrofort', title: 'Metrofort', cover: 'assets/metrofort-cover.png', client: 'Metrofort Design and Projects Limited', category: 'brand-identity', initials: 'M', tone: 'clay', assets: [{"src": "assets/metrofort-01.png", "label": "Primary logo", "alt": "Metrofort primary logo", "displayRatio": "1 / 1"}, {"src": "assets/metrofort-10.png", "label": "Safety vest and helmet", "alt": "Metrofort safety vest and helmet", "displayRatio": "1 / 1"}, {"src": "assets/metrofort-02.png", "label": "Monochrome logo variations", "alt": "Metrofort monochrome logo variations", "displayRatio": "7 / 5"}, {"src": "assets/metrofort-03.png", "label": "Typography", "alt": "Metrofort typography", "displayRatio": "7 / 5"}, {"src": "assets/metrofort-04.png", "label": "Colour palette", "alt": "Metrofort colour palette", "displayRatio": "7 / 5"}, {"src": "assets/metrofort-05.png", "label": "Office branding", "alt": "Metrofort office branding", "displayRatio": "7 / 5"}, {"src": "assets/metrofort-06.png", "label": "Letterhead and envelope", "alt": "Metrofort letterhead and envelope", "displayRatio": "7 / 5"}, {"src": "assets/metrofort-08.png", "label": "Branded mugs", "alt": "Metrofort branded mugs", "displayRatio": "7 / 5"}, {"src": "assets/metrofort-07.png", "label": "Branded polo shirt", "alt": "Metrofort branded polo shirt", "displayRatio": "3 / 2"}, {"src": "assets/metrofort-09.png", "label": "Branded hard hat", "alt": "Metrofort branded hard hat", "displayRatio": "3 / 2"}, {"src": "assets/metrofort-11.png", "label": "Branded cap", "alt": "Metrofort branded cap", "displayRatio": "7 / 5"}, {"src": "assets/metrofort-12.png", "label": "Identity badge", "alt": "Metrofort identity badge", "displayRatio": "7 / 5"}] },
    { id: 'chow-down', title: 'Chow Down', cover: 'assets/chow-down-cover.png', client: 'Chow Down', category: 'brand-identity', initials: 'CD', tone: 'olive', assets: [{"label": "Food packaging", "src": "assets/chow-down-food-packaging.png", "alt": "Black takeaway containers with Chow Down branded sleeves", "displayRatio": "1 / 1"}, {"label": "Brand identity", "src": "assets/chow-down-brand-identity.png", "alt": "Purple Chow Down logo over a restaurant scene", "displayRatio": "1 / 1"}, {"label": "Digital application", "src": "assets/chow-down-watch.png", "alt": "Chow Down branding on a smartwatch", "displayRatio": "4 / 3"}, {"label": "Takeaway packaging", "src": "assets/chow-down-takeaway-box.png", "alt": "Illustrated takeaway box with a Chow Down branded card", "displayRatio": "4 / 3"}, {"label": "Branded apparel", "src": "assets/chow-down-tshirt.png", "alt": "Purple Chow Down logo printed on a white T-shirt", "displayRatio": "16 / 9"}, {"label": "Apron & cap", "src": "assets/chow-down-apron.png", "alt": "Chow Down branded black apron and cap beside fresh ingredients", "displayRatio": "16 / 9"}, {"label": "Packaging details", "src": "assets/chow-down-salad-packaging.png", "alt": "Chow Down labels on a salad container and dressing lid", "displayRatio": "4 / 5"}, {"label": "Business cards", "src": "assets/chow-down-business-cards.png", "alt": "Purple and white Chow Down business cards on a dark textured surface", "displayRatio": "4 / 5"}] },
    { id: 'microbit-identity', title: 'Microbit', cover: 'assets/microbit-tumbler.png', client: 'Microbit', category: 'brand-identity', initials: 'M', tone: 'slate', assets: [{"label": "Logo clear space", "src": "assets/microbit-logo-spacing.png", "alt": "Logo clear space", "displayRatio": "1 / 1"}, {"label": "White Microbit branded tumbler", "src": "assets/microbit-tumbler.png", "alt": "White Microbit branded tumbler", "displayRatio": "1 / 1"}, {"label": "Monochrome logo variations", "src": "assets/microbit-logo-variations.png", "alt": "Monochrome logo variations", "displayRatio": "4 / 3"}, {"label": "Microbit.ng logo with cryptocurrency imagery", "src": "assets/microbit-brand-logo.png", "alt": "Microbit.ng logo with cryptocurrency imagery", "displayRatio": "4 / 3"}, {"label": "Typography, pattern and brand colours", "src": "assets/microbit-brand-guidelines.png", "alt": "Typography, pattern and brand colours", "displayRatio": "16 / 9"}, {"label": "Microbit service benefits graphic", "src": "assets/microbit-benefits.png", "alt": "Microbit service benefits graphic", "displayRatio": "16 / 9"}, {"label": "Microbit campaign on a wall display", "src": "assets/microbit-wall-campaign.png", "alt": "Microbit campaign on a wall display", "displayRatio": "16 / 9"}, {"label": "Microbit outdoor billboard", "src": "assets/microbit-billboard.png", "alt": "Microbit outdoor billboard", "displayRatio": "16 / 9"}, {"label": "Microbit app icon on a phone", "src": "assets/microbit-app-icon.png", "alt": "Microbit app icon on a phone", "displayRatio": "1 / 1"}, {"label": "Blue Microbit branded tote bag", "src": "assets/microbit-tote.png", "alt": "Blue Microbit branded tote bag", "displayRatio": "1 / 1"}] },
    { id: 'shiptraq', title: 'ShipTraq', cover: 'assets/shiptraq-cover.jpeg', client: 'ShipTraq', category: 'brand-identity', initials: 'ST', tone: 'slate', assets: [{"src": "assets/shiptraq-white-logo.png", "label": "White logo over shipping and aviation imagery", "alt": "ShipTraq white logo over shipping and aviation imagery"}, {"src": "assets/shiptraq-logo-elements.jpeg", "label": "Logo design elements", "alt": "ShipTraq logo design elements", "displayRatio": "7 / 5"}, {"src": "assets/shiptraq-typography-pattern.jpeg", "label": "Typography, pattern and logo variations", "alt": "ShipTraq typography, pattern and logo variations", "displayRatio": "7 / 5"}, {"src": "assets/shiptraq-colour-palette.jpeg", "label": "Colour palette and logo variations", "alt": "ShipTraq colour palette and logo variations", "displayRatio": "7 / 5"}, {"src": "assets/shiptraq-brand-logo.jpeg", "label": "Primary logo over a cargo ship", "alt": "ShipTraq primary logo over a cargo ship", "displayRatio": "1 / 1"}, {"src": "assets/shiptraq-cover.jpeg", "label": "Branded delivery truck", "alt": "ShipTraq branded delivery truck", "displayRatio": "1 / 1"}, {"src": "assets/shiptraq-building.jpeg", "label": "Building facade branding", "alt": "ShipTraq building facade branding", "displayRatio": "1 / 1"}, {"src": "assets/shiptraq-app-icon.jpeg", "label": "Mobile app icon", "alt": "ShipTraq mobile app icon", "displayRatio": "1 / 1"}, {"src": "assets/shiptraq-delivery-uniform.png", "label": "Delivery uniform and branded package", "alt": "ShipTraq delivery uniform and branded package", "displayRatio": "1 / 1"}, {"src": "assets/shiptraq-website.jpeg", "label": "Website design concept", "alt": "ShipTraq website design concept", "displayRatio": "7 / 5"}, {"src": "assets/shiptraq-phone.png", "label": "Logo displayed on a handheld phone", "alt": "ShipTraq logo displayed on a handheld phone", "displayRatio": "7 / 5"}] },
    { id: 'microbit', title: 'Microbit', client: 'Microbit', category: 'marketing', initials: 'M', tone: 'slate', assets: placeholderAssets(4) },
    { id: 'afod', title: 'AFOD', client: 'AFOD', category: 'marketing', initials: 'A', tone: 'clay', assets: placeholderAssets(4) },
    { id: 'video-collection', title: 'Video collection', category: 'video-editing', initials: '01', tone: 'slate', assets: placeholderAssets(3, 'Video still') },
    { id: 'photography-collection', title: 'Photography collection', category: 'photography', initials: '01', tone: 'clay', assets: placeholderAssets(6, 'Photograph') }
  ];
  const campaignGallery = { title: 'Marketing & campaigns', initials: '', tone: 'slate', assets: [{"src": "assets/campaign-01.png", "alt": "Portugal and Nigeria match day poster", "label": "Portugal and Nigeria match day poster", "displayRatio": "4 / 5"}, {"src": "assets/campaign-05.png", "alt": "Microbit September campaign", "label": "Microbit September campaign", "displayRatio": "4 / 5"}, {"src": "assets/campaign-08.png", "alt": "Al-Hikmah alumni reunion flyer", "label": "Al-Hikmah alumni reunion flyer", "displayRatio": "4 / 5"}, {"src": "assets/campaign-09.png", "alt": "Osteve travel campaign", "label": "Osteve travel campaign", "displayRatio": "4 / 5"}, {"src": "assets/campaign-14.png", "alt": "Anisha personal shopper flyer", "label": "Anisha personal shopper flyer", "displayRatio": "4 / 5"}, {"src": "assets/campaign-20.png", "alt": "Single Pringles Night event flyer", "label": "Single Pringles Night event flyer", "displayRatio": "4 / 5"}, {"src": "assets/campaign-15.png", "alt": "Poland versus Nigeria match poster", "label": "Poland versus Nigeria match poster", "displayRatio": "4 / 5"}, {"src": "assets/campaign-16.png", "alt": "Super Eagles squad announcement", "label": "Super Eagles squad announcement", "displayRatio": "4 / 5"}, {"src": "assets/campaign-02.png", "alt": "Spectrum TV Christmas greeting", "label": "Spectrum TV Christmas greeting", "displayRatio": "1 / 1"}, {"src": "assets/campaign-03.png", "alt": "Goodway Ramadan flyer", "label": "Goodway Ramadan flyer", "displayRatio": "1 / 1"}, {"src": "assets/campaign-04.png", "alt": "Naira40 Eid greeting", "label": "Naira40 Eid greeting", "displayRatio": "1 / 1"}, {"src": "assets/campaign-06.png", "alt": "Tang Sio FM promotional design", "label": "Tang Sio FM promotional design", "displayRatio": "1 / 1"}, {"src": "assets/campaign-07.png", "alt": "Waka Canada services flyer", "label": "Waka Canada services flyer", "displayRatio": "1 / 1"}, {"src": "assets/campaign-19.png", "alt": "Able Wears New Year greeting", "label": "Able Wears New Year greeting", "displayRatio": "1 / 1"}, {"src": "assets/campaign-10.png", "alt": "President-General Among the Nations book cover", "label": "President-General Among the Nations book cover", "displayRatio": "1 / 1"}, {"src": "assets/campaign-12.png", "alt": "Exoteric Property social post", "label": "Exoteric Property social post", "displayRatio": "1 / 1"}, {"src": "assets/campaign-11.png", "alt": "AbbyCreations clothing tag", "label": "AbbyCreations clothing tag", "displayRatio": "7 / 5"}, {"src": "assets/campaign-13.png", "alt": "Bakes by Hafsie packaging", "label": "Bakes by Hafsie packaging", "displayRatio": "7 / 5"}, {"src": "assets/campaign-17.png", "alt": "Best altcoins YouTube thumbnail", "label": "Best altcoins YouTube thumbnail", "displayRatio": "16 / 9"}, {"src": "assets/campaign-18.png", "alt": "Crypto coin research YouTube thumbnail", "label": "Crypto coin research YouTube thumbnail", "displayRatio": "16 / 9"}, {"src": "assets/campaign-21.png", "label": "Yusluvanny Outfits wardrobe campaign", "alt": "Yusluvanny Outfits wardrobe campaign", "displayRatio": "4 / 5"}, {"src": "assets/campaign-26.png", "label": "The Treatise international law event flyer", "alt": "The Treatise international law event flyer", "displayRatio": "4 / 5"}, {"src": "assets/campaign-28.png", "label": "Three Days Praise and Revival event flyer", "alt": "Three Days Praise and Revival event flyer", "displayRatio": "4 / 5"}, {"src": "assets/campaign-29.png", "label": "AFOD Teachers Day campaign", "alt": "AFOD Teachers Day campaign", "displayRatio": "4 / 5"}, {"src": "assets/campaign-22.png", "label": "Flos Creamy Treats flyer", "alt": "Flos Creamy Treats flyer", "displayRatio": "1 / 1"}, {"src": "assets/campaign-25.png", "label": "Smith Phones and Gadget flyer", "alt": "Smith Phones and Gadget flyer", "displayRatio": "1 / 1"}, {"src": "assets/campaign-23.png", "label": "AIICO Multishield oral health campaign", "alt": "AIICO Multishield oral health campaign", "displayRatio": "1 / 1"}, {"src": "assets/campaign-30.png", "label": "AIICO Multishield health insurance campaign", "alt": "AIICO Multishield health insurance campaign", "displayRatio": "1 / 1"}, {"src": "assets/campaign-24.png", "label": "Microbit February campaign", "alt": "Microbit February campaign", "displayRatio": "1 / 1"}, {"src": "assets/campaign-27.png", "label": "Microbit May campaign", "alt": "Microbit May campaign", "displayRatio": "1 / 1"}] };
  const videoGallery = [{"title": "Video editing showcase 1", "src": "assets/portfolio-video-1.mp4", "poster": "assets/portfolio-video-1.jpg"}, {"title": "Video editing showcase 2", "src": "assets/portfolio-video-2.mp4", "poster": "assets/portfolio-video-2.jpg"}, {"title": "Video editing showcase 3", "src": "assets/portfolio-video-3.mp4", "poster": "assets/portfolio-video-3.jpg"}, {"title": "Video editing showcase 4", "src": "assets/portfolio-video-4.mp4", "poster": "assets/portfolio-video-4.jpg"}, {"title": "Video editing showcase 5", "src": "assets/portfolio-video-5.mp4", "poster": "assets/portfolio-video-5.jpg"}];
  const view = document.querySelector('#portfolio-view');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const viewer = document.querySelector('.image-viewer');
  let activeProject = null;
  let imageIndex = 0;
  let viewerTrigger;
  const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const urlFor = (category = 'brand-identity', project) => `works.html?category=${encodeURIComponent(category)}${project ? `&project=${encodeURIComponent(project)}` : ''}`;
  function placeholder(project, label, cover = false) {
    return `<div class="asset-placeholder tone-${project.tone}" role="img" aria-label="${escape(project.title + ' — ' + label + ' placeholder')}"><span class="placeholder-corner">${cover ? 'PROJECT PREVIEW' : escape(label.toUpperCase())}</span><span class="placeholder-monogram" aria-hidden="true">${escape(project.initials)}</span><span class="placeholder-caption">${cover ? 'Project imagery coming soon' : 'Image placeholder'}</span></div>`;
  }
  function assetMarkup(project, asset) {
    return asset.src ? `<img src="${escape(asset.src)}" alt="${escape(asset.alt || asset.label)}" loading="lazy" decoding="async">` : placeholder(project, asset.label);
  }
  function categoryNav(current) {
    return `<nav class="category-nav" aria-label="Work categories">${categories.map(c => `<a href="${urlFor(c.id)}" data-route ${c.id === current ? 'aria-current="page"' : ''}>${c.label}</a>`).join('')}</nav>`;
  }
  let entranceObserver;
  const entrances = new Map();
  function clearEntrances() {
    entranceObserver?.disconnect();
    entrances.forEach((animation, element) => {
      animation?.cancel();
      element.classList.remove('motion-pending');
    });
    entrances.clear();
  }
  function revealContent() {
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    entranceObserver = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
        const element = entry.target;
        element.classList.remove('motion-pending');
        entranceObserver.unobserve(element);
        const media = element.matches('.project-card, .gallery-item, .campaign-tile, .video-player');
        const animation = element.animate([
          {opacity:0, translate:`0 ${media ? 64 : 32}px`, scale:media ? '.96' : '1', filter:media ? 'blur(0px)' : 'blur(5px)'},
          {opacity:1, translate:'0 0', scale:'1', filter:'blur(0px)'}
        ], {duration:media ? 1150 : 900, delay:Math.min(index * 95, 285), easing:'cubic-bezier(.16,1,.3,1)', fill:'backwards'});
        entrances.set(element, animation);
        animation.finished.catch(() => {}).finally(() => entrances.delete(element));
      });
    }, {threshold:.06, rootMargin:'0px 0px -5% 0px'});
    view.querySelectorAll('.collection-heading, .project-info, .project-card, .gallery-item, .campaign-tile, .video-player, .collection-end').forEach(element => {
      element.classList.add('motion-pending');
      entrances.set(element, null);
      entranceObserver.observe(element);
    });
  }
  view.addEventListener('focusin', event => {
    for (const [element, animation] of entrances) {
      if (element.contains(event.target)) {
        animation?.cancel();
        element.classList.remove('motion-pending');
        entranceObserver?.unobserve(element);
        entrances.delete(element);
      }
    }
  });
  reduced.addEventListener('change', () => { if (reduced.matches) clearEntrances(); });
  window.addEventListener('pageshow', event => { if (event.persisted) clearEntrances(); });
  function render() {
    clearEntrances();
    const params = new URLSearchParams(location.search);
    const current = categories.some(c => c.id === params.get('category')) ? params.get('category') : 'brand-identity';
    const project = projects.find(p => p.id === params.get('project') && !['marketing', 'video-editing'].includes(p.category));
    activeProject = project || null;
    if (current === 'video-editing') {
      document.title = 'Video editing — My Works — Tijani Sulaimon';
      view.innerHTML = `${categoryNav(current)}<section class="projects-section" aria-labelledby="collection-heading"><div class="collection-heading"><div><h2 id="collection-heading" tabindex="-1">Video editing</h2><p>Stories told through motion, rhythm and perspective.</p></div></div><div class="video-gallery">${videoGallery.map((video,i) => video.src ? `<div class="video-player"><video controls playsinline preload="metadata" aria-label="${escape(video.title)}" ${video.poster ? `poster="${escape(video.poster)}"` : ''} src="${escape(video.src)}"></video><button class="video-play-button" type="button" aria-label="Play ${escape(video.title)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></button></div>` : `<div class="video-player video-coming-soon" role="img" aria-label="Video placeholder"><span class="video-placeholder-play" aria-hidden="true">▷</span><p>Video coming soon</p><span>Play / pause · Sound controls</span></div>`).join('')}</div></section>`;
      view.querySelectorAll('.video-player video').forEach(video => {
        const player = video.parentElement;
        const playButton = player.querySelector('.video-play-button');
        playButton.addEventListener('click', () => {
          video.play().catch(() => { playButton.hidden = false; });
        });
        video.addEventListener('play', () => {
          if (document.activeElement === playButton) video.focus({preventScroll:true});
          playButton.hidden = true;
          view.querySelectorAll('.video-player video').forEach(other => { if (other !== video) other.pause(); });
        });
        const showPlayButton = () => { playButton.hidden = false; };
        video.addEventListener('pause', showPlayButton);
        video.addEventListener('ended', showPlayButton);
      });
    } else if (current === 'marketing') {
      activeProject = campaignGallery;
      document.title = 'Marketing & campaigns — My Works — Tijani Sulaimon';
      view.innerHTML = `${categoryNav(current)}<section class="projects-section" aria-labelledby="collection-heading"><div class="collection-heading"><div><h2 id="collection-heading" tabindex="-1">Marketing & campaigns</h2><p>Marketing and event flyers, book covers, YouTube thumbnails, carousel designs, and more.</p></div></div><div class="campaign-bento">${campaignGallery.assets.map((asset,i) => asset.src ? `<button class="campaign-tile gallery-image" style="--campaign-ratio:${asset.displayRatio}" data-image="${i}" aria-label="Enlarge ${escape(asset.label)}">${assetMarkup(campaignGallery,asset)}<span class="enlarge-label">View full size <span aria-hidden="true">+</span></span></button>` : `<div class="campaign-tile campaign-placeholder" role="img" aria-label="Campaign image placeholder"><span aria-hidden="true" class="campaign-placeholder-mark">+</span><span>Campaign imagery coming soon</span></div>`).join('')}</div></section>`;
    } else if (project) {
      const category = categories.find(c => c.id === project.category);
      const siblings = projects.filter(p => p.category === project.category);
      const next = siblings[(siblings.indexOf(project) + 1) % siblings.length];
      document.title = `${project.title} — My Works — Tijani Sulaimon`;
      view.innerHTML = `<div class="project-breadcrumb"><a href="${urlFor(project.category)}" data-route>${category.label}</a><span>/</span><span>${project.title}</span></div>
      <div class="project-layout"><aside class="project-info"><p class="eyebrow">${category.full}</p><h1 tabindex="-1">${project.title}</h1><p class="project-note">A closer look at the work.${project.assets.some(asset => !asset.src) ? '<br>Project imagery coming soon.' : ''}</p><dl><div><dt>Role</dt><dd>${category.label}</dd></div><div><dt>Client / Organisation</dt><dd>${escape(project.client || 'To be added')}</dd></div></dl><a class="back-to-collection" href="${urlFor(project.category)}" data-route>Back to ${category.label.toLowerCase()}</a></aside>
      <div class="project-gallery ${['microbit-identity', 'metrofort', 'shiptraq'].includes(project.id) ? 'microbit-gallery' : ''}">${project.assets.map((asset,i)=>`<figure class="gallery-item ${!asset.displayRatio && (i===0 || i===project.assets.length-1) ? 'gallery-wide':''}"><button class="gallery-image ${asset.src ? 'has-image' : ''} ${asset.displayRatio ? 'paired-image' : ''}" ${asset.displayRatio ? `style="--image-ratio:${asset.displayRatio}"` : ''} data-image="${i}" aria-label="Enlarge ${escape(project.title+' '+asset.label)}">${assetMarkup(project,asset)}<span class="enlarge-label">View full size <span aria-hidden="true">+</span></span></button></figure>`).join('')}</div></div>
      <div class="collection-end"><a href="${urlFor(project.category)}" data-route>Back to collection</a>${next!==project ? `<a class="next-project" href="${urlFor(next.category,next.id)}" data-route><span>Next project</span><strong>${next.title}</strong></a>` : '<a href="works.html" data-route>Explore categories</a>'}</div>`;
    } else {
      const category = categories.find(c => c.id === current);
      const filtered = projects.filter(p => p.category === current);
      document.title = `${category.label} — My Works — Tijani Sulaimon`;
      view.innerHTML = `${categoryNav(current)}<section class="projects-section" aria-labelledby="collection-heading"><div class="collection-heading"><div><h2 id="collection-heading" tabindex="-1">${category.full}</h2><p>${category.description}</p></div></div>
      <div class="project-grid">${filtered.map((p,i)=>`<a class="project-card" href="${urlFor(p.category,p.id)}" data-route><div class="project-cover">${p.cover ? `<img src="${escape(p.cover)}" alt="${escape(p.title)} brand identity project cover" loading="lazy" decoding="async">` : placeholder(p,'Cover',true)}<span class="project-open">Explore project</span></div><div class="project-card-meta"><h3>${p.title}</h3></div></a>`).join('')}</div></section>`;
    }
    revealContent();
  }
  view.addEventListener('click', event => {
    const link = event.target.closest('a[data-route]');
    if (link && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      const filterChange = link.closest('.category-nav');
      history.pushState({},'',link.href);
      render();
      if (filterChange) {
        const selected = view.querySelector('.category-nav [aria-current]');
        selected.focus({preventScroll:true});
        view.querySelector('.category-nav').scrollIntoView({block:'start',behavior:'instant'});
      } else {
        window.scrollTo({top:0,behavior:'instant'});
        view.querySelector('h1, h2').focus({preventScroll:true});
      }
    }
    const imageButton = event.target.closest('[data-image]');
    if (imageButton) {
      viewerTrigger = imageButton;
      imageIndex = Number(imageButton.dataset.image);
      updateViewer();
      viewer.showModal();
      document.body.classList.add('viewer-open');
    }
  });
  function updateViewer() {
    const asset = activeProject.assets[imageIndex];
    document.querySelector('.viewer-image').innerHTML = assetMarkup(activeProject,asset);
    document.querySelector('#viewer-caption').textContent = `${activeProject.title} / ${asset.label}`;
    document.querySelector('#viewer-position').textContent = `${imageIndex+1} / ${activeProject.assets.length}`;
    document.querySelector('#previous-image').disabled = imageIndex===0;
    document.querySelector('#next-image').disabled = imageIndex===activeProject.assets.length-1;
  }
  function stepImage(step) {
    imageIndex = Math.max(0,Math.min(activeProject.assets.length-1,imageIndex+step));
    updateViewer();
  }
  document.querySelector('#previous-image').addEventListener('click',()=>stepImage(-1));
  document.querySelector('#next-image').addEventListener('click',()=>stepImage(1));
  viewer.querySelector('.viewer-close').addEventListener('click',()=>viewer.close());
  viewer.addEventListener('keydown',event=>{
    if (event.key==='ArrowRight' || event.key==='ArrowLeft') {event.preventDefault();stepImage(event.key==='ArrowRight'?1:-1);}
  });
  viewer.addEventListener('close',()=>{document.body.classList.remove('viewer-open');viewerTrigger?.focus({preventScroll:true});});
  document.addEventListener('visibilitychange', () => { if (document.hidden) view.querySelectorAll('video').forEach(video => video.pause()); });
  window.addEventListener('popstate',()=>{if(viewer.open)viewer.close();render();});
  render();
})();
