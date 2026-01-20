export function Gallery() {
    const section = document.createElement('section');
    section.id = 'gallery';
    section.classList.add('section');

    // "Base de datos" de la galería
    const galleryData = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            alt: "Paisaje 1",
            caption: "Montañas Nevadas"
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            alt: "Paisaje 2",
            caption: "Atardecer en el Valle"
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            alt: "Paisaje 3",
            caption: "Bosque Místico"
        }
    ];

    section.innerHTML = `
        <h2 class="section-title">Galería Interactiva</h2>

        <div class="carousel">
            <button class="carousel-btn btn-prev" id="prev-btn">&#10094;</button>

            <div class="carousel-track-container">
                <ul class="carousel-track">
                    ${galleryData.map((slide, index) => `
                        <li class="carousel-slide ${index === 0 ? 'current-slide' : ''}" data-index="${index}">
                            <img src="${slide.src}" alt="${slide.alt}">
                            <div class="caption">${slide.caption}</div>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <button class="carousel-btn btn-next" id="next-btn">&#10095;</button>
        </div>

        <div class="carousel-nav">
            ${galleryData.map((_, index) => `
                <button class="carousel-indicator ${index === 0 ? 'current-slide' : ''}" data-target="${index}"></button>
            `).join('')}
        </div>
    `;

    setupGalleryLogic(section);

    return section;
}


function setupGalleryLogic(sectionContext) {
    const images = sectionContext.querySelectorAll('.carousel-slide');
    const indicators = sectionContext.querySelectorAll('.carousel-indicator');
    const prevButton = sectionContext.querySelector('#prev-btn');
    const nextButton = sectionContext.querySelector('#next-btn');
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
