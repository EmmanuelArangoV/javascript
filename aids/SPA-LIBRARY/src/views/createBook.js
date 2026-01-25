// javascript
import { createBook, getBookById } from '../services/apiService.js';

export function createBookView() {
    const section = document.createElement('section');
    section.classList.add('dashboard-container', 'animate-fade-in');

    section.innerHTML = `
        <div class="dashboard-header">
            <h1 class="dashboard-title">Agregar Nuevo Libro</h1>
            <p class="dashboard-subtitle">Ingresa los detalles para ampliar el catálogo</p>
        </div>

        <div class="content-card">
            <form id="create-book-form" class="auth-form">
                
                <!-- Fila 1 -->
                <div class="form-row mobile-stack">
                    <div class="form-group">
                        <label for="title" class="form-label">Título *</label>
                        <input type="text" id="title" name="title" class="form-input" placeholder="Ej: Cien años de soledad" required>
                    </div>
                    <div class="form-group">
                        <label for="author" class="form-label">Autor *</label>
                        <input type="text" id="author" name="author" class="form-input" placeholder="Ej: Gabriel García Márquez" required>
                    </div>
                </div>

                <!-- Fila 2 -->
                <div class="form-row mobile-stack">
                    <div class="form-group">
                        <label for="isbn" class="form-label">ISBN *</label>
                        <input type="text" id="isbn" name="isbn" class="form-input" placeholder="978-..." required>
                    </div>
                    <div class="form-group">
                        <label for="category" class="form-label">Categoría *</label>
                        <select id="category" name="category" class="form-input form-select" required>
                            <option value="" disabled selected>Seleccionar...</option>
                            <option value="Fiction">Ficción</option>
                            <option value="Non-fiction">No Ficción</option>
                            <option value="Science">Ciencia</option>
                            <option value="History">Historia</option>
                            <option value="Technology">Tecnología</option>
                            <option value="Children">Infantil</option>
                        </select>
                    </div>
                </div>

                <!-- Descripción -->
                <div class="form-group">
                    <label for="description" class="form-label">Descripción *</label>
                    <textarea id="description" name="description" class="form-input form-textarea" rows="4" placeholder="Breve reseña del libro..." required></textarea>
                </div>

                <!-- Fila 3 -->
                <div class="form-row mobile-stack">
                    <div class="form-group">
                        <label for="stock" class="form-label">Stock Disponible *</label>
                        <input type="number" id="stock" name="stock" class="form-input" min="0" placeholder="0" required>
                    </div>
                    <div class="form-group">
                        <label for="coverEmoji" class="form-label">Emoji de Portada *</label>
                        <input type="text" id="coverEmoji" name="coverEmoji" class="form-input" placeholder="Elige un emoji..." required readonly>
                        <div class="emoji-keyboard" id="emojiKeyboard" aria-label="Teclado de emojis" role="grid"></div>
                    </div>
                </div>

                <!-- Botones de Acción -->
                <div class="form-actions">
                    <a href="#dashboard" class="navbar__button navbar__button--outline">
                        Cancelar
                    </a>
                    <button type="submit" class="navbar__button navbar__button--primary">
                        Guardar Libro
                    </button>
                </div>

            </form>
        </div>
    `;

    // Referencias del formulario
    const form = section.querySelector('#create-book-form');

    // Inicializa teclado de emojis (lista base)
    const emojiList = [
        '📚','📘','📕','📗','📓','📒','📖','🔖','🧠','💡','🔬','🧪','🧬','🛠️','💻','🌍','🌌','🧒','🧙‍♂️','🐱','🐶','🐼','⭐','🔥','🌟','🎯','🎓'
    ];
    const emojiKeyboard = section.querySelector('#emojiKeyboard');
    const coverEmojiInput = section.querySelector('#coverEmoji');

    // Renderiza el "teclado" de emojis como botones
    emojiKeyboard.innerHTML = emojiList.map(e => `
        <button type="button" class="emoji-key" role="button" aria-label="${e}">${e}</button>
    `).join('');

    // Click en emoji: colocar valor en el input de portada
    emojiKeyboard.addEventListener('click', (ev) => {
        const key = ev.target.closest('.emoji-key');
        if (!key) return;
        coverEmojiInput.value = key.textContent;
        coverEmojiInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    // Envío del formulario con integración a API real
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1) Tomar y normalizar valores del formulario
        const title = section.querySelector('#title').value.trim();
        const author = section.querySelector('#author').value.trim();
        const isbn = section.querySelector('#isbn').value.trim(); // Será el ID del libro
        const category = section.querySelector('#category').value;
        const description = section.querySelector('#description').value.trim();
        const availableCopies = Number(section.querySelector('#stock').value || 0);
        const cover = coverEmojiInput.value.trim();

        // Validaciones básicas en el cliente
        if (!title || !author || !isbn || !category || !description) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }
        if (!cover) {
            alert('Por favor, selecciona un emoji de portada.');
            return;
        }
        if (availableCopies < 0 || Number.isNaN(availableCopies)) {
            alert('El stock debe ser un número mayor o igual a 0.');
            return;
        }

        // 2) Construir el payload para la API
        // Nota: el ID del libro será el ISBN ingresado en el formulario.
        const newBook = {
            id: isbn,
            title,
            author,
            availableCopies,
            cover,
            category,
            description
        };

        try {
            // 3) Validar que no exista un libro con el mismo ID (ISBN) antes de crear
            const existing = await getBookById(isbn);
            if (existing) {
                alert('Ya existe un libro con ese ISBN. Por favor, utiliza un ISBN diferente.');
                return;
            }

            // 4) Llamar a la API real para crear el libro
            //    apiService.createBook hace POST a `${BASE_URL}/books` con el JSON.
            const created = await createBook(newBook);

            // 5) Verificar respuesta (JSON Server devuelve el recurso creado)
            if (!created || !created.id) {
                alert('No se pudo crear el libro. Intenta nuevamente.');
                return;
            }

            // 6) Feedback al usuario y navegar al catálogo
            alert('Libro creado correctamente.');
            window.location.hash = '#catalog';
        } catch (err) {
            console.error('Error creando libro', err);
            alert('Ocurrió un error al crear el libro. Revisa la consola y el servidor.');
        }
    });

    return section;
}
