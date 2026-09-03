/**
 * RezCoder - Next-Generation Developer Portfolio Engine
 * Pure Vanilla Modern JavaScript (Staff Engineer Quality, Zero Bloat, 60fps Performance)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Ambient Dynamic Particle Canvas ---
  initAmbientCanvas();

  // --- 2. Typewriter Effect ---
  initTypewriter();

  // --- 3. Interactive Recruiter CLI Terminal ---
  initTerminal();

  // --- 4. Portfolio Catalog & Filter Engine ---
  initPortfolio();

  // --- 5. Project Gallery Modal ---
  initGalleryModal();

  // --- 6. 3D Tilt & Spotlight Card Effects ---
  initCardInteractions();

  // --- 7. Navigation & Scroll Spy ---
  initNavigation();

  // --- 8. Timeline & Tab Switcher ---
  initTimelineTabs();

  // --- 9. Theme & Accent Customizer ---
  initThemeCustomizer();

  // --- 10. Copy to Clipboard Utility ---
  initClipboardHelpers();

  // --- 11. EmailJS Contact Form ---
  initContactForm();

  // --- 12. Current Year Footer ---
  const copyrightEl = document.getElementById('footer-year');
  if (copyrightEl) {
    copyrightEl.textContent = new Date().getFullYear();
  }
});

/* ==========================================================================
   Utilities & Performance Helpers
   ========================================================================== */
function debounce(fn, delay = 150) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ==========================================================================
   1. Ambient Dynamic Particle Canvas (Lifecycle & Battery Optimized)
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  // Respect user preference for reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  let width = 0;
  let height = 0;
  let particles = [];
  let animId = null;
  let isRunning = false;
  let mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  window.addEventListener('resize', debounce(resize, 200), { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  }, { passive: true });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.6 + 0.6;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.8;
          this.y -= (dy / dist) * force * 1.8;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    const isMobile = window.innerWidth < 768;
    const baseCount = isMobile ? 22 : Math.min(Math.floor((width * height) / 18000), 55);
    for (let i = 0; i < baseCount; i++) {
      particles.push(new Particle());
    }
  }

  function renderFrame() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    const len = particles.length;
    for (let i = 0; i < len; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < len; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 105) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(100, 200, 255, ${0.14 * (1 - dist / 105)})`;
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(renderFrame);
  }

  function start() {
    if (!isRunning) {
      isRunning = true;
      animId = requestAnimationFrame(renderFrame);
    }
  }

  function stop() {
    isRunning = false;
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  // Sleep canvas when tab is backgrounded
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  // Pause canvas when scrolled far below hero section
  const heroSection = document.getElementById('home');
  if (heroSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        start();
      } else {
        stop();
      }
    }, { threshold: 0.05 });
    observer.observe(heroSection);
  }

  resize();
  start();
}

/* ==========================================================================
   2. Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const roles = [
    'Frontend Engineer',
    'React & Next.js Developer',
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      target.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Interactive Recruiter CLI Terminal
   ========================================================================== */
function initTerminal() {
  const body = document.getElementById('terminal-body');
  const input = document.getElementById('terminal-input');
  if (!body || !input) return;

  const commands = {
    help: () => `Available commands:
• <span class="term-highlight">skills</span>     - View core technical stack
• <span class="term-highlight">projects</span>   - Highlight top production projects
• <span class="term-highlight">experience</span> - View career history & current role
• <span class="term-highlight">contact</span>    - Show direct email, phone & socials
• <span class="term-highlight">cv</span>         - Download verified Resume (PDF)
• <span class="term-highlight">clear</span>      - Clear terminal screen`,

    skills: () => `🚀 <span class="term-highlight">Core Tech Stack:</span>
• <span class="term-cmd">Frontend:</span> React.js, Next.js, Vue.js, TypeScript, JavaScript (ES6+)
• <span class="term-cmd">State & Data:</span> Redux Toolkit, Zustand, TanStack Query, REST APIs
• <span class="term-cmd">Styling & UI:</span> Tailwind CSS, Material UI, Sass, Bootstrap, Responsive Design
• <span class="term-cmd">Architecture:</span> Clean Code, Performance Optimization, Web Vitals, Git`,

    projects: () => `💼 <span class="term-highlight">Featured Production Work:</span>
1. <b>Dynamic Restaurant</b> (Next.js, Shadcn, TanStack, Zustand, Zod) - Restaurant & QR Ordering Web Platform
2. <b>Jinn Education</b> (Next.js, Tailwind CSS) - Global Online Tutoring & EdTech Marketplace
3. <b>Houghton Insurance Brokerage</b> (Next.js, Tailwind CSS) - Insurance & Risk Advisory Platform
4. <b>عيادات توجه الطبية</b> (Next.js, Tailwind CSS, Shadcn UI) - Medical & Aesthetic Clinic Platform
5. <b>Info Sender Dashboard (V1 & V2)</b> (React, TanStack, Tailwind) - Enterprise WhatsApp & Campaign platform
6. <b>Info Sender API Docs</b> - High-performance interactive developer documentation`,

    experience: () => `🏢 <span class="term-highlight">Career Journey:</span>
• <span class="term-cmd">Frontend Developer</span> @ Infosender (Saudi Arabia, Remote) [Jun 2024 - Present]
• <span class="term-cmd">Frontend Developer</span> @ Mubasher Information Technology [Aug 2024 - Oct 2024]
• <span class="term-cmd">Frontend Developer</span> @ Nasa Technology Company [Feb 2024 - Jul 2024]
• <span class="term-cmd">B.Sc. Computer Science</span> @ Beni-Suef University [2016 - 2020]`,

    contact: () => `📫 <span class="term-highlight">Direct Reach:</span>
• Email: <a href="mailto:rezk.abdelnabi55@gmail.com" class="term-cmd">rezk.abdelnabi55@gmail.com</a>
• Phone / WhatsApp: <a href="tel:+201141835789" class="term-cmd">+201141835789</a>
• GitHub: <a href="https://github.com/rezk55" target="_blank" class="term-cmd">github.com/rezk55</a>
• LinkedIn: <a href="https://www.linkedin.com/in/rezk-abdelnabi-b99a31148/" target="_blank" class="term-cmd">linkedin.com/in/rezk-abdelnabi</a>`,

    cv: () => {
      window.open('cv/RezkAbdelmonem_FrontendDev.pdf', '_blank');
      return `📄 Opening Resume / CV in a new tab...`;
    },

    clear: () => {
      body.innerHTML = '';
      return '';
    }
  };

  function appendLine(cmd, output) {
    if (cmd) {
      const cmdRow = document.createElement('div');
      cmdRow.className = 'term-line';
      cmdRow.innerHTML = `<span class="term-prompt">rezk@dev:~$</span> <span class="term-cmd">${escapeHtml(cmd)}</span>`;
      body.appendChild(cmdRow);
    }

    if (output) {
      const respRow = document.createElement('div');
      respRow.className = 'term-line term-response';
      respRow.innerHTML = output;
      body.appendChild(respRow);
    }

    body.scrollTop = body.scrollHeight;
  }

  function handleCommand(rawCmd) {
    const trimmed = rawCmd.trim().toLowerCase();
    if (!trimmed) return;

    if (commands[trimmed]) {
      const result = commands[trimmed]();
      if (trimmed !== 'clear') {
        appendLine(rawCmd, result);
      }
    } else {
      appendLine(rawCmd, `Command not found: "${escapeHtml(rawCmd)}". Type <span class="term-highlight">help</span> for a list of commands.`);
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      handleCommand(val);
    }
  });

  // Handle terminal quick chips
  document.querySelectorAll('.terminal-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        handleCommand(cmd);
      }
    });
  });
}

/* ==========================================================================
   4. Portfolio Catalog & Filter Engine (WebP Optimized)
   ========================================================================== */
const portfolioItems = [
  {
    title: 'New version for info sender',
    desc: 'Next-generation enterprise messaging and marketing automation platform (V2) featuring multi-channel messaging, interactive bot builders, real-time analytics, live chat, and e-commerce integrations (Salla, Zid).',
    image: 'images/thumb/project-27.webp',
    galleryImages: [
      'images/thumb/project-27.webp',
      'images/thumb/infosender-v2-chat.webp',
      'images/thumb/infosender-v2-integrations.webp',
      'images/thumb/infosender-v2-login-ar.webp',
      'images/thumb/infosender-v2-login-en.webp'
    ],
    categories: ['enterprise', 'frontend'],
    tags: ['React', 'TypeScript', 'TanStack Query', 'Tailwind CSS', 'SaaS V2'],
    previewLink: 'https://dashboard.v2.info-sender.com',
    codeLink: ''
  },
  {
    title: 'Info Sender Dashboard',
    desc: 'High-impact enterprise SaaS dashboard for multi-channel business messaging, automated campaign bots, and WhatsApp preview.',
    image: 'images/thumb/project-23.webp',
    galleryImages: [
      'images/thumb/project-23.webp',
      'images/thumb/infosender-v1-apps.webp',
      'images/thumb/infosender-v1-login.webp'
    ],
    categories: ['enterprise', 'frontend'],
    tags: ['React', 'TanStack Query', 'Tailwind CSS', 'Redux'],
    previewLink: 'https://dashboard.info-sender.com/',
    codeLink: ''
  },
  {
    title: 'عون المعلم (Awn Al-Moallem)',
    desc: 'Comprehensive educational SaaS platform & teacher assistance ecosystem featuring interactive classrooms, smart preparation tools, student performance tracking, and subscription management.',
    image: 'images/thumb/project-24.webp',
    galleryImages: [
      'images/thumb/project-24.webp',
      'images/thumb/awn-classes.webp',
      'images/thumb/awn-admin-dashboard.webp',
      'images/thumb/awn-evidence.webp',
      'images/thumb/awn-interactive-board.webp',
      'images/thumb/awn-login.webp'
    ],
    categories: ['enterprise', 'frontend'],
    tags: ['React', 'Redux Toolkit', 'Bootstrap', 'REST APIs'],
    previewLink: 'https://aboda7m01-001-site3.rtempurl.com/home/subscriptions',
    codeLink: ''
  },
   {
    title: 'Hansalhalk Medical Academy',
    desc: 'Specialized medical equipment maintenance & healthcare training platform (Medoxa) featuring dynamic course catalogs, interactive video modules, instructor profiles, and student learning dashboards.',
    image: 'images/thumb/project-25.webp',
    galleryImages: [
      'images/thumb/project-25.webp',
      'images/thumb/medacademy-courses.webp',
      'images/thumb/medacademy-course-detail.webp',
      'images/thumb/medacademy-student-dashboard.webp'
    ],
    categories: ['frontend', 'enterprise'],
    tags: ['React', 'MUI', 'REST APIs', 'Medical EdTech'],
    previewLink: 'https://hansalhalkmedacademy.com/',
    codeLink: ''
  },
   {
    title: 'عيادات توجه الطبية (Tawajjuh Medical Clinic)',
    desc: 'Modern healthcare & aesthetic clinic web application featuring specialized cosmetic laser, skincare treatment portfolios, appointment booking flows, and high-performance responsive UI built with Next.js, Tailwind CSS, and Shadcn UI.',
    image: 'images/thumb/tawajjuh-clinic.webp',
    galleryImages: [
      'images/thumb/tawajjuh-clinic.webp'
    ],
    categories: ['enterprise', 'frontend'],
    tags: ['Next.js', 'Tailwind CSS', 'Shadcn UI', 'React', 'Healthcare'],
    previewLink: 'https://tawajjuh-clinic.sa/',
    codeLink: ''
  },
  {
    title: 'Dynamic Restaurant',
    desc: 'High-performance interactive restaurant & food ordering web app featuring dynamic menu categorization, table QR code scanning, multi-method checkout (dine-in, pickup, delivery), and robust state & form management built with Next.js, Tailwind CSS, Shadcn UI, TanStack Query, Zustand, React Hook Form, and Zod.',
    image: 'images/thumb/restaurant-desktop.webp',
    galleryImages: [
      'images/thumb/restaurant-desktop.webp',
      'images/thumb/restaurant-mobile.webp',
      'images/thumb/restaurant-qr.webp'
    ],
    categories: ['enterprise', 'frontend', 'apis'],
    tags: ['Next.js', 'Tailwind CSS', 'Shadcn UI', 'TanStack Query', 'Zustand', 'React Hook Form', 'Zod'],
    previewLink: '',
    codeLink: ''
  },
  {
    title: 'Jinn Education',
    desc: 'Dynamic online tutoring and educational marketplace connecting learners with top global instructors, featuring interactive subject catalogs, tutor profiles, class scheduling, and modern responsive UI built with Next.js and Tailwind CSS.',
    image: 'images/thumb/jinn-education.webp',
    galleryImages: [
      'images/thumb/jinn-education.webp'
    ],
    categories: ['enterprise', 'frontend'],
    tags: ['Next.js', 'Tailwind CSS', 'React', 'EdTech & Tutors'],
    previewLink: 'https://jinnedu.com',
    codeLink: ''
  },
   {
    title: 'Info Sender API Docs',
    desc: 'Interactive developer documentation portal with live endpoints testing, code snippet generators, and responsive dark UX.',
    image: 'images/thumb/project-26.webp',
    galleryImages: [
      'images/thumb/project-26.webp',
      'images/thumb/infosender-docs-overview.webp',
      'images/thumb/infosender-docs-generate-key.webp'
    ],
    categories: ['frontend'],
    tags: ['React', 'API Docs', 'Tailwind CSS', 'Interactive Runner', 'docusaurus'],
    previewLink: 'https://infofronttest.nasatechnology.net/docs/',
    codeLink: ''
  },
  {
    title: 'Houghton Insurance Brokerage',
    desc: 'Premier insurance brokerage and risk advisory web platform operating across the GCC, featuring comprehensive corporate & personal policy portfolios, quote request flows, and responsive UI built with Next.js and Tailwind CSS.',
    image: 'images/thumb/houghton-insurance.webp',
    galleryImages: [
      'images/thumb/houghton-insurance.webp'
    ],
    categories: ['enterprise', 'frontend'],
    tags: ['Next.js', 'Tailwind CSS', 'React', 'Insurance & FinTech'],
    previewLink: 'https://houghtoninsure.com',
    codeLink: ''
  },
  {
    title: 'Growth Academy',
    desc: 'Modern e-learning and career training web platform with interactive curriculum, student analytics dashboard, video course player, and modern UI aesthetics.',
    image: 'images/thumb/project-14.webp',
    galleryImages: [
      'images/thumb/project-14.webp',
      'images/thumb/growth-academy-dashboard.webp',
      'images/thumb/growth-academy-courses.webp'
    ],
    categories: ['frontend', 'enterprise'],
    tags: ['React', 'Next.js', 'Tailwind CSS', 'E-Learning'],
    previewLink: 'https://growthsacademy.com/',
    codeLink: ''
  },
  {
    title: 'Mealify - Delicious Gastronomy',
    desc: 'Gourmet restaurant web experience with interactive culinary menus, smooth micro-interactions, and booking flows.',
    image: 'images/thumb/project-1.webp',
    categories: ['frontend'],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
    previewLink: 'https://rezcoder55.github.io/R-Mealify/',
    codeLink: ''
  },
  {
    title: 'The Garage - Auto Showcase',
    desc: 'Automotive dealership and luxury car catalog with dynamic filtering, high-resolution media galleries, and specs comparison.',
    image: 'images/thumb/project-2.webp',
    categories: ['frontend'],
    tags: ['JavaScript', 'Sass', 'CSS Grid'],
    previewLink: 'https://rezcoder55.github.io/TheGarage/',
    codeLink: ''
  },
  {
    title: 'Modern Furniture Store',
    desc: 'Sleek e-commerce shopping experience with interactive room customizer, product catalog, and responsive shopping cart.',
    image: 'images/thumb/project-3.webp',
    categories: ['frontend'],
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    previewLink: 'https://rezcoder55.github.io/Furniture/',
    codeLink: ''
  },
  {
    title: 'DeFolio Modern Creative',
    desc: 'Award-style portfolio theme with bold typography, dynamic hover cards, and seamless responsive layout.',
    image: 'images/thumb/project-4.webp',
    categories: ['frontend'],
    tags: ['JavaScript', 'CSS3 Animations', 'Bootstrap'],
    previewLink: 'https://rezcoder55.github.io/DeFolio/',
    codeLink: ''
  },
  {
    title: 'Daniels Portfolio',
    desc: 'Minimalist creative portfolio template featuring dark/light aesthetic, filterable project gallery, and touch-optimized navigation.',
    image: 'images/thumb/project-9.webp',
    categories: ['frontend'],
    tags: ['JavaScript', 'Sass', 'Responsive'],
    previewLink: 'https://rezcoder55.github.io/daniels/',
    codeLink: ''
  },
  {
    title: 'Productivity Todo & Tech Blog',
    desc: 'Multi-feature fullstack client with real-time CRUD operations, categorization, tag filtering, and article reader.',
    image: 'images/thumb/project-5.webp',
    categories: ['apis', 'fullstack', 'frontend'],
    tags: ['Vue.js', 'REST APIs', 'Axios', 'State Management'],
    previewLink: 'https://rezcoder55.github.io/TodoAndBlog/',
    codeLink: ''
  },
  {
    title: 'My List (Vue.js & Laravel API)',
    desc: 'Fullstack task & workflow orchestration engine powered by Vue reactive components and a Laravel backend API.',
    image: 'images/thumb/project-7.webp',
    categories: ['fullstack', 'apis'],
    tags: ['Vue.js', 'Laravel API', 'REST', 'Tailwind'],
    previewLink: 'https://rezcoder55.github.io/TodoApp/',
    codeLink: ''
  },
  {
    title: 'Real-Time Global Weather App',
    desc: 'Live atmospheric weather forecasting client utilizing geolocation, 3-day radar, wind metrics, and dynamic background weather changes.',
    image: 'images/thumb/project-10.webp',
    categories: ['apis', 'frontend'],
    tags: ['JavaScript', 'Weather API', 'Async/Await'],
    previewLink: 'https://rezcoder55.github.io/weather/',
    codeLink: ''
  },
  {
    title: 'Yummy - Global Recipe Engine',
    desc: 'Interactive food & culinary recipe discovery platform with ingredient search, country-specific cuisines, and video guides.',
    image: 'images/thumb/project-12.webp',
    categories: ['apis', 'frontend'],
    tags: ['JavaScript', 'MealDB API', 'Sass'],
    previewLink: 'https://rezcoder55.github.io/yummy/',
    codeLink: ''
  },
  {
    title: 'Binary Search Algorithm Visualizer',
    desc: 'Visual computational tool demonstrating time complexity O(log N), array partitioning, and pointers in real-time.',
    image: 'images/thumb/project-11.webp',
    categories: ['frontend'],
    tags: ['Algorithms', 'Data Structures', 'JavaScript Canvas'],
    previewLink: 'https://rezcoder55.github.io/binarySearchJS/',
    codeLink: ''
  }
];

function initPortfolio() {
  const container = document.getElementById('projects-container');
  const searchInput = document.getElementById('project-search');
  const filterPills = document.querySelectorAll('.filter-pill');
  const loadMoreContainer = document.getElementById('portfolio-load-more');
  if (!container) return;

  const ITEMS_PER_PAGE = 6;
  let visibleCount = ITEMS_PER_PAGE;
  let activeCategory = 'all';
  let searchQuery = '';

  function render() {
    const filtered = portfolioItems.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.categories.includes(activeCategory);
      const matchesSearch = !searchQuery ||
                            item.title.toLowerCase().includes(searchQuery) ||
                            item.desc.toLowerCase().includes(searchQuery) ||
                            item.tags.some(tag => tag.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12" style="grid-column: 1 / -1; padding: 4rem 1rem;">
          <p style="font-size: 1.15rem; color: var(--text-muted); margin-bottom: 1rem;">No matching projects found for "${escapeHtml(searchQuery)}".</p>
          <button class="btn-secondary" id="btn-reset-search">Reset Search</button>
        </div>
      `;
      const btnReset = document.getElementById('btn-reset-search');
      if (btnReset && searchInput) {
        btnReset.addEventListener('click', () => {
          searchInput.value = '';
          searchQuery = '';
          render();
        });
      }
      if (loadMoreContainer) loadMoreContainer.innerHTML = '';
      return;
    }

    const visibleItems = filtered.slice(0, visibleCount);

    container.innerHTML = visibleItems.map((item) => {
      const originalIdx = portfolioItems.indexOf(item);
      return `
      <div class="glass-card spotlight-card project-card">
        <div class="project-thumbnail">
          <img src="${item.image}" alt="${escapeHtml(item.title)}" class="project-img" width="400" height="250" loading="lazy" decoding="async">
          <div class="project-overlay"></div>
          <span class="project-badge-float">${escapeHtml(item.tags[0] || 'Frontend')}</span>
          <button class="thumbnail-expand-btn btn-open-gallery" data-gallery-index="${originalIdx}" title="View in Gallery" aria-label="View gallery for ${escapeHtml(item.title)}">
            <i class="fas fa-expand-alt"></i>
          </button>
        </div>
        <div class="project-body">
          <h3 class="project-title">${escapeHtml(item.title)}</h3>
          <p class="project-desc">${escapeHtml(item.desc)}</p>
          <div class="tech-tags" style="margin-bottom: 1.25rem;">
            ${item.tags.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
          </div>
          <div class="project-footer">
            <div class="project-links">
              <button class="btn-project-action btn-open-gallery" data-gallery-index="${originalIdx}" title="Preview Gallery">
                <i class="fas fa-images"></i> Gallery
              </button>
              ${item.previewLink && item.previewLink !== '#' ? `
                <a href="${item.previewLink}" target="_blank" rel="noopener noreferrer" class="btn-project-action">
                  <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
              ` : ''}
              ${item.codeLink && item.codeLink !== '#' ? `
                <a href="${item.codeLink}" target="_blank" rel="noopener noreferrer" class="btn-project-action">
                  <i class="fab fa-github"></i> Code
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </div>`;
    }).join('');

    // Load More / Show Less controls
    if (loadMoreContainer) {
      if (filtered.length > ITEMS_PER_PAGE) {
        if (visibleCount < filtered.length) {
          const remaining = filtered.length - visibleCount;
          loadMoreContainer.innerHTML = `
            <button class="btn-primary" id="btn-show-more" style="padding: 0.85rem 2.25rem; font-size: 1rem; border-radius: 50px; display: inline-flex; align-items: center; gap: 0.65rem; cursor: pointer; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
              <i class="fas fa-angles-down"></i> Show More Projects (${remaining} more)
            </button>
          `;
          const btnShowMore = document.getElementById('btn-show-more');
          if (btnShowMore) {
            btnShowMore.addEventListener('click', () => {
              visibleCount += ITEMS_PER_PAGE;
              render();
            });
          }
        } else {
          loadMoreContainer.innerHTML = `
            <button class="btn-secondary" id="btn-show-less" style="padding: 0.85rem 2.25rem; font-size: 1rem; border-radius: 50px; display: inline-flex; align-items: center; gap: 0.65rem; cursor: pointer;">
              <i class="fas fa-angles-up"></i> Show Less
            </button>
          `;
          const btnShowLess = document.getElementById('btn-show-less');
          if (btnShowLess) {
            btnShowLess.addEventListener('click', () => {
              visibleCount = ITEMS_PER_PAGE;
              render();
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
            });
          }
        }
      } else {
        loadMoreContainer.innerHTML = '';
      }
    }
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-filter') || 'all';
      visibleCount = ITEMS_PER_PAGE;
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      visibleCount = ITEMS_PER_PAGE;
      render();
    }, 150));
  }

  render();
}

/* ==========================================================================
   5. Interactive Project Gallery Modal (Single Project Photos Slider)
   ========================================================================== */
let currentProjectIdx = 0;
let currentPhotoIdx = 0;

function initGalleryModal() {
  const modal = document.getElementById('gallery-modal');
  const closeBtn = document.getElementById('gallery-close-btn');
  const dismissBtn = document.getElementById('gallery-dismiss-btn');
  const prevBtn = document.getElementById('gallery-prev-btn');
  const nextBtn = document.getElementById('gallery-next-btn');

  const titleEl = document.getElementById('gallery-title');
  const badgeEl = document.getElementById('gallery-badge');
  const descEl = document.getElementById('gallery-desc');
  const tagsEl = document.getElementById('gallery-tags');
  const imgEl = document.getElementById('gallery-active-img') || document.getElementById('gallery-img');
  const thumbsRow = document.getElementById('gallery-thumbs-row') || document.getElementById('gallery-thumbs');
  const counterEl = document.getElementById('gallery-counter');
  const liveLinkBtn = document.getElementById('gallery-live-link');
  const codeLinkBtn = document.getElementById('gallery-code-link');

  if (!modal) return;

  function getProjectPhotos(item) {
    if (item && item.galleryImages && item.galleryImages.length > 0) {
      return item.galleryImages;
    }
    return item && item.image ? [item.image] : [];
  }

  function setPhoto(photoIdx) {
    const item = portfolioItems[currentProjectIdx];
    if (!item) return;
    const photos = getProjectPhotos(item);
    if (!photos.length) return;

    currentPhotoIdx = (photoIdx + photos.length) % photos.length;
    const activePhotoSrc = photos[currentPhotoIdx];

    if (imgEl) {
      imgEl.style.opacity = '0.4';
      imgEl.src = activePhotoSrc;
      imgEl.alt = `${item.title} - Photo ${currentPhotoIdx + 1}`;
      imgEl.onload = () => {
        imgEl.style.opacity = '1';
      };
      if (imgEl.complete && imgEl.naturalWidth !== 0) {
        imgEl.style.opacity = '1';
      }
    }

    if (counterEl) {
      counterEl.textContent = `${currentPhotoIdx + 1} / ${photos.length}`;
    }

    if (thumbsRow) {
      const allThumbs = thumbsRow.querySelectorAll('.gallery-thumb-btn');
      allThumbs.forEach((tBtn, tIdx) => {
        if (tIdx === currentPhotoIdx) {
          tBtn.classList.add('active');
          tBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          tBtn.classList.remove('active');
        }
      });
    }
  }

  function openModal(projectIdx) {
    currentProjectIdx = (projectIdx + portfolioItems.length) % portfolioItems.length;
    currentPhotoIdx = 0;
    const item = portfolioItems[currentProjectIdx];
    if (!item) return;

    const photos = getProjectPhotos(item);

    if (titleEl) titleEl.textContent = item.title;
    if (badgeEl) badgeEl.textContent = item.tags[0] || 'Frontend';
    if (descEl) descEl.textContent = item.desc;

    if (tagsEl) {
      tagsEl.innerHTML = item.tags.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('');
    }

    if (photos.length > 1) {
      if (prevBtn) prevBtn.style.display = 'flex';
      if (nextBtn) nextBtn.style.display = 'flex';
      if (counterEl) counterEl.style.display = 'inline-block';
    } else {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (counterEl) counterEl.style.display = 'none';
    }

    if (thumbsRow) {
      if (photos.length > 1) {
        thumbsRow.style.display = 'flex';
        thumbsRow.innerHTML = photos.map((gImg, gIdx) => `
          <button class="gallery-thumb-btn ${gIdx === 0 ? 'active' : ''}" data-photo-idx="${gIdx}" title="Photo ${gIdx + 1} of ${photos.length}" aria-label="Photo ${gIdx + 1}">
            <img src="${gImg}" alt="${escapeHtml(item.title)} thumbnail ${gIdx + 1}" width="80" height="50" loading="lazy" decoding="async">
          </button>
        `).join('');

        thumbsRow.querySelectorAll('.gallery-thumb-btn').forEach(tBtn => {
          tBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const pIdx = parseInt(tBtn.getAttribute('data-photo-idx'), 10);
            if (!isNaN(pIdx)) setPhoto(pIdx);
          });
        });
      } else {
        thumbsRow.style.display = 'none';
        thumbsRow.innerHTML = '';
      }
    }

    if (liveLinkBtn) {
      if (item.previewLink && item.previewLink !== '#') {
        liveLinkBtn.href = item.previewLink;
        liveLinkBtn.style.display = 'inline-flex';
      } else {
        liveLinkBtn.style.display = 'none';
      }
    }

    if (codeLinkBtn) {
      if (item.codeLink && item.codeLink !== '#') {
        codeLinkBtn.href = item.codeLink;
        codeLinkBtn.style.display = 'inline-flex';
      } else {
        codeLinkBtn.style.display = 'none';
      }
    }

    setPhoto(0);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Delegated click listener for all gallery triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.btn-open-gallery');
    if (trigger) {
      const idx = parseInt(trigger.getAttribute('data-gallery-index'), 10);
      if (!isNaN(idx)) {
        openModal(idx);
      }
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setPhoto(currentPhotoIdx - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setPhoto(currentPhotoIdx + 1);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') setPhoto(currentPhotoIdx - 1);
    if (e.key === 'ArrowRight') setPhoto(currentPhotoIdx + 1);
  });
}

/* ==========================================================================
   6. 3D Tilt & Spotlight Card Interactions (Delegated & GPU Accelerated)
   ========================================================================== */
function initCardInteractions() {
  let isTicking = false;

  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest('.spotlight-card');
    if (!card) return;

    if (!isTicking) {
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   7. Navigation & Scroll Spy
   ========================================================================== */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // ScrollSpy with IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(sec => observer.observe(sec));
  }
}

/* ==========================================================================
   8. Timeline & Tab Switcher
   ========================================================================== */
function initTimelineTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const expContainer = document.getElementById('timeline-experience');
  const eduContainer = document.getElementById('timeline-education');

  if (!tabBtns.length || !expContainer || !eduContainer) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-tab');
      if (target === 'experience') {
        expContainer.style.display = 'block';
        eduContainer.style.display = 'none';
      } else {
        expContainer.style.display = 'none';
        eduContainer.style.display = 'block';
      }
    });
  });
}

/* ==========================================================================
   9. Theme & Accent Customizer
   ========================================================================== */
function initThemeCustomizer() {
  const themeToggle = document.getElementById('theme-toggle');
  const customizerToggle = document.getElementById('customizer-toggle');
  const customizerPanel = document.getElementById('customizer-panel');
  const swatches = document.querySelectorAll('.color-swatch');

  // Load Saved Accent
  const savedAccent = localStorage.getItem('rez_accent') || 'cyan';
  document.documentElement.setAttribute('data-accent', savedAccent);
  swatches.forEach(s => {
    if (s.getAttribute('data-color') === savedAccent) s.classList.add('active');
  });

  // Load Saved Theme (Dark / Light)
  const savedTheme = localStorage.getItem('rez_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Theme Toggle Button
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('rez_theme', isLight ? 'light' : 'dark');
      themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      showToast(isLight ? 'Switched to Light Theme' : 'Switched to Dark Theme', 'success');
    });
  }

  // Customizer Panel Toggle
  if (customizerToggle && customizerPanel) {
    customizerToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      customizerPanel.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!customizerPanel.contains(e.target) && e.target !== customizerToggle) {
        customizerPanel.classList.remove('active');
      }
    });
  }

  // Accent Swatches
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const color = swatch.getAttribute('data-color');
      document.documentElement.setAttribute('data-accent', color);
      localStorage.setItem('rez_accent', color);
      showToast(`Accent color changed to ${color.toUpperCase()}`, 'success');
    });
  });
}

/* ==========================================================================
   10. Copy to Clipboard Helper
   ========================================================================== */
function initClipboardHelpers() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: "${textToCopy}"`, 'success');
      }).catch(() => {
        showToast('Unable to copy to clipboard', 'error');
      });
    });
  });
}

/* ==========================================================================
   11. EmailJS Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  if (window.emailjs) {
    emailjs.init("D8WQgXq4zS_0Inmo7");
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending Message...';
    submitBtn.disabled = true;

    if (window.emailjs) {
      emailjs.sendForm('service_yfh7xf6', 'template_ambr4j4', form)
        .then(() => {
          showToast('Thank you! Your message has been sent successfully.', 'success');
          form.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        })
        .catch((err) => {
          console.error(err);
          showToast('Failed to send message. Please reach out directly via email.', 'error');
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    } else {
      setTimeout(() => {
        showToast('Message sent successfully! (Preview Mode)', 'success');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1000);
    }
  });
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
