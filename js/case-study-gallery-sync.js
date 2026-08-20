(() => {
  const slugs = new Set([
    'logo-brand-identity',
    'carlingtech',
    'fuse-holder-selector',
    'v-series-selector',
    'transportation-products-catalog',
    'conexpo-trade-show',
    'sp-campbell',
    'carling-china-capabilities',
    'fuse-holder-product-overview',
    'window-switch-product-overview',
    'cole-hersee-100-year',
    'carling-100-year-history-booklet',
    'arbor-meadows',
    'little-stuess-book'
  ]);

  const videoProjects = new Set([
    'carling-china-capabilities',
    'fuse-holder-product-overview',
    'window-switch-product-overview',
    'cole-hersee-100-year'
  ]);

  const getProject = () => {
    const bodyProject = document.body?.dataset.caseStudy || '';
    if (slugs.has(bodyProject)) return bodyProject;
    const pathProject = window.location.pathname.match(/^\/work\/([^/]+)\/?$/)?.[1] || '';
    if (slugs.has(pathProject)) return pathProject;
    const queryProject = new URLSearchParams(window.location.search).get('project') || '';
    return slugs.has(queryProject) ? queryProject : '';
  };

  const syncGallery = () => {
    const project = getProject();
    if (!project) return false;

    const gallery = document.querySelector('.case-gallery');
    if (!gallery || gallery.dataset.figmaGallerySynced === project) return Boolean(gallery);

    const desktop = `/assets/images/case-studies/${project}-desktop.png`;
    const mobile = `/assets/images/case-studies/${project}-mobile.png?v=3x-20260820`;
    const title = document.querySelector('.case-title')?.textContent?.trim() || 'Case study';
    const isVideo = videoProjects.has(project);

    gallery.classList.add('figma-gallery-synced');
    gallery.dataset.figmaGallerySynced = project;
    gallery.innerHTML = `
      <picture class="case-gallery-picture">
        <source media="(max-width: 720px)" srcset="${mobile}">
        <img class="case-gallery-render" src="${desktop}" alt="${title} project imagery" loading="eager" decoding="async">
      </picture>
      ${isVideo ? '<button class="case-gallery-video-hit case-video-target" type="button" aria-label="Play video"></button>' : ''}
    `;
    return true;
  };

  if (syncGallery()) return;

  const observer = new MutationObserver(() => {
    if (syncGallery()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
