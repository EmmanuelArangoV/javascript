import { TaskCard } from "../components/TaskCard.js"; // Asegúrate de la extensión .SPA
import { store } from "../state/store.js";

export function Tasks() {
    const section = document.createElement('section');
    section.classList.add('section');
    section.id = 'tasks';
    section.innerHTML = `
         <h2 class="section-title">Mis Tareas</h2>
        <div class="todo-wrapper">
            <div class="todo-input-group">
                <input type="text" id="todo-input" placeholder="¿Qué tienes pendiente hoy?">
                <button id="add-btn" class="btn btn-primary"><span class="plus-icon">+</span></button>
            </div>
            <div class="todo-filters">
                <button class="filter-btn active" data-filter="all">Todas</button>
                <button class="filter-btn" data-filter="pending">Pendientes</button>
                <button class="filter-btn" data-filter="completed">Completadas</button>
            </div>
            <ul class="todo-list" id="todo-list"></ul>
            <p class="empty-message" style="display:none;">No tienes tareas pendientes.</p>
            <div class="todo-footer">
                <span>Tienes <b id="pending-count">0</b> tarea pendiente</span>
            </div>
        </div>
    `;

    const todoList = section.querySelector('#todo-list');
    store.tasks.forEach(task => addTaskToDOM(task, todoList, section));

    setUpTaskActions(section);
    updatePendingCount(section);
    displayEmptyMessage(section);

    return section;
}

function setUpTaskActions(sectionContext) {
    const addBtn = sectionContext.querySelector('#add-btn');
    const todoList = sectionContext.querySelector('#todo-list');

    addBtn.addEventListener('click', () => {
        const todoInput = sectionContext.querySelector('#todo-input');
        const taskText = todoInput.value.trim();

        if (taskText !== '') {
            const newTask = { id: Date.now(), title: taskText, completed: false };

            store.tasks.push(newTask);
            store.set(store.tasks);

            addTaskToDOM(newTask, todoList, sectionContext);
            todoInput.value = '';
        } else {
            alert('Por favor, ingresa una tarea válida.');
        }
    });

    // --- ACCIONES LISTA ---
    todoList.addEventListener('click', (e) => {
        const target = e.target;
        const taskItem = target.closest('.todo-item');
        if (!taskItem) return;

        const id = Number(taskItem.dataset.id);

        if (target.classList.contains('check-btn')) {
            taskItem.classList.toggle('completed');

            const task = store.tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                store.set(store.tasks);
            }

            updatePendingCount(sectionContext);
        }

        if (target.classList.contains('delete-btn')) {
            taskItem.remove();

            const newTasks = store.tasks.filter(t => t.id !== id);
            store.set(newTasks);

            updatePendingCount(sectionContext);
            displayEmptyMessage(sectionContext);
        }
    });

    const filterButtons = sectionContext.querySelectorAll('.filter-btn');
    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            const tasks = sectionContext.querySelectorAll('.todo-item');

            filterButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');

            tasks.forEach((task) => {
                const isCompleted = task.classList.contains('completed');
                switch (filter) {
                    case 'all': task.style.display = 'flex'; break;
                    case 'pending': task.style.display = isCompleted ? 'none' : 'flex'; break;
                    case 'completed': task.style.display = isCompleted ? 'flex' : 'none'; break;
                }
            });
        });
    });
}

function updatePendingCount(ctx) {
    const pendingCount = ctx.querySelector('#pending-count');
    const totalPending = ctx.querySelectorAll('.todo-item:not(.completed)').length;
    pendingCount.textContent = totalPending;
}

function displayEmptyMessage(sectionContext) {
    const tasks = sectionContext.querySelectorAll('.todo-item');
    const emptyMessage = sectionContext.querySelector('.empty-message');
    emptyMessage.style.display = tasks.length === 0 ? 'block' : 'none';
}


function addTaskToDOM(taskObj, container, sectionContext) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    if (taskObj.completed) li.classList.add('completed');

    li.dataset.id = taskObj.id;

    li.innerHTML = TaskCard(taskObj.title);

    container.appendChild(li);
    updatePendingCount(sectionContext);
    displayEmptyMessage(sectionContext);
}