import { BookCard} from "../components/BookCard.js";

export function dashboardView() {
    const section = document.createElement('section');
    section.classList.add('dashboard-container');

    // Simulación de datos (Mock Data) para visualización
    const user = JSON.parse(localStorage.getItem('currentUser')) || { name: 'Visitante', role: 'student' };
    const stats = { total: 12, available: 8, reserved: 2 };

    const booksMock = [
        { title: "Cien años de soledad", author: "Gabriel García Márquez", cover: "📚" },
        { title: "El Principito", author: "Antoine de Saint-Exupéry", cover: "👑" },
        { title: "1984", author: "George Orwell", cover: "👁️" },
        { title: "Don Quijote", author: "Miguel de Cervantes", cover: "⚔️" },
        { title: "Harry Potter", author: "J.K. Rowling", cover: "⚡" },
        { title: "El Señor de los Anillos", author: "J.R.R. Tolkien", cover: "💍" }
    ];

    section.innerHTML = `
        <div class="dashboard-header animate-fade-in">
            <h1 class="dashboard-title">Hola, ${user.name}</h1>
            <p class="dashboard-subtitle">Panel de control - ${user.role === 'librarian' ? 'Bibliotecario' : 'Estudiante'}</p>
        </div>

        <!-- Tarjetas de Estadísticas -->
        <div class="stats-grid animate-fade-in">
            <div class="stat-card">
                <span class="stat-icon">📚</span>
                <div class="stat-info">
                    <h3>${stats.total}</h3>
                    <p>Libros en Catálogo</p>
                </div>
            </div>
            <div class="stat-card">
                <span class="stat-icon">✅</span>
                <div class="stat-info">
                    <h3>${stats.available}</h3>
                    <p>Disponibles</p>
                </div>
            </div>
            <div class="stat-card">
                <span class="stat-icon">🔖</span>
                <div class="stat-info">
                    <h3>${stats.reserved}</h3>
                    <p>Reservas Activas</p>
                </div>
            </div>
        </div>

        <!-- Controles y Búsqueda -->
        <div class="catalog-controls animate-fade-in">
            <h2 class="section-title">Catálogo de Libros</h2>
            <div class="search-wrapper">
                <input type="text" class="form-input" placeholder="Buscar por título o autor..." aria-label="Buscar libros">
            </div>
        </div>

        <!-- Grilla de Libros -->
        <div class="books-grid animate-fade-in">
            ${booksMock.map(book => BookCard(book)).join('')}
        </div>
    `;

    return section;
}
