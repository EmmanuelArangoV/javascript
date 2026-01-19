import { store } from '../state/store.js';
import { UserCard } from '../components/UserCard.js';

export function Form() {
    const section = document.createElement('section');
    section.id = 'contact';
    section.classList.add('section');

    section.innerHTML = `
        <h2 class="section-title">Contáctanos</h2>
        <div class="form-wrapper">
            <form id="contact-form" class="contact-form">
                <div class="form-group">
                    <label for="name">Nombre Completo</label>
                    <input type="text" id="name" name="name" placeholder="Ej: Juan Pérez" required>
                </div>

                <div class="form-group">
                    <label for="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" placeholder="Ej: juan@mail.com" required>
                </div>

                <div class="form-group">
                    <label for="message">Mensaje</label>
                    <textarea id="message" name="message" rows="5" placeholder="Escribe tu mensaje aquí..." required></textarea>
                </div>

                <button type="submit" class="btn btn-block">Enviar Mensaje</button>

                <div class="success-msg" id="form-success" style="display: none;">
                    ¡Mensaje enviado con éxito!
                </div>
            </form>
        </div>
        
        <div class="user-section">
            <h3 >Usuarios Registrados</h3>
            <div id="all-users" class="users-list" style="margin-top: 2rem;">
            <!-- Aquí se añadirán las cards -->
            </div>
        </div>
        
    `;

    setUpForm(section);

    return section;
}

function setUpForm(sectionContext) {
    const form = sectionContext.querySelector('#contact-form');
    const successMessage = sectionContext.querySelector('#form-success');
    const usersContainer = sectionContext.querySelector('#all-users');

    store.users.forEach(u => {
        usersContainer.appendChild(UserCard(u));
    });

    // 2. ESCUCHAR EL ENVÍO
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameVal = form.querySelector('#name').value;
        const emailVal = form.querySelector('#email').value;

        const newUserCtx = { name: nameVal, email: emailVal };

        // A. Guardar en Store (Array actual + nuevo)
        // Usamos spread operator (...) para copiar lo que ya había
        store.setUser([...store.users, newUserCtx]);

        usersContainer.appendChild(UserCard(newUserCtx));

        // C. Feedback y limpieza
        form.reset();
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    });
}