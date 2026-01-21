export function loginView() {
    const section = document.createElement('section');
    section.classList.add('auth-container');

    section.innerHTML = `
        <div class="auth-card animate-fade-in">
            <header class="auth-card__header">
                <h2 class="auth-card__title">Bienvenido de nuevo</h2>
                <p class="auth-card__subtitle">Ingresa tus credenciales para acceder</p>
            </header>

            <form id="login-form" class="auth-form">
                <div class="form-group">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        class="form-input" 
                        placeholder="ejemplo@correo.com" 
                        autocomplete="username"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        class="form-input" 
                        placeholder="••••••••" 
                        autocomplete="current-password"
                        required
                    >
                </div>

                <button type="submit" class="navbar__button navbar__button--primary btn-block">
                    Iniciar Sesión
                </button>
            </form>

            <footer class="auth-card__footer">
                <p>¿No tienes cuenta? <a href="#register" class="text-link">Regístrate aquí</a></p>
            </footer>
        </div>
    `;

    return section;
}
