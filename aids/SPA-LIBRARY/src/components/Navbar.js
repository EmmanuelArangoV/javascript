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
                <!-- Los items ocultos usan el atributo 'hidden' nativo -->
                <ul class="navbar__menu" id="nav-links-list" hidden>
                    <li class="navbar__item"><a href="#dashboard" class="navbar__link">Inicio</a></li>
                    <li class="navbar__item"><a href="#catalog" class="navbar__link">Catálogo</a></li>
                    <li class="navbar__item"><a href="#my-reservations" class="navbar__link">Mis reservas</a></li>
                    
                    <!-- Enlaces solo para bibliotecarios -->
                    <li class="navbar__item" data-role="librarian-only" hidden>
                        <a href="#dashboard/books" class="navbar__link">Gestión libros</a>
                    </li>
                    <li class="navbar__item" data-role="librarian-only" hidden>
                        <a href="#dashboard/reservations" class="navbar__link">Reservas admin</a>
                    </li>
                </ul>

                <div class="navbar__actions">
                    <!-- Botones para Invitados -->
                    <a href="#login" class="navbar__button navbar__button--outline auth-guest">Iniciar sesión</a>
                    <a href="#register" class="navbar__button navbar__button--primary auth-guest">Registrarse</a>
                    
                    <!-- Botón para Usuarios -->
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

    // Menú Móvil
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', String(isActive));
        });
        navLinks.forEach(link => link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }));
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
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
    const librarianItems = header.querySelectorAll('[data-role="librarian-only"]');

    let currentUser = null;
    try {
        currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    } catch { currentUser = null; }

    const isLoggedIn = currentUser && currentUser.isLoggedIn === true;
    const userRole = currentUser ? currentUser.role : null;

    // Función auxiliar para simplificar la visibilidad
    const setHidden = (elements, isHidden) => {
        elements.forEach(el => el.hidden = isHidden);
    };

    if (isLoggedIn) {
        // === LOGIN ===
        if (linksList) linksList.hidden = false;

        setHidden(guestElements, true);
        setHidden(userElements, false);

        librarianItems.forEach(item => {
            item.hidden = (userRole !== 'librarian');
        });

    } else {
        // === LOGOUT / INVITADO ===
        if (linksList) linksList.hidden = true;

        setHidden(guestElements, false);
        setHidden(userElements, true);

        librarianItems.forEach(item => item.hidden = true);
    }
}
