"use strict";

const operation = askOperation();
const quantityOfOperands = askQuantityOfOperands();
let result = null;

for(let i = 1; i <= quantityOfOperands; i++) {
    const operand = Number(askOperand());

    if(result == null) {
        result = operand;
    } 
    else {
        switch(operation) {
            case "+":
                result += operand;
                break;
            case "-":
                result -= operand;
                break;
            case "*":
                result *= operand;
                break;
            case "/":
                result /= operand;
                break;
        }
    }
}

alert(`Result: ${result}`);


function askOperation() {
    let operation;
    do {
        operation = prompt("Enter operation(+, -, *, /): ").trim();
    } while((operation != "+") && (operation != "-") && (operation != "*") && (operation != "/"));

    return operation;
}
function askQuantityOfOperands() {
    let quantity;
    do {
        quantity = prompt("Type how many operands you want to enter (1 - 5): ");
    } while(isNaN(quantity) || quantity < 1 || quantity > 5 || (quantity % 1 != 0));

    return quantity;
}
function askOperand() {
    let operand;
    let i = 0;
    do {
        if(i > 0)
            alert("Error! Enter correct value!");

        operand = prompt(`Enter operand: `);
        i++;
    } while(isNaN(operand));

    return operand;
}