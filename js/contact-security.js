(() => {
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  if (!form || !status) return;

  const SITE_KEY = '0x4AAAAAAERpH3QYkdVUXR6N';
  const submitButton = form.querySelector('.submit-button');
  let startedAt = performance.now();

  const elapsedInput = document.createElement('input');
  elapsedInput.type = 'hidden';
  elapsedInput.name = 'form_elapsed_ms';
  form.appendChild(elapsedInput);

  const turnstileContainer = document.createElement('div');
  turnstileContainer.className = 'cf-turnstile';
  turnstileContainer.dataset.sitekey = SITE_KEY;
  turnstileContainer.dataset.action = 'contact';
  turnstileContainer.dataset.appearance = 'interaction-only';
  turnstileContainer.setAttribute('aria-label', 'Spam protection verification');
  form.insertBefore(turnstileContainer, submitButton || status);

  if (!document.querySelector('script[data-contact-turnstile]')) {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.dataset.contactTurnstile = 'true';
    document.head.appendChild(script);
  }

  const resetTurnstile = () => {
    try {
      window.turnstile?.reset?.();
    } catch (_) {}
  };

  form.addEventListener(
    'submit',
    (event) => {
      elapsedInput.value = String(Math.max(0, Math.round(performance.now() - startedAt)));

      const token = String(
        form.querySelector('input[name="cf-turnstile-response"]')?.value || ''
      ).trim();

      if (!token) {
        event.preventDefault();
        event.stopImmediatePropagation();
        status.textContent = window.turnstile
          ? 'Please complete the verification and try again.'
          : 'Verification is loading. Please try again in a moment.';
        status.classList.add('is-error');
        status.classList.remove('is-success');
      }
    },
    true
  );

  const observer = new MutationObserver(() => {
    if (!status.textContent.trim()) return;
    if (!status.classList.contains('is-error') && !status.classList.contains('is-success')) return;

    resetTurnstile();
    if (status.classList.contains('is-success')) {
      startedAt = performance.now();
      elapsedInput.value = '';
    }
  });

  observer.observe(status, {
    childList: true,
    characterData: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });
})();
