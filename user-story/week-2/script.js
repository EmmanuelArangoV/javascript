// ------------------------------------------
// TASK 1 - Creación del objeto de productos
// ------------------------------------------

const productos = {
    producto1: {
        id: 1,
        nombre: "Laptop",
        precio: 3500000
    },
    producto2: {
        id: 2,
        nombre: "Mouse",
        precio: 50000
    },
    producto3: {
        id: 3,
        nombre: "Teclado",
        precio: 120000
    }
};

// ------------------------------------------
// TASK 5 - Validaciones de productos
// ------------------------------------------

function validarProducto(producto) {
    if (
        producto.id === undefined ||
        typeof producto.id !== "number"
    ) {
        return false;
    }

    if (
        !producto.nombre ||
        typeof producto.nombre !== "string"
    ) {
        return false;
    }

    if (
        producto.precio === undefined ||
        typeof producto.precio !== "number" ||
        producto.precio <= 0
    ) {
        return false;
    }

    return true;
}

// Validación de todos los productos
console.log("VALIDACIÓN DE PRODUCTOS:");
for (const key in productos) {
    const esValido = validarProducto(productos[key]);
    console.log(`${key}:`, esValido ? "✔ Producto válido" : "✘ Producto inválido");
}

console.log("\n");

// ------------------------------------------
// TASK 2 - Uso de Set
// ------------------------------------------

// Set con valores repetidos
const numeros = new Set([1, 2, 3, 3, 4, 5, 5, 6]);

console.log("Set inicial (sin duplicados):");
console.log(numeros);

// Agregar nuevo número
numeros.add(10);

// Verificar existencia
console.log("¿Existe el número 3?", numeros.has(3));

// Eliminar número
numeros.delete(2);

console.log("Set después de modificaciones:");

// Recorrer con for...of
for (const numero of numeros) {
    console.log(numero);
}

console.log("\n");

// ------------------------------------------
// TASK 3 - Creación del Map
// ------------------------------------------

const categorias = new Map();

// Relación categoría → nombre del producto
categorias.set("Tecnología", "Laptop");
categorias.set("Accesorios", "Mouse");
categorias.set("Periféricos", "Teclado");

// ------------------------------------------
// TASK 4 - Iteración de estructuras
// ------------------------------------------

console.log("RECORRIDO DEL OBJETO (for...in):");

for (const clave in productos) {
    console.log(`Producto: ${clave}`);
    console.log("Valores:", productos[clave]);
}

console.log("\n");

// Uso de métodos del objeto
console.log("Object.keys():", Object.keys(productos));
console.log("Object.values():", Object.values(productos));
console.log("Object.entries():", Object.entries(productos));

console.log("\n");

// Recorrido del Set (for...of)
console.log("RECORRIDO DEL SET:");

for (const valor of numeros) {
    console.log(`Número: ${valor}`);
}

console.log("\n");

// Recorrido del Map con forEach
console.log("RECORRIDO DEL MAP:");

categorias.forEach((valor, clave) => {
    console.log(`Categoría: ${clave} → Producto: ${valor}`);
});

console.log("\n");

// ------------------------------------------
// TASK 5 - Pruebas finales
// ------------------------------------------

console.log("LISTA COMPLETA DE PRODUCTOS:");
console.log(productos);

console.log("\nLISTA DE PRODUCTOS ÚNICOS (SET):");
console.log(numeros);

console.log("\nCATEGORÍAS Y PRODUCTOS (MAP):");
console.log(categorias);
