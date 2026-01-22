import { Catalog } from "../components/Catalog.js";
import {getStore } from "../state/store.js";
import { getBooks, getLoans } from "../services/apiService.js";

export function dashboardView() {
    const section = document.createElement('section');
    section.classList.add('dashboard-container');

    const user = getStore().user;

    section.innerHTML = `
        <div class="dashboard-header animate-fade-in">
            <h1 class="dashboard-title">Hola, ${user.name}</h1>
            <p class="dashboard-subtitle">Panel de control - ${user.role === 'librarian' ? 'Bibliotecario' : 'Visitante'}</p>
        </div>

        <!-- Tarjetas de Estadísticas -->
        <div class="stats-grid animate-fade-in">
            <div class="stat-card">
                <span class="stat-icon">📚</span>
                <div class="stat-info">
                    <h3 id="total-books"></h3>
                    <p>Libros en Catálogo</p>
                </div>
            </div>
            <div class="stat-card">
                <span class="stat-icon">✅</span>
                <div class="stat-info">
                    <h3 id="available-books">$</h3>
                    <p>Disponibles</p>
                </div>
            </div>
            <div class="stat-card">
                <span class="stat-icon">🔖</span>
                <div class="stat-info">
                    <h3 id="loans-active">$</h3>
                    <p>Reservas Activas</p>
                </div>
            </div>
        </div>

        <!-- Vista del Catálogo -->
        <div id="catalog-container"></div> 
    `;

    apiRequests(section, user);

    return section;

}

function apiRequests(section, user) {
    Catalog().then(catalogElement => {
        const container = section.querySelector('#catalog-container');
        if (container) {
            container.replaceWith(catalogElement);
        }
    });

    getBooks().then(books => {
        const totalBooksElement = section.querySelector('#total-books');
        const availableBooksElement = section.querySelector('#available-books');
        if (totalBooksElement) {
            totalBooksElement.textContent = books.length;
            if (user.role === 'visitor') {
                availableBooksElement.textContent = books.filter(book => book.availableCopies > 0).length;
            } else {
                let cont = 0;
                books.forEach(book => {
                    cont += book.availableCopies;
                })
                availableBooksElement.textContent = cont;
            }
        }
    })

    const id = user.role === 'visitor' ? user.id : null;
    getLoans(id).then(loans => {
        const activeLoansElement = section.querySelector('#loans-active');
        if(activeLoansElement) {
            const activeLoans = loans.filter(loan => loan.status === true);
            activeLoansElement.textContent = activeLoans.length;
        }
    })
}

