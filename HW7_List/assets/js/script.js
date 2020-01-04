"use strict";

const itemsQuantityElement = document.querySelector("#itemsQuantity");
const ulistElement = document.querySelector("#list");
const errorMessageElement = document.querySelector("#errorMessage");

document.querySelector("#generateBtn").addEventListener("click", generateListBtnClick);
document.querySelector("#listGenerator").onsubmit = function() { return false; };

function generateListBtnClick() {
    clearErrorMesage();
    clearList();
    generateList();
    clearInput();
    focus();
}
function generateList() {
    const quantity = itemsQuantityElement.value;

    if(quantity === "") {
        return;
    }
    else if(isNaN(quantity) || quantity <= 0 || quantity > 100) {
        showErrorMessage("Entered value has to be a number, greater than 0 and less than 100!");
    }
    else {
        addListItems(quantity);
    }
}
function showErrorMessage(message) {
    errorMessageElement.textContent = message;
}
function addListItems(quantity) {
    for(let i = 1; i <= quantity; i++) {
        ulistElement.innerHTML += `<li>${i}</li>`;
    }
}
function clearList() {
    ulistElement.innerHTML = "";
}
function clearInput() {
    itemsQuantityElement.value = "";
}
function clearErrorMesage() {
    errorMessageElement.textContent = "";
}
function focus() {
    itemsQuantityElement.focus();
}