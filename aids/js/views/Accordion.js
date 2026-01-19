import {accordionData} from "../state/store.js";

export function Accordion() {
    const section = document.createElement('section');
    section.id = 'accordion';
    section.classList.add('section');

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
