export function BookCard(book) {
    return `<article class="book-card">
                <div class="book-cover">${book.cover}</div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <div class="book-actions">
                        <span class="badge-status available">Disponible</span>
                        <button class="navbar__button navbar__button--primary btn-sm">Ver detalles</button>
                    </div>
                </div>
            </article>`
}