
const views = document.querySelectorAll('.view');
const navButtons = document.querySelectorAll('[data-view]');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        views.forEach(view => {
            view.classList.add('hidden');
            
            const id = view.id;
            const viewId = button.getAttribute('data-view');
            
            if (id === viewId) {
                view.classList.remove('hidden');
            }
        });
    });
});

const saveBtn = document.getElementById('saveBtn');
const items = document.getElementById('items');
const formMsg = document.getElementById('formMsg');

saveBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    
    if(!name || !age) {
        formMsg.innerHTML = `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Campos incompletos</strong>
        </div>`;
        return;
    } else {
        formMsg.innerHTML = `<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Guardado</strong>
        </div>`;
    }
    
    items.innerHTML += `
    <div class="w-full md:w-1/3 px-2 mb-4">
        <div class="bg-white p-4 rounded shadow">
            <h5 class="text-xl font-bold mb-2">${name}</h5>
            <p class="text-gray-700">Edad: ${age}</p>
        </div>
    </div>
    `;
});