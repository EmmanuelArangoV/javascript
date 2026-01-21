export function notFoundView() {
    const section = document.createElement('section');
    section.classList.add('auth-container'); // Reutiliza el contenedor centrado verticalmente

    section.innerHTML = `
        <div class="auth-card animate-fade-in" style="text-align: center; max-width: 500px;">
            
            <!-- Icono grande -->
            <div style="font-size: 5rem; margin-bottom: 0.5rem;">⚠️</div>
            
            <header class="auth-card__header">
                <h1 class="auth-card__title" style="font-size: 2rem;">Acceso Denegado</h1>
                <p class="auth-card__subtitle" style="font-size: 1rem; line-height: 1.6;">
                    No tienes permisos para acceder a esta página o necesitas iniciar sesión para continuar.
                </p>
            </header>

            <!-- Botones de navegación (usamos href para navegación por hash simple) -->
            <div class="form-actions" style="justify-content: center; border: none; padding-top: 0.5rem;">
                <a href="#login" class="navbar__button navbar__button--primary">
                    Iniciar Sesión
                </a>
                <a href="#dashboard" class="navbar__button navbar__button--outline">
                    Ir al Inicio
                </a>
            </div>
        </div>
    `;

    return section;
}
