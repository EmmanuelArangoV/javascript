export function TaskCard(title) {
    return `
        <span class="todo-text">${title}</span>
        <div class="todo-actions">
            <!-- Los eventos se manejan en Tasks.js mediante delegación -->
            <button class="action-btn check-btn" aria-label="Completar">✓</button>
            <button class="action-btn delete-btn" aria-label="Eliminar">🗑️</button>
        </div>
    `;
}