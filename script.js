// ============================================
// GREEN PAPPER — Interactions & Animations
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Nav scroll effect ---
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // --- Mobile menu toggle ---
  const menuBtn = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(10,15,10,0.95)';
      navLinks.style.padding = '24px';
      navLinks.style.gap = '20px';
      navLinks.style.backdropFilter = 'blur(20px)';
      navLinks.style.borderBottom = '1px solid rgba(59,235,122,0.1)';
    });
  }

  // --- Scroll reveal ---
  const revealElements = document.querySelectorAll(
    '.pillar-card, .workflow-step, .feature-card, .cta-inner, .section-header, .integration-item'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const parent = entry.target.parentElement;
        const siblings = parent ? [...parent.querySelectorAll('.reveal')] : [];
        const index = siblings.indexOf(entry.target);
        const delay = index >= 0 ? index * 80 : 0;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // --- Smooth anchor scrolling ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        if (window.innerWidth <= 640) {
          navLinks.style.display = 'none';
        }
      }
    });
  });

  // --- Pillar card tilt on hover ---
  document.querySelectorAll('.pillar-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform = `translateY(-4px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
