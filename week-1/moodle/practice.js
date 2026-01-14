/*let age = parseInt(prompt("Please enter your age:", "18"));
if (age >= 18) {
    console.log("You are an adult.");
}
else {
    alert("You are a minor.");
}*/

// JavaScript
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter your age: ', (answer) => {
    const age = parseInt(answer, 10);
    if (Number.isNaN(age)) {
        console.log('Invalid number.');
    } else if (age >= 18) {
        console.log('You are an adult.');
    } else {
        console.log('You are a minor.');
    }
    rl.close();
});

// JavaScript
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

function parseAge(inputStr) {
    return Number.parseInt(inputStr, 10);
}

function validateAge(age) {
    if (Number.isNaN(age)) return 'Invalid number.';
    if (age >= 18) return 'You are an adult.';
    return 'You are a minor.';
}

async function main() {
    const rl = readline.createInterface({ input, output });
    try {
        const answer = await rl.question('Please enter your age: ');
        const age = parseAge(answer);
        console.log(validateAge(age));

        // `age` is available here for further logic
        // e.g., save to DB or use in next steps
    } finally {
        rl.close();
    }
}

main();