'use strict';

/* ══════════════════════════════════════
   FAREL GANTENG — main.js
   Book Gallery Edition (Pendidikan Tabs)
   ══════════════════════════════════════ */

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

/* ═══ CURSOR SYSTEM ═══ */
const cursor      = document.getElementById('cursor');
const cursorDot   = document.getElementById('cursor-dot');
const cursorTrail = document.getElementById('cursor-trail');
const cursorLabel = document.getElementById('cursor-label') || (() => {
  const el = document.createElement('div'); el.id = 'cursor-label'; document.body.appendChild(el); return el;
})();

let mx = 0, my = 0, trailX = 0, trailY = 0;
let cursorVisible = false;

function setCursorVisibility(visible) {
  cursorVisible = visible;
  [cursor, cursorDot, cursorTrail, cursorLabel].forEach(el => {
    if (el) el.style.visibility = visible ? 'visible' : 'hidden';
  });
}
setCursorVisibility(false);

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor)      { cursor.style.left      = mx + 'px'; cursor.style.top      = my + 'px'; }
  if (cursorDot)   { cursorDot.style.left   = mx + 'px'; cursorDot.style.top   = my + 'px'; }
  if (cursorLabel) { cursorLabel.style.left = mx + 'px'; cursorLabel.style.top = my + 'px'; }
  if (!cursorVisible) setCursorVisibility(true);
});
document.addEventListener('mouseleave', () => setCursorVisibility(false));
document.addEventListener('mouseenter', () => setCursorVisibility(true));

(function animTrail() {
  trailX += (mx - trailX) * 0.12;
  trailY += (my - trailY) * 0.12;
  if (cursorTrail) { cursorTrail.style.left = trailX + 'px'; cursorTrail.style.top = trailY + 'px'; }
  requestAnimationFrame(animTrail);
})();

document.querySelectorAll('a, button, .btn, .book-album, .skill-card, .contact-chip, .s-dot, .social-btn, .gallery-polaroid').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('hovering');
    const label = el.dataset.cursorLabel || '';
    if (cursorLabel) cursorLabel.textContent = label;
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('hovering');
    if (cursorLabel) cursorLabel.textContent = '';
  });
});

document.addEventListener('mousedown', () => document.body.classList.add('clicking'));
document.addEventListener('mouseup',   () => document.body.classList.remove('clicking'));
document.addEventListener('click', spawnSparkles);
function spawnSparkles(e) {
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
}

let lastTrailTime = 0;
document.addEventListener('mousemove', e => {
  const now = Date.now();
  if (now - lastTrailTime < 90) return;
  lastTrailTime = now;
  const dot = document.createElement('div');
  dot.style.cssText = `position:fixed;pointer-events:none;z-index:9996;width:4px;height:4px;border-radius:50%;background:rgba(59,53,212,0.25);left:${e.clientX}px;top:${e.clientY}px;transform:translate(-50%,-50%);transition:opacity 0.5s;`;
  document.body.appendChild(dot);
  requestAnimationFrame(() => { dot.style.opacity = '0'; });
  setTimeout(() => dot.remove(), 600);
}, { passive: true });

document.querySelectorAll('.btn-grad').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.18}px,${(e.clientY-r.top-r.height/2)*0.25}px) translateY(-3px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

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
const texts  = ['Kata kata hari ini','Hwaiting!','اِنَّ مَعَ الْعُسْرِ يُسْرًاۗ','Acta non verba','Pluk de dag'];
let ti=0, ci=0, deleting=false;
function typeLoop() {
  if (!typeEl) return;
  const full = texts[ti];
  typeEl.textContent = deleting ? full.slice(0,ci--) : full.slice(0,ci++);
  let speed = deleting ? 40 : 85;
  if (!deleting && ci > full.length) { speed = 1600; deleting = true; }
  if (deleting && ci < 0) { deleting = false; ti = (ti+1)%texts.length; speed = 350; }
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
   ═══════════════════════════════════════════════════

   PANDUAN UPDATE FOTO (simpan panduan ini untuk kamu sendiri):

   ① TAMBAH FOTO ke album yang ada:
      Cari albumnya di bawah (mis. hobi: { ... })
      Tambahkan baris baru di dalam items: [ ... ]:
      { src: 'img/namafile.jpg', title: '...', desc: '...' },
      Taruh file foto di folder img/

   ② UNTUK PENDIDIKAN (SD/SMP/SMA):
      Masing-masing punya items sendiri di dalam:
        pendidikan.tabs.sd.items  → foto SD
        pendidikan.tabs.smp.items → foto SMP
        pendidikan.tabs.sma.items → foto SMA

   ③ TAMBAH ALBUM BARU (mis. "Kuliah"):
      1. Copy blok album (mis. hobi: { ... }) di bawah
      2. Ganti key-nya: kuliah: { label: 'Kuliah', icon: '🎓', ... }
      3. Di index.html, duplikat <div class="book-album-wrap">
         lalu ganti data-book="kuliah" dan id="count-kuliah"
      4. Tambah warna buku di CSS index.html:
         .book-album[data-book="kuliah"] { --book-bg: ...; --book-spine: ...; }

   ④ UBAH FOTO: ganti nilai src dengan nama file baru
*/

/* ── Data foto per kategori ── */
const galleryData = {

  /* ── PROYEK ──────────────────────────────────────────────── */
  proyek: {
    label : 'Proyek',
    icon  : '🔧',
    color : '#1d4ed8',
    items : [
      { src: 'img/port-proyek1.jpeg', title: 'TUGAS AKHIR',   desc: 'Konfigurasi Mikrotik' },
      { src: 'img/port-proyek2.png',  title: 'Hasil akhir',  desc: 'Hasil akhir praktik tugas akhir' },
      { src: 'img/monitoring1.jpeg',  title: 'Monitoring Jaringan',  desc: 'Monitoring Jaringan Saat PKL'  },
      /* Tambah proyek baru di sini:
      { src: 'img/port-proyek3.jpg', title: 'Nama Proyek', desc: 'Deskripsi singkat' },
      */
    ]
  },

  /* ── PENDIDIKAN ─────────────────────────────────────────── */
  pendidikan: {
    label : 'Pendidikan',
    icon  : '🎓',
    color : '#f59e0b',
    items : [
      { src: 'img/sd.jpg', title: 'Ngadirejo 1', desc: 'haha lali kabeh' },
      { src: 'img/smp.jpg', title: '1 Kartasura ', desc: 'a6' },
      { src: 'img/smk.jpg', title: '2 Surakarta', desc: '🥺🥹🥹' },
      /* Tambah foto kenangan sekolah di sini:
      { src: 'img/sd-wisuda.jpg',    title: 'Wisuda SD',    desc: 'Lulus dengan bangga'  },
      { src: 'img/smp-kelas.jpg',    title: 'Foto Kelas',   desc: 'Kelas 9 terbaik'      },
      { src: 'img/sma-lulus.jpg',    title: 'Kelulusan',    desc: 'Akhirnya lulus!'       },
      */
    ]
  },

  /* ── HOBI ────────────────────────────────────────────────── */
  hobi: {
    label : 'Hobi',
    icon  : '🌟',
    color : '#4338ca',
    items : [
      { src: 'img/port-hobi1.jpeg', title: 'Foto Jalan',   desc: '' },
      { src: 'img/port-hobi2.jpeg', title: 'Hiking lah',      desc: 'Mt.Bismo'      },
      { src: 'img/port-hobi3.jpeg', title: 'Belajar aesthetic',          desc: 'BI SOLO' },
      { src: 'img/port-hobi4.jpeg', title: 'Hiking lah', desc: 'Mt.Merbabu'     },
      /* Tambah hobi baru di sini:
      { src: 'img/hobi-baru.jpg', title: 'Judul Hobi', desc: 'Deskripsi' },
      */
    ]
  }

  /* Salin blok ini untuk album baru:
  ,namaBaru: {
    label : 'Nama Album',
    icon  : '📷',
    color : '#2563eb',
    items : [
      { src: 'img/foto1.jpg', title: 'Judul Foto', desc: 'Deskripsi' },
    ]
  }
  */
};

/* Update jumlah foto di sampul buku */
Object.keys(galleryData).forEach(key => {
  const el = document.getElementById('count-' + key);
  if (el) el.textContent = galleryData[key].items.length + ' foto';
});

/* ── State ── */
let currentBook = null;
let currentPage = 0;
const perPage   = () => window.innerWidth <= 640 ? 1 : 2;

/* ── Helpers ── */
function activeItems() {
  if (!currentBook) return [];
  return galleryData[currentBook].items;
}
function activeColor() {
  if (!currentBook) return '#1d4ed8';
  return galleryData[currentBook].color;
}

/* ── Elemen ── */
const bookShelf         = document.getElementById('book-shelf');
const galleryPanel      = document.getElementById('gallery-panel');
const galleryPanelTitle = document.getElementById('gallery-panel-title');
const galleryPanelCount = document.getElementById('gallery-panel-count');
const gallerySpread     = document.getElementById('gallery-spread');
const galleryDots       = document.getElementById('gallery-dots');
const galleryPrev       = document.getElementById('gallery-prev');
const galleryNext       = document.getElementById('gallery-next');
const galleryBack       = document.getElementById('gallery-back');

/* ── Hitung total halaman ── */
function totalPages() {
  const items = activeItems();
  if (!items.length) return 1;
  return Math.ceil(items.length / perPage());
}

/* ── Buka album ── */
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

/* ── Tutup album ── */
function closeBook() {
  galleryPanel.classList.remove('panel-active');
  setTimeout(() => {
    galleryPanel.style.display = 'none';
    bookShelf.classList.remove('bg-hidden');
    currentBook = null;
  }, 420);
}

/* ── Render spread (2 atau 1 foto per halaman) ── */
function renderSpread(animate) {
  if (!currentBook) return;

  const items    = activeItems();
  const color    = activeColor();
  const pp       = perPage();
  const startIdx = currentPage * pp;
  const pageItems = items.slice(startIdx, startIdx + pp);

  /* Update header count */
  if (items.length === 0) {
    galleryPanelCount.textContent = 'Belum ada foto';
  } else {
    galleryPanelCount.textContent = 'Hal. ' + (currentPage + 1) + ' / ' + totalPages();
  }

  /* Update nav buttons */
  galleryPrev.disabled = currentPage === 0;
  galleryNext.disabled = currentPage >= totalPages() - 1 || items.length === 0;

  /* Empty state */
  if (items.length === 0) {
    gallerySpread.style.gridTemplateColumns = '1fr';
    gallerySpread.innerHTML = `
      <div style="
        display:flex; flex-direction:column; align-items:center; justify-content:center;
        gap:.8rem; padding:3rem 1rem; text-align:center;
        border:2px dashed rgba(255,255,255,.12); border-radius:14px;
        min-height:220px;
      ">
        <span style="font-size:2.8rem; opacity:.5;">📷</span>
        <div style="font-family:'Syne',sans-serif; font-weight:800; font-size:1rem; color:rgba(255,255,255,.5);">
          Album Masih Kosong
        </div>
        <div style="font-size:.75rem; color:rgba(255,255,255,.3); max-width:280px; line-height:1.6;">
          Tambahkan foto di
          <code style="background:rgba(255,255,255,.08); padding:1px 6px; border-radius:4px;">js/main.js</code>
          pada bagian
          <code style="background:rgba(255,255,255,.08); padding:1px 6px; border-radius:4px;">${currentBook}: { items: [ ... ] }</code>
        </div>
      </div>
    `;
    galleryDots.innerHTML = '';
    return;
  }

  gallerySpread.style.gridTemplateColumns = pp === 1 ? '1fr' : '1fr 1fr';
  gallerySpread.innerHTML = '';

  pageItems.forEach((item, i) => {
    const pol = document.createElement('div');
    pol.className  = 'gallery-polaroid';
    pol.role       = 'listitem';
    pol.title      = 'Klik untuk perbesar — ' + item.title;
    pol.dataset.cursorLabel = '🔍 Lihat';

    pol.innerHTML = `
      <img src="${item.src}" alt="${item.title}" loading="lazy">
      <div class="gal-placeholder" style="display:none; background:linear-gradient(135deg,${color}28,${color}55);">
        <span style="font-size:2.6rem;">${galleryData[currentBook].icon}</span>
      </div>
      <div class="gallery-polaroid-info">
        <div class="gal-pol-title">${item.title}</div>
        <div class="gal-pol-desc">${item.desc}</div>
      </div>
    `;

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
    pol.style.opacity    = '0';
    pol.style.transform  = `${baseRot} translateY(24px)`;
    pol.style.transition = `opacity .38s ${i * 90}ms ease, transform .38s ${i * 90}ms cubic-bezier(.16,1,.3,1), box-shadow .3s ease`;

    gallerySpread.appendChild(pol);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      pol.style.opacity   = '1';
      pol.style.transform = baseRot;
    }));

    pol.addEventListener('mouseenter', () => {
      pol.style.transform = 'rotate(0deg) scale(1.05) translateY(-10px)';
      pol.style.zIndex    = '10';
    });
    pol.addEventListener('mouseleave', () => {
      pol.style.transform = baseRot;
      pol.style.zIndex    = '';
    });
  });

  /* Render dot indicators */
  galleryDots.innerHTML = '';
  const total = totalPages();
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className        = 'g-dot' + (i === currentPage ? ' g-dot-active' : '');
    dot.style.background = i === currentPage ? color : '';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Halaman ' + (i + 1));
    dot.setAttribute('aria-selected', i === currentPage ? 'true' : 'false');
    dot.addEventListener('click', () => goToPage(i));
    galleryDots.appendChild(dot);
  }
}

/* ── Navigasi halaman ── */
function goToPage(page) {
  if (!currentBook || page === currentPage) return;

  const dir = page > currentPage ? 1 : -1;

  gallerySpread.style.transition = 'opacity .22s ease, transform .22s ease';
  gallerySpread.style.opacity    = '0';
  gallerySpread.style.transform  = `translateX(${dir * 38}px)`;

  setTimeout(() => {
    currentPage = page;

    gallerySpread.style.transition = 'none';
    gallerySpread.style.transform  = `translateX(${-dir * 38}px)`;

    renderSpread(true);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      gallerySpread.style.transition = 'opacity .34s cubic-bezier(.16,1,.3,1), transform .34s cubic-bezier(.16,1,.3,1)';
      gallerySpread.style.opacity    = '1';
      gallerySpread.style.transform  = 'translateX(0)';
    }));
  }, 220);
}

/* ── Event listeners navigasi ── */
galleryPrev?.addEventListener('click', () => {
  if (currentPage > 0) goToPage(currentPage - 1);
});
galleryNext?.addEventListener('click', () => {
  if (currentBook && currentPage < totalPages() - 1) goToPage(currentPage + 1);
});
galleryBack?.addEventListener('click', closeBook);

/* ── Buku diklik ── */
document.querySelectorAll('.book-album').forEach(book => {
  book.addEventListener('click',   () => openBook(book.dataset.book));
  book.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBook(book.dataset.book); }
  });
  book.dataset.cursorLabel = '📖 Buka';
});

/* ── Keyboard navigation ── */
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

/* ── Touch/swipe support ── */
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

/* ── Re-render saat resize ── */
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

/* ── TOAST ── */
function showToast(msg) {
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── PARALLAX BG SHAPES ── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const s1 = document.querySelector('.shape-1'), s2 = document.querySelector('.shape-2');
  if (s1) s1.style.transform = `translateY(${y*0.15}px)`;
  if (s2) s2.style.transform = `translateY(${-y*0.1}px)`;
}, { passive: true });

/* ── CURSOR LABEL FOR CONTACT CHIPS ── */
document.querySelectorAll('.contact-chip').forEach(chip => {
  const icon = chip.querySelector('.contact-chip-icon');
  const emoji = icon?.textContent?.trim();
  const labelMap = {'📧':'Email ✉','📸':'Instagram','🐙':'GitHub','📘':'Facebook','🔗':'LinkedIn'};
  chip.dataset.cursorLabel = labelMap[emoji] || 'Visit';
});

/* ── INJECT MISSING ELEMENTS ── */
if (!document.getElementById('cursor-dot')) {
  const dot = document.createElement('div'); dot.id='cursor-dot'; document.body.appendChild(dot);
}
const bgShapes = document.querySelector('.bg-shapes');
if (bgShapes && !bgShapes.querySelector('.shape-4')) {
  const s4 = document.createElement('div'); s4.className='shape shape-4'; bgShapes.appendChild(s4);
}
