export function Navbar() {
    const header = document.createElement('header');
    header.classList.add('main-header');

    header.innerHTML = `
    <nav class="navbar">
        <div id="logo" class="logo"><a href="#hero" aria-label="Ir al inicio">MiLogo</a></div>

        <!-- Botón Hamburguesa (JS debe escuchar el click aquí) -->
        <button class="hamburger-btn" id="nav-toggle" aria-label="Abrir menú">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>

        <!-- Menú de navegación (JS añade/quita la clase 'active') -->
        <ul class="nav-menu" id="nav-menu">
            <li class="nav-item"><a href="#cards" class="nav-link">Tarjetas</a></li>
            <li class="nav-item"><a href="#accordion" class="nav-link">Acordeón</a></li>
            <li class="nav-item"><a href="#gallery" class="nav-link">Galería</a></li>
            <li class="nav-item"><a href="#contact" class="nav-link">Contacto</a></li>
            <li class="nav-item"><a href="#tasks" class="nav-link">Tareas</a></li>
        </ul>
    </nav>
    `;

    setUpMenu(header);

    return header;
}

function setUpMenu(header) {
    const navToggle = header.querySelector('#nav-toggle');
    const navMenu = header.querySelector('#nav-menu');
    const navLinks = header.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}