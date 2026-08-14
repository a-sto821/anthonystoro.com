(() => {
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
