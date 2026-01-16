export function Cards() {
    const section = document.createElement('section');
    section.classList.add('section');
    section.id = 'cards';

    const cardData = [
        {
            title: 'Desarrollo Frontend', color: 'blue', tag: 'Tecnología', description: 'Aprende a construir interfaces modernas y responsivas utilizando las últimas tecnologías web.', price: '$30', duration: '3 Meses', imgSrc: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            title: 'UI/UX Design', color: 'purple',tag: 'Diseño', description: 'Diseña experiencias de usuario que cautiven y resuelvan problemas reales de forma elegante.', price: '$30', duration: '3 Meses', imgSrc: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        {
            title: 'Servidores y APIs', color: 'green', tag: 'Backend', description: 'Domina la lógica del lado del servidor y conecta tus aplicaciones con bases de datos robustas.', price: '$30', duration: '3 Meses', imgSrc: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        }
    ]
    
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

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('global-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalPrice = document.getElementById('modal-price');
    const modalDuration = document.getElementById('modal-duration');

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