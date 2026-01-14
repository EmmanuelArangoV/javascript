car = {
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    color: "Blue",
    displayInfo() {
        console.log(`Car Information:
        Brand: ${this.brand}
        Model: ${this.model}
        Year: ${this.year}
        Color: ${this.color}`);
    },
    startEngine() {
        console.log("The engine has started.");
    }
}

car.displayInfo();