// javascript
export function Footer() {
    const footer = document.createElement('footer');
    footer.classList.add('main-footer', 'animate-fade-in');

    const currentYear = new Date().getFullYear();

    footer.innerHTML = `
        <div class="footer-container">
            <!-- Sección Izquierda: Marca -->
            <div class="footer-brand">
                <span class="footer-icon" aria-hidden="true">📚</span>
                <span class="footer-title">Biblioteca SPA</span>
            </div>

            <!-- Sección Central: Copyright -->
            <div class="footer-copy">
                <p>&copy; ${currentYear} Todos los derechos reservados.</p>
                <small>Diseñado con ❤️ para estudiantes</small>
            </div>

            <!-- Sección Derecha: Enlaces -->
            <nav class="footer-nav" aria-label="Enlaces legales y sociales">
                <a href="#" class="footer-link">Términos</a>
                <a href="#" class="footer-link">Privacidad</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="footer-link">
                    GitHub ↗
                </a>
            </nav>
        </div>
    `;

    return footer;
}
