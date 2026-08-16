(() => {
  const motionStyles = document.createElement('link');
  motionStyles.rel = 'stylesheet';
  motionStyles.href = '/css/motion.css?v=1';
  document.head.append(motionStyles);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let initialized = false;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const initMotion = () => {
    if (initialized) return;
    initialized = true;

    if (reducedMotion.matches) return;

    const root = document.documentElement;
    root.classList.add('motion-ready');

    const hero = document.querySelector('.hero');
    const heroCopy = document.querySelector('.hero-copy');
    const heroArtDesktop = document.querySelector('.hero-art-desktop');
    const heroArtMobile = document.querySelector('.hero-art-mobile');
    const aboutSection = document.querySelector('.about-section');
    const aboutCopy = document.querySelector('.about-copy');
    const portrait = document.querySelector('.portrait-treatment');
    const portraitFront = document.querySelector('.portrait-placeholder');
    const portraitBack = document.querySelector('.portrait-backplate');
    const workTabs = document.querySelector('.work-tabs');
    const tabs = [...document.querySelectorAll('[role="tab"]')];
    const panels = [...document.querySelectorAll('[role="tabpanel"]')];

    const revealTargets = [];
    const addReveal = (element, delay = 0) => {
      if (!element) return;
      element.classList.add('motion-reveal');
      element.style.setProperty('--motion-delay', `${delay}ms`);
      revealTargets.push(element);
    };

    addReveal(document.querySelector('.work-section h2'));

    document.querySelectorAll('.work-panel .project-card').forEach((card, index) => {
      addReveal(card, (index % 3) * 75);
    });

    addReveal(document.querySelector('.about-copy .eyebrow'));
    addReveal(document.querySelector('.about-copy h2'), 70);
    addReveal(document.querySelector('.about-body'), 140);
    addReveal(portrait, 100);

    addReveal(document.querySelector('.contact-copy .eyebrow'));
    addReveal(document.querySelector('.contact-copy h2'), 70);
    addReveal(document.querySelector('.contact-copy > p:not(.eyebrow)'), 140);
    addReveal(document.querySelector('.contact-specialties'), 200);
    addReveal(document.querySelector('.contact-form'), 120);

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        }, {
          root: null,
          threshold: 0.12,
          rootMargin: '0px 0px -6% 0px'
        })
      : null;

    revealTargets.forEach((target) => {
      if (observer) observer.observe(target);
      else target.classList.add('is-visible');
    });

    const updateTabIndicator = () => {
      if (!workTabs) return;
      const active = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true');
      if (!active) return;

      const pseudo = getComputedStyle(active, '::after');
      const pseudoWidth = parseFloat(pseudo.width);
      const width = Number.isFinite(pseudoWidth) && pseudoWidth > 0 ? pseudoWidth : active.offsetWidth;
      const pseudoLeft = parseFloat(pseudo.left);
      const left = active.offsetLeft + (Number.isFinite(pseudoLeft) ? pseudoLeft : 0);

      workTabs.style.setProperty('--motion-tab-x', `${left}px`);
      workTabs.style.setProperty('--motion-tab-width', `${width}px`);
    };

    const animateActivePanel = () => {
      const activePanel = panels.find((panel) => !panel.hidden && panel.classList.contains('is-active'));
      if (!activePanel) return;

      activePanel.classList.remove('motion-panel-in');
      void activePanel.offsetWidth;
      activePanel.classList.add('motion-panel-in');
      activePanel.addEventListener('animationend', () => activePanel.classList.remove('motion-panel-in'), { once: true });

      activePanel.querySelectorAll('.motion-reveal:not(.is-visible)').forEach((target) => {
        if (observer) observer.observe(target);
        else target.classList.add('is-visible');
      });
    };

    const tabObserver = new MutationObserver((mutations) => {
      if (!mutations.some((mutation) => mutation.attributeName === 'aria-selected')) return;
      requestAnimationFrame(() => {
        updateTabIndicator();
        animateActivePanel();
        requestMotionFrame();
      });
    });

    tabs.forEach((tab) => tabObserver.observe(tab, { attributes: true, attributeFilter: ['aria-selected'] }));

    requestAnimationFrame(updateTabIndicator);

    let cursorTargetX = 0;
    let cursorTargetY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let framePending = false;

    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isSafari = /^((?!chrome|chromium|android|crios|fxios).)*safari/i.test(navigator.userAgent);

    if (hero && hasFinePointer) {
      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) - 0.5;
        const y = ((event.clientY - rect.top) / rect.height) - 0.5;
        cursorTargetX = clamp(x * 14, -7, 7);
        cursorTargetY = clamp(y * 9, -4.5, 4.5);
        requestMotionFrame();
      }, { passive: true });

      hero.addEventListener('pointerleave', () => {
        cursorTargetX = 0;
        cursorTargetY = 0;
        requestMotionFrame();
      }, { passive: true });
    }

    const updateMotion = () => {
      framePending = false;
      const viewportHeight = Math.max(window.innerHeight, 1);
      const isMobile = window.innerWidth <= 720;

      cursorX += (cursorTargetX - cursorX) * 0.18;
      cursorY += (cursorTargetY - cursorY) * 0.18;

      if (hero) {
        const rect = hero.getBoundingClientRect();
        const progress = clamp(-rect.top / Math.max(rect.height, 1), 0, 1);
        const artY = isMobile ? progress * -14 : progress * -38;
        const copyY = isMobile ? progress * -4 : progress * -12;
        const activeHeroArt = isMobile ? heroArtMobile : heroArtDesktop;

        if (activeHeroArt) {
          activeHeroArt.style.setProperty('--motion-hero-art-x', `${isMobile ? 0 : cursorX}px`);
          activeHeroArt.style.setProperty('--motion-hero-art-y', `${artY}px`);
          activeHeroArt.style.setProperty('--motion-hero-cursor-y', `${isMobile ? 0 : cursorY}px`);
        }
        if (heroCopy) heroCopy.style.setProperty('--motion-hero-copy-y', `${copyY}px`);
      }

      document.querySelectorAll('.work-panel:not([hidden]) .project-media').forEach((media) => {
        const rect = media.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > viewportHeight + 80) return;
        const center = (rect.top + rect.height / 2) / viewportHeight - 0.5;
        const amplitude = isMobile ? 2.5 : 6;
        const y = clamp(center * -amplitude * 2, -amplitude, amplitude);
        // Safari can soften detailed raster images when a composited parent sits on a
        // fractional pixel. Snap only Safari's tiny scroll-parallax offset to whole
        // pixels so UI screenshots stay crisp without changing the Chrome motion.
        const renderedY = isSafari ? Math.round(y) : y;
        media.style.setProperty('--motion-media-y', `${renderedY}px`);
      });

      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.bottom > -100 && rect.top < viewportHeight + 100) {
          const center = (rect.top + rect.height / 2) / viewportHeight - 0.5;
          const frontY = clamp(center * (isMobile ? -7 : -14), isMobile ? -5 : -10, isMobile ? 5 : 10);
          const backY = clamp(center * (isMobile ? -13 : -30), isMobile ? -9 : -20, isMobile ? 9 : 20);
          const copyY = clamp(center * (isMobile ? -3 : -8), isMobile ? -2 : -5, isMobile ? 2 : 5);

          if (portraitFront) portraitFront.style.setProperty('--motion-portrait-front-y', `${frontY}px`);
          if (portraitBack) portraitBack.style.setProperty('--motion-portrait-back-y', `${backY}px`);
          if (aboutCopy) aboutCopy.style.setProperty('--motion-about-copy-y', `${copyY}px`);
        }
      }

      if (Math.abs(cursorTargetX - cursorX) > 0.05 || Math.abs(cursorTargetY - cursorY) > 0.05) {
        requestMotionFrame();
      }
    };

    function requestMotionFrame() {
      if (framePending) return;
      framePending = true;
      requestAnimationFrame(updateMotion);
    }

    window.addEventListener('scroll', requestMotionFrame, { passive: true });
    window.addEventListener('resize', () => {
      updateTabIndicator();
      requestMotionFrame();
    }, { passive: true });

    requestMotionFrame();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.add('motion-started'));
    });
  };

  motionStyles.addEventListener('load', initMotion, { once: true });
  setTimeout(initMotion, 500);
})();