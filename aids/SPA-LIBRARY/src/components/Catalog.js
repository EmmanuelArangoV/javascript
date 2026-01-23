import { BookCard } from './BookCard.js';
import {createLoan, getBooks, getLoans, getBookById} from "../services/apiService.js";
import {isLibrarian, isVisitor, getStore } from '../state/store.js';

export async function Catalog() {
    const section = document.createElement('section');
    section.classList.add('catalog');

    section.innerHTML = `
        <div class="catalog-controls animate-fade-in">
            <h2 class="section-title">Catálogo de Libros</h2>
            <div class="search-wrapper">
                <input
                    type="text"
                    class="form-input"
                    placeholder="Buscar por título..."
                    aria-label="Buscar libros"
                    id="catalog-search-input"
                >
            </div>
        </div>

        <div class="books-grid animate-fade-in" id="catalog-books-grid"></div>

        <!-- MODAL GLOBAL -->
        <div id="book-modal" class="modal-overlay" aria-hidden="true">
            <div class="modal-popup" role="dialog" aria-modal="true">
                <button id="book-modal-close" class="close-popup-btn">&times;</button>

                <div class="modal-body">
                    <div class="modal-cover" id="modal-cover"></div>
                    <div class="modal-content">
                        <h3 id="modal-title"></h3>
                        <p id="modal-author"></p>
                        <p id="modal-category"></p>
                        <br>
                        <p id="modal-description"></p>
                        <p id="modal-copies"></p>
                    </div>
                </div>
            </div>
        </div>
    `;

    let books = [];
    try {
        books = await getBooks() || [];
    } catch {
        section.querySelector('#catalog-books-grid').innerHTML =
            `<div class="error">Error al cargar libros</div>`;
        return section;
    }

    const grid = section.querySelector('#catalog-books-grid');

    const render = (list) => {
        if (!list.length) {
            grid.innerHTML = `<div class="no-results">No se encontraron libros</div>`;
            return;
        }
        grid.innerHTML = list.map(BookCard).join('');
    };

    render(books);

    // Open detalles del libro
    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const bookId = btn.dataset.bookId;
        const action = btn.dataset.action;

        if (action === 'view-details') {
            const book = books.find(b => String(b.id) === String(bookId));
            if (book) openBookModal(section, book);
        }
    });

    // Reservar un libro
    grid.addEventListener('click', async (e) => {
        const userRole = isLibrarian() ? 'librarian' : isVisitor() ? 'visitor' : 'guest';
        if (userRole === 'visitor') {
            const reserveBtn = e.target.closest('button[data-action="reserve-book"]');

            const bookId = reserveBtn?.dataset.bookId;

            reserveBtn.addEventListener('click', async () => {
                const resp = await loanRequest(bookId);
                if (resp.ok) {
                    alert('Libro reservado con éxito.');
                } else {
                    alert('Error al reservar el libro. Inténtalo de nuevo.');
                }
            });
        } else {
            console.log('Solo los visitantes pueden reservar libros.');
        }
    });

    // Búsqueda
    const input = section.querySelector('#catalog-search-input');
    input.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        render(
            q
                ? books.filter(b => b.title.toLowerCase().includes(q))
                : books
        );
    });

    setupModalClose(section);

    return section;
}

function openBookModal(section, book) {
    section.querySelector('#modal-cover').innerHTML = book.cover ?? '';
    section.querySelector('#modal-title').textContent = book.title;
    section.querySelector('#modal-author').textContent = `Autor: ${book.author}`;
    section.querySelector('#modal-category').textContent = `Categoría: ${book.category}`;

    section.querySelector('#modal-description').textContent = book.description;
    section.querySelector('#modal-copies').textContent =
        `Copias disponibles: ${book.availableCopies ?? 0}`;

    const modal = section.querySelector('#book-modal');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
}

function setupModalClose(section) {
    const modal = section.querySelector('#book-modal');
    const closeBtn = section.querySelector('#book-modal-close');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
        }
    });
}

async function loanRequest(bookId) {

    const book = await getBookById(bookId);
    const userId = getStore().user.id;
    const loans = await getLoans(userId);
    const loanId = loans.length + 1;

    const loanData = {
        id: loanId,
        userId: userId,
        bookId: book.id,
        loanDate: new Date().toISOString().split('T')[0],
        status: true
    }

    const response = await createLoan(loanData);
    console.log(response);
    return response;
}
