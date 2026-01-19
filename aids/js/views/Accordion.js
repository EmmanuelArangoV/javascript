export function Accordion() {
    const section = document.createElement('section');
    section.id = 'accordion';
    section.classList.add('section');

    // "Base de datos" local con la información
    const accordionData = [
        {
            header: "¿Cómo funciona este acordeón?",
            body: "Este contenido está oculto por defecto. Tu tarea con JS es cambiar la altura (height) o la visibilidad cuando se hace click en el header."
        },
        {
            header: "¿Puedo usar esto en mi examen?",
            body: "¡Claro que sí! La estructura está lista para que te enfoques 100% en la lógica de programación."
        },
        {
            header: "¿Qué propiedades CSS debo manipular?",
            body: "Generalmente alternas una clase (ej: .active) que cambia el `max-height` de 0 a un valor en px."
        }
    ];


    section.innerHTML = `
        <h2 class="section-title">Preguntas Frecuentes</h2>
        <div class="accordion-container">
            ${accordionData.map((item) => `
                <div class="accordion-item">
                    <button class="accordion-header">
                        ${item.header}
                        <span class="icon">+</span>
                    </button>
                    <div class="accordion-content">
                        <div class="accordion-body">
                            ${item.body}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    setUpAccordion(section);

    return section;
}

function setUpAccordion(sectionContext) {
    const headers = sectionContext.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const content = item.querySelector('.accordion-content');

            header.classList.toggle('active');
            content.classList.toggle('active');
        });
    });
}
