'use strict';

/* ══════════════════════════════════════
   FAREL GANTENG — main.js
   Book Gallery Edition (Pendidikan Tabs)
   ══════════════════════════════════════ */

/* ─── Sembunyikan typewriter sedini mungkin ─── */
document.head.insertAdjacentHTML('beforeend', '<style id="hide-typewriter">#typewriter{visibility:hidden!important}</style>');

/* ─── SCROLL PROGRESS BAR ─── */
const scrollBar = document.getElementById('scroll-progress') || document.createElement('div');
if (!scrollBar.id) { scrollBar.id = 'scroll-progress'; document.body.prepend(scrollBar); }
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  scrollBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

/* ─── BACK TO TOP ─── */
let btt = document.getElementById('back-to-top');
if (!btt) { btt = document.createElement('button'); btt.id = 'back-to-top'; btt.innerHTML = '↑'; btt.title = 'Ke atas'; document.body.appendChild(btt); }
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => { btt.classList.toggle('visible', window.scrollY > 400); }, { passive: true });

/* ─── NAVBAR ─── */
const navbar = document.getElementById('navbar');
const sections = ['hero','about','skills','portfolio','contact'];
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) current = id;
  });
  navLinks.forEach(a => {
    const href = a.getAttribute('href')?.replace('#', '');
    a.classList.toggle('active', href === current);
  });
}, { passive: true });

/* ─── MOBILE HAMBURGER ─── */
const hamburger = document.querySelector('.nav-hamburger');
const navLinkList = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinkList.classList.toggle('mobile-open');
  });
  navLinkList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinkList.classList.remove('mobile-open');
    });
  });
}

/* ─── SECTION DOTS ─── */
const dotContainer = document.createElement('div');
dotContainer.id = 'section-dots';
document.body.appendChild(dotContainer);
const dotSections = ['hero','about','skills','portfolio','contact'];
const dots = dotSections.map(id => {
  const d = document.createElement('a');
  d.className = 's-dot'; d.href = '#' + id; d.title = id;
  dotContainer.appendChild(d);
  return { el: d, id };
});
function updateDots() {
  let current = 'hero';
  dotSections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 300) current = id;
  });
  dots.forEach(d => d.el.classList.toggle('active', d.id === current));
}
window.addEventListener('scroll', updateDots, { passive: true });
updateDots();

/* ═══ CURSOR — menggunakan CSS cursor dari file Future Cursor ═══ */
// Cursor dihandle via CSS dengan file .cur dari Future Cursor pack
// cur element tidak lagi digunakan

/* ─── SPARKLE ON CLICK ─── */
document.addEventListener('click', function spawnSparkles(e) {
  const colors = ['#ffe033','#3b35d4','#ff5c5c','#00c896','#ff7a2f','#7c3aed'];
  for (let i = 0; i < 9; i++) {
    const sp = document.createElement('div');
    sp.className = 'sparkle';
    sp.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;background:${colors[i%colors.length]};width:${4+Math.random()*6}px;height:${4+Math.random()*6}px;`;
    const angle = (i/9)*360 + Math.random()*30;
    const dist  = 35 + Math.random()*55;
    sp.animate([
      { transform:'translate(-50%,-50%) scale(1)', opacity:1 },
      { transform:`translate(calc(-50% + ${Math.cos(angle*Math.PI/180)*dist}px),calc(-50% + ${Math.sin(angle*Math.PI/180)*dist}px)) scale(0)`, opacity:0 }
    ], { duration:550+Math.random()*300, easing:'cubic-bezier(.16,1,.3,1)', fill:'forwards' });
    document.body.appendChild(sp);
    setTimeout(() => sp.remove(), 950);
  }
});

/* ─── BTN MAGNETIC HOVER ─── */
document.querySelectorAll('.btn-grad').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.18}px,${(e.clientY-r.top-r.height/2)*0.25}px) translateY(-3px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ─── BTN PARTICLE HOVER ─── */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    for (let i = 0; i < 5; i++) {
      const p = document.createElement('div');
      p.style.cssText = `position:absolute; pointer-events:none; width:4px; height:4px; border-radius:50%; background: var(--yellow); top:${Math.random()*100}%; left:${Math.random()*100}%; opacity:0.8; z-index:0;`;
      btn.appendChild(p);
      p.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.8 },
        { transform: `translate(-50%, calc(-50% - ${20+Math.random()*20}px)) scale(0)`, opacity: 0 }
      ], { duration: 600, easing: 'ease-out', fill: 'forwards' });
      setTimeout(() => p.remove(), 700);
    }
  });
});

/* ─── TYPEWRITER ─── */
const typeEl = document.getElementById('typewriter');
if (typeEl) {
  typeEl.textContent = ''; // bersihkan teks bawaan HTML
  // Hapus aturan CSS yang menyembunyikan segera setelah kita pegang elemen
  const hideStyle = document.getElementById('hide-typewriter');
  if (hideStyle) hideStyle.remove();
  // Sembunyikan dulu lewat inline style
  typeEl.style.visibility = 'hidden';
}

function getTimeGreetings() {
  const hour = new Date().getHours();
  let period;
  if (hour >= 5 && hour < 11) {
    period = 'morning';
  } else if (hour >= 11 && hour < 15) {
    period = 'afternoon';
  } else if (hour >= 15 && hour < 19) {
    period = 'evening';
  } else {
    period = 'night';
  }

  const langGreetings = [
    {
      country: 'Indonesia', flag: '🇮🇩',
      morning: 'Selamat pagi', afternoon: 'Selamat siang',
      evening: 'Selamat sore', night: 'Selamat malam'
    },
    {
      country: 'Amerika Serikat', flag: '🇺🇸',
      morning: 'Good morning', afternoon: 'Good afternoon',
      evening: 'Good evening', night: 'Good night'
    },
    {
      country: 'Israel', flag: '🇮🇱',
      morning: 'בוקר טוב', afternoon: 'צהריים טובים',
      evening: 'ערב טוב', night: 'לילה טוב'
    },
    {
      country: 'Taiwan', flag: '🇹🇼',
      morning: '早上好', afternoon: '下午好',
      evening: '晚上好', night: '晚安'
    },
    {
      country: 'China', flag: '🇨🇳',
      morning: '早上好', afternoon: '下午好',
      evening: '晚上好', night: '晚安'
    },
    {
      country: 'India', flag: '🇮🇳',
      morning: 'सुप्रभात', afternoon: 'नमस्कार',
      evening: 'शुभ संध्या', night: 'शुभ रात्रि'
    },
    {
      country: 'Korea Selatan', flag: '🇰🇷',
      morning: '좋은 아침', afternoon: '안녕하세요',
      evening: '안녕하세요', night: '안녕히 주무세요'
    },
    {
      country: 'Singapura', flag: '🇸🇬',
      morning: 'Good morning', afternoon: 'Good afternoon',
      evening: 'Good evening', night: 'Good night'
    },
    {
      country: 'Prancis', flag: '🇫🇷',
      morning: 'Bonjour', afternoon: 'Bon après-midi',
      evening: 'Bonsoir', night: 'Bonne nuit'
    },
    {
      country: 'Jepang', flag: '🇯🇵',
      morning: 'おはよう', afternoon: 'こんにちは',
      evening: 'こんばんは', night: 'おやすみ'
    },
    {
      country: 'Hong Kong', flag: '🇭🇰',
      morning: '早晨', afternoon: '午安',
      evening: '晚上好', night: '晚安'
    },
    {
      country: 'Jerman', flag: '🇩🇪',
      morning: 'Guten Morgen', afternoon: 'Guten Tag',
      evening: 'Guten Abend', night: 'Gute Nacht'
    },
    {
      country: 'Finlandia', flag: '🇫🇮',
      morning: 'Hyvää huomenta', afternoon: 'Hyvää päivää',
      evening: 'Hyvää iltaa', night: 'Hyvää yötä'
    },
    {
      country: 'Swedia', flag: '🇸🇪',
      morning: 'God morgon', afternoon: 'God dag',
      evening: 'God kväll', night: 'God natt'
    },
    {
      country: 'Estonia', flag: '🇪🇪',
      morning: 'Tere hommikust', afternoon: 'Tere päevast',
      evening: 'Tere õhtust', night: 'Head ööd'
    },
    {
      country: 'Swiss', flag: '🇨🇭',
      morning: 'Buongiorno', afternoon: 'Buon pomeriggio',
      evening: 'Buonasera', night: 'Buonanotte'
    }
  ];

  return langGreetings.map(g => g[period]);
}

let ti = 0, ci = 0, deleting = false;
let texts = getTimeGreetings();
let typewriterVisible = false;

function typeLoop() {
  if (!typeEl) return;

  const full = texts[ti];
  typeEl.textContent = deleting ? full.slice(0, ci--) : full.slice(0, ci++);

  // Tampilkan elemen tepat setelah karakter pertama muncul
  if (!typewriterVisible && !deleting && ci > 0) {
    typeEl.style.visibility = 'visible';
    typewriterVisible = true;
  }

  let speed = deleting ? 40 : 85;
  if (!deleting && ci > full.length) {
    speed = 1600;
    deleting = true;
  }
  if (deleting && ci < 0) {
    deleting = false;
    ti = (ti + 1) % texts.length;
    if (ti === 0) texts = getTimeGreetings();
    speed = 350;
  }

  setTimeout(typeLoop, speed);
}

typeLoop();

/* ─── SCROLL REVEAL ─── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObs.unobserve(entry.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => revealObs.observe(el));

/* ─── STAGGER SKILL CARDS ─── */
const skillBento = document.querySelector('.skills-bento');
if (skillBento) {
  skillBento.querySelectorAll('.skill-card').forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(30px)'; c.style.transition = 'opacity 0.6s cubic-bezier(.16,1,.3,1), transform 0.6s cubic-bezier(.16,1,.3,1)'; });
  new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.querySelectorAll('.skill-card').forEach((c,i) => { setTimeout(() => { c.style.opacity='1'; c.style.transform='translateY(0)'; }, i*80); }); } }); }, { threshold: 0.1 }).observe(skillBento);
}

/* ─── STAGGER CONTACT CHIPS ─── */
const contactChips = document.querySelectorAll('.contact-chip');
contactChips.forEach((chip,i) => {
  chip.style.opacity = '0'; chip.style.transform = 'translateX(-20px)';
  chip.style.transition = `opacity 0.5s var(--ease-out) ${i*80}ms, transform 0.5s var(--ease-out) ${i*80}ms`;
});
new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.contact-chip').forEach(chip => {
        chip.style.opacity = '1'; chip.style.transform = 'translateX(0)';
      });
    }
  });
}, { threshold: 0.1 }).observe(document.querySelector('.contact-info') || document.body);

/* ─── CARD TILT ─── */
document.querySelectorAll('.skill-card, .hero-card-inner, .about-corner-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-0.5, y = (e.clientY-r.top)/r.height-0.5;
    card.style.transform = `perspective(600px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ─── COUNT-UP STATS ─── */
new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const val = el.textContent;
        if (val === '∞' || val.includes('+')) return;
        const num = parseInt(val);
        if (isNaN(num)) return;
        let current = 0;
        const step = Math.max(1, Math.ceil(num/20));
        const timer = setInterval(() => {
          current = Math.min(current+step, num);
          el.textContent = current;
          if (current >= num) clearInterval(timer);
        }, 50);
      });
    }
  });
}, { threshold: 0.5 }).observe(document.querySelector('.hero-stats') || document.body);

/* ═══════════════════════════════════════════════════
   BOOK GALLERY — Portfolio Section
   … (data & logika galeri tetap sama seperti sebelumnya)
   ═══════════════════════════════════════════════════ */

/* ── Data foto per kategori ── */
const galleryData = {
  proyek: {
    label : 'Proyek',
    icon  : '🔧',
    color : '#1d4ed8',
    items : [
      { src: 'img/port-proyek1.jpg', title: 'TUGAS AKHIR',   desc: 'Konfigurasi Mikrotik' },
      { src: 'img/port-proyek2.png',  title: 'Hasil akhir',  desc: 'Hasil akhir praktik tugas akhir' },
      { src: 'img/monitoring1.jpeg',  title: 'Monitoring Jaringan',  desc: 'Monitoring Jaringan Saat PKL'  },
    ]
  },
  pendidikan: {
    label : 'Pendidikan',
    icon  : '🎓',
    color : '#f59e0b',
    items : [
      { src: 'img/sd.jpg', title: 'Ngadirejo 1', desc: 'haha lali kabeh' },
      { src: 'img/smp.jpg', title: '1 Kartasura ', desc: 'a6' },
      { src: 'img/smk.jpg', title: '2 Surakarta', desc: '🥺🥹🥹' },
    ]
  },
  hobi: {
    label : 'Hobi',
    icon  : '🌟',
    color : '#4338ca',
    items : [
      { src: 'img/port-hobi1.jpeg', title: 'Foto Jalan',   desc: '' },
      { src: 'img/port-hobi2.jpeg', title: 'Hiking lah',      desc: 'Mt.Bismo'      },
      { src: 'img/port-hobi3.jpeg', title: 'Belajar aesthetic',          desc: 'BI SOLO' },
      { src: 'img/port-hobi4.jpeg', title: 'Hiking lah', desc: 'Mt.Merbabu'     },
    ]
  }
};

Object.keys(galleryData).forEach(key => {
  const el = document.getElementById('count-' + key);
  if (el) el.textContent = galleryData[key].items.length + ' foto';
});

let currentBook = null;
let currentPage = 0;
const perPage   = () => window.innerWidth <= 640 ? 1 : 2;

function activeItems() {
  if (!currentBook) return [];
  return galleryData[currentBook].items;
}
function activeColor() {
  if (!currentBook) return '#1d4ed8';
  return galleryData[currentBook].color;
}

const bookShelf         = document.getElementById('book-shelf');
const galleryPanel      = document.getElementById('gallery-panel');
const galleryPanelTitle = document.getElementById('gallery-panel-title');
const galleryPanelCount = document.getElementById('gallery-panel-count');
const gallerySpread     = document.getElementById('gallery-spread');
const galleryDots       = document.getElementById('gallery-dots');
const galleryPrev       = document.getElementById('gallery-prev');
const galleryNext       = document.getElementById('gallery-next');
const galleryBack       = document.getElementById('gallery-back');

function totalPages() {
  const items = activeItems();
  if (!items.length) return 1;
  return Math.ceil(items.length / perPage());
}

function openBook(key) {
  if (!galleryData[key]) return;
  currentBook = key;
  currentPage = 0;
  const data = galleryData[key];
  galleryPanelTitle.textContent = data.icon + '  ' + data.label;
  galleryPanelTitle.style.color = data.color;
  bookShelf.classList.add('bg-hidden');
  setTimeout(() => {
    galleryPanel.style.display = 'block';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      galleryPanel.classList.add('panel-active');
    }));
    renderSpread(false);
  }, 320);
}

function closeBook() {
  galleryPanel.classList.remove('panel-active');
  setTimeout(() => {
    galleryPanel.style.display = 'none';
    bookShelf.classList.remove('bg-hidden');
    currentBook = null;
  }, 420);
}

function renderSpread(animate) {
  if (!currentBook) return;
  const items    = activeItems();
  const color    = activeColor();
  const pp       = perPage();
  const startIdx = currentPage * pp;
  const pageItems = items.slice(startIdx, startIdx + pp);
  if (items.length === 0) {
    galleryPanelCount.textContent = 'Belum ada foto';
  } else {
    galleryPanelCount.textContent = 'Hal. ' + (currentPage + 1) + ' / ' + totalPages();
  }
  galleryPrev.disabled = currentPage === 0;
  galleryNext.disabled = currentPage >= totalPages() - 1 || items.length === 0;
  if (items.length === 0) {
    gallerySpread.style.gridTemplateColumns = '1fr';
    gallerySpread.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.8rem; padding:3rem 1rem; text-align:center; border:2px dashed rgba(255,255,255,.12); border-radius:14px; min-height:220px;">
        <span style="font-size:2.8rem; opacity:.5;">📷</span>
        <div style="font-family:'Syne',sans-serif; font-weight:800; font-size:1rem; color:rgba(255,255,255,.5);">Album Masih Kosong</div>
        <div style="font-size:.75rem; color:rgba(255,255,255,.3); max-width:280px; line-height:1.6;">
          Tambahkan foto di <code style="background:rgba(255,255,255,.08); padding:1px 6px; border-radius:4px;">js/main.js</code>
          pada bagian <code style="background:rgba(255,255,255,.08); padding:1px 6px; border-radius:4px;">${currentBook}: { items: [ ... ] }</code>
        </div>
      </div>`;
    galleryDots.innerHTML = '';
    return;
  }
  gallerySpread.style.gridTemplateColumns = pp === 1 ? '1fr' : '1fr 1fr';
  gallerySpread.innerHTML = '';
  pageItems.forEach((item, i) => {
    const pol = document.createElement('div');
    pol.className = 'gallery-polaroid';
    pol.role = 'listitem';
    pol.title = 'Klik untuk perbesar — ' + item.title;
    pol.dataset.cursorLabel = '🔍 Lihat';
    pol.innerHTML = `
      <img src="${item.src}" alt="${item.title}" loading="lazy">
      <div class="gal-placeholder" style="display:none; background:linear-gradient(135deg,${color}28,${color}55);">
        <span style="font-size:2.6rem;">${galleryData[currentBook].icon}</span>
      </div>
      <div class="gallery-polaroid-info">
        <div class="gal-pol-title">${item.title}</div>
        <div class="gal-pol-desc">${item.desc}</div>
      </div>`;
    const img = pol.querySelector('img');
    img.addEventListener('error', () => {
      img.style.display = 'none';
      pol.querySelector('.gal-placeholder').style.display = 'flex';
    });
    pol.addEventListener('mouseenter', () => {
      document.body.classList.add('hovering');
      if (cursorLabel) cursorLabel.textContent = '🔍';
    });
    pol.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering');
      if (cursorLabel) cursorLabel.textContent = '';
    });
    pol.addEventListener('click', () => {
      if (img.style.display !== 'none') openLightbox(item.src);
    });
    const baseRot = i % 2 === 0 ? 'rotate(-2deg)' : 'rotate(1.5deg) translateY(10px)';
    pol.style.opacity = '0';
    pol.style.transform = `${baseRot} translateY(24px)`;
    pol.style.transition = `opacity .38s ${i * 90}ms ease, transform .38s ${i * 90}ms cubic-bezier(.16,1,.3,1), box-shadow .3s ease`;
    gallerySpread.appendChild(pol);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      pol.style.opacity = '1';
      pol.style.transform = baseRot;
    }));
    pol.addEventListener('mouseenter', () => {
      pol.style.transform = 'rotate(0deg) scale(1.05) translateY(-10px)';
      pol.style.zIndex = '10';
    });
    pol.addEventListener('mouseleave', () => {
      pol.style.transform = baseRot;
      pol.style.zIndex = '';
    });
  });
  galleryDots.innerHTML = '';
  const total = totalPages();
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'g-dot' + (i === currentPage ? ' g-dot-active' : '');
    dot.style.background = i === currentPage ? color : '';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Halaman ' + (i + 1));
    dot.setAttribute('aria-selected', i === currentPage ? 'true' : 'false');
    dot.addEventListener('click', () => goToPage(i));
    galleryDots.appendChild(dot);
  }
}

function goToPage(page) {
  if (!currentBook || page === currentPage) return;
  const dir = page > currentPage ? 1 : -1;
  gallerySpread.style.transition = 'opacity .22s ease, transform .22s ease';
  gallerySpread.style.opacity = '0';
  gallerySpread.style.transform = `translateX(${dir * 38}px)`;
  setTimeout(() => {
    currentPage = page;
    gallerySpread.style.transition = 'none';
    gallerySpread.style.transform = `translateX(${-dir * 38}px)`;
    renderSpread(true);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      gallerySpread.style.transition = 'opacity .34s cubic-bezier(.16,1,.3,1), transform .34s cubic-bezier(.16,1,.3,1)';
      gallerySpread.style.opacity = '1';
      gallerySpread.style.transform = 'translateX(0)';
    }));
  }, 220);
}

galleryPrev?.addEventListener('click', () => {
  if (currentPage > 0) goToPage(currentPage - 1);
});
galleryNext?.addEventListener('click', () => {
  if (currentBook && currentPage < totalPages() - 1) goToPage(currentPage + 1);
});
galleryBack?.addEventListener('click', closeBook);

document.querySelectorAll('.book-album').forEach(book => {
  book.addEventListener('click', () => openBook(book.dataset.book));
  book.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBook(book.dataset.book); }
  });
  book.dataset.cursorLabel = '📖 Buka';
});

document.addEventListener('keydown', e => {
  if (!currentBook) return;
  if (document.querySelector('.lightbox.active')) return;
  if (e.key === 'ArrowRight' && currentPage < totalPages() - 1) {
    goToPage(currentPage + 1);
  } else if (e.key === 'ArrowLeft' && currentPage > 0) {
    goToPage(currentPage - 1);
  } else if (e.key === 'Escape') {
    closeBook();
  }
});

let touchStartX = 0;
gallerySpread?.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
gallerySpread?.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) < 48) return;
  if (diff > 0 && currentBook && currentPage < totalPages() - 1) goToPage(currentPage + 1);
  else if (diff < 0 && currentPage > 0) goToPage(currentPage - 1);
}, { passive: true });

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (currentBook) {
      const max = totalPages() - 1;
      if (currentPage > max) currentPage = max;
      renderSpread(false);
    }
  }, 250);
}, { passive: true });

/* ════════════════════════════════
   LIGHTBOX
   ════════════════════════════════ */
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `<button class="lightbox-close">×</button><img class="lightbox-img" src="" alt="Preview">`;
document.body.appendChild(lightbox);
const lightboxImg   = lightbox.querySelector('.lightbox-img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
});
const oldModal = document.getElementById('modal-bg');
if (oldModal) oldModal.remove();

/* ════════════════════════════════
   CONTACT FORM
   ════════════════════════════════ */
document.getElementById('contact-form')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn  = this.querySelector('button[type=submit]');
  const orig = btn.innerHTML;
  const action = this.action;
  if (!this.nama.value.trim() || !this.email.value.trim() || !this.pesan.value.trim()) {
    showToast('Isi dulu ya semua field! ✏️');
    return;
  }
  btn.innerHTML = '⏳ Mengirim...';
  btn.disabled  = true;
  if (!action || action.includes('xxxxxxxx') || action.endsWith('#')) {
    setTimeout(() => {
      btn.innerHTML = '✓ Terkirim!';
      showToast('Pesan terkirim! (demo mode) 🎉');
      this.reset();
      setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 2500);
    }, 1000);
    return;
  }
  try {
    const res = await fetch(action, {
      method: 'POST',
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      btn.innerHTML = '✓ Terkirim!';
      showToast('Pesan berhasil dikirim! Terima kasih 🎉');
      this.reset();
      setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 3000);
    } else {
      const data = await res.json().catch(() => ({}));
      const errMsg = data?.errors?.map(e => e.message).join(', ') || 'Gagal kirim';
      throw new Error(errMsg);
    }
  } catch (err) {
    btn.innerHTML = '✗ Gagal, buka email?';
    showToast('Gagal kirim. Membuka email cadangan...');
    const nama  = encodeURIComponent(this.nama.value);
    const pesan = encodeURIComponent(this.pesan.value);
    setTimeout(() => {
      window.location.href = `mailto:valdiofarel28@gmail.com?subject=Portfolio%20Pesan%20dari%20${nama}&body=${pesan}`;
    }, 1000);
    setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 3000);
  }
});

function showToast(msg) {
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 4000);
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const s1 = document.querySelector('.shape-1'), s2 = document.querySelector('.shape-2');
  if (s1) s1.style.transform = `translateY(${y*0.15}px)`;
  if (s2) s2.style.transform = `translateY(${-y*0.1}px)`;
}, { passive: true });

const bgShapes = document.querySelector('.bg-shapes');
if (bgShapes && !bgShapes.querySelector('.shape-4')) {
  const s4 = document.createElement('div'); s4.className='shape shape-4'; bgShapes.appendChild(s4);
}
