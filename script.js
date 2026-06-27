(function () {
  'use strict';
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');
  const links   = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 90) cur = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle && toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    navMenu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  links.forEach(l => l.addEventListener('click', () => {
    toggle && toggle.classList.remove('open');
    navMenu && navMenu.classList.remove('open');
  }));

  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), e.target.dataset.delay || 0);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Stagger children in grids
  document.querySelectorAll('.expertise-grid, .projects-grid, .cert-grid').forEach(parent => {
    parent.querySelectorAll('.reveal').forEach((c, i) => { c.dataset.delay = i * 70; });
  });
  document.querySelectorAll('.publications-list .reveal, .timeline .reveal').forEach((el, i) => {
    el.dataset.delay = i * 55;
  });

  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
