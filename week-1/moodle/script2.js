// BUCLES

// for loop
for (let i = 0; i < 5; i++) {
    console.log("Iteración 0 número: " + i);
}

// while loop
let j = 0;
while (j < 5) {
    console.log("Iteración 1 número: " + j);
    j++;
}

// do...while loop
let k = 0;
do {
    console.log("Iteración 2 número: " + k);
    k++;
} while (k !== 1);

// break: Exit the loop entirely

// continue: Skip the current iteration and move to the next one


// FUNCTIONS

// declared function

function saludar(nombre) {
    console.log("Hola, " + nombre + "!");
}

function saludar2(nombre) {
    return `Hola, ${nombre}!`;
}

saludar("Ana");
console.log(saludar2("Luis"));

// anonymous function

const despedir = function(nombre) {
    return `Adiós, ${nombre}!`;

};

console.log(despedir("Carlos"));

// autonomous function (IIFE - Immediately Invoked Function Expression)

(function(nombre) {
    console.log(`¡Bienvenido, ${nombre}!`);
})("Marta");

// arrow function

const multiplicar = (a, b) => a * b;

console.log(multiplicar(3, 4));

const sum = (...numeros) => {
    return numeros.reduce((acum, actual) => acum + actual, 0);
}
console.log(sum(1, 2, 3, 4, 5));

function saludar3 (nombre = "Usuario") {
    return `Hola ${nombre}!`;
}

console.log(saludar3());
console.log(saludar3("Pedro"));

function calcularCirculo(radio) {
    const PI = 3.1416;
    const area = PI * radio ** 2;
    const perimetro = 2 * PI * radio;
    return { area, perimetro };
}

const resultado = calcularCirculo(5);
console.log(`Área: ${resultado.area}, Perímetro: ${resultado.perimetro}`);
