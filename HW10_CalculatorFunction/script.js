function createCalculator(value) {
    let firstOperand = value;

    return {
        add: (secondOperand) => firstOperand + secondOperand,
        sub: (secondOperand) => firstOperand - secondOperand,
        mult: (secondOperand) => firstOperand * secondOperand,
        divide: (secondOperand) => {
            if(secondOperand != 0) {
                return firstOperand / secondOperand;
            } else {
                return "Cannot be divided by zero!";
            }
        },
        set: (value) => firstOperand = value
    };
};

const calculator = createCalculator(10);

console.log(calculator.add(45));
console.log(calculator.sub(45));
console.log(calculator.divide(5));
console.log(calculator.mult(5));
console.log(calculator.set(100));
console.log(calculator.mult(5));