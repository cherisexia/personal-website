document.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  window.scrollTo(0, 0);
  const yearEl = document.getElementById('year');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const accessForm = document.getElementById('access-form');
  const accessAnswer = document.getElementById('access-answer');
  const accessFeedback = document.getElementById('access-feedback');
  const personalContent = document.getElementById('personal-content');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (menuToggle && navLinks) {
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
  }

  if (accessForm && accessAnswer && accessFeedback && personalContent) {
    const setAccessFeedback = (message, type) => {
      accessFeedback.textContent = message;
      accessFeedback.classList.remove('success', 'error');
      accessFeedback.classList.add(type);
    };

    accessForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const answer = accessAnswer.value.trim().toLowerCase();

      if (!answer) {
        setAccessFeedback('Please enter an answer first.', 'error');
        return;
      }

      if (answer === 'friends') {
        personalContent.hidden = false;
        personalContent.classList.remove('is-hidden');
        setAccessFeedback('Access granted — welcome to the personal page.', 'success');
        accessAnswer.value = '';
        return;
      }

      setAccessFeedback('That is not it — try again.', 'error');
    });
  }
});
