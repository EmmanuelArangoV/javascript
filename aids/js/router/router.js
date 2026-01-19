import { render } from "../main.js";
import { Hero } from "../views/Hero.js";
import { Cards } from "../views/Cards.js";
import { Accordion } from "../views/Accordion.js";
import { Gallery } from "../views/Gallery.js";
import { Form } from "../views/Form.js";
import { Tasks } from "../views/Tasks.js";

const routes = {
    'hero': Hero,
    'cards': Cards,
    'accordion': Accordion,
    'gallery': Gallery,
    'contact': Form,
    'tasks': Tasks
}

export function router() {
    let hash = window.location.hash.slice(1);

    if (!hash || hash === '/') {
        hash = 'hero';
        window.location.hash = 'hero';
    }

    const viewRenderFunction = routes[hash];

    if (viewRenderFunction) {
        const viewContent = viewRenderFunction();
        render(viewContent);
    } else {
        console.error('Ruta no encontrada:', hash);
        render(`<div class="section"><h1>Error 404: Página no encontrada</h1></div>`);
    }
}