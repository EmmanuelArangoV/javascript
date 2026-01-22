import { loginView } from '../views/login.js';
import { registerView } from '../views/register.js';
import { dashboardView } from '../views/dashboard.js';
import { createBookView } from '../views/createBook.js';
import { notFoundView } from '../views/notFound.js';
import { render } from "../main.js";
import { LoansView } from "../views/loans.js";

const routes = {
    'login': loginView,
    'register': registerView,
    'dashboard': dashboardView,
    'create-book': createBookView,
    'loans': LoansView
};

export function router() {

    let hash = window.location.hash.slice(1);

    // ruta por defecto
    if (!hash || hash === '/') {
        hash = 'login';
        window.location.hash = 'login';
    }

    const viewFactory = routes[hash];

    if (viewFactory) {
        render(viewFactory());
    } else {
        console.error('Ruta no encontrada:', hash);
        render(notFoundView());
    }
}