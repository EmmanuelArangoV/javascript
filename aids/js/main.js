import { Navbar } from "./components/Navbar.js";
import { Hero } from "./components/Hero.js";
import { Cards } from "./components/Cards.js";
import { Accordion } from "./components/Accordion.js";
import { Gallery } from "./components/Gallery.js";
import { Form } from "./components/Form.js";
import { Tasks } from "./components/Tasks.js";

document.addEventListener("DOMContentLoaded", () => {
    
    const app = document.getElementById("app");
    app.appendChild(Navbar());
    
    const main = document.createElement("main");
    main.classList.add("container");
    app.appendChild(main);
    
    const container = document.querySelector(".container");
    
    // Agregar secciones al main
    container.appendChild(Hero());
    container.appendChild(Cards());
    container.appendChild(Accordion());
    container.appendChild(Gallery());
    container.appendChild(Form());
    container.appendChild(Tasks());
    
    initRouter();
});

function initRouter() {
    const navlinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const logo = document.getElementById('logo');

    // Initially hide all sections except the first one
    sections.forEach((section, index) => {
        if (index !== 0) {
            section.style.display = 'none';
        }
    });

    // Add click event listener to the logo to show the first section
    logo.addEventListener('click', () => {
        sections.forEach((section, index) => {
            if (index === 0) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });

    // Add click event listeners to navigation links
    navlinks.forEach(link => {
        link.addEventListener('click',  () => {

            // Get the target section ID from the link's href attribute
            const targetSection = link.getAttribute('href').substring(1);

            // Hide all sections and show only the target section
            sections.forEach(s => {
                s.style.display = 'none';

                // Show the target section
                const sectionId = s.getAttribute('id');
                if (sectionId === targetSection) {
                    s.style.display = 'block';
                }
            });

        });
    });
}
