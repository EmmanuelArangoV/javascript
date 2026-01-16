export function Hero() {
    const section = document.createElement('section');
    section.classList.add('hero-section');
    section.id = 'hero';
    section.innerHTML = `
        <h1>Bienvenido a la SPA Kit de Examen JS</h1>
        <p>Esta plantilla contiene varios componentes interactivos para que puedas demostrar tus habilidades 
            en JavaScript. ¡Buena suerte!</p>
    `;

    return section;
}