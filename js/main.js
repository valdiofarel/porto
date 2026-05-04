'use strict';

/* ══════════════════════════════════════
   FAREL GANTENG — main.js FINAL
   Cursor fix, Lightbox, Form + Fallback
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

/* ═══ CURSOR SYSTEM (visibility fix) ═══ */
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
  const els = [cursor, cursorDot, cursorTrail, cursorLabel];
  els.forEach(el => { if (el) el.style.visibility = visible ? 'visible' : 'hidden'; });
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

document.querySelectorAll('a, button, .btn, .masonry-item, .filter-pill, .skill-card, .contact-chip, .s-dot, .social-btn').forEach(el => {
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
  btn.addEventListener('mouseenter', function(e) {
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
const texts  = ['Pengoprek Jaringan 🌐','Peminum Kopi ☕','Pencinta Kucing 🐱','Belajar HTML/CSS 💻','Tiyang Alit ✨'];
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

/* ─── STAGGER MASONRY ITEMS (THUMBNAILS) ─── */
const masonryGrid = document.getElementById('masonry-grid');
if (masonryGrid) {
  masonryGrid.querySelectorAll('.masonry-item').forEach((item,i) => { item.style.opacity = '0'; item.style.transform = 'translateY(25px) scale(0.96)'; item.style.transition = `opacity 0.55s ease ${i*70}ms, transform 0.55s ease ${i*70}ms`; });
  new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.querySelectorAll('.masonry-item').forEach(item => { item.style.opacity = '1'; item.style.transform = 'translateY(0) scale(1)'; }); } }); }, { threshold: 0.05 }).observe(masonryGrid);
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

/* ─── PORTFOLIO FILTER ─── */
document.querySelectorAll('.filter-pill').forEach(pill => {
  pill.addEventListener('click', function() {
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    this.classList.add('active');
    const cat = this.dataset.filter;
    document.querySelectorAll('.masonry-item').forEach(item => {
      const show = cat==='all' || item.dataset.cat===cat;
      item.style.transition = 'opacity 0.35s cubic-bezier(.16,1,.3,1), transform 0.35s cubic-bezier(.16,1,.3,1)';
      item.style.opacity = show ? '1' : '0.12';
      item.style.transform = show ? 'scale(1)' : 'scale(0.93)';
      item.style.pointerEvents = show ? '' : 'none';
    });
  });
});

/* ─── LIGHTBOX ─── */
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `<button class="lightbox-close">×</button><img class="lightbox-img" src="" alt="Preview">`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('.lightbox-img');
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
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Attach click to masonry items
document.querySelectorAll('.masonry-item').forEach(item => {
  item.addEventListener('click', function(e) {
    if (this.classList.contains('placeholder-mode')) return;
    const fullSrc = this.dataset.full;
    if (fullSrc) openLightbox(fullSrc);
  });
});

// Remove old modal if present
const oldModal = document.getElementById('modal-bg');
if (oldModal) oldModal.remove();

/* ─── CONTACT FORM ─── */
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
    const email = encodeURIComponent(this.email.value);
    const pesan = encodeURIComponent(this.pesan.value);
    setTimeout(() => {
      window.location.href = `mailto:valdiofarel28@gmail.com?subject=Portfolio%20Pesan%20dari%20${nama}&body=${pesan}`;
    }, 1000);
    setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 3000);
  }
});

/* ─── TOAST ─── */
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ─── PARALLAX BG SHAPES ─── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const s1 = document.querySelector('.shape-1'), s2 = document.querySelector('.shape-2');
  if (s1) s1.style.transform = `translateY(${y*0.15}px)`;
  if (s2) s2.style.transform = `translateY(${-y*0.1}px)`;
}, { passive: true });

/* ─── CURSOR LABEL FOR CONTACT CHIPS ─── */
document.querySelectorAll('.contact-chip').forEach(chip => {
  const icon = chip.querySelector('.contact-chip-icon');
  const emoji = icon?.textContent?.trim();
  const labelMap = {'📧':'Email ✉','📸':'Instagram','🐙':'GitHub','📘':'Facebook','🔗':'LinkedIn'};
  chip.dataset.cursorLabel = labelMap[emoji] || 'Visit';
});

/* ─── INJECT MISSING ELEMENTS ─── */
if (!document.getElementById('cursor-dot')) {
  const dot = document.createElement('div'); dot.id='cursor-dot'; document.body.appendChild(dot);
}
const bgShapes = document.querySelector('.bg-shapes');
if (bgShapes && !bgShapes.querySelector('.shape-4')) {
  const s4 = document.createElement('div'); s4.className='shape shape-4'; bgShapes.appendChild(s4);
}