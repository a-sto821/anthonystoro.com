(() => {
  const projectParam = new URLSearchParams(window.location.search).get('project');

  if (projectParam) {
    document.body.dataset.caseStudy = projectParam;
    document.body.classList.add('case-study-body');

    // Cloudflare currently serves index.html for frontend routes. In project mode,
    // turn that same document into the approved case-study shell instead of the homepage.
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (/hero-build|figma-sync|lightbox|work-card-hover|portrait-hover/.test(href)) link.remove();
    });

    if (!document.querySelector('link[href^="/css/case-study.css"]')) {
      const caseStyles = document.createElement('link');
      caseStyles.rel = 'stylesheet';
      caseStyles.href = '/css/case-study.css?v=3';
      document.head.append(caseStyles);
    }

    const brand = document.querySelector('.brand');
    if (brand) brand.setAttribute('href', '/');
    document.querySelectorAll('a[href="#work"]').forEach((link) => link.setAttribute('href', '/#work'));
    document.querySelectorAll('a[href="#about"]').forEach((link) => link.setAttribute('href', '/#about'));
    document.querySelectorAll('a[href="#contact"]').forEach((link) => link.setAttribute('href', '/#contact'));

    const main = document.querySelector('#main');
    if (main) {
      main.className = 'case-study-main';
      main.innerHTML = '<div id="case-study-root"></div>';
    }

    const loader = document.createElement('script');
    loader.src = '/js/case-study.js?v=4';
    loader.async = false;
    document.body.append(loader);
    return;
  }

  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');

  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    mobileMenu.hidden = true;
  };

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Open navigation menu' : 'Close navigation menu');
    mobileMenu.hidden = open;
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  // Route portfolio case-study links through one literal root-level HTML file.
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || link.classList.contains('video-play-link')) return;
    const href = link.getAttribute('href') || '';
    const match = href.match(/^\/work\/([^/]+)\/?$/);
    if (!match) return;
    event.preventDefault();
    window.location.assign(`/?project=${encodeURIComponent(match[1])}`);
  });

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const panels = [...document.querySelectorAll('[role="tabpanel"]')];

  const selectTab = (tab, focus = false) => {
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      const active = panel.id === tab.getAttribute('aria-controls');
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
    if (focus) tab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.tabIndex = tab.classList.contains('is-active') ? 0 : -1;
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      let next = null;
      if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') next = tabs[0];
      if (event.key === 'End') next = tabs[tabs.length - 1];
      if (next) {
        event.preventDefault();
        selectTab(next, true);
      }
    });
  });

  const videoModal = document.createElement('dialog');
  videoModal.className = 'video-lightbox';
  videoModal.setAttribute('aria-label', 'Portfolio video player');
  videoModal.innerHTML = `
    <button class="image-lightbox-close video-lightbox-close" type="button" aria-label="Close video"></button>
    <div class="video-lightbox-stage">
      <div class="video-lightbox-player">
        <iframe class="video-lightbox-frame" src="about:blank" title="" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
      </div>
      <p class="video-lightbox-caption"></p>
    </div>
  `;
  document.body.append(videoModal);

  const videoFrame = videoModal.querySelector('.video-lightbox-frame');
  const videoCaption = videoModal.querySelector('.video-lightbox-caption');
  const videoClose = videoModal.querySelector('.video-lightbox-close');
  let videoTrigger = null;

  const getYouTubeId = (href) => {
    try {
      const url = new URL(href, window.location.href);
      const host = url.hostname.replace(/^www\./, '');
      if (host === 'youtu.be') return url.pathname.split('/').filter(Boolean)[0] || '';
      if (host === 'youtube.com' || host === 'm.youtube.com') return url.searchParams.get('v') || '';
    } catch (_) {}
    return '';
  };

  const openVideo = (link) => {
    const videoId = getYouTubeId(link.href);
    if (!videoId || typeof videoModal.showModal !== 'function') return false;
    const card = link.closest('.project-card');
    const title = card?.querySelector('h3')?.textContent?.trim() || 'Portfolio video';
    videoTrigger = link;
    videoFrame.title = title;
    videoFrame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
    videoCaption.textContent = title;
    videoModal.showModal();
    videoClose.focus();
    return true;
  };

  document.querySelectorAll('.video-play-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (openVideo(link)) event.preventDefault();
    });
  });

  videoClose.addEventListener('click', () => videoModal.close());
  videoModal.addEventListener('click', (event) => {
    if (event.target === videoModal) videoModal.close();
  });
  videoModal.addEventListener('close', () => {
    videoFrame.src = 'about:blank';
    videoFrame.title = '';
    videoTrigger?.focus();
  });

  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');

  const setStatus = (message, type = '') => {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('is-error', type === 'error');
    status.classList.toggle('is-success', type === 'success');
  };

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('');
    if (!form.reportValidity()) return;
    const button = form.querySelector('.submit-button');
    const data = new FormData(form);
    button.disabled = true;
    button.textContent = 'Sending';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Unable to send your message right now.');
      form.reset();
      setStatus('Thanks. Your message has been sent.', 'success');
    } catch (error) {
      setStatus(error.message || 'Unable to send your message right now.', 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Send Email';
    }
  });
})();
