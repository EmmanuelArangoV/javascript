// COUNTER FUNCTIONALITY

const counterText = document.getElementById('counterField');
const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');
const resetButton = document.getElementById('resetButton');

function updateCounter(action) {
    let currentValue = Number(counterText.textContent);
    switch (action) {
        case 'add':
            currentValue++;
            break;
        case 'remove':
            currentValue--;
            break;
        default:
            break;
    }
    counterText.textContent = currentValue;
}

addButton.addEventListener('click', () =>
    updateCounter('add'));

removeButton.addEventListener('click', () =>
    updateCounter('remove'));

resetButton.addEventListener('click', function() {
    counterText.textContent = '0';
});

// GREETING FUNCTIONALITY
const nameInput = document.getElementById('nameInput');
const inputInfo = document.getElementById('inputInfo');
const originalText = inputInfo.textContent;
let typingTimer;

nameInput.addEventListener('input', (event) => {
    inputInfo.textContent = 'Typing name...';
    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
        inputInfo.textContent = originalText;
    }, 1000);
});

const greetButton = document.getElementById('greetButton');
greetButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name !== '') {
        inputInfo.textContent = `Hello, ${name}! We're thrilled to meet you!`;
        inputInfo.style.background = 'lightgreen';
        inputInfo.style.font = 'bold';
    } else {
        inputInfo.textContent = 'Enter a valid name to be greeted.';
        inputInfo.style.background = 'lightcoral';
        inputInfo.style.font = 'bold';
    }
})

// AGE VERIFICATION
const ageInput = document.getElementById('ageInput');
const ageButton = document.getElementById('ageButton');
const accessMessage = document.getElementById('accessMessage');


ageButton.addEventListener('click', () => {
    const ageValue = ageInput.value.trim();
    const age = Number(ageValue);

    // Función auxiliar para mostrar el mensaje con estilos
    const showMessage = (text, type) => {
        // 1. Quitar la clase 'hidden' para que se muestre
        accessMessage.classList.remove('hidden');

        // 2. Establecer el texto
        accessMessage.textContent = text;

        // 3. Reiniciar clases base y colores (para limpiar estados anteriores)
        accessMessage.className = 'p-2 rounded text-xs font-medium text-center border transition-all duration-300 transform animate-pulse';

        // 4. Aplicar colores según el tipo
        if (type === 'success') {
            // Verde para mayores de edad
            accessMessage.classList.add(
                'bg-green-100', 'text-green-800', 'border-green-200',
                'dark:bg-green-900/30', 'dark:text-green-300', 'dark:border-green-800'
            );

        } else if (type === 'error') {
            // Rojo para menores de edad
            accessMessage.classList.add(
                'bg-red-100', 'text-red-800', 'border-red-200',
                'dark:bg-red-900/30', 'dark:text-red-300', 'dark:border-red-800'
            );
        } else {
            // Amarillo para entradas inválidas
            accessMessage.classList.add(
                'bg-yellow-100', 'text-yellow-800', 'border-yellow-200',
                'dark:bg-yellow-900/30', 'dark:text-yellow-300', 'dark:border-yellow-800'
            );
        }
    };

    if (ageValue === '' || Number.isNaN(age) || !Number.isInteger(age) || age < 0) {
        showMessage('⚠️ Por favor, ingresa una edad válida.', 'warning');
    } else if (age >= 18) {
        showMessage('✅ Acceso Concedido. Eres mayor de edad.', 'success');
    } else {
        showMessage('⛔ Acceso Denegado. Eres menor de edad.', 'error');
    }
});

// ==========================================
// TASK MANAGER FUNCTIONALITY
// ==========================================
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

// Función para actualizar el contador de tareas pendientes
function updateTaskCount() {
    const totalTasks = taskList.children.length;
    // Filtramos cuántas no tienen la clase 'completed' (opcional, o contamos todas)
    // Aquí contaremos todas las activas en la lista visualmente
    taskCount.textContent = `${totalTasks} Pending`;
}

// Función para crear el HTML de la tarea
function createTaskElement(text) {
    const div = document.createElement('div');
    // Clases base + animación de entrada (opacity-0 -> opacity-100)
    div.className = "flex items-center justify-between p-3 rounded-lg border border-[#f0f2f4] dark:border-gray-700 bg-white dark:bg-[#101922] hover:border-primary/50 transition-all duration-300 group/item opacity-0 transform translate-y-2";

    div.innerHTML = `
        <div class="flex items-center gap-3 cursor-pointer task-content">
            <!-- Checkbox simulado -->
            <div class="checkbox-icon size-5 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-primary transition-colors">
                <span class="material-symbols-outlined text-white text-[16px] opacity-0 scale-0 transition-all duration-200">check</span>
            </div>
            <!-- Texto de la tarea -->
            <span class="task-text text-sm text-[#111418] dark:text-gray-200 transition-all duration-200">${text}</span>
        </div>
        <!-- Botón borrar -->
        <button class="delete-btn text-gray-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity p-1">
            <span class="material-symbols-outlined text-[20px]">delete</span>
        </button>
    `;

    // Lógica del botón Check/Completar
    const contentArea = div.querySelector('.task-content');
    const checkbox = div.querySelector('.checkbox-icon');
    const checkIcon = div.querySelector('.material-symbols-outlined');
    const taskText = div.querySelector('.task-text');
    let isCompleted = false;

    contentArea.addEventListener('click', () => {
        isCompleted = !isCompleted;
        if (isCompleted) {
            // Estilos de completado
            checkbox.classList.remove('border-gray-300', 'dark:border-gray-600');
            checkbox.classList.add('bg-primary', 'border-primary');
            checkIcon.classList.remove('opacity-0', 'scale-0');
            taskText.classList.add('line-through', 'text-gray-400');
            taskText.classList.remove('text-[#111418]', 'dark:text-gray-200');
        } else {
            // Estilos de pendiente
            checkbox.classList.add('border-gray-300', 'dark:border-gray-600');
            checkbox.classList.remove('bg-primary', 'border-primary');
            checkIcon.classList.add('opacity-0', 'scale-0');
            taskText.classList.remove('line-through', 'text-gray-400');
            taskText.classList.add('text-[#111418]', 'dark:text-gray-200');
        }
    });

    // Lógica del botón Borrar
    const deleteBtn = div.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        // Animación de salida
        div.classList.remove('opacity-100', 'translate-y-0');
        div.classList.add('opacity-0', '-translate-x-4');

        // Esperar a que termine la animación para borrar del DOM
        setTimeout(() => {
            div.remove();
            updateTaskCount();
        }, 300);
    });

    return div;
}

// Función principal para agregar tarea
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    const newTask = createTaskElement(text);
    taskList.prepend(newTask); // Agrega al principio de la lista

    // Pequeño delay para permitir que el navegador renderice antes de activar la animación de entrada
    setTimeout(() => {
        newTask.classList.remove('opacity-0', 'translate-y-2');
        newTask.classList.add('opacity-100', 'translate-y-0');
    }, 10);

    taskInput.value = ''; // Limpiar input
    updateTaskCount();
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Inicializar contador
updateTaskCount();

// ==========================================
// DARK MODE FUNCTIONALITY
// ==========================================

const htmlElement = document.documentElement;
const headerThemeBtn = document.getElementById('headerThemeBtn');
const themeCheckbox = document.getElementById('themeCheckbox');

// Función única para cambiar el tema
function toggleTheme(isDark) {
    if (isDark) {
        htmlElement.classList.add('dark');
        // Sincronizar el checkbox visualmente
        if (themeCheckbox) themeCheckbox.checked = true;
    } else {
        htmlElement.classList.remove('dark');
        // Sincronizar el checkbox visualmente
        if (themeCheckbox) themeCheckbox.checked = false;
    }
}

// Evento para el botón del Header
if (headerThemeBtn) {
    headerThemeBtn.addEventListener('click', () => {
        // Verificar si tiene la clase dark actualmente
        const isDark = htmlElement.classList.contains('dark');
        // Invertimos el valor (si era dark, mandamos false, si no, true)
        toggleTheme(!isDark);
    });
}

// Evento para el Switch de la tarjeta
if (themeCheckbox) {
    themeCheckbox.addEventListener('change', (e) => {
        // Usamos el estado del checkbox (checked = true/false)
        toggleTheme(e.target.checked);
    });
}

// (Opcional) Inicialización: Leer preferencia del sistema o guardar estado
// Esto hace que si tu PC está en modo oscuro, la web arranque en modo oscuro
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleTheme(true);
}

// ==========================================
// CENTRALIZED LOGGER SYSTEM (DEFINICIÓN + INTEGRACIÓN)
// ==========================================

// 1. DEFINICIÓN DEL LOGGER (La parte que te faltaba)
const consoleInput = document.getElementById('consoleInput');
const consoleLogBtn = document.getElementById('consoleLogBtn');
const consoleOutput = document.getElementById('consoleOutput');
const consoleClearBtn = document.getElementById('consoleClearBtn');

// Función maestra para pintar en la consola
function systemLog(message, type = 'info') {
    if (!consoleOutput) return;

    // Hora
    const now = new Date();
    const time = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;

    // Fila
    const row = document.createElement('div');
    row.className = "flex gap-2 font-mono text-xs md:text-sm opacity-0 transform translate-x-2 transition-all duration-300";

    // Color según tipo
    let colorClass = "text-gray-300";
    if (type === 'success') colorClass = "text-green-400";
    if (type === 'error') colorClass = "text-red-400";
    if (type === 'warn') colorClass = "text-yellow-400";
    if (type === 'system') colorClass = "text-blue-300 italic";

    row.innerHTML = `<span class="text-blue-500 opacity-50 shrink-0 select-none">${time}</span> <span class="${colorClass}">${message}</span>`;

    consoleOutput.appendChild(row);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;

    // Animación de entrada
    requestAnimationFrame(() => {
        row.classList.remove('opacity-0', 'translate-x-2');
    });
}

// Eventos Manuales (Botón enviar y limpiar)
if (consoleLogBtn && consoleInput) {
    const sendLog = () => {
        if (consoleInput.value.trim()) {
            systemLog(consoleInput.value, 'info');
            consoleInput.value = '';
        }
    };
    consoleLogBtn.addEventListener('click', sendLog);
    consoleInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendLog();
        }
    });
}
if (consoleClearBtn) {
    consoleClearBtn.addEventListener('click', () => {
        consoleOutput.innerHTML = '';
        systemLog('Console cleared.', 'system');
    });
}


// 2. INTEGRACIÓN AUTOMÁTICA (Escucha a los otros botones)
(function integrateLogger() {

    // Helper seguro
    const log = (msg, type) => systemLog(msg, type);

    // Saludo
    const btnGreet = document.getElementById('greetButton');
    if (btnGreet) {
        btnGreet.addEventListener('click', () => {
            setTimeout(() => {
                const nameVal = document.getElementById('nameInput')?.value;
                if (nameVal && nameVal.trim() !== '') log(`Greeting generated for "${nameVal}"`, 'success');
                else log('Greeting failed: Name missing', 'error');
            }, 50);
        });
    }

    // Contador
    const btnAdd = document.getElementById('addButton');
    const btnRem = document.getElementById('removeButton');
    const btnRes = document.getElementById('resetButton');
    if (btnAdd) btnAdd.addEventListener('click', () => setTimeout(() => log(`Counter: +1 (Value: ${document.getElementById('counterField').textContent})`, 'info'), 50));
    if (btnRem) btnRem.addEventListener('click', () => setTimeout(() => log(`Counter: -1 (Value: ${document.getElementById('counterField').textContent})`, 'info'), 50));
    if (btnRes) btnRes.addEventListener('click', () => log('Counter reset to 0', 'warn'));

    // Edad
    const btnAge = document.getElementById('ageButton');
    if (btnAge) {
        btnAge.addEventListener('click', () => {
            const ageVal = Number(document.getElementById('ageInput')?.value);
            if (!ageVal || ageVal < 0) log(`Age Check: Invalid input`, 'error');
            else if (ageVal >= 18) log(`Age Check: ${ageVal} (Adult) - Access Granted`, 'success');
            else log(`Age Check: ${ageVal} (Minor) - Access Denied`, 'warn');
        });
    }

    // Task Manager (Agregar)
    const btnAddTask = document.getElementById('addTaskBtn');
    if (btnAddTask) {
        btnAddTask.addEventListener('click', () => {
            setTimeout(() => {
                // Si la lista creció, asumimos éxito. (Un poco hacky pero no requiere cambiar tu código original)
                const list = document.getElementById('taskList');
                if (list && list.firstElementChild) {
                    const text = list.firstElementChild.querySelector('.task-text')?.textContent;
                    // Evitamos loguear si parece que no se agregó nada nuevo recientemente (opcional)
                    log(`Task Added: "${text}"`, 'success');
                }
            }, 100);
        });
    }

    // Task Manager (Completar/Borrar) - Delegación de eventos
    const taskList = document.getElementById('taskList');
    if (taskList) {
        taskList.addEventListener('click', (e) => {
            // Borrar
            if (e.target.closest('.delete-btn')) {
                log('Task Manager: Task deleted', 'error');
            }
            // Completar
            const item = e.target.closest('.group\\/item');
            if (item && !e.target.closest('.delete-btn')) {
                setTimeout(() => {
                    const isDone = item.querySelector('.task-text').classList.contains('line-through');
                    const text = item.querySelector('.task-text').textContent;
                    if (isDone) log(`Task Completed: "${text}"`, 'success');
                    else log(`Task Reopened: "${text}"`, 'info');
                }, 50);
            }
        });
    }

    // Dark Mode
    const btnTheme = document.getElementById('headerThemeBtn');
    const checkTheme = document.getElementById('themeCheckbox');
    const logTheme = () => {
        const isDark = document.documentElement.classList.contains('dark');
        log(`Theme changed to ${isDark ? 'Dark Mode' : 'Light Mode'}`, 'system');
    };
    if (btnTheme) btnTheme.addEventListener('click', () => setTimeout(logTheme, 50));
    if (checkTheme) checkTheme.addEventListener('change', () => setTimeout(logTheme, 50));

    // Mensaje de inicio
    systemLog('Console System Initialized...', 'system');

})();

