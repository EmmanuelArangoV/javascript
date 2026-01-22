import { loginView } from '../views/login.js';
import { registerView } from '../views/register.js';
import { dashboardView } from '../views/dashboard.js';
import { createBookView } from '../views/createBook.js';
import { notFoundView } from '../views/notFound.js';
import { render } from "../main.js";

const routes = {
    'login': loginView(),
    'register': registerView(),
    'dashboard': dashboardView(),
    'create-book': createBookView()
};

export function router() {

    let hash = window.location.hash.slice(1);

    // ruta por defecto
    if (!hash || hash === '/') {
        hash = 'login';
        window.location.hash = 'login';
    }

    const viewRenderFunction = routes[hash];

    app.innerHTML = '';

    if (viewRenderFunction) {
        render(viewRenderFunction);
    } else {
        console.error('Ruta no encontrada:', hash);
        render(notFoundView());
    }
}

