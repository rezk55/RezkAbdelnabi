/**
 * RezCoder - Next-Generation Developer Portfolio Engine
 * Pure Vanilla Modern JavaScript (Zero Bloat, 60fps Performance)
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
   1. Ambient Dynamic Particle Canvas
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.8 + 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion/interaction
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
    }
  }

  const particleCount = Math.min(Math.floor((width * height) / 16000), 65);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.hypot(dx, dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(100, 200, 255, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
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
      typingSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before new word
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
1. <b>Info Sender Dashboard</b> (React, TanStack, Tailwind) - Enterprise WhatsApp & Campaign platform
2. <b>Info Sender API Docs</b> - High-performance interactive developer documentation
3. <b>عون المعلم</b> - Advanced Educational SaaS Platform
4. <b>Growth Academy & Hansalhalk Medical Academy</b> - Interactive portals`,

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
      window.open('/cv/RezkAbdelmonem_Frontend.pdf', '_blank');
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

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ==========================================================================
   4. Portfolio Catalog & Filter Engine
   ========================================================================== */
const portfolioItems = [
  {
    title: 'New version for info sender',
    desc: 'Next-generation enterprise messaging and marketing automation platform (V2) featuring multi-channel messaging, interactive bot builders, real-time analytics, live chat, and e-commerce integrations (Salla, Zid).',
    image: 'images/thumb/project-27.png',
    galleryImages: [
      'images/thumb/project-27.png',
      'images/thumb/infosender-v2-chat.png',
      'images/thumb/infosender-v2-integrations.png',
      'images/thumb/infosender-v2-login-ar.png',
      'images/thumb/infosender-v2-login-en.png'
    ],
    categories: ['enterprise', 'frontend', 'apis'],
    tags: ['React', 'TypeScript', 'TanStack Query', 'Tailwind CSS', 'SaaS V2'],
    previewLink: 'https://dashboard.v2.info-sender.com',
    codeLink: ''
  },
  {
    title: 'Info Sender Dashboard',
    desc: 'High-impact enterprise SaaS dashboard for multi-channel business messaging, automated campaign bots, and WhatsApp preview.',
    image: 'images/thumb/project-23.png',
    galleryImages: [
      'images/thumb/project-23.png',
      'images/thumb/infosender-v1-apps.png',
      'images/thumb/infosender-v1-login.png'
    ],
    categories: ['enterprise', 'frontend', 'apis'],
    tags: ['React', 'TanStack Query', 'Tailwind CSS', 'Redux'],
    previewLink: 'https://dashboard.info-sender.com/',
    codeLink: ''
  },
  {
    title: 'Info Sender API Docs',
    desc: 'Interactive developer documentation portal with live endpoints testing, code snippet generators, and responsive dark UX.',
    image: 'images/thumb/project-26.png',
    galleryImages: [
      'images/thumb/project-26.png',
      'images/thumb/infosender-docs-overview.png',
      'images/thumb/infosender-docs-generate-key.png'
    ],
    categories: ['frontend', 'apis'],
    tags: ['React', 'API Docs', 'Tailwind CSS', 'Interactive Runner', 'docusaurus'],
    previewLink: 'https://infofronttest.nasatechnology.net/docs/',
    codeLink: ''
  },
  {
    title: 'عون المعلم (Awn Al-Moallem)',
    desc: 'Comprehensive educational platform & subscription portal for teachers and students with dynamic course management.',
    image: 'images/thumb/project-24.png',
    categories: ['enterprise', 'frontend'],
    tags: ['React', 'Redux Toolkit', 'Bootstrap', 'REST APIs'],
    previewLink: 'https://aboda7m01-001-site3.rtempurl.com/home/subscriptions',
    codeLink: ''
  },
  {
    title: 'Growth Academy',
    desc: 'Modern e-learning and career training web platform with interactive curriculum, student analytics dashboard, video course player, and modern UI aesthetics.',
    image: 'images/thumb/project-14.png',
    galleryImages: [
      'images/thumb/project-14.png',
      'images/thumb/growth-academy-dashboard.png',
      'images/thumb/growth-academy-courses.png'
    ],
    categories: ['frontend', 'enterprise'],
    tags: ['React', 'Next.js', 'Tailwind CSS', 'E-Learning'],
    previewLink: 'https://growthsacademy.com/',
    codeLink: ''
  },
  {
    title: 'Hansalhalk Medical Academy',
    desc: 'Specialized medical equipment maintenance & healthcare training platform (Medoxa) featuring dynamic course catalogs, interactive video modules, instructor profiles, and student learning dashboards.',
    image: 'images/thumb/project-25.png',
    galleryImages: [
      'images/thumb/project-25.png',
      'images/thumb/medacademy-courses.png',
      'images/thumb/medacademy-course-detail.png',
      'images/thumb/medacademy-student-dashboard.png'
    ],
    categories: ['frontend', 'enterprise'],
    tags: ['React', 'MUI', 'REST APIs', 'Medical EdTech'],
    previewLink: 'https://hansalhalkmedacademy.com/',
    codeLink: ''
  },
  {
    title: 'Mealify - Delicious Gastronomy',
    desc: 'Gourmet restaurant web experience with interactive culinary menus, smooth micro-interactions, and booking flows.',
    image: 'images/thumb/project-1.png',
    categories: ['frontend'],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
    previewLink: 'https://rezk55.github.io/R-Mealify/',
    codeLink: ''
  },
  {
    title: 'The Garage - Auto Showcase',
    desc: 'Automotive dealership and luxury car catalog with dynamic filtering, high-resolution media galleries, and specs comparison.',
    image: 'images/thumb/project-2.png',
    categories: ['frontend'],
    tags: ['JavaScript', 'Sass', 'CSS Grid'],
    previewLink: 'https://rezk55.github.io/TheGarage/',
    codeLink: ''
  },
  {
    title: 'Modern Furniture Store',
    desc: 'Sleek e-commerce shopping experience with interactive room customizer, product catalog, and responsive shopping cart.',
    image: 'images/thumb/project-3.png',
    categories: ['frontend'],
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    previewLink: 'https://rezk55.github.io/Furniture/',
    codeLink: ''
  },
  {
    title: 'DeFolio Modern Creative',
    desc: 'Award-style portfolio theme with bold typography, dynamic hover cards, and seamless responsive layout.',
    image: 'images/thumb/project-4.png',
    categories: ['frontend'],
    tags: ['JavaScript', 'CSS3 Animations', 'Bootstrap'],
    previewLink: 'https://rezk55.github.io/DeFolio/',
    codeLink: ''
  },
  {
    title: 'Daniels Portfolio',
    desc: 'Minimalist creative portfolio template featuring dark/light aesthetic, filterable project gallery, and touch-optimized navigation.',
    image: 'images/thumb/project-9.png',
    categories: ['frontend'],
    tags: ['JavaScript', 'Sass', 'Responsive'],
    previewLink: 'https://rezk55.github.io/daniels/',
    codeLink: ''
  },
  {
    title: 'Productivity Todo & Tech Blog',
    desc: 'Multi-feature fullstack client with real-time CRUD operations, categorization, tag filtering, and article reader.',
    image: 'images/thumb/project-5.png',
    categories: ['apis', 'fullstack', 'frontend'],
    tags: ['Vue.js', 'REST APIs', 'Axios', 'State Management'],
    previewLink: 'https://rezk55.github.io/TodoAndBlog/',
    codeLink: ''
  },
  {
    title: 'My List (Vue.js & Laravel API)',
    desc: 'Fullstack task & workflow orchestration engine powered by Vue reactive components and a Laravel backend API.',
    image: 'images/thumb/project-7.png',
    categories: ['fullstack', 'apis'],
    tags: ['Vue.js', 'Laravel API', 'REST', 'Tailwind'],
    previewLink: 'https://rezk55.github.io/TodoApp/',
    codeLink: ''
  },
  {
    title: 'Real-Time Global Weather App',
    desc: 'Live atmospheric weather forecasting client utilizing geolocation, 3-day radar, wind metrics, and dynamic background weather changes.',
    image: 'images/thumb/project-10.png',
    categories: ['apis', 'frontend'],
    tags: ['JavaScript', 'Weather API', 'Async/Await'],
    previewLink: 'https://rezk55.github.io/weather/',
    codeLink: ''
  },
  {
    title: 'Yummy - Global Recipe Engine',
    desc: 'Interactive food & culinary recipe discovery platform with ingredient search, country-specific cuisines, and video guides.',
    image: 'images/thumb/project-12.png',
    categories: ['apis', 'frontend'],
    tags: ['JavaScript', 'MealDB API', 'Sass'],
    previewLink: 'https://rezk55.github.io/yummy/',
    codeLink: ''
  },
  {
    title: 'Binary Search Algorithm Visualizer',
    desc: 'Visual computational tool demonstrating time complexity $O(\\log N)$, array partitioning, and pointers in real-time.',
    image: 'images/thumb/project-11.png',
    categories: ['frontend'],
    tags: ['Algorithms', 'Data Structures', 'JavaScript Canvas'],
    previewLink: 'https://rezk55.github.io/binarySearchJS/',
    codeLink: ''
  }
];

function initPortfolio() {
  const container = document.getElementById('projects-container');
  const searchInput = document.getElementById('project-search');
  const filterPills = document.querySelectorAll('.filter-pill');
  if (!container) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function render() {
    const filtered = portfolioItems.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.categories.includes(activeCategory);
      const matchesSearch = item.title.toLowerCase().includes(searchQuery) ||
                            item.desc.toLowerCase().includes(searchQuery) ||
                            item.tags.some(tag => tag.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12" style="grid-column: 1 / -1; padding: 4rem 1rem;">
          <p style="font-size: 1.15rem; color: var(--text-muted); margin-bottom: 1rem;">No matching projects found for "${escapeHtml(searchQuery)}".</p>
          <button class="btn-secondary" onclick="document.getElementById('project-search').value = ''; document.getElementById('project-search').dispatchEvent(new Event('input'));">Reset Search</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map((item) => {
      const originalIdx = portfolioItems.indexOf(item);
      return `
      <div class="glass-card spotlight-card project-card">
        <div class="project-thumbnail">
          <img src="${item.image}" alt="${item.title}" class="project-img" loading="lazy">
          <div class="project-overlay"></div>
          <span class="project-badge-float">${item.tags[0] || 'Frontend'}</span>
          <button class="thumbnail-expand-btn btn-open-gallery" data-gallery-index="${originalIdx}" title="View in Gallery">
            <i class="fas fa-expand-alt"></i>
          </button>
        </div>
        <div class="project-body">
          <h3 class="project-title">${item.title}</h3>
          <p class="project-desc">${item.desc}</p>
          <div class="tech-tags" style="margin-bottom: 1.25rem;">
            ${item.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
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

    // Re-attach spotlight tracking to new cards
    initCardInteractions();
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-filter');
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      render();
    });
  }

  render();
}

/* ==========================================================================
   5. Interactive Project Gallery Modal (Same Project Photos Slider)
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
  const imgEl = document.getElementById('gallery-img');
  const descEl = document.getElementById('gallery-desc');
  const tagsEl = document.getElementById('gallery-tags');
  const linksEl = document.getElementById('gallery-links');
  const thumbsRow = document.getElementById('gallery-thumbs');

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
      imgEl.style.opacity = '0.5';
      imgEl.src = activePhotoSrc;
      imgEl.alt = `${item.title} - Photo ${currentPhotoIdx + 1}`;
      setTimeout(() => {
        if (imgEl) imgEl.style.opacity = '1';
      }, 100);
    }

    if (thumbsRow) {
      const allThumbs = thumbsRow.querySelectorAll('.gallery-thumb-btn');
      allThumbs.forEach((tBtn, tIdx) => {
        if (tIdx === currentPhotoIdx) {
          tBtn.classList.add('active');
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
      tagsEl.innerHTML = item.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');
    }

    // Toggle arrow visibility based on photo count of current project
    if (photos.length > 1) {
      if (prevBtn) prevBtn.style.display = 'flex';
      if (nextBtn) nextBtn.style.display = 'flex';
    } else {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    }

    // Populate thumbnail strip
    if (thumbsRow) {
      if (photos.length > 1) {
        thumbsRow.style.display = 'flex';
        thumbsRow.innerHTML = photos.map((gImg, gIdx) => `
          <button class="gallery-thumb-btn ${gIdx === 0 ? 'active' : ''}" data-photo-idx="${gIdx}" title="Photo ${gIdx + 1} of ${photos.length}">
            <img src="${gImg}" alt="Screenshot ${gIdx + 1}" />
          </button>
        `).join('');

        thumbsRow.querySelectorAll('.gallery-thumb-btn').forEach(tBtn => {
          tBtn.addEventListener('click', () => {
            const pIdx = parseInt(tBtn.getAttribute('data-photo-idx'), 10);
            if (!isNaN(pIdx)) {
              setPhoto(pIdx);
            }
          });
        });
      } else {
        thumbsRow.style.display = 'none';
        thumbsRow.innerHTML = '';
      }
    }

    if (linksEl) {
      let linksHtml = '';
      if (item.previewLink && item.previewLink !== '#') {
        linksHtml += `<a href="${item.previewLink}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 0.5rem 1.15rem; font-size: 0.85rem;"><i class="fas fa-external-link-alt"></i> Live Demo</a>`;
      }
      if (item.codeLink && item.codeLink !== '#') {
        linksHtml += `<a href="${item.codeLink}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="padding: 0.5rem 1.15rem; font-size: 0.85rem;"><i class="fab fa-github"></i> Source Code</a>`;
      }
      linksEl.innerHTML = linksHtml;
    }

    setPhoto(0);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Delegated click listener for all gallery triggers (cards & thumbnails)
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

  // Left and Right arrows slide photos of the SAME project
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

  // Keyboard navigation slides photos of the same project
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') setPhoto(currentPhotoIdx - 1);
    if (e.key === 'ArrowRight') setPhoto(currentPhotoIdx + 1);
  });
}

/* ==========================================================================
   5. 3D Tilt & Spotlight Card Interactions
   ========================================================================== */
function initCardInteractions() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   6. Navigation & Scroll Spy
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

/* ==========================================================================
   7. Timeline & Tab Switcher
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
   8. Theme & Accent Customizer
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
   9. Copy to Clipboard Helper
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
   10. EmailJS Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Initialize EmailJS with preserved Public Key
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
