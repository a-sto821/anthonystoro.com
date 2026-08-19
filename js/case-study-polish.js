(() => {
  const videoByProject = {
    'carling-china-capabilities': 'https://www.youtube.com/watch?v=mYQJhXyPLog',
    'fuse-holder-product-overview': 'https://www.youtube.com/watch?v=xhpRkpaNW28',
    'window-switch-product-overview': 'https://www.youtube.com/watch?v=oLaF9HvPXa4',
    'cole-hersee-100-year': 'https://www.youtube.com/watch?v=TSYd1t8Ncmw'
  };

  const getProjectFromHref = (href = '') => {
    const match = href.match(/\/work\/([^/]+)\/?$/);
    return match ? match[1] : '';
  };

  const getCurrentProject = () => {
    const pathMatch = window.location.pathname.match(/^\/work\/([^/]+)\/?$/);
    if (pathMatch) return pathMatch[1];
    return new URLSearchParams(window.location.search).get('project') || '';
  };

  const getYouTubeId = (href) => {
    try {
      const url = new URL(href, window.location.href);
      if (url.hostname.includes('youtu.be')) return url.pathname.split('/').filter(Boolean)[0] || '';
      return url.searchParams.get('v') || '';
    } catch (_) {
      return '';
    }
  };

  const polish = () => {
    document.querySelectorAll('.case-cta').forEach((link) => {
      if (link.dataset.caseCtaPolished !== 'true') {
        link.textContent = link.textContent.replace(/\s*↗\s*$/u, '').trim();
        link.classList.add('case-cta-external');
        link.dataset.caseCtaPolished = 'true';
      }
    });

    // Keep homepage play buttons aligned with the corrected case-study video mapping.
    document.querySelectorAll('.video-card').forEach((card) => {
      const projectLink = card.querySelector('.project-media-link, .project-copy');
      const project = getProjectFromHref(projectLink?.getAttribute('href') || '');
      const video = videoByProject[project];
      const playLink = card.querySelector('.video-play-link');
      if (video && playLink) playLink.href = video;
    });

    const project = getCurrentProject();
    const correctedVideo = videoByProject[project];
    if (correctedVideo) {
      const videoCta = document.querySelector('.case-video-cta');
      if (videoCta) videoCta.href = correctedVideo;
      document.body.classList.add('case-study-video-project');
    }
  };

  polish();
  const observer = new MutationObserver(polish);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  // The original case-study module captured stale video URLs. Intercept video
  // clicks in the capture phase and feed the corrected URL into the existing modal.
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('.case-video-target, .case-video-cta');
    if (!trigger) return;

    const project = getCurrentProject();
    const correctedVideo = videoByProject[project];
    if (!correctedVideo) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const id = getYouTubeId(correctedVideo);
    const modal = document.querySelector('.video-modal');
    const frame = modal?.querySelector('iframe');
    if (!id || !modal || !frame || typeof modal.showModal !== 'function') {
      window.open(correctedVideo, '_blank', 'noopener');
      return;
    }

    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
    if (!modal.open) modal.showModal();
    modal.querySelector('.video-modal-close')?.focus();
  }, true);
})();
