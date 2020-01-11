"use strict";

const itemsQuantityElement = document.querySelector("#itemsQuantity");
const ulistElement = document.querySelector("#list");
const errorMessageElement = document.querySelector("#errorMessage");

document.querySelector("#generateBtn").addEventListener("click", generateListBtnClick);

function generateListBtnClick(e) {
    e.preventDefault();

    clearErrorMesage();
    clearList();
    generateList();
    clearInput();
    focus();
}
function generateList() {
    const quantity = itemsQuantityElement.value;

    if(validateInput(quantity)) {
        addListItems(quantity);
    }
    else {
        showErrorMessage();
    }
}
function validateInput(quantity) {
    return (!isNaN(quantity)) && (quantity !== "") && (quantity > 0) && (quantity < 100);
}
function showErrorMessage() {
    errorMessageElement.textContent = "Entered value has to be a number, greater than 0 and less than 100!";
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