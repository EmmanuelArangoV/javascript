export function Form() {
    const section = document.createElement('section');
    section.id = 'contact';
    section.classList.add('section');

    section.innerHTML = `
        <h2 class="section-title">Contáctanos</h2>
        <div class="form-wrapper">
            <!-- Tu JS debe escuchar el evento 'submit' de este form -->
            <form id="contact-form" class="contact-form">

                <div class="form-group">
                    <label for="name">Nombre Completo</label>
                    <input type="text" id="name" name="name" placeholder="Ej: Juan Pérez" required>
                    <span class="error-msg" id="name-error">El nombre es requerido</span>
                </div>

                <div class="form-group">
                    <label for="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" placeholder="Ej: juan@mail.com" required>
                    <span class="error-msg" id="email-error">Email inválido</span>
                </div>

                <div class="form-group">
                    <label for="message">Mensaje</label>
                    <textarea id="message" name="message" rows="5" placeholder="Escribe tu mensaje aquí..." required></textarea>
                </div>

                <button type="submit" class="btn btn-block">Enviar Mensaje</button>

                <!-- Mensaje de éxito oculto por defecto -->
                <div class="success-msg" id="form-success" style="display: none;">
                    ¡Mensaje enviado con éxito!
                </div>
            </form>

            <div class="user-record">
                <!-- Aquí tu JS puede mostrar los datos enviados -->
                <h3>Datos Enviados:</h3>
            </div>
        </div>
    `;

    setUpform(section);

    return section;
}

function setUpform(sectionContext) {
    const form = sectionContext.querySelector('#contact-form');
    const successMessage = sectionContext.querySelector('#form-success');

    form.addEventListener('submit' , (e) => {
        e.preventDefault();
        form.reset();
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    });
}