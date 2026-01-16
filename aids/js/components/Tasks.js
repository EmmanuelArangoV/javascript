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

                <!-- EJEMPLO 1: Tarea Pendiente -->
                <li class="todo-item">
                    <span class="todo-text">Preparar la estructura HTML</span>
                    <div class="todo-actions">
                        <!-- Tu JS debe escuchar click aquí para marcar como completado -->
                        <button class="action-btn check-btn" aria-label="Completar">✓</button>
                        <!-- Tu JS debe escuchar click aquí para eliminar -->
                        <button class="action-btn delete-btn" aria-label="Eliminar">🗑️</button>
                    </div>
                </li>

                <!-- EJEMPLO 2: Tarea Completada (Nota la clase 'completed') -->
                <li class="todo-item completed">
                    <span class="todo-text">Diseñar los estilos CSS</span>
                    <div class="todo-actions">
                        <button class="action-btn check-btn" aria-label="Desmarcar">✓</button>
                        <button class="action-btn delete-btn" aria-label="Eliminar">🗑️</button>
                    </div>
                </li>

            </ul>

            <!-- Mensaje si no hay tareas (Tu JS puede mostrar/ocultar esto) -->
            <p class="empty-message" style="display:none;">No tienes tareas pendientes.</p>

            <!-- Contador (Para darle vida con JS) -->
            <div class="todo-footer">
                <span>Tienes <b id="pending-count">1</b> tarea pendiente</span>
                <button id="clear-btn" class="clear-btn">Borrar completadas</button>
            </div>
        </div>
    `;

    return section;
}