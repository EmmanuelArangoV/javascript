//CONSOLE METHODS EXAMPLES

// normal JavaScript code to print "Hello World!" to the console
console.log("Hello World! This is my first JavaScript code.");

// Error message example
console.error("This is an error message example.");

// Warning message example
console.warn("This is a warning message example.");

// Info message example
console.info("This is an info message example.");

// Group and endGroup example
console.group("My Grouped Messages");
console.log("This is the first message in the group.");
console.log("This is the second message in the group.");
console.log("This is the third message in the group.");
console.groupEnd();

// Console time and timeEnd example
console.time("MyTimer");
for (let i = 0; i < 1000000; i++) {
  // Simulating a time-consuming task
}
console.timeEnd("MyTimer");

// PROMPT, ALERT, CONFIRM EXAMPLES

// Alert example
alert("Welcome to my JavaScript program!");

// Prompt example
let userName = prompt("Please enter your name:", "John Doe");
console.log("User's name is: " + userName);

// Confirm example
let isConfirmed = confirm("Do you want to proceed?");
if (isConfirmed) {
  console.log("User chose to proceed.");
} else {
  console.log("User chose not to proceed.");
}

// VARIABLE DECLARATION EXAMPLES

// let: used to declare variables that can be reassigned
let age = 25;
console.log("Age: " + age);
age = 26; // reassigning the variable
console.log("Age: ", age);

// const: used to declare variables that cannot be reassigned
const birthYear = 1998;
console.log("Birth Year: " + birthYear);
// birthYear = 1999; // This will cause an error

let name = "Alice", isStudent = true, height = 5.6;

// DATA TYPES

// number
let score = 95;
const pi = 3.14;
let largeNumb = 2_385_000_001;
console.log("Score:", score, "Pi:", pi, "Large Number:", largeNumb);
let infinityNum = Infinity;
let negativeInfinityNum = -Infinity;
console.log("Infinity:", infinityNum, "Negative Infinity:", negativeInfinityNum);

// string
let greeting = "Hello, World!" + userName + "!";
console.log(greeting);

let inverted = `Hello, ${userName}! Welcome to the JavaScript world.`;
console.log(inverted);

// boolean
let isJavaScriptFun = true;
let isFishTasty = false;
console.log("Is JavaScript fun?", isJavaScriptFun);
console.log("Is fish tasty?", isFishTasty);

// undefined
let undefinedVar;
console.log("Undefined variable:", undefinedVar);

// null
let nullVar = null;
console.log("Null variable:", nullVar);

// object
let person = {
    name: "Bob",
    age: 30,
    isEmployed: true
};
console.log("Person Object:", person);

// symbol
let sym1 = Symbol("uniqueIdentifier");
let sym2 = Symbol("uniqueIdentifier");
console.log("Are symbols equal?", sym1 === sym2);


// Ternary Operator Example
let status = (age >= 18) ? "Adult" : "Minor";
console.log(status);

// Console Assert
console.assert(age >= 18, "Age is less than 18!");
let skills = ["JavaScript", "HTML", "CSS"];
console.assert(skills.includes('Java'), "JavaScript skill is missing!");