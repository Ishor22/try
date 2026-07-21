const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-links a');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const marketplaceSearchForm = document.getElementById('marketplace-search-form');
const marketplaceSearchInput = document.getElementById('marketplace-search');
const gigGrid = document.getElementById('gig-grid');
const categoryCards = document.querySelectorAll('.category-card');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navLinks.classList.toggle('open');
    });
}

navLinkItems.forEach((link) => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

function filterGigs(query, category) {
    const gigs = document.querySelectorAll('.gig-card');
    gigs.forEach((gig) => {
        const title = gig.dataset.title.toLowerCase();
        const gigCategory = gig.dataset.category.toLowerCase();
        const matchesQuery = !query || title.includes(query) || gigCategory.includes(query);
        const matchesCategory = !category || gigCategory === category;
        gig.style.display = matchesQuery && matchesCategory ? 'block' : 'none';
    });
}

if (marketplaceSearchForm) {
    marketplaceSearchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = marketplaceSearchInput.value.trim().toLowerCase();
        filterGigs(query, '');
    });
}

categoryCards.forEach((card) => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        filterGigs('', category);
        categoryCards.forEach((item) => item.classList.remove('selected'));
        card.classList.add('selected');
    });
});

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = 'Please complete all fields before sending.';
            return;
        }

        const signup = {
            name,
            email,
            message,
            createdAt: new Date().toISOString(),
        };

        const signups = JSON.parse(localStorage.getItem('taskHiveSignups') || '[]');
        signups.push(signup);
        localStorage.setItem('taskHiveSignups', JSON.stringify(signups));

        formStatus.textContent = 'Thanks! Your request has been recorded.';
        contactForm.reset();
    });
}

const adminPage = document.body.dataset.page === 'admin';
if (adminPage) {
    const ADMIN_PASSWORD = 'Aurora2026!';
    const loginForm = document.getElementById('admin-login-form');
    const adminStatus = document.getElementById('admin-status');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const logoutButton = document.getElementById('logout-button');
    const signupCount = document.getElementById('signup-count');
    const signupList = document.getElementById('signup-list');
    const contentForm = document.getElementById('content-form');
    const clearSignupsButton = document.getElementById('clear-signups');
    const heroTagline = document.getElementById('hero-tagline');
    const heroTitle = document.getElementById('hero-title');
    const heroDescription = document.getElementById('hero-description');
    const bookButton = document.getElementById('book-button');
    const trailerButton = document.getElementById('trailer-button');

    function loadSignups() {
        const signups = JSON.parse(localStorage.getItem('taskHiveSignups') || '[]');
        signupCount.textContent = signups.length;
        signupList.innerHTML = '';

        signups.forEach((signup) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${signup.name}</td>
                <td>${signup.email}</td>
                <td>${signup.message}</td>
                <td>${new Date(signup.createdAt).toLocaleString()}</td>
            `;
            signupList.appendChild(row);
        });
    }

    function loadHeroContent() {
        const content = JSON.parse(localStorage.getItem('taskHiveHero') || 'null');
        if (content) {
            heroTagline.value = content.tagline;
            heroTitle.value = content.title;
            heroDescription.value = content.description;
            bookButton.value = content.bookText;
            trailerButton.value = content.trailerText;
        } else {
            heroTagline.value = 'Hire trusted freelance talent';
            heroTitle.value = 'Find professionals for every project.';
            heroDescription.value = 'TaskHive connects businesses and teams with expert freelancers for design, development, marketing, writing, and long-term collaboration.';
            bookButton.value = 'Browse talent';
            trailerButton.value = 'Post a job';
        }
    }

    function toggleDashboard(isAuthenticated) {
        loginSection.classList.toggle('hidden', isAuthenticated);
        dashboardSection.classList.toggle('hidden', !isAuthenticated);
    }

    function isAuthenticated() {
        return sessionStorage.getItem('taskHiveAdminAuth') === 'true';
    }

    if (isAuthenticated()) {
        toggleDashboard(true);
        loadSignups();
        loadHeroContent();
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const password = loginForm['admin-password'].value;
            if (password === ADMIN_PASSWORD) {
                sessionStorage.setItem('taskHiveAdminAuth', 'true');
                adminStatus.textContent = 'Login successful.';
                toggleDashboard(true);
                loadSignups();
                loadHeroContent();
                loginForm.reset();
            } else {
                adminStatus.textContent = 'Invalid password. Please try again.';
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('taskHiveAdminAuth');
            toggleDashboard(false);
        });
    }

    if (contentForm) {
        contentForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const heroContent = {
                tagline: heroTagline.value.trim(),
                title: heroTitle.value.trim(),
                description: heroDescription.value.trim(),
                bookText: bookButton.value.trim(),
                trailerText: trailerButton.value.trim(),
            };
            localStorage.setItem('taskHiveHero', JSON.stringify(heroContent));
            adminStatus.textContent = 'Hero content updated successfully.';
        });
    }

    if (clearSignupsButton) {
        clearSignupsButton.addEventListener('click', () => {
            localStorage.removeItem('taskHiveSignups');
            loadSignups();
        });
    }
}
