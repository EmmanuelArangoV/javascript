import { BookCard } from './BookCard.js';
import { getBooks } from "../services/apiService.js";

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

        <div class="books-grid animate-fade-in" id="catalog-books-grid">
            <div class="loading">Cargando libros...</div>
        </div>
    `;

    let books = [];
    try {
        books = await getBooks() || [];
    } catch (err) {
        const grid = section.querySelector('#catalog-books-grid');
        if (grid) grid.innerHTML = `<div class="error">Error al cargar libros</div>`;
        return section;
    }

    const grid = section.querySelector('#catalog-books-grid');

    const render = (list) => {
        if (!grid) return;
        if (!list || list.length === 0) {
            grid.innerHTML = `<div class="no-results">No se encontraron libros</div>`;
            return;
        }
        grid.innerHTML = list.map(book => BookCard(book)).join('');
    };
    render(books);

    const input = section.querySelector('#catalog-search-input');
    if (input) {
        input.addEventListener('input', (e) => {
            const q = String(e.target.value || '').trim().toLowerCase();
            if (!q) {
                render(books);
                return;
            }
            const filtered = books.filter(b => (b.title || '').toLowerCase().includes(q));
            render(filtered);
        });
    }

    return section;
}
