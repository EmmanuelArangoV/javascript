let option = 3;
switch (option) {
    case 1:
        console.log("Option 1 selected.");
        break;
    case 2:
        console.log("Option 2 selected.");
        break;
    case 3:
        console.log("Option 3 selected.");
        break;
    default:
        console.log("No valid option selected.");
}

let vowel = 'a';
switch (vowel.toUpperCase()) {
    case 'A': case 'E': case 'O':
        console.log("It's an open vowel.");
        break;
    case 'I': case 'U':
        console.log("It's a closed vowel.");
        break;
    default:
        console.log("Not a vowel.");

}

let value = 'Coder' // If I put 0, "", null, undefined, NaN it will be falsy

if (value) {
    console.log("The value is truthy.");
}
else {
    console.log("The value is falsy.");
}

// Array
let fruits = ["Apple", "Banana", "Cherry"];
console.log("Fruits Array:", fruits);
console.log(fruits[0]); // Accessing first element
console.log(fruits.length); // Length of the array
fruits[1] = "Blueberry"; // Modifying an element
console.log("Modified Fruits Array:", fruits);
console.log(fruits[3]); // Accessing out-of-bounds index
fruits[5] = "Dragonfruit"; // Adding an element at index 5
console.log("Extended Fruits Array:", fruits);

let differentTypes = [42, "Hello", true, null, undefined, { key: "value" }, [1, 2, 3]];
console.log("Array with Different Data Types:", differentTypes);

for (let i = 0; i < fruits.length; i++) {
    console.log(`Fruit at index ${i}:`, fruits[i]);
    fruits[i] += ": ";
}
console.log(fruits);

// Object
let coder = {
    name: "Eve",
    age: 28,
    isEmployed: false,
    skills: ["JavaScript", "Python", "C++"]
};

console.log(coder.age)
console.log(coder.skills[1])
coder.age = 29;
coder.skills.push("Java"); // Adding a new skill
console.log(coder)
coder.country = "Colombia"; // Adding a new property
console.log(coder);

keys = Object.keys(coder);
console.log("Coder Object Keys:", keys);

// Set
let set = new Set([1, 2, 2, 3, 4, 4, 5]);
console.log("Set:", set);
set.add(6);
set.add(3); // Duplicate, won't be added
console.log("Modified Set:", set);

function sampleFunction() {
    return "This is a sample function.";
}

console.log("Type of function:", typeof sampleFunction());

// To fixed
let num = 7.56789;
console.log("Original number:", num);
console.log("Number with 2 decimal places:", num.toFixed(2));

// For of and for in
let languages = ["JavaScript", "Python", "Java"];
for (let lang of languages) {
    console.log("Language:", lang); // For of iterates over values
}

let car = {
    make: "Toyota",
    model: "Corolla",
    year: 2020
};
for (let key in car) {
    console.log(`${key}: ${car[key]}`); // For in iterates over keys
}


// Map in array
let numbers = [1, 2, 3, 4, 5];
let squaredNumbers = numbers.map(num => num * num);
console.log("Original Numbers:", numbers);
console.log("Squared Numbers:", squaredNumbers);

