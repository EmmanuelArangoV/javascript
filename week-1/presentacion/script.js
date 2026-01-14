
// Caso 1: Calcular promedio de calificaciones por cada estudiante mostrando   promedio, filtrar promedios >= 8 y ordenar de mayor a menor
const estudiantes = [
    { nombre: 'Ana', calificaciones: [8, 9, 7] },
    { nombre: 'Bruno', calificaciones: [9, 9, 8] },
    { nombre: 'Carlos', calificaciones: [6, 7, 8] }
];

// Para ordenar usar método .sort()

const promedio = estudiantes
.map(e=>({nombre : e.nombre,promedio : e.calificaciones
    .reduce((a,b)=> (a + b)) / e.calificaciones.length }))
    .filter (e=>e.promedio >=8)
    .sort()

    console.log(promedio)
