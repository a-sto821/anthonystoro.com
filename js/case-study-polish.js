(() => {
  const polish = () => {
    document.querySelectorAll('.case-cta').forEach((link) => {
      if (link.dataset.caseCtaPolished === 'true') return;
      link.textContent = link.textContent.replace(/\s*↗\s*$/u, '').trim();
      link.classList.add('case-cta-external');
      link.dataset.caseCtaPolished = 'true';
    });
  };

  polish();
  const observer = new MutationObserver(polish);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
