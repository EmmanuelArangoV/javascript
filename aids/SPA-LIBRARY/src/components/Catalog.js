import { BookCard } from './BookCard.js';
import {createLoan, getBooks, getLoans, getBookById, updateBookQuantity} from "../services/apiService.js";
import {isLibrarian, isVisitor, getStore } from '../state/store.js';

export async function Catalog() {
    const section = document.createElement('section');
    section.classList.add('catalog');

    const isAdmin = isLibrarian();

    // Cabecera: título, búsqueda y botón en la misma fila
    section.innerHTML = `
        <div class="catalog-controls">
            <div class="controls-bar">
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
                ${isAdmin ? '<button id="btn-create-book" class="navbar__button navbar__button--primary btn-sm">Crear libro</button>' : ''}
            </div>
        </div>

        <div class="books-grid animate-fade-in" id="catalog-books-grid"></div>

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

        <!-- Modal de edición de libro -->
        <div id="edit-book-modal" class="modal-overlay" aria-hidden="true">
            <div class="modal-popup" role="dialog" aria-modal="true">
                <button id="edit-book-modal-close" class="close-popup-btn">&times;</button>
                <div class="modal-body">
                    <div class="modal-cover" id="edit-modal-cover"></div>
                    <div class="modal-content">
                        <h3 id="edit-modal-title"></h3>
                        <p id="edit-modal-author"></p>
                        <p id="edit-modal-category"></p>
                        <form id="edit-book-form" class="auth-form" style="margin-top:0.75rem">
                            <div class="form-group">
                                <label for="edit-availableCopies" class="form-label">Cantidad disponible</label>
                                <input type="number" id="edit-availableCopies" name="availableCopies" class="form-input" min="0" required>
                            </div>
                            <div class="form-actions" style="border-top:none; padding-top:0; margin-top:0.75rem; justify-content:flex-end;">
                                <button type="submit" class="navbar__button navbar__button--primary btn-sm">Guardar cambios</button>
                            </div>
                        </form>
                        <small class="form-label" id="edit-helper" style="display:block; margin-top:0.5rem; color: var(--color-text-muted);">Solo puedes modificar la cantidad disponible.</small>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Listener: hash createBook
    const btnCreate = section.querySelector('#btn-create-book');
    if (btnCreate) {
        btnCreate.addEventListener('click', () => {
            const target = 'create-book';
            const current = window.location.hash.replace(/^#/, '');
            window.location.hash = target;
            if (current === target) {
                window.dispatchEvent(new HashChangeEvent('hashchange'));
            }
        });
    }

    let books = [];
    const grid = section.querySelector('#catalog-books-grid');

    const render = (list) => {
        if (!list.length) {
            grid.innerHTML = `<div class="no-results">No se encontraron libros</div>`;
            return;
        }
        grid.innerHTML = list.map(BookCard).join('');

        // Desactivar botones de reservar si no hay copias
        for (const book of list) {
            const btn = grid.querySelector(`button[data-action="reserve-book"][data-book-id="${book.id}"]`);
            if (btn) {
                const noCopies = (book.availableCopies ?? 0) <= 0;
                btn.disabled = noCopies;
                btn.classList.toggle('disabled', noCopies);
                btn.setAttribute('aria-disabled', String(noCopies));
                if (noCopies) btn.textContent = 'Sin copias';
                else btn.textContent = 'Reservar';
            }
        }
    };

    async function refreshCatalog() {
        try {
            books = await getBooks() || [];
            render(books);
            // Si el modal está abierto, actualiza las copias mostradas.
            const modal = section.querySelector('#book-modal');
            if (modal.classList.contains('open')) {
                const title = section.querySelector('#modal-title')?.textContent;
                const current = books.find(b => b.title === title);
                if (current) {
                    section.querySelector('#modal-copies').textContent =
                        `Copias disponibles: ${current.availableCopies ?? 0}`;
                }
            }
        } catch {
            grid.innerHTML = `<div class="error">Error al recargar catálogo</div>`;
        }
    }

    try {
        books = await getBooks() || [];
        render(books);
    } catch {
        grid.innerHTML = `<div class="error">Error al cargar libros</div>`;
        return section;
    }

    // Ver detalles y abrir edición
    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const bookId = btn.dataset.bookId;
        const action = btn.dataset.action;

        if (action === 'view-details') {
            const book = books.find(b => String(b.id) === String(bookId));
            if (book) openBookModal(section, book);
        }

        if (action === 'edit-book') {
            if (!isLibrarian()) return;
            const book = books.find(b => String(b.id) === String(bookId));
            if (book) openEditBookModal(section, book);
        }
    });

    // Reservar
    grid.addEventListener('click', async (e) => {
        const reserveBtn = e.target.closest('button[data-action="reserve-book"]');
        if (!reserveBtn) return;

        const userRole = isLibrarian() ? 'librarian' : isVisitor() ? 'visitor' : 'guest';
        if (userRole !== 'visitor') {
            console.log('Solo los visitantes pueden reservar libros.');
            return;
        }

        try {
            reserveBtn.disabled = true;
            reserveBtn.textContent = 'Procesando...';

            const bookId = reserveBtn.dataset.bookId;
            const resp = await loanRequest(bookId);

            if (resp && resp.id) {
                await refreshCatalog(); // “Refresca” vista sin recargar la SPA
                alert('Libro reservado con éxito.');
            } else {
                alert('Error al reservar el libro. Inténtalo de nuevo.');
            }
        } catch (err) {
            console.error('Error reservando libro', err);
            alert('Error al reservar el libro. Inténtalo de nuevo.');
        } finally {
            reserveBtn.disabled = false;
            reserveBtn.textContent = 'Reservar';
        }
    });

    // Búsqueda
    const input = section.querySelector('#catalog-search-input');
    input.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        render(q ? books.filter(b => b.title.toLowerCase().includes(q)) : books);
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
    section.querySelector('#modal-copies').textContent = `Copias disponibles: ${book.availableCopies ?? 0}`;
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

    // Cierre para modal de edición
    const editModal = section.querySelector('#edit-book-modal');
    const editClose = section.querySelector('#edit-book-modal-close');

    editClose.addEventListener('click', () => {
        editModal.classList.remove('open');
        editModal.setAttribute('aria-hidden', 'true');
    });
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.classList.remove('open');
            editModal.setAttribute('aria-hidden', 'true');
        }
    });
}

async function loanRequest(bookId) {
    const book = await getBookById(bookId);

    if (!book || (book.availableCopies ?? 0) <= 0) {
        throw new Error('No hay copias disponibles');
    }

    // Optimista: primero baja la cantidad
    const newQuantity = book.availableCopies - 1;
    await updateBookQuantity(bookId, newQuantity);

    const userId = getStore().user.id;
    const loans = await getLoans();
    const loanId = loans.length + 1;

    const loanData = {
        id: loanId,
        userId,
        bookId: book.id,
        loanDate: new Date().toISOString().split('T')[0],
        status: true
    };

    try {
        const response = await createLoan(loanData);
        if (!response?.id) {
            // Rollback si falla la creación del préstamo
            await updateBookQuantity(bookId, book.availableCopies);
        }
        return response;
    } catch (e) {
        // Rollback en error
        await updateBookQuantity(bookId, book.availableCopies);
        throw e;
    }
}

function openEditBookModal(section, book) {
    // Renderizar datos básicos del libro (solo lectura en texto)
    section.querySelector('#edit-modal-cover').innerHTML = book.cover ?? '';
    section.querySelector('#edit-modal-title').textContent = book.title;
    section.querySelector('#edit-modal-author').textContent = `Autor: ${book.author}`;
    section.querySelector('#edit-modal-category').textContent = `Categoría: ${book.category}`;

    // Colocar cantidad actual en input
    const qtyInput = section.querySelector('#edit-availableCopies');
    qtyInput.value = Number(book.availableCopies ?? 0);

    // Abrir modal
    const editModal = section.querySelector('#edit-book-modal');
    editModal.classList.add('open');
    editModal.setAttribute('aria-hidden', 'false');

    // Manejar submit del formulario
    const form = section.querySelector('#edit-book-form');

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const newQty = Number(qtyInput.value || 0);
        if (Number.isNaN(newQty) || newQty < 0) {
            alert('La cantidad debe ser un número mayor o igual a 0.');
            return;
        }
        try {
            // Llamada a API para actualizar cantidad
            await updateBookQuantity(book.id, newQty);
            alert('Cantidad actualizada correctamente.');
            editModal.classList.remove('open');
            editModal.setAttribute('aria-hidden', 'true');
            // Refrescar catálogo para ver cambios en tarjetas
            const grid = section.querySelector('#catalog-books-grid');
            // reutiliza refreshCatalog si existe en el scope
            // Si no, recarga lista local de books desde API
            try {
                const updatedBooks = await getBooks();
                const books = updatedBooks || [];
                const renderTarget = grid;
                if (renderTarget) {
                    render(books);
                }
            } catch (e) {
                console.error('Error refrescando catálogo', e);
            }
        } catch (err) {
            console.error('Error actualizando cantidad', err);
            alert('No se pudo actualizar la cantidad. Intenta nuevamente.');
        }
    };

    // Asegurar que no se duplique el listener si se abre varias veces
    form.addEventListener('submit', onSubmit, { once: true });
}
