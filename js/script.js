/* ════════════════════════════════════════
   FAADHIL DIGITAL — script.js
════════════════════════════════════════ */
'use strict';

/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
(function animTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx + 'px';
  trail.style.top  = ty + 'px';
  requestAnimationFrame(animTrail);
})();

document.querySelectorAll('a,button,.lyr-card,.why-card,.hcard,.pcard,.hasil-card,.tech-item').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hov'); trail.classList.add('hov'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hov'); trail.classList.remove('hov'); });
});
document.addEventListener('mouseleave', () => { cursor.style.opacity='0'; trail.style.opacity='0'; });
document.addEventListener('mouseenter', () => { cursor.style.opacity='1'; trail.style.opacity='1'; });

/* ── Scroll Reveal ── */
const rvEls = document.querySelectorAll('.rv');
const rvObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      rvObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -44px 0px' });
rvEls.forEach(el => rvObs.observe(el));

/* Hero fires on load */
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .rv').forEach(el => {
    const d = parseFloat(getComputedStyle(el).getPropertyValue('--d') || '0');
    setTimeout(() => el.classList.add('on'), d * 1000 + 100);
  });
});

/* ── Nav Scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('on', window.scrollY > 50);
}, { passive: true });

/* ── Hamburger ── */
const burger = document.getElementById('burger');
const mob    = document.getElementById('mob');
const bSpans = burger.querySelectorAll('span');

burger.addEventListener('click', () => {
  const open = mob.classList.toggle('on');
  bSpans[0].style.transform = open ? 'rotate(45deg) translate(4px,4px)' : '';
  bSpans[1].style.opacity   = open ? '0' : '';
  bSpans[2].style.transform = open ? 'rotate(-45deg) translate(4px,-4px)' : '';
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.mob-a').forEach(a => {
  a.addEventListener('click', () => {
    mob.classList.remove('on');
    bSpans.forEach(s => { s.style.transform=''; s.style.opacity=''; });
    document.body.style.overflow = '';
  });
});

/* ── Smooth Scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
  });
});

/* ── FAQ Accordion ── */
document.querySelectorAll('.faq').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq.open').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

/* ── Card Tilt ── */
function tilt(sel, s) {
  document.querySelectorAll(sel).forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      c.style.transform = `perspective(900px) rotateX(${-y*s}deg) rotateY(${x*s}deg) translateY(-4px)`;
    });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });
}
tilt('.lyr-card', 3);
tilt('.why-card', 3);
tilt('.pcard', 2);

/* ── Parallax Orbs ── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const o1 = document.querySelector('.o1');
  const o2 = document.querySelector('.o2');
  if (o1) o1.style.transform = `translateY(${y * .12}px)`;
  if (o2) o2.style.transform = `translateY(${-y * .08}px)`;
}, { passive: true });

/* ── Active Nav Link ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nl');
const aObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const al = document.querySelector(`.nl[href="#${e.target.id}"]`);
      if (al) al.classList.add('active');
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => aObs.observe(s));

/* ── WA Float: hide on CTA section ── */
const waFloat = document.getElementById('waFloat');
const ctaSec  = document.getElementById('cta');
if (ctaSec && waFloat) {
  const waObs = new IntersectionObserver(entries => {
    waFloat.style.opacity = entries[0].isIntersecting ? '0' : '1';
    waFloat.style.pointerEvents = entries[0].isIntersecting ? 'none' : 'auto';
  }, { threshold: 0.3 });
  waObs.observe(ctaSec);
}

/* ── Service Worker ── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/js/sw.js').catch(() => {});
  });
}

/* ── Hasil card: add visit link behavior ── */
document.querySelectorAll('.hasil-card:not(.hasil-soon)').forEach(card => {
  card.style.cursor = 'none';
});