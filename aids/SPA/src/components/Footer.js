export function Footer() {
    const footer = document.createElement('footer');
    footer.id = 'main-footer';
    footer.classList.add('main-footer');

    footer.innerHTML = `
        <div class="container footer-content">
            <div class="footer-grid">
                
                <!-- Columna 1: Info Marca -->
                <div class="footer-col">
                    <h3 class="footer-logo">MiPortafolio</h3>
                    <p>
                        Diseñando experiencias digitales únicas. 
                        Este es un espacio de prueba para demostrar habilidades en JS Vanilla y CSS.
                    </p>
                </div>

                <!-- Columna 2: Enlaces Rápidos -->
                <div class="footer-col">
                    <h4>Navegación</h4>
                    <ul class="footer-links">
                        <li><a href="#home">Inicio</a></li>
                        <li><a href="#cards">Proyectos</a></li>
                        <li><a href="#accordion">FAQ</a></li>
                        <li><a href="#tasks">Tareas</a></li>
                    </ul>
                </div>

                <!-- Columna 3: Contacto -->
                <div class="footer-col">
                    <h4>Contacto</h4>
                    <ul class="footer-contact">
                        <li>📍 Calle Falsa 123, Tech City</li>
                        <li>📧 contacto@ejemplo.com</li>
                        <li>📱 +57 300 123 4567</li>
                    </ul>
                </div>

                <!-- Columna 4: Newsletter (Visual) -->
                <div class="footer-col">
                    <h4>Newsletter</h4>
                    <p>Suscríbete para novedades.</p>
                    <div class="footer-newsletter">
                        <input type="email" placeholder="Tu email...">
                        <button class="btn btn-primary">→</button>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} MiPortafolio. Todos los derechos reservados.</p>
            </div>
        </div>
    `;

    return footer;
}