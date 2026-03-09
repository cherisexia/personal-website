document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const contactForm = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  yearEl.textContent = new Date().getFullYear();

  const closeMenu = () => {
    navLinks.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' && navLinks.classList.contains('show')) {
      closeMenu();
    }
  });

  document.addEventListener('click', (event) => {
    const clickedOutsideMenu = !navLinks.contains(event.target) && !menuToggle.contains(event.target);
    if (clickedOutsideMenu && navLinks.classList.contains('show')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('show')) {
      closeMenu();
      menuToggle.focus();
    }
  });

  const setFeedback = (message, type) => {
    feedback.textContent = message;
    feedback.classList.remove('success', 'error');
    feedback.classList.add(type);
  };

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      setFeedback('Please fill in all fields.', 'error');
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setFeedback('Please enter a valid email address.', 'error');
      return;
    }

    setFeedback('Thanks! Your message is ready to send.', 'success');
    contactForm.reset();
  });
});
