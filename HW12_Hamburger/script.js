class Product {
    constructor(callories, price) {
        this.callories = callories;
        this.price = price;
    };
}
class Hamburger {
    static SIZE_SMALL = new Product(20, 50);
    static SIZE_MEDIUM = new Product(30, 75);
    static SIZE_BIG = new Product(40, 100);

    static TOPPING_CHEESE = new Product(20, 10);
    static TOPPING_SALAD = new Product(5, 20);
    static TOPPING_POTATO = new Product(10, 15);
    static TOPPING_SAUCE = new Product(0, 15);
    static TOPPING_MAYO = new Product(5, 20);

    constructor(size = Hamburger.SIZE_MEDIUM) {
        this.size = size;
        this.fillings = [];
    }

    add(filling) {
        this.fillings.push(filling);
    }
    calculatePrice() {
        let burgerPrice = this.size.price;
        burgerPrice += this.fillings.reduce((accumulator, filling) => accumulator + filling.price, 0);

        return burgerPrice;
    }
    calculateCalories() {
        let burgerCalories = this.size.callories;
        burgerCalories += this.fillings.reduce((accumulator, filling) => accumulator + filling.callories, 0);
        
        return burgerCalories;
    }
}


const hamburger = new Hamburger(Hamburger.SIZE_BIG);
hamburger.add(Hamburger.TOPPING_MAYO);

console.log('Calories: ' + hamburger.calculateCalories());
console.log('Price: ' + hamburger.calculatePrice());

hamburger.add(Hamburger.TOPPING_SAUCE);

console.log('Price with sauce: ' + hamburger.calculatePrice());