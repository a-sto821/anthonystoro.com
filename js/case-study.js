(() => {
  const projects = [
    {
      slug: 'logo-brand-identity',
      title: 'Selected Logo + Brand Identity Work',
      summaryHeading: 'A career-spanning collection of logo and identity work',
      summaryBody: 'Across my design and creative career, I have developed logos and visual identities for a wide range of companies, products and audiences. This collection highlights my ability to translate different personalities and business needs into clear, memorable marks and flexible brand systems.',
      role: 'Brand + Visual Designer',
      scope: 'Logos · identity · brand systems',
      contextLabel: 'Context',
      context: 'Selected work across my career',
      outcome: 'Versatile identities across industries',
      processTitle: 'A consistent approach across very different brands',
      phases: [
        ['01', 'Understand', 'Learn the business, audience and positioning.'],
        ['02', 'Explore', 'Develop multiple visual directions and concepts.'],
        ['03', 'Refine', 'Simplify, test and strengthen the strongest mark.'],
        ['04', 'Apply', 'Build practical identity assets for real-world use.']
      ],
      image: '/assets/images/brand-print/logo-designs.jpg',
      imageAlt: 'Wildthings logo identity presentation'
    },
    {
      slug: 'carlingtech',
      title: 'Carlingtech.com',
      summaryHeading: 'Redesigning and migrating Carlingtech.com',
      summaryBody: 'I led the redesign and Drupal 7 to Drupal 10 migration of Carlingtech.com from planning through launch, coordinating creative, content, development, testing and QA.',
      role: 'Project Lead',
      scope: 'Website redesign · CMS migration',
      contextLabel: 'Launch',
      context: 'June 2026',
      outcome: 'Successful launch',
      processTitle: 'From planning to handoff',
      phases: [
        ['01', 'Plan', 'Scope, milestones and readiness criteria.'],
        ['02', 'Design + Build', 'Creative direction, Drupal 10 build and content migration.'],
        ['03', 'Validate', 'QA, UAT, accessibility, security and training.'],
        ['04', 'Launch', 'Go or no go, cutover and communications.']
      ],
      image: '/assets/images/digital/carlingtech.png',
      detailImage: '/assets/images/carlingtech-showcase.jpg',
      imageAlt: 'Carlingtech.com responsive website redesign',
      cta: 'Visit live site ↗',
      url: 'https://www.carlingtech.com/'
    },
    {
      slug: 'fuse-holder-selector',
      title: 'Fuse Holder Selector Tool',
      summaryHeading: 'Turning complex product logic into a guided buying experience',
      summaryBody: 'I led the UX and creative direction for a selector with two guided paths: exact technical requirements or application needs, helping users reach the right fuse holder and purchasing path faster.',
      role: 'Creative + UX Lead',
      scope: 'Strategy · UX/UI · logic',
      contextLabel: 'Launch',
      context: 'Multi channel rollout · 2025–26',
      outcome: '4.6K views · 523 outbound clicks',
      processTitle: 'From product data to measurable adoption',
      phases: [
        ['01', 'Structure logic', 'Organize product data and decision rules.'],
        ['02', 'Design two paths', 'Support exact specs or guided application needs.'],
        ['03', 'Build and launch', 'Translate the experience into a responsive tool.'],
        ['04', 'Measure and expand', 'Early partner versions reached 36% conversion.']
      ],
      image: '/assets/images/digital/fuse-holder-selector.png',
      detailImage: '/assets/images/fuse-holder-selector.jpg',
      imageAlt: 'Automotive Fuse Holder Selector Tool',
      cta: 'View project ↗',
      url: 'https://info.littelfuse.com/automotive-fuse-holder-selection-guide'
    },
    {
      slug: 'v-series-selector',
      title: 'V-Series Selector Tool',
      summaryHeading: 'Turning complex switch configuration into a guided buying experience',
      summaryBody: 'I designed the V-Series selector to turn complex rocker switch options into a guided path to standard in-stock part numbers and direct purchasing options.',
      role: 'Creative + UX Lead',
      scope: 'Strategy · UX/UI · product logic',
      contextLabel: 'Context',
      context: 'Multi channel rollout · 2024 to 2026',
      outcome: '1H 2026 · 17% conversion · 2.4K clicks',
      processTitle: 'From configuration complexity to measurable adoption',
      phases: [
        ['01', 'Map the logic', 'Organize options, rules and standard part numbers.'],
        ['02', 'Design the path', 'Turn configuration choices into simple guided steps.'],
        ['03', 'Launch across channels', 'Create versions for Carling and partner experiences.'],
        ['04', 'Measure and expand', 'Track engagement, sales impact and channel growth.']
      ],
      image: '/assets/images/digital/v-series-selector.png',
      detailImage: '/assets/images/v-series-selector.jpg',
      imageAlt: 'Carling V-Series Selector Tool',
      cta: 'View project ↗',
      url: 'https://www.carlingtech.com/vseries-selectionguide'
    },
    {
      slug: 'transportation-products-catalog',
      title: 'Littelfuse Transportation Products Catalog',
      summaryHeading: 'Leading a 150+ page catalog redesign from legacy reference to modern product system',
      summaryBody: 'I led the redesign from start to finish, rebuilding a 90-page legacy catalog into a 152-page transportation product reference. I coordinated across multiple departments to validate content, resolve gaps, structure the information and deliver the final catalog.',
      role: 'Project Lead + Editorial Designer',
      scope: 'Editorial redesign · content · production',
      contextLabel: 'Context',
      context: 'Cross-functional Littelfuse program',
      outcome: '90 → 152 pages · unified product catalog',
      processTitle: 'From legacy catalog to unified product system',
      phases: [
        ['01', 'Assess', 'Audit 90 pages of legacy content and structure.'],
        ['02', 'Align teams', 'Coordinate stakeholders to validate and fill content gaps.'],
        ['03', 'Redesign', 'Build the new hierarchy, page system and visual language.'],
        ['04', 'Deliver', 'Own final production, QA and 152-page catalog delivery.']
      ],
      image: '/assets/images/brand-print/littelfuse-transportation-catalog.jpg',
      imageAlt: 'Littelfuse Transportation Products Catalog',
      cta: 'View project ↗',
      url: 'https://www.littelfuse.com/assetdocs/transportation-product-catalog?assetguid=aa0a9b38-0b25-4635-996a-b9a784765b60&searchTerm=transportation+catalog'
    },
    {
      slug: 'conexpo-trade-show',
      title: 'ConExpo Trade Show Experience',
      summaryHeading: 'Turning a new sales strategy into a complete trade show experience',
      summaryBody: 'I led ConExpo from strategy through delivery, translating a new application- and solution-led sales approach into the booth experience. I partnered across teams to shape the story, designed the full environmental graphic system, and managed booth build, production, shipping and delivery.',
      role: 'Creative Lead + Project Lead',
      scope: 'Experiential design · production',
      contextLabel: 'Context',
      context: 'Littelfuse · ConExpo',
      outcome: 'Solution-led booth delivered',
      processTitle: 'From business strategy to show-floor experience',
      phases: [
        ['01', 'Align', 'Partner with teams to define application-led stories.'],
        ['02', 'Experience', 'Translate solution stories into booth zones and graphics.'],
        ['03', 'Build', 'Lead artwork, production and booth construction.'],
        ['04', 'Deliver', 'Coordinate shipping, logistics and show execution.']
      ],
      image: '/assets/images/brand-print/conexpo-trade-show.png',
      imageAlt: 'Littelfuse ConExpo trade show environment'
    },
    {
      slug: 'sp-campbell',
      title: 'S. P. Campbell',
      summaryHeading: 'Designing and building a complete author ecommerce experience',
      summaryBody: "I designed and developed the S. P. Campbell website from the ground up, translating the book's visual world into a responsive experience that moves readers from story discovery to purchase in one cohesive flow.",
      role: 'Designer + Developer',
      scope: 'UX/UI · web development',
      contextLabel: 'Platform',
      context: 'WordPress + WooCommerce',
      outcome: 'Live author ecommerce site',
      processTitle: 'From book world to digital storefront',
      phases: [
        ['01', 'Translate the story', 'Define audience, visual direction and priorities.'],
        ['02', 'Design the journey', 'Create a clear path from discovery to purchase.'],
        ['03', 'Develop ecommerce', 'Build responsive pages and WooCommerce checkout.'],
        ['04', 'Launch and refine', 'Test content, checkout and responsive behavior.']
      ],
      image: '/assets/images/digital/sp-campbell.png',
      detailImage: '/assets/images/sp-campbell.jpg',
      imageAlt: 'S. P. Campbell author ecommerce website',
      cta: 'Visit live site ↗',
      url: 'https://sp-campbell.com/'
    },
    {
      slug: 'carling-china-capabilities',
      title: 'Carling China Capabilities',
      summaryHeading: 'Owning a global capabilities story from shoot plan to campaign launch',
      summaryBody: 'I planned and led the production end to end, traveling on location to capture facility footage and interviews, writing the script, editing the final video and launching the supporting marketing campaign.',
      role: 'Creative Lead + Video Producer',
      scope: 'Filming · script · edit · campaign',
      contextLabel: 'Context',
      context: 'Carling Technologies',
      outcome: 'Capabilities campaign launched',
      processTitle: 'From production plan to launched campaign',
      phases: [
        ['01', 'Plan + travel', 'Define the story, schedule the shoot and coordinate travel.'],
        ['02', 'Capture', 'Film the facility, operations and on-camera interviews.'],
        ['03', 'Write + edit', 'Build the script and shape footage into the final story.'],
        ['04', 'Launch', 'Deliver the video and execute the marketing campaign.']
      ],
      image: '/assets/images/multimedia/carling-china-capabilities.png',
      imageAlt: 'Carling China Capabilities video',
      cta: 'Watch video ↗',
      videoUrl: 'https://www.youtube.com/watch?v=TSYd1t8Ncmw'
    },
    {
      slug: 'fuse-holder-product-overview',
      title: 'Fuse Holder Product Overview',
      summaryHeading: 'Producing an NPI launch film from engineering model to market story',
      summaryBody: 'I wrote the script, turned engineering 3D models into feature-focused animations, and completed the final edit and production. The video helped customers understand the product, gave sales teams a clear explanation tool, and supported the NPI launch campaign.',
      role: 'Creative Lead + Motion Producer',
      scope: 'Script · 3D animation · edit · NPI',
      contextLabel: 'Context',
      context: 'New Product Introduction',
      outcome: 'NPI launch film + campaign',
      processTitle: 'From engineering model to NPI launch',
      phases: [
        ['01', 'Define', 'Identify the key features and launch story.'],
        ['02', 'Script', 'Turn technical details into clear messaging.'],
        ['03', 'Animate', 'Build feature animations from engineering 3D models.'],
        ['04', 'Edit + launch', 'Finish the film and support the NPI campaign.']
      ],
      image: '/assets/images/multimedia/fuse-holder-product-overview.png',
      imageAlt: 'Fuse Holder Product Overview video',
      cta: 'Watch video ↗',
      videoUrl: 'https://www.youtube.com/watch?v=xhpRkpaNW28'
    },
    {
      slug: 'window-switch-product-overview',
      title: 'Window Switch Product Overview',
      summaryHeading: 'Turning a new product into a clear NPI launch story',
      summaryBody: 'I wrote the script, produced animations from engineering 3D models to highlight key features, and completed the final video edit and production. The film helped customers understand the product, equipped sales teams with a clear explanation tool, and supported the NPI launch campaign.',
      role: 'Creative Lead + Motion Producer',
      scope: 'Script · 3D animation · edit · NPI',
      contextLabel: 'Context',
      context: 'New Product Introduction',
      outcome: 'NPI launch film + campaign',
      processTitle: 'From engineering model to NPI launch',
      phases: [
        ['01', 'Define', 'Identify the key features and launch story.'],
        ['02', 'Script', 'Turn technical details into clear messaging.'],
        ['03', 'Animate', 'Build feature animations from engineering 3D models.'],
        ['04', 'Edit + launch', 'Finish the film and support the NPI campaign.']
      ],
      image: '/assets/images/multimedia/window-switch-product-overview.png',
      imageAlt: 'Window Switch Product Overview video',
      cta: 'Watch video ↗',
      videoUrl: 'https://www.youtube.com/watch?v=mYQJhXyPLog'
    },
    {
      slug: 'cole-hersee-100-year',
      title: 'Cole Hersee 100 Year Celebration',
      summaryHeading: 'Producing a 100 year brand story from fieldwork to campaign launch',
      summaryBody: 'I owned the anniversary video from planning through launch, traveling to capture footage and interviews, writing the script, editing the final film and developing the marketing campaign that brought the story to market.',
      role: 'Creative Lead + Video Producer',
      scope: 'Filming · script · edit · campaign',
      contextLabel: 'Context',
      context: 'Cole Hersee',
      outcome: 'Anniversary campaign launched',
      processTitle: 'From anniversary concept to launched campaign',
      phases: [
        ['01', 'Plan + research', 'Define milestones, interviews and shoot plan.'],
        ['02', 'Capture', 'Travel on location to record footage and interviews.'],
        ['03', 'Write + edit', 'Write the script and edit the final film.'],
        ['04', 'Launch', 'Finalize the video and deliver the campaign.']
      ],
      image: '/assets/images/multimedia/cole-hersee-100-year.png',
      imageAlt: 'Cole Hersee 100 Year Celebration video',
      cta: 'Watch video ↗',
      videoUrl: 'https://www.youtube.com/watch?v=oLaF9HvPXa4'
    },
    {
      slug: 'carling-100-year-history-booklet',
      title: 'Carling 100 Year History Booklet',
      summaryHeading: 'Leading a century of company history from archive to anniversary keepsake',
      summaryBody: 'I led the project end to end: gathering historic documents and imagery, conducting interviews, organizing the story, creating the 100 year logo, and designing the full booklet. I paired copywriter text with archival imagery to create a clear narrative from start to finish.',
      role: 'Project Lead + Editorial Designer',
      scope: 'Research · interviews · identity',
      contextLabel: 'Context',
      context: 'Carling Technologies · 100 Years',
      outcome: 'Employee anniversary keepsake',
      processTitle: 'From archive and interviews to anniversary keepsake',
      phases: [
        ['01', 'Research + interviews', 'Gather archives and interview stakeholders.'],
        ['02', 'Shape story', 'Organize history and copy into a clear narrative.'],
        ['03', 'Design identity', 'Create the 100 year logo and editorial system.'],
        ['04', 'Produce', 'Lay out the full booklet and prepare final files.']
      ],
      image: '/assets/images/brand-print/carling-100-years.jpg',
      imageAlt: 'Carling 100 Year History Booklet'
    },
    {
      slug: 'arbor-meadows',
      title: 'Arbor Meadows New Development Brochure',
      summaryHeading: 'Designing a buyer friendly sales brochure for a new residential community',
      summaryBody: 'I created the full layout for a refreshed 22 page brochure used at open houses and with prospective buyers. I enhanced the community plan, converted engineering drawings into readable floor plans, and built a consistent system across nine home models. I also created individual home sheets for the sales team.',
      role: 'Editorial Designer',
      scope: 'Editorial · floor plans · sales collateral',
      contextLabel: 'Context',
      context: 'Calcagni · New Development',
      outcome: '22 page brochure · 9 home models',
      processTitle: 'From raw development content to buyer ready sales material',
      phases: [
        ['01', 'Define', 'Create a fresh layout and buyer focused hierarchy.'],
        ['02', 'Prepare assets', 'Enhance the site plan and clean engineering floor plans.'],
        ['03', 'Build system', 'Create a repeatable structure across nine home models.'],
        ['04', 'Extend', 'Adapt the brochure into individual home sales sheets.']
      ],
      image: '/assets/images/brand-print/arbor-meadows.jpg',
      imageAlt: 'Arbor Meadows New Development Brochure'
    },
    {
      slug: 'little-stuess-book',
      title: "Little Stuess Children's Book Layout",
      summaryHeading: 'Owning the book from page layout through print production',
      summaryBody: 'I owned the editorial layout for Little Stuess, typesetting the manuscript, placing and scaling illustrations, shaping page turns and visual rhythm, and preparing the final printer-ready files for production.',
      role: 'Editorial Designer + Production',
      scope: 'Editorial layout · typesetting · prepress',
      contextLabel: 'Context',
      context: 'Independent client',
      outcome: 'Press-ready book delivered for production',
      processTitle: 'From manuscript and artwork to press-ready book',
      phases: [
        ['01', 'Structure', 'Set trim, page flow, pacing and production needs.'],
        ['02', 'Compose', 'Lay out copy, illustrations and page turns.'],
        ['03', 'Refine', 'Tune typography, spacing, copyfit and image placement.'],
        ['04', 'Preflight + deliver', 'Check bleed, margins and press-ready export.']
      ],
      image: '/assets/images/brand-print/little-stuess-book.jpg',
      imageAlt: "Little Stuess children's book layout"
    }
  ];

  const currentSlug = document.body.dataset.caseStudy;
  const currentIndex = projects.findIndex((project) => project.slug === currentSlug);
  const project = projects[currentIndex];
  const root = document.querySelector('#case-study-root');

  if (!project || !root) {
    if (root) root.innerHTML = '<div class="case-shell"><h1 class="case-title">Project not found</h1><p><a href="/#work">Return to My Work</a></p></div>';
    return;
  }

  const previous = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];
  const detailImage = project.detailImage || project.image;
  const phaseSummary = project.phases.map((phase) => phase[1]).join(' · ');
  const projectUrl = (slug) => `/work/${slug}/`;

  document.title = `${project.title} | Anthony Storo`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = project.summaryHeading;

  const mainStageTag = project.videoUrl ? 'button' : 'div';
  const mainStageAttrs = project.videoUrl ? 'type="button" class="case-stage case-stage-main case-video-target" aria-label="Play video"' : 'class="case-stage case-stage-main"';

  root.innerHTML = `
    <div class="case-shell">
      <h1 class="case-title">${project.title}</h1>

      <div class="case-gallery">
        <${mainStageTag} ${mainStageAttrs}>
          <img class="case-image" src="${project.image}" alt="${project.imageAlt}" loading="eager">
          ${project.videoUrl ? '<span class="case-play" aria-hidden="true"></span>' : ''}
        </${mainStageTag}>
        <div class="case-stage case-stage-detail is-crop" aria-hidden="true">
          <img class="case-image" src="${detailImage}" alt="" loading="lazy">
        </div>
      </div>

      <section class="case-summary" aria-labelledby="case-summary-title">
        <div class="case-summary-copy">
          <h2 id="case-summary-title">${project.summaryHeading}</h2>
          <p>${project.summaryBody}</p>
        </div>
        <div class="case-meta" aria-label="Project details">
          <div class="case-meta-row"><span class="case-meta-label">Role</span><span class="case-meta-value">${project.role}</span></div>
          <div class="case-meta-row"><span class="case-meta-label">Scope</span><span class="case-meta-value">${project.scope}</span></div>
          <div class="case-meta-row"><span class="case-meta-label">${project.contextLabel}</span><span class="case-meta-value">${project.context}</span></div>
          <div class="case-meta-row"><span class="case-meta-label">Outcome</span><span class="case-meta-value">${project.outcome}</span></div>
        </div>
      </section>

      <section class="case-process" aria-labelledby="case-process-title">
        <div class="case-process-head"><h2 id="case-process-title">${project.processTitle}</h2></div>
        <p class="case-process-summary-mobile">${phaseSummary}</p>
        <div class="case-phases">
          ${project.phases.map((phase) => `
            <article class="case-phase">
              <span class="case-phase-number">${phase[0]}</span>
              <h3>${phase[1]}</h3>
              <p>${phase[2]}</p>
            </article>
          `).join('')}
        </div>
        <button class="case-process-toggle" type="button" aria-expanded="false">View process</button>
      </section>

      ${project.cta ? `<div class="case-cta-wrap"><a class="case-cta ${project.videoUrl ? 'case-video-cta' : ''}" href="${project.videoUrl || project.url}" ${project.videoUrl || (project.url && project.url.startsWith('http')) ? 'target="_blank" rel="noopener noreferrer"' : ''}>${project.cta}</a></div>` : ''}

      <nav class="case-nav" aria-label="Case study navigation">
        <a class="case-nav-link prev" href="${projectUrl(previous.slug)}">
          <span class="case-nav-label">Previous Project</span>
          <span class="case-nav-title">${previous.title}</span>
        </a>
        <a class="case-all-work" href="/#work">All Work</a>
        <a class="case-nav-link next" href="${projectUrl(next.slug)}">
          <span class="case-nav-label">Next Project</span>
          <span class="case-nav-title">${next.title}</span>
        </a>
      </nav>
    </div>
  `;

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

  const process = root.querySelector('.case-process');
  const processToggle = root.querySelector('.case-process-toggle');
  processToggle?.addEventListener('click', () => {
    const expanded = process.classList.toggle('is-expanded');
    processToggle.setAttribute('aria-expanded', String(expanded));
    processToggle.textContent = expanded ? 'Hide process' : 'View process';
  });

  if (project.videoUrl) {
    const modal = document.createElement('dialog');
    modal.className = 'video-modal';
    modal.setAttribute('aria-label', `${project.title} video`);
    modal.innerHTML = `
      <button class="video-modal-close" type="button" aria-label="Close video"></button>
      <div class="video-modal-player"><iframe src="about:blank" title="${project.title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>
    `;
    document.body.append(modal);
    const frame = modal.querySelector('iframe');
    const close = modal.querySelector('.video-modal-close');
    const getYouTubeId = (href) => {
      try {
        const url = new URL(href);
        if (url.hostname.includes('youtu.be')) return url.pathname.split('/').filter(Boolean)[0] || '';
        return url.searchParams.get('v') || '';
      } catch (_) { return ''; }
    };
    const openVideo = () => {
      const id = getYouTubeId(project.videoUrl);
      if (!id || typeof modal.showModal !== 'function') {
        window.open(project.videoUrl, '_blank', 'noopener');
        return;
      }
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
      modal.showModal();
      close.focus();
    };
    root.querySelector('.case-video-target')?.addEventListener('click', openVideo);
    root.querySelector('.case-video-cta')?.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openVideo();
    });
    close.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });
    modal.addEventListener('close', () => { frame.src = 'about:blank'; });
  }
})();
