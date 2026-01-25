import { createUser, getUserByEmail, getUserById } from '../services/apiService.js';

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
                    <label for="id" class="form-label">Tu numero de Id</label>
                    <input type="text" id="id" name="id" class="form-input" placeholder="Tu Id" required>
                </div>
            
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
                            <option value="visitor">Visitante</option>
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

    // Lógica del formulario de registro con API
    const form = section.querySelector('#register-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1) Leer valores del formulario
        const id = section.querySelector('#id').value.trim();
        const name = section.querySelector('#fullName').value.trim();
        const email = section.querySelector('#email').value.trim();
        const password = section.querySelector('#password').value.trim();
        const role = section.querySelector('#role').value; // solo 'visitor' o 'librarian'

        // 2) Validaciones sencillas
        if (!id || !name || !email || !password || !role) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un correo válido.');
            return;
        }
        if (!['visitor','librarian'].includes(role)) {
            alert('Rol inválido. Solo se permite Visitante o Bibliotecario.');
            return;
        }

        try {
            // 3) Validar que no exista usuario con el mismo ID o Email
            const byId = await getUserById(id);
            if (byId) {
                alert('Ya existe un usuario con ese Id.');
                return;
            }
            const byEmail = await getUserByEmail(email);
            if (byEmail) {
                alert('Ya existe un usuario con ese email.');
                return;
            }

            // 4) Crear usuario en la API (JSON Server)
            const newUser = { id, name, email, password, role };
            const created = await createUser(newUser);
            if (!created || !created.id) {
                alert('No se pudo crear el usuario. Intenta nuevamente.');
                return;
            }

            // 5) Feedback y navegación
            alert('Usuario creado correctamente. Ahora puedes iniciar sesión.');
            window.location.hash = '#login';
        } catch (err) {
            console.error('Error registrando usuario', err);
            alert('Ocurrió un error al registrar. Revisa la consola y el servidor.');
        }
    });

    return section;
}
