import { Navbar } from "./components/Navbar.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { dashboardView } from "./views/dashboard.js";
import { createBookView } from "./views/createBook.js";
import { notFoundView} from "./views/notFound.js";
import { Footer} from "./components/Footer.js";

const app = document.getElementById('app');

export function render(viewNode) {
    app.innerHTML = '';

    app.appendChild(Navbar());

    const main = document.createElement('main');
    main.classList.add('container');
    main.appendChild(viewNode);
    app.appendChild(main);

    app.appendChild(Footer());
}