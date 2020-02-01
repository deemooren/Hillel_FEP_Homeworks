"use strict";

fetch('https://jsonplaceholder.typicode.com/photos?_limit=50')
    .then(response => {
        response.json()
        .then(data => {
            data.forEach(item => {
                addItemToList(item.title);
            })
        });
    });

const ulistElement = document.querySelector("#toDoList");
const liTemplate = document.querySelector("#liTemplate").innerHTML;
let currentItemNum = 1;

document.querySelector("#toDoList").addEventListener("click", markListItem);

function addItemToList(item) {
    ulistElement.innerHTML += liTemplate.replace("{{todo}}", item).replace("{{currentNumber}}", currentItemNum++);
}
function markListItem(e) {
    const currentElement = e.target;
    switchItemStage(currentElement);
}
function switchItemStage(itemElement) {
    itemElement.classList.toggle("done");
}