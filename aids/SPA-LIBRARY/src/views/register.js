export function registerView() {
    const section = document.createElement('section');
    section.classList.add('auth-container');

    section.innerHTML = `
        <div class="auth-card">
            <div class="auth-card__header">
                <h2 class="auth-card__title">Crear cuenta</h2>
                <p class="auth-card__subtitle">Únete a nuestra biblioteca digital</p>
            </div>

            <form id="register-form" class="auth-form">
                <div class="form-group">
                    <label for="fullName" class="form-label">Nombre completo</label>
                    <input type="text" id="fullName" name="fullName" class="form-input" placeholder="Tu nombre" required>
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input type="email" id="email" name="email" class="form-input" placeholder="ejemplo@correo.com" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" id="password" name="password" class="form-input" placeholder="••••••••" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="role" class="form-label">Tipo de cuenta</label>
                        <select id="role" name="role" class="form-input form-select">
                            <option value="guest">Invitado</option>
                            <option value="librarian">Bibliotecario (Admin)</option>
                        </select>
                    </div>
                </div>

                <button type="submit" class="navbar__button navbar__button--primary btn-block">
                    Registrarse
                </button>
            </form>

            <div class="auth-card__footer">
                <p>¿Ya tienes cuenta? <a href="#login" class="text-link">Inicia sesión</a></p>
            </div>
        </div>
    `;

    return section;
}


