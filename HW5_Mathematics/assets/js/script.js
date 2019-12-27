"use strict";

const numbers = askNumbers();
const max = Math.max.apply(null, numbers);
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
const evenNumbers = numbers.filter(num => num % 2 == 0);

alert(`You entered: ${numbers}\nSum: ${sum}\nMax: ${max}\nEven numbers: ${evenNumbers}`);

function askNumbers() {
    let arr, i = 0;
    do {
        if(i > 0)
            alert("Error! Enter correct values (it must be numbers separated by , !");

        const numbersStr = prompt("Enter your numbers: ").replace(/\s/g, '');
        arr = numbersStr.split(",")
                        .filter(item => !isNaN(item))
                        .map(Number);
        i++;
    } while(arr.length == 0);
    
    return arr;
}