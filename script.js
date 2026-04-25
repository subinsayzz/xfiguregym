document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     Custom Cursor
     ========================================================================== */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
  });

  /* ==========================================================================
     Header Scroll Effect
     ========================================================================== */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     Mobile Menu Toggle (Simple Toggle)
     ========================================================================== */
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('mobile-open');
      header.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    const navLinks = mainNav.querySelectorAll('.nav-link, .btn-primary');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('mobile-open');
        header.classList.remove('menu-open');
      });
    });
  }

  /* ==========================================================================
     Reveal Animations (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-item');
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});

/* ==========================================================================
   Pricing Toggle Logic
   ========================================================================== */
function togglePricing(membershipType, planType, btnElement) {
  // Update toggle buttons active state
  const parentToggle = btnElement.closest('.pricing-toggle');
  const buttons = parentToggle.querySelectorAll('.toggle-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  // Update prices in the list
  const container = document.getElementById(`${membershipType}-rows`);
  if (!container) return;

  const costElements = container.querySelectorAll('.strike, .cost');
  costElements.forEach(el => {
    if (el.dataset[planType]) {
      el.textContent = el.dataset[planType];
    } else {
      // If no dataset for this plan type, clear the text (e.g. general strike price for 1 month is empty)
      el.textContent = '';
    }
  });
}
