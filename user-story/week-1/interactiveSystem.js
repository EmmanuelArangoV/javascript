let userName = prompt("Enter your name:");

while (!userName || userName.trim() === "") {
    alert("The name can't be empty. Please enter a valid name.");
    userName = prompt("Enter your name:");
}

let userAgeInput = prompt("Enter your age:");
let userAge = Number(userAgeInput);

const messageElement = document.getElementById("message");

if (userAgeInput.trim() === "" || isNaN(userAge) || userAge < 0) {

    console.error("Age input is invalid.");
    messageElement.textContent = "Error: Invalid age input. Please enter a valid age.";
    document.body.style.background = "linear-gradient(to right, red, darkred)";
} else {

    if (userAge < 18) {
        const message = `Hi ${userName}, you're a minor. Continue learning and exploring the world of programming!`;
        console.log(message);
        alert(message);
        messageElement.textContent = message;
        document.body.style.background = "linear-gradient(to right, lightblue, blue)";

    } else {
        const message = `Hi ${userName}, you're an adult. Get ready to take on new challenges in programming and life!`;
        console.log(message);
        alert(message);
        messageElement.textContent = message;
        document.body.style.background = "linear-gradient(to right, lightgreen, green)";
    }
}
