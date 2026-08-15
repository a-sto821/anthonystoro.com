(() => {
  const FRAME_WIDTH = 614;
  const FRAME_HEIGHT = 472.307678;

  const shape = (className, x, y, width, height, radius = 0, delay = null) => ({
    className, x, y, width, height, radius, delay
  });

  /* Exact geometry and visual grouping from Figma node 85:2. */
  const shapes = [
    shape('hb-glow', 129.884613, 23.615385, 425.076935, 425.076935),
    shape('hb-backplate', 80.292305, 139.330765, 389.653839, 265.673065),
    shape('hb-core-panel', 177.115387, 85.015381, 389.653839, 283.384613),

    shape('hb-core-bar hb-core-eyebrow', 214.9, 120.438461, 108.630768, 9.446154, 4.723077, 430),
    shape('hb-core-bar hb-core-line-1', 214.9, 155.861542, 281.023071, 11.807693, 5.903846, 480),
    shape('hb-core-bar hb-core-line-2', 214.9, 181.838455, 217.261536, 9.446154, 4.723077, 540),
    shape('hb-core-bar hb-core-line-3', 214.9, 205.453842, 252.684616, 9.446154, 4.723077, 600),

    shape('hb-module', 214.9, 250.323074, 87.376923, 63.761539, 14.16923, 590),
    shape('hb-module-bar', 231.430771, 268.034607, 54.315384, 7.084615, 3.542308, 720),
    shape('hb-module-dot', 231.430771, 286.92691, 21.253845, 7.084615, 3.542308, 770),

    shape('hb-module', 315.265381, 250.323074, 87.376923, 63.761539, 14.16923, 660),
    shape('hb-module-bar', 331.796143, 268.034607, 54.315384, 7.084615, 3.542308, 790),
    shape('hb-module-dot', 331.796143, 286.92691, 21.253845, 7.084615, 3.542308, 840),

    shape('hb-module', 415.630768, 250.323074, 87.376923, 63.761539, 14.16923, 730),
    shape('hb-module-bar', 432.16153, 268.034607, 54.315384, 7.084615, 3.542308, 860),
    shape('hb-module-dot', 432.16153, 286.92691, 21.253845, 7.084615, 3.542308, 910),

    shape('hb-card-top', 21.253845, 51.953846, 184.2, 108.630768, 21.253845, 760),
    shape('hb-card-bar hb-top-line-1', 49.592308, 82.653847, 103.907692, 9.446154, 4.723077, 930),
    shape('hb-card-bar hb-top-line-2', 49.592308, 107.449997, 127.523079, 7.084615, 3.542308, 990),
    shape('hb-card-bar hb-top-accent', 49.592308, 129.884613, 40.146152, 7.084615, 3.542308, 1050),

    shape('hb-card-bottom', 356.592316, 344.784607, 200.730774, 103.907692, 21.253845, 870),
    shape('hb-card-bar hb-bottom-line-1', 384.930756, 375.484619, 132.246155, 9.446154, 4.723077, 1040),
    shape('hb-card-bar hb-bottom-line-2', 384.930756, 401.461548, 94.46154, 7.084615, 3.542308, 1100),

    shape('hb-connector hb-connector-h', 178.296158, 109.811539, 40.146152, 1.180769, 0, 780),
    shape('hb-connector hb-connector-v', 178.296158, 109.811539, 1.180769, 61.4, 0, 820),
    shape('hb-connector hb-connector-h', 531.34613, 319.988464, 33.061539, 1.180769, 0, 840),
    shape('hb-connector hb-connector-v', 563.226929, 319.988464, 1.180769, 51.953846, 0, 880),

    shape('hb-node', 173.573074, 103.907692, 9.446154, 9.446154, 0, 860),
    shape('hb-node', 211.357697, 106.269234, 9.446154, 9.446154, 0, 900),
    shape('hb-node', 525.442322, 315.265381, 9.446154, 9.446154, 0, 920),
    shape('hb-node', 558.503845, 367.219238, 9.446154, 9.446154, 0, 960)
  ];

  const gridX = [63.761539, 85.015381, 106.269234, 127.523079, 148.776917];
  const gridY = [375.484619, 396.738464, 417.99231];
  gridY.forEach((y, row) => {
    gridX.forEach((x, column) => {
      shapes.push(shape('hb-grid-dot', x, y, 4.723077, 4.723077, 0, 950 + ((row + column) * 42)));
    });
  });

  const createStage = () => {
    const stage = document.createElement('div');
    stage.className = 'hero-build-stage';
    stage.setAttribute('aria-hidden', 'true');

    shapes.forEach((item) => {
      const element = document.createElement('span');
      element.className = `hero-build-shape ${item.className}`;
      element.style.left = `${item.x}px`;
      element.style.top = `${item.y}px`;
      element.style.width = `${item.width}px`;
      element.style.height = `${item.height}px`;
      if (item.radius) element.style.borderRadius = `${item.radius}px`;
      if (item.delay !== null) element.style.setProperty('--hb-delay', `${item.delay}ms`);
      stage.append(element);
    });

    return stage;
  };

  const wrappers = [];

  const desktopImage = document.querySelector('img.hero-art-desktop');
  if (desktopImage) {
    const desktopWrapper = document.createElement('div');
    desktopWrapper.className = 'hero-art hero-art-desktop hero-build-wrapper';
    desktopWrapper.setAttribute('aria-hidden', 'true');
    desktopWrapper.append(createStage());
    desktopImage.replaceWith(desktopWrapper);
    wrappers.push(desktopWrapper);
  }

  const mobileWrapper = document.querySelector('.hero-art-mobile');
  if (mobileWrapper) {
    mobileWrapper.classList.add('hero-build-wrapper');
    mobileWrapper.replaceChildren(createStage());
    wrappers.push(mobileWrapper);
  }

  if (!wrappers.length) return;

  const syncScale = (wrapper) => {
    const width = wrapper.getBoundingClientRect().width;
    if (width > 0) wrapper.style.setProperty('--hero-build-scale', String(width / FRAME_WIDTH));
  };

  wrappers.forEach(syncScale);

  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => syncScale(entry.target));
    });
    wrappers.forEach((wrapper) => resizeObserver.observe(wrapper));
  } else {
    window.addEventListener('resize', () => wrappers.forEach(syncScale), { passive: true });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    wrappers.forEach((wrapper) => wrapper.classList.add('hero-build-started'));
    return;
  }

  /* Allow the page shell to settle first, then assemble the hero around the text entrance. */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.setTimeout(() => {
        wrappers.forEach((wrapper) => wrapper.classList.add('hero-build-started'));
      }, 90);
    });
  });
})();
