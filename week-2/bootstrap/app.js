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
