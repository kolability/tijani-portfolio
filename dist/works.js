(() => {
  const categories = [
    { id: 'brand-identity', label: 'Brand identity', full: 'Brand identity & logo design', description: 'Identities built to feel like the brands behind them.' },
    { id: 'marketing', label: 'Marketing & campaigns', full: 'Marketing & campaigns', description: 'Visual stories made to capture attention.' },
    { id: 'video-editing', label: 'Video editing', full: 'Video editing', description: 'Stories told through motion, rhythm and perspective.' },
    { id: 'photography', label: 'Photography', full: 'Photography', description: 'People, products and moments, thoughtfully framed.' }
  ];
  // Replace null media sources with supplied assets; the layout needs no changes.
  const placeholderAssets = (count, kind = 'Image') => Array.from({ length: count }, (_, i) => ({ label: `${kind} ${String(i + 1).padStart(2, '0')}`, src: null, alt: '' }));
  const projects = [
    { id: 'chow-down', title: 'Chow Down', cover: 'assets/chow-down-cover.png', client: 'Chow Down', category: 'brand-identity', initials: 'CD', tone: 'olive', assets: [{"label": "Food packaging", "src": "assets/chow-down-food-packaging.png", "alt": "Black takeaway containers with Chow Down branded sleeves", "displayRatio": "1 / 1"}, {"label": "Brand identity", "src": "assets/chow-down-brand-identity.png", "alt": "Purple Chow Down logo over a restaurant scene", "displayRatio": "1 / 1"}, {"label": "Digital application", "src": "assets/chow-down-watch.png", "alt": "Chow Down branding on a smartwatch", "displayRatio": "4 / 3"}, {"label": "Takeaway packaging", "src": "assets/chow-down-takeaway-box.png", "alt": "Illustrated takeaway box with a Chow Down branded card", "displayRatio": "4 / 3"}, {"label": "Branded apparel", "src": "assets/chow-down-tshirt.png", "alt": "Purple Chow Down logo printed on a white T-shirt", "displayRatio": "16 / 9"}, {"label": "Apron & cap", "src": "assets/chow-down-apron.png", "alt": "Chow Down branded black apron and cap beside fresh ingredients", "displayRatio": "16 / 9"}, {"label": "Packaging details", "src": "assets/chow-down-salad-packaging.png", "alt": "Chow Down labels on a salad container and dressing lid", "displayRatio": "4 / 5"}, {"label": "Business cards", "src": "assets/chow-down-business-cards.png", "alt": "Purple and white Chow Down business cards on a dark textured surface", "displayRatio": "4 / 5"}] },
    { id: 'microbit-identity', title: 'Microbit', client: 'Microbit', category: 'brand-identity', initials: 'M', tone: 'slate', assets: placeholderAssets(4) },
    { id: 'qcwix', title: 'QCWIX', client: 'QCWIX', category: 'brand-identity', initials: 'Q', tone: 'olive', assets: placeholderAssets(4) },
    { id: 'shiptraq', title: 'ShipTraq', client: 'ShipTraq', category: 'brand-identity', initials: 'ST', tone: 'slate', assets: placeholderAssets(4) },
    { id: 'microbit', title: 'Microbit', client: 'Microbit', category: 'marketing', initials: 'M', tone: 'slate', assets: placeholderAssets(4) },
    { id: 'afod', title: 'AFOD', client: 'AFOD', category: 'marketing', initials: 'A', tone: 'clay', assets: placeholderAssets(4) },
    { id: 'video-collection', title: 'Video collection', category: 'video-editing', initials: '01', tone: 'slate', assets: placeholderAssets(3, 'Video still') },
    { id: 'photography-collection', title: 'Photography collection', category: 'photography', initials: '01', tone: 'clay', assets: placeholderAssets(6, 'Photograph') }
  ];
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
  function render() {
    const params = new URLSearchParams(location.search);
    const current = categories.some(c => c.id === params.get('category')) ? params.get('category') : 'brand-identity';
    const project = projects.find(p => p.id === params.get('project'));
    activeProject = project || null;
    if (project) {
      const category = categories.find(c => c.id === project.category);
      const siblings = projects.filter(p => p.category === project.category);
      const next = siblings[(siblings.indexOf(project) + 1) % siblings.length];
      document.title = `${project.title} — My Works — Tijani Sulaimon`;
      view.innerHTML = `<div class="project-breadcrumb"><a href="${urlFor(project.category)}" data-route>${category.label}</a><span>/</span><span>${project.title}</span></div>
      <div class="project-layout"><aside class="project-info"><p class="eyebrow">${category.full}</p><h1 tabindex="-1">${project.title}</h1><p class="project-note">A closer look at the work.${project.assets.some(asset => !asset.src) ? '<br>Project imagery coming soon.' : ''}</p><dl><div><dt>Role</dt><dd>${category.label}</dd></div><div><dt>Client / Organisation</dt><dd>${escape(project.client || 'To be added')}</dd></div></dl><a class="back-to-collection" href="${urlFor(project.category)}" data-route>Back to ${category.label.toLowerCase()}</a></aside>
      <div class="project-gallery">${project.assets.map((asset,i)=>`<figure class="gallery-item ${!asset.displayRatio && (i===0 || i===project.assets.length-1) ? 'gallery-wide':''}"><button class="gallery-image ${asset.src ? 'has-image' : ''} ${asset.displayRatio ? 'paired-image' : ''}" ${asset.displayRatio ? `style="--image-ratio:${asset.displayRatio}"` : ''} data-image="${i}" aria-label="Enlarge ${escape(project.title+' '+asset.label)}">${assetMarkup(project,asset)}<span class="enlarge-label">View full size <span aria-hidden="true">+</span></span></button></figure>`).join('')}</div></div>
      <div class="collection-end"><a href="${urlFor(project.category)}" data-route>Back to collection</a>${next!==project ? `<a class="next-project" href="${urlFor(next.category,next.id)}" data-route><span>Next project</span><strong>${next.title}</strong></a>` : '<a href="works.html" data-route>Explore categories</a>'}</div>`;
    } else {
      const category = categories.find(c => c.id === current);
      const filtered = projects.filter(p => p.category === current);
      document.title = `${category.label} — My Works — Tijani Sulaimon`;
      view.innerHTML = `${categoryNav(current)}<section class="projects-section" aria-labelledby="collection-heading"><div class="collection-heading"><div><h2 id="collection-heading" tabindex="-1">${category.full}</h2><p>${category.description}</p></div></div>
      <div class="project-grid">${filtered.map((p,i)=>`<a class="project-card" href="${urlFor(p.category,p.id)}" data-route><div class="project-cover">${p.cover ? `<img src="${escape(p.cover)}" alt="Chow Down branding on an apron and cap beside fresh ingredients" loading="lazy" decoding="async">` : placeholder(p,'Cover',true)}<span class="project-open">Explore project</span></div><div class="project-card-meta"><h3>${p.title}</h3></div></a>`).join('')}</div></section>`;
    }
    if (!reduced.matches) view.animate([{opacity:0,translate:'0 12px'},{opacity:1,translate:'0 0'}],{duration:450,easing:'cubic-bezier(.16,1,.3,1)'});
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
  window.addEventListener('popstate',()=>{if(viewer.open)viewer.close();render();});
  render();
})();
