document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    modalCards();
    accordion();
    carousel();
    form();
});

function form() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');

    form.addEventListener('submit' , (e) => {
        e.preventDefault();
        form.reset();
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    });
}

function carousel() {
    const images = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    let currentIndex = 0;
    let isPaused = false;

    function showImage(index) {
        images.forEach(img => img.classList.remove('current-slide'));
        indicators.forEach(ind => ind.classList.remove('current-slide'));
        indicators[index].classList.add('current-slide');
        images[index].classList.add('current-slide');
    }

    indicators.forEach((ind, index) => {
        ind.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
        });
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? currentIndex = images.length - 1 : currentIndex - 1;
        showImage(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === images.length - 1) ? currentIndex = 0 : currentIndex + 1;
        showImage(currentIndex);
    });

    setInterval(() => {
        if (!isPaused) {
            currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
            showImage(currentIndex);
        }
    }, 3000);

    images.forEach(img => {
        img.addEventListener('click', () => {
            isPaused = !isPaused;
        });
    });
}

function accordion() {
    
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            
            const item = header.closest('.accordion-item');
            
            const content = item.querySelector('.accordion-content');
            
            header.classList.toggle('active');
            content.classList.toggle('active');
        });
    });
}


function modalCards() {
    
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
    
    const cardsButtons = document.querySelectorAll('.card-btn');
    const modal = document.getElementById('global-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalPrice = document.getElementById('modal-price');
    const modalDuration = document.getElementById('modal-duration');
    
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


function initNavigation() {
    const navlinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const logo = document.getElementById('logo');
    
    // Initially hide all sections except the first one
    sections.forEach((section, index) => {
        if (index !== 0) {
            section.style.display = 'none';
        }
    });
    
    // Add click event listener to the logo to show the first section
    logo.addEventListener('click', () => {
        sections.forEach((section, index) => {
            if (index === 0) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
    
    // Add click event listeners to navigation links
    navlinks.forEach(link => {
        link.addEventListener('click',  () => {
            
            // Get the target section ID from the link's href attribute
            const targetSection = link.getAttribute('href').substring(1);
            
            // Hide all sections and show only the target section
            sections.forEach(s => {
                s.style.display = 'none';
                
                // Show the target section
                const sectionId = s.getAttribute('id');
                if (sectionId === targetSection) {
                    s.style.display = 'block';
                }
            });
            
        });
    });
}

