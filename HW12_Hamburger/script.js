class Hamburger {
    static SIZE_SMALL = { calories: 20, price: 50 };
    static SIZE_MEDIUM = { calories: 30, price: 75 };
    static SIZE_BIG = { calories: 40, price: 100 };

    static TOPPING_CHEESE = { calories: 20, price: 10 };
    static TOPPING_SALAD = { calories: 5, price: 20 };
    static TOPPING_POTATO = { calories: 10, price: 15 };
    static TOPPING_SAUCE = { calories: 0, price: 15 };
    static TOPPING_MAYO = { calories: 5, price: 20 };

    constructor(size = Hamburger.SIZE_MEDIUM) {
        this.size = size;
        this.fillings = [];
    }

    add(filling) {
        this.fillings.push(filling);
    }
    calculatePrice() {
        return this.fillings.reduce((accumulator, filling) => accumulator + filling.price, this.size.price);
    }
    calculateCalories() {
        return  this.fillings.reduce((accumulator, filling) => accumulator + filling.calories, this.size.calories);
    }
}

const hamburger = new Hamburger(Hamburger.SIZE_BIG);
hamburger.add(Hamburger.TOPPING_MAYO);

console.log('Calories: ' + hamburger.calculateCalories());
console.log('Price: ' + hamburger.calculatePrice());

hamburger.add(Hamburger.TOPPING_SAUCE);

console.log('Price with sauce: ' + hamburger.calculatePrice());