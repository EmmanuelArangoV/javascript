import { cardData } from "../state/store.js";

export function Cards() {
    const section = document.createElement('section');
    section.classList.add('section');
    section.id = 'cards';

    section.innerHTML = `
    <h2 class="section-title">Nuestras Tarjetas</h2>
    <div class="cards-grid">
        ${cardData.map((card) => `
            <article class="card">
                <div class="card-header">
                    <img src="${card.imgSrc}" alt="Imagen ${card.tag}" class="card-img">
                </div>
                <div class="card-body">
                    <span class="tag tag-${card.color}">${card.tag}</span>
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                    
                    <div class="modal-only">
                        <h4>${card.price}</h4>
                        <p>Duración: ${card.duration}</p>
                    </div>
                    <button class="btn btn-primary card-btn">Leer Más</button>
                </div>
            </article>
        `).join('')}
    </div>
    `;

    setUpModalCards(section);

    return section;
}

function setUpModalCards(sectionContext) {
    // Definimos el HTML del modal
    const modalHTML = `
        <div id="global-modal" class="modal-overlay">
            <div class="modal-popup">
                <button id="close-modal" class="close-popup-btn">&times;</button>
                
                <img id="modal-img" src="" alt="">
                <h3 id="modal-title"></h3>
                <p id="modal-text"></p>
                
                <div class="price-info">
                    <span id="modal-price"></span> - <span id="modal-duration"></span>
                </div>
                
                <button id="modal-action" class="btn btn-primary">Inscribirme ahora</button>
            </div>
        </div>
    `;

    sectionContext.insertAdjacentHTML('beforeend', modalHTML);

    const modal = sectionContext.querySelector('#global-modal');
    const closeModalBtn = sectionContext.querySelector('#close-modal');
    const modalImg = sectionContext.querySelector('#modal-img');
    const modalTitle = sectionContext.querySelector('#modal-title');
    const modalText = sectionContext.querySelector('#modal-text');
    const modalPrice = sectionContext.querySelector('#modal-price');
    const modalDuration = sectionContext.querySelector('#modal-duration');

    const cardsButtons = sectionContext.querySelectorAll('.card-btn');

    cardsButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card');

            modalImg.src = card.querySelector('.card-img').src;
            modalImg.alt = card.querySelector('.card-img').alt;
            modalTitle.textContent = card.querySelector('h3').textContent;
            modalText.textContent = card.querySelector('p').textContent;
            modalPrice.textContent = card.querySelector('.modal-only h4').textContent;
            modalDuration.textContent = card.querySelector('.modal-only p').textContent;

            modal.classList.add('open');
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('open');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });
}