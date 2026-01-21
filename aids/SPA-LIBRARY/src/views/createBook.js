// javascript
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
                            <option value="ficcion">Ficción</option>
                            <option value="no-ficcion">No Ficción</option>
                            <option value="ciencia">Ciencia</option>
                            <option value="historia">Historia</option>
                            <option value="tecnologia">Tecnología</option>
                            <option value="infantil">Infantil</option>
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
                        <label for="image" class="form-label">URL de Imagen</label>
                        <input type="url" id="image" name="image" class="form-input" placeholder="https://ejemplo.com/portada.jpg">
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

    // Lógica visual básica (sin backend todavía)
    const form = section.querySelector('#create-book-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Simulación: Libro guardado correctamente.');
        window.location.hash = '#dashboard';
    });

    return section;
}
