import { Navbar } from "./components/Navbar.js";
import { Footer} from "./components/Footer.js";
import {router} from "./router/router.js";
import { initStore } from './state/store.js';

initStore();

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

window.addEventListener('hashchange', router);
window.addEventListener('load', router);