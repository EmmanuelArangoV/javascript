import { Catalog } from "../components/Catalog.js";

export function dashboardView() {
    const section = document.createElement('section');
    section.classList.add('dashboard-container');

    const user = JSON.parse(localStorage.getItem('currentUser')) || { name: 'Visitante', role: 'student' };
    const stats = { total: 12, available: 8, reserved: 2 };

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

        <!-- Vista del Catálogo -->
        <div id="catalog-container"></div> 
    `;

    Catalog().then(catalogElement => {
        const container = section.querySelector('#catalog-container');
        if (container) {
            container.replaceWith(catalogElement);
        }
    });

    return section;
}
