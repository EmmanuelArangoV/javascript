export const store = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    set(newTasks) {
        this.tasks = newTasks;
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    },

    users: JSON.parse(localStorage.getItem('user'))  || [],
    setUser(newUserInfo) {
        this.users = newUserInfo;
        localStorage.setItem('user', JSON.stringify(newUserInfo));
    }
};

export const accordionData = [
    {
        header: "¿Cómo funciona este acordeón?",
        body: "Este contenido está oculto por defecto. Tu tarea con JS es cambiar la altura (height) o la visibilidad cuando se hace click en el header."
    },
    {
        header: "¿Puedo usar esto en mi examen?",
        body: "¡Claro que sí! La estructura está lista para que te enfoques 100% en la lógica de programación."
    },
    {
        header: "¿Qué propiedades CSS debo manipular?",
        body: "Generalmente alternas una clase (ej: .active) que cambia el `max-height` de 0 a un valor en px."
    }
];

export const cardData = [
    {
        title: 'Desarrollo Frontend', color: 'blue', tag: 'Tecnología', description: 'Aprende a construir interfaces modernas y responsivas utilizando las últimas tecnologías web.', price: '$30', duration: '3 Meses', imgSrc: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
        title: 'UI/UX Design', color: 'purple',tag: 'Diseño', description: 'Diseña experiencias de usuario que cautiven y resuelvan problemas reales de forma elegante.', price: '$30', duration: '3 Meses', imgSrc: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
        title: 'Servidores y APIs', color: 'green', tag: 'Backend', description: 'Domina la lógica del lado del servidor y conecta tus aplicaciones con bases de datos robustas.', price: '$30', duration: '3 Meses', imgSrc: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
]
