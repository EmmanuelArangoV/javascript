// SPA navigation
const views = document.querySelectorAll('.view');
const navButtons = document.querySelectorAll('[data-view]');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        views.forEach(v => {
            v.classList.add('d-none');
            
            let viewId = btn.getAttribute('data-view');
            
            if (v.id === viewId) {
                v.classList.remove('d-none');
            }
        } );
    });
});

// Form logic
const saveBtn = document.getElementById('saveBtn');
const items = document.getElementById('items');
const formMsg = document.getElementById('formMsg');

saveBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    if (!name || !age) {
        formMsg.innerHTML = `<div class="alert alert-danger">Campos incompletos</div>`;
        return;
    }

    formMsg.innerHTML = `<div class="alert alert-success">Guardado</div>`;

    items.innerHTML += `
    <div class="col-md-4">
      <div class="card p-3">
        <h5>${name}</h5>
        <p>Edad: ${age}</p>
      </div>
    </div>
  `;
});

//
// Seleccionamos todos los botones del acordeón
const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Obtenemos el ID del contenido objetivo (ej: "#collapseOne")
        const targetId = button.getAttribute('data-bs-target');
        const targetContent = document.querySelector(targetId);

        // Verificamos si este elemento ya está abierto
        const isCurrentlyOpen = targetContent.classList.contains('show');

        // PASO 1: Cerrar todos los paneles (comportamiento de acordeón exclusivo)
        document.querySelectorAll('.accordion-collapse').forEach(collapse => {
            collapse.classList.remove('show');
        });

        // Restaurar el estado visual de los botones a "cerrado"
        document.querySelectorAll('.accordion-button').forEach(btn => {
            btn.classList.add('collapsed');
            btn.setAttribute('aria-expanded', 'false');
        });

        // PASO 2: Si el que clickeamos estaba cerrado, lo abrimos
        if (!isCurrentlyOpen) {
            targetContent.classList.add('show');
            button.classList.remove('collapsed');
            button.setAttribute('aria-expanded', 'true');
        }
    });
});
