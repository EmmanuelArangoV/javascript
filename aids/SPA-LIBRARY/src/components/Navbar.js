import { getStore, logout, isAuth, getRole } from '../state/store.js';

export function Navbar() {
    const header = document.createElement('header');
    header.classList.add('main-header');

    header.innerHTML = `
        <nav class="navbar" aria-label="Navegación principal">
            <div class="navbar__brand">
                <a href="#dashboard" class="navbar__logo">
                    <span class="navbar__logo-icon" aria-hidden="true">📚</span>
                    <span class="navbar__logo-text">Biblioteca SPA</span>
                </a>
            </div>

            <button class="navbar__toggle" id="nav-toggle" aria-label="Abrir menú" aria-expanded="false">
                <span class="navbar__toggle-bar"></span>
                <span class="navbar__toggle-bar"></span>
                <span class="navbar__toggle-bar"></span>
            </button>

            <div class="navbar__menu-container" id="nav-menu">
                <ul class="navbar__menu" id="nav-links-list" hidden>
                    <li class="navbar__item">
                        <a href="#dashboard" class="navbar__link">Inicio</a>
                    </li>
                    <li class="navbar__item">
                        <a href="#loans" class="navbar__link">Reservas</a>
                    </li>
                </ul>

                <div class="navbar__actions">
                    <!-- Invitado -->
                    <a href="#login" class="navbar__button navbar__button--outline auth-guest">Iniciar sesión</a>
                    <a href="#register" class="navbar__button navbar__button--primary auth-guest">Registrarse</a>

                    <!-- Usuario logueado -->
                    <button id="navbar-logout-btn" class="navbar__button navbar__button--outline auth-user" hidden>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </nav>
    `;

    setUpNavbarLogic(header);
    return header;
}

function setUpNavbarLogic(header) {
    const navToggle = header.querySelector('#nav-toggle');
    const navMenu = header.querySelector('#nav-menu');
    const navLinks = header.querySelectorAll('.navbar__link');
    const logoutBtn = header.querySelector('#navbar-logout-btn');

    // Menú móvil
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', String(isActive));
        });

        navLinks.forEach(link =>
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            })
        );
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logout();
            window.location.hash = '#login';
            applySessionState(header);
        });
    }

    applySessionState(header);
}

function applySessionState(header) {
    const linksList = header.querySelector('#nav-links-list');
    const guestElements = header.querySelectorAll('.auth-guest');
    const userElements = header.querySelectorAll('.auth-user');

    const loggedIn = isAuth();
    const store = getStore();
    const userRole = getRole();

    const setHidden = (elements, isHidden) => {
        elements.forEach(el => {
            el.hidden = isHidden;
        });
    };

    if (loggedIn) {
        if (linksList) linksList.hidden = false;

        setHidden(guestElements, true);
        setHidden(userElements, false);
    } else {
        if (linksList) linksList.hidden = true;

        setHidden(guestElements, false);
        setHidden(userElements, true);
    }
}
