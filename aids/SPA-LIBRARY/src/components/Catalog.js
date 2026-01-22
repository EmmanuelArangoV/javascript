import { BookCard } from './BookCard.js';
import { getBooks } from "../services/apiService.js";

export async function Catalog() {
    const section = document.createElement('section');
    section.classList.add('catalog');
    const books = await getBooks();

    const booksHtml = books.map(book => BookCard(book)).join('');

    section.innerHTML = `
        <div class="catalog-controls animate-fade-in">
            <h2 class="section-title">Catálogo de Libros</h2>
            <div class="search-wrapper">
                <input 
                    type="text" 
                    class="form-input" 
                    placeholder="Buscar por título o autor..." 
                    aria-label="Buscar libros"
                    id="catalog-search-input"
                >
            </div>
        </div>

        <div class="books-grid animate-fade-in" id="catalog-books-grid">
            ${booksHtml}
        </div>
    `;

    return section;
}
