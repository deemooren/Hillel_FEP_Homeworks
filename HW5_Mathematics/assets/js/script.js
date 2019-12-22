"use strict";

const numbers = askNumbers();
const max = Math.max.apply(null, numbers);
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
const evenNumbers = numbers.filter(num => num % 2 == 0).map(item => Number(item));

alert(`You entered: ${numbers}\nSum: ${sum}\nMax: ${max}\nEven numbers: ${evenNumbers}`);


function askNumbers() {
    let arr, i = 0;
    do {
        if(i > 0)
            alert("Error! Enter correct values (it must be numbers separated by , !");

        const numbersStr = prompt("Enter your numbers: ").replace(/\s/g, '');
        arr = validateNumbers(numbersStr.split(","));
        i++;
    } while(arr.length == 0);
    
    return arr;
}
function validateNumbers(arr) {
    let newArr = arr.filter(item => !isNaN(item))
                    .map(item => Number(item)); // filter-remove all strings, map-cast all values in array to Number

    return newArr;
}