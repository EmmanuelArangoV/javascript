import {isLibrarian, isVisitor } from '../state/store.js';

function renderAvailabilityBadge(book) {
    const copies = Number(book.availableCopies ?? 0);
    const isAvailable = copies > 0;

    if (isAvailable) {
        return `
            <span class="badge-status badge-status--available">
                Disponible (${copies})
            </span>
        `;
    }

    return `
        <span class="badge-status badge-status--unavailable">
            No disponible (0)
        </span>
    `;
}

function renderActionButtons(book) {

    const baseDetailsBtn = `
        <button 
            class="navbar__button navbar__button--outline btn-sm" 
            data-action="view-details" 
            data-book-id="${book.id}"
        >
            Ver detalles
        </button>
    `;

    if (isLibrarian()) {
        return `
            ${baseDetailsBtn}
            <button 
                class="navbar__button navbar__button--primary btn-sm" 
                data-action="edit-book" 
                data-book-id="${book.id}"
            >
                Editar libro
            </button>
        `;
    }

    if (isVisitor()) {
        return `
            ${baseDetailsBtn}
            <button 
                class="navbar__button navbar__button--primary btn-sm" 
                data-action="reserve-book" 
                data-book-id="${book.id}"
            >
                Reservar
            </button>
        `;
    }
    return baseDetailsBtn;
}

export function BookCard(book) {
    const badge = renderAvailabilityBadge(book);
    const actions = renderActionButtons(book);

    const article = `
        <article class="book-card">
            <div class="book-cover">${book.cover ?? ''}</div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-actions">
                    ${badge}
                    <div class="book-actions-buttons">
                        ${actions}
                    </div>
                </div>
            </div>
        </article>
    `;

    return article;
}
