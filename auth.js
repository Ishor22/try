// Simple client-side auth and contact form handler (demo only)
(function () {
  // Login modal controls
  const loginModal = document.getElementById('loginModal');
  const loginForm = document.getElementById('loginForm');
  const loginUser = document.getElementById('loginUser');
  const closeLogin = document.getElementById('closeLogin');

  function openLogin() {
    loginModal.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    loginModal.setAttribute('aria-hidden', 'true');
  }

  // Attach nav login button dynamically (header)
  const loginNav = document.createElement('a');
  loginNav.href = '#';
  loginNav.textContent = 'Login';
  loginNav.addEventListener('click', (e) => {
    e.preventDefault();
    openLogin();
  });
  const nav = document.querySelector('.site-nav');
  if (nav) nav.appendChild(loginNav);

  if (closeLogin) closeLogin.addEventListener('click', closeModal);

  loginForm && loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = loginUser.value.trim();
    if (!username) return;
    // Mock login: store username and redirect to dashboard
    localStorage.setItem('mock_user', JSON.stringify({ username }));
    window.location.href = 'dashboard.html';
  });

  // Contact form handler (mock)
  const contactForm = document.getElementById('contactForm');
  const contactResult = document.getElementById('contactResult');
  contactForm && contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    if (!name || !email || !message) return;
    contactResult.textContent = 'Thanks, ' + name + '. Your message has been received.';
    contactForm.reset();
  });

  // Provide a small helper: if user navigates to /dashboard.html without login, redirect to index
  if (window.location.pathname.endsWith('dashboard.html')) {
    const user = localStorage.getItem('mock_user');
    if (!user) {
      // Redirect to index and open login modal
      window.location.href = 'index.html#login';
    }
  }
})();
