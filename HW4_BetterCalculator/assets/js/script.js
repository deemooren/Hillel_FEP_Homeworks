"use strict";

const operation = askOperation();
const a = askOperand("first");
const b = askOperand("second");
let result = null;

switch(operation) {
    case "+":
        result = a + b;
        break;
    case "-":
        result = a - b;
        break;
    case "*":
        result = a * b;
        break;
    case "/":
        result = a / b;
        break;
}
alert(`Result: ${a} ${operation} ${b} = ${result}`);


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