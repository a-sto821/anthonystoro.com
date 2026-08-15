(() => {
  const figmaSyncStyles = document.createElement('link');
  figmaSyncStyles.rel = 'stylesheet';
  figmaSyncStyles.href = '/css/figma-sync.css?v=2';
  document.head.append(figmaSyncStyles);

  const lightboxStyles = document.createElement('link');
  lightboxStyles.rel = 'stylesheet';
  lightboxStyles.href = '/css/lightbox.css?v=2';
  document.head.append(lightboxStyles);

  const figmaAssets = {
    hero: 'https://www.figma.com/api/mcp/asset/5e40bbaf-3521-4926-9e9c-8e03f9498a33.svg',
    digital: [
      'https://www.figma.com/api/mcp/asset/ae50787e-8a67-41cd-9dc2-663dff78f2ef.png',
      'https://www.figma.com/api/mcp/asset/8199d4ff-a741-4b88-9602-6cae490f84f6.png',
      'https://www.figma.com/api/mcp/asset/49d556b4-38c8-4192-ba56-7731493c1c72.png',
      'https://www.figma.com/api/mcp/asset/e2440d14-6d50-49a4-9a15-800b8bd8ceb5.png'
    ],
    portrait: 'https://www.figma.com/api/mcp/asset/3792481b-4127-4eba-88f6-d897f94a5b82.png'
  };

  const heroArt = document.querySelector('.hero-art-desktop');
  if (heroArt) heroArt.src = figmaAssets.hero;

  document.querySelectorAll('#panel-digital .project-media img').forEach((img, index) => {
    if (figmaAssets.digital[index]) img.src = figmaAssets.digital[index];
  });

  /* Brand + Print intentionally uses the image URLs defined in the HTML.
     Do not replace them with the smaller Figma preview assets. */

  const portrait = document.querySelector('.portrait-placeholder img');
  if (portrait) {
    portrait.src = figmaAssets.portrait;
    portrait.alt = 'Anthony Storo';
  }

  /* Image-only lightbox for Digital Experiences and Brand + Print. */
  const lightbox = document.createElement('dialog');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('aria-label', 'Expanded portfolio image');
  lightbox.innerHTML = `
    <button class="image-lightbox-close" type="button" aria-label="Close image"></button>
    <button class="image-lightbox-nav image-lightbox-prev" type="button" aria-label="Previous image">‹</button>
    <div class="image-lightbox-stage">
      <img class="image-lightbox-image" alt="">
      <p class="image-lightbox-caption"></p>
    </div>
    <button class="image-lightbox-nav image-lightbox-next" type="button" aria-label="Next image">›</button>
  `;
  document.body.append(lightbox);

  const lightboxImage = lightbox.querySelector('.image-lightbox-image');
  const lightboxCaption = lightbox.querySelector('.image-lightbox-caption');
  const lightboxClose = lightbox.querySelector('.image-lightbox-close');
  const lightboxPrev = lightbox.querySelector('.image-lightbox-prev');
  const lightboxNext = lightbox.querySelector('.image-lightbox-next');
  let lightboxItems = [];
  let lightboxIndex = 0;
  let lightboxTrigger = null;

  const setLightboxItem = (index) => {
    if (!lightboxItems.length) return;
    lightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
    const media = lightboxItems[lightboxIndex];
    const img = media.querySelector('img');
    const title = media.closest('.project-card')?.querySelector('h3')?.textContent?.trim() || img?.alt || '';
    if (!img) return;

    const fullSource = img.dataset.lightboxSrc || img.currentSrc || img.src;
    lightboxImage.src = fullSource;
    lightboxImage.alt = img.alt || title;
    lightboxCaption.textContent = title;
    lightboxCaption.hidden = !title;
    const hasMultiple = lightboxItems.length > 1;
    lightboxPrev.hidden = !hasMultiple;
    lightboxNext.hidden = !hasMultiple;
  };

  const openLightbox = (media) => {
    const panel = media.closest('#panel-digital, #panel-brand');
    if (!panel || typeof lightbox.showModal !== 'function') return;
    lightboxItems = [...panel.querySelectorAll('.project-media.lightbox-trigger')];
    lightboxIndex = Math.max(0, lightboxItems.indexOf(media));
    lightboxTrigger = media;
    setLightboxItem(lightboxIndex);
    lightbox.showModal();
    lightboxClose.focus();
  };

  document.querySelectorAll('#panel-digital .project-media, #panel-brand .project-media').forEach((media) => {
    const title = media.closest('.project-card')?.querySelector('h3')?.textContent?.trim() || 'project image';
    media.classList.add('lightbox-trigger');
    media.setAttribute('role', 'button');
    media.setAttribute('tabindex', '0');
    media.setAttribute('aria-label', `View larger image for ${title}`);
    media.addEventListener('click', () => openLightbox(media));
    media.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(media);
      }
    });
  });

  lightboxClose.addEventListener('click', () => lightbox.close());
  lightboxPrev.addEventListener('click', () => setLightboxItem(lightboxIndex - 1));
  lightboxNext.addEventListener('click', () => setLightboxItem(lightboxIndex + 1));

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });

  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setLightboxItem(lightboxIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setLightboxItem(lightboxIndex + 1);
    }
  });

  lightbox.addEventListener('close', () => {
    lightboxImage.removeAttribute('src');
    if (lightboxTrigger) lightboxTrigger.focus();
  });

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
      if (next) { event.preventDefault(); selectTab(next, true); }
    });
  });

  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  const turnstileContainer = document.querySelector('#turnstile-container');
  let turnstileWidgetId = null;

  const setStatus = (message, type = '') => {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('is-error', type === 'error');
    status.classList.toggle('is-success', type === 'success');
  };

  const loadTurnstile = async () => {
    if (!turnstileContainer) return;
    try {
      const response = await fetch('/api/config', { headers: { Accept: 'application/json' } });
      if (!response.ok) return;
      const config = await response.json();
      if (!config.turnstileSiteKey) return;
      const render = () => {
        if (!window.turnstile || turnstileWidgetId !== null) return;
        turnstileWidgetId = window.turnstile.render(turnstileContainer, {
          sitekey: config.turnstileSiteKey,
          appearance: 'interaction-only',
          size: 'flexible',
          theme: 'light',
          action: 'contact',
          'refresh-expired': 'auto'
        });
      };
      if (window.turnstile) render();
      else window.addEventListener('load', render, { once: true });
    } catch (_) {}
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
      const response = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Unable to send your message right now.');
      form.reset();
      if (window.turnstile && turnstileWidgetId !== null) window.turnstile.reset(turnstileWidgetId);
      setStatus('Thanks. Your message has been sent.', 'success');
    } catch (error) {
      setStatus(error.message || 'Unable to send your message right now.', 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Send Email';
    }
  });

  loadTurnstile();
})();
