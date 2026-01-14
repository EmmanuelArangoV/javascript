document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initStickyHeader();
    initCourseFilters();
    initForms();
    initCourseModal();
});

function initMobileMenu() {
    const menuBtn = document.querySelector('.header__menu-btn');
    const nav = document.querySelector('.nav');
    
    if (!menuBtn || !nav) return;
    
    menuBtn.addEventListener('click', () => {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        
        nav.classList.toggle('nav--active');
        menuBtn.classList.toggle('active');
        
        const isOpen = menuBtn.classList.contains('active');
        menuBtn.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav--active');
            menuBtn.classList.remove('active');
        });
    });
}

function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('header--sticky', 'header--scrolled');
        }
        else {
            header.classList.remove('header--sticky', 'header--scrolled');
        }
    });
}

function initCourseFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
            btn.classList.add('filter-btn--active');

            const filterValue = btn.getAttribute('data-filter');
            courseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';

                if (filterValue === 'todos' || category === filterValue) {
                    card.style.display = 'block';
                    // Pequeño delay para permitir que el display:block se renderice antes de la opacidad
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initForms() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');

            inputs.forEach(input => {
                const parent = input.parentElement; // .form-group
                if (!input.value.trim()) {
                    isValid = false;
                    parent.classList.add('form-group--error');

                    input.addEventListener('input', () => {
                        parent.classList.remove('form-group--error');
                    }, { once: true });
                } else {
                    parent.classList.remove('form-group--error');
                }
            });

            if (isValid) {
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.textContent;

                btn.innerText = 'Enviando...';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerText = '¡Mensaje enviado!';
                    btn.style.backgroundColor = 'var(--color-success)';
                    contactForm.reset();

                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const btn = newsletterForm.querySelector('button');

            if (input.value.trim()) {
                const originalText = btn.innerText;
                btn.innerText = '¡Suscrito!';
                input.value = '';

                setTimeout(() => {
                    btn.innerText = originalText;
                }, 3000);
            }
        });
    }
}

function initCourseModal() {
    const modal = document.getElementById('courseModal');
    const modalBody = modal.querySelector('.modal__body');
    const closeBtn = modal.querySelector('.modal__close');
    const overlay = modal.querySelector('.modal__overlay');
    const courseCards = document.querySelectorAll('.course-card');

    if (!modal) return;

    // Abrir modal con datos del curso
    courseCards.forEach(card => {
        card.addEventListener('click', function() {
            // Extraer datos de la tarjeta clickeada
            const title = this.querySelector('.course-card__title').innerText;
            const description = this.querySelector('.course-card__description').innerText;
            const imageSrc = this.querySelector('img').src;
            const price = this.querySelector('.course-card__price').innerText;
            const level = this.querySelector('.course-card__level').innerText;

            // Inyectar HTML dinámico en el modal
            modalBody.innerHTML = `
                <div class="modal-grid">
                    <img src="${imageSrc}" alt="${title}" class="modal-img">
                    <div class="modal-info">
                        <span class="modal-badge">${level}</span>
                        <h3 class="modal-title">${title}</h3>
                        <p class="modal-desc">${description}</p>
                        <p class="modal-long-desc">
                            En este curso aprenderás los conceptos fundamentales y avanzados para dominar ${title}. 
                            Incluye proyectos prácticos, recursos descargables y acceso de por vida.
                        </p>
                        <div class="modal-price">${price}</div>
                        <button class="btn btn--primary btn--full">Inscribirse Ahora</button>
                    </div>
                </div>
            `;

            // Mostrar modal
            modal.classList.add('modal--active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Función para cerrar modal
    const closeModal = () => {
        modal.classList.remove('modal--active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
            closeModal();
        }
    });
}

