// main.js — Rawat Hospital

// ---------- 1. Mobile Menu ----------
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.querySelector('.mobile-menu__close');
const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

function openMenu() {
  mobileMenu.classList.add('is-open');
  hamburger.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('is-open');
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu();
});

mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) closeMenu();
});

// ---------- 2. Scroll Animations (Intersection Observer) ----------
const animateCards = document.querySelectorAll('.animate-card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

animateCards.forEach(card => cardObserver.observe(card));

// ---------- 3. Treatment "View All" Toggle ----------
const treatmentsToggle = document.getElementById('treatments-toggle');
const hiddenTreatments = document.querySelectorAll('.treatment--hidden');

if (treatmentsToggle) {
  treatmentsToggle.addEventListener('click', () => {
    hiddenTreatments.forEach(card => card.classList.remove('treatment--hidden'));
    treatmentsToggle.closest('.treatments__show-more').style.display = 'none';
  });
}

// ---------- 4. Active Nav Link on Scroll ----------
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('nav__link--active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.3, rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 56}px 0px 0px 0px` });

sections.forEach(section => sectionObserver.observe(section));
