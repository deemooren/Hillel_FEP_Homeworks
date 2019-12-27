"use strict";

const operation = askOperation();
const firstOperand = askOperand("first");
const secondOperand = askOperand("second");
let result = null;

switch(operation) {
    case "+":
        result = firstOperand + secondOperand;
        break;
    case "-":
        result = firstOperand - secondOperand;
        break;
    case "*":
        result = firstOperand * secondOperand;
        break;
    case "/":
        result = firstOperand / secondOperand;
        break;
}
alert(`Result: ${firstOperand} ${operation} ${secondOperand} = ${result}`);


function askOperation(){
    let operation;
    do {
        operation = prompt("Enter operation(+, -, *, /): ").trim(" ");
    } while((operation != "+") && (operation != "-") && (operation != "*") && (operation != "/"))

    return operation;
}
function askOperand(operandNum) {
    let operand;
    do {
        operand = Number(prompt(`Enter ${operandNum} operand: `));
    } while(isNaN(operand));

    return operand;
}