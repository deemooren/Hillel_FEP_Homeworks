"use strict";

const itemInputElement = document.querySelector("#itemInput");
const ulistElement = document.querySelector("#toDoList");
const liTemplate = document.querySelector("#liTemplate").innerHTML;

document.querySelector("#toDoForm").addEventListener("submit", toDoFormSubmit);
document.querySelector("#toDoList").addEventListener("click", markListItem);

function toDoFormSubmit(e) {
    e.preventDefault();

    const inputValue = getInputValue();

    if(validateInput(inputValue)) {
        addItemToList(inputValue);
    }

    clear();
}
function getInputValue() {
    return itemInputElement.value;
}
function validateInput(inputValue) {
    return inputValue !== "";
}
function addItemToList(inputValue) {
    ulistElement.innerHTML += liTemplate.replace("{{todo}}", inputValue);
}
function clear() {
    itemInputElement.value = "";
}
function markListItem(e) {
    const currentElement = e.target;
    switchItemStage(currentElement);
}
function switchItemStage(itemElement) {
    itemElement.classList.toggle("done");
}