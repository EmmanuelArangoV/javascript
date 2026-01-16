export function Tasks() {
    const section = document.createElement('section');
    section.classList.add('section');
    section.id = 'tasks';
    section.innerHTML = `
         <h2 class="section-title">Mis Tareas</h2>

        <div class="todo-wrapper">

            <!-- Input para agregar tarea -->
            <div class="todo-input-group">
                <input type="text" id="todo-input" placeholder="¿Qué tienes pendiente hoy?">
                <button id="add-btn" class="btn btn-primary">
                    <span class="plus-icon">+</span>
                </button>
            </div>

            <!-- Filtros (Opcional, para que tu JS filtre la lista) -->
            <div class="todo-filters">
                <button class="filter-btn active" data-filter="all">Todas</button>
                <button class="filter-btn" data-filter="pending">Pendientes</button>
                <button class="filter-btn" data-filter="completed">Completadas</button>
            </div>

            <!-- Lista de tareas -->
            <ul class="todo-list" id="todo-list">

            </ul>

            <!-- Mensaje si no hay tareas (Tu JS puede mostrar/ocultar esto) -->
            <p class="empty-message" style="display:none;">No tienes tareas pendientes.</p>

            <!-- Contador (Para darle vida con JS) -->
            <div class="todo-footer">
                <span>Tienes <b id="pending-count">0</b> tarea pendiente</span>
            </div>
        </div>
    `;

    setUpTaskActions(section);

    return section;
}

function setUpTaskActions(sectionContext) {
    const addBtn = sectionContext.querySelector('#add-btn');

    addBtn.addEventListener('click', () => {
        const todoInput = sectionContext.querySelector('#todo-input');
        const taskText = todoInput.value.trim();
        const todoList = sectionContext.querySelector('#todo-list');

        if (taskText !== '') {
            addTask(taskText, todoList);
            todoInput.value = '';
        } else {
            alert('Por favor, ingresa una tarea válida.');
        }
    });

    const todoList = sectionContext.querySelector('#todo-list');
    todoList.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('check-btn')) {
            const taskItem = target.closest('.todo-item');
            taskItem.classList.toggle('completed');
            updatePendingCount();
        }

        if (target.classList.contains('delete-btn')) {
            const taskItem = target.closest('.todo-item');
            taskItem.remove();
            updatePendingCount();
            displayEmptyMessage(sectionContext);
        }
    });

    displayEmptyMessage(sectionContext);

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
                    case 'all':
                        task.style.display = 'flex';
                        break;
                    case 'pending':
                        task.style.display = isCompleted ? 'none' : 'flex';
                        break;
                    case 'completed':
                        task.style.display = isCompleted ? 'flex' : 'none';
                        break;
                }
            });
        });
    });
}

function updatePendingCount() {
    const pendingCount = document.querySelector('#pending-count');
    const totalTasks = document.querySelectorAll('.todo-item').length;
    const completedTasks = document.querySelectorAll('.todo-item.completed').length;
    pendingCount.textContent = totalTasks - completedTasks;
}

function displayEmptyMessage(sectionContext) {
    let tasks = sectionContext.querySelectorAll('.todo-item');
    tasks = Array.from(tasks);
    if (tasks.length === 0) {
        const emptyMessage = sectionContext.querySelector('.empty-message');
        emptyMessage.style.display = 'block';
    } else {
        const emptyMessage = sectionContext.querySelector('.empty-message');
        emptyMessage.style.display = 'none';
    }
}

function addTask(taskTest, sectionContext) {

    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `
        <span class="todo-text">${taskTest}</span>
            <div class="todo-actions">
                <!-- JS debe escuchar click aquí para marcar como completado -->
                <button class="action-btn check-btn" aria-label="Completar">✓</button>
                <!-- JS debe escuchar click aquí para eliminar -->
                <button class="action-btn delete-btn" aria-label="Eliminar">🗑️</button>
            </div>`;

    sectionContext.appendChild(li);
    updatePendingCount();
    displayEmptyMessage(document);
}