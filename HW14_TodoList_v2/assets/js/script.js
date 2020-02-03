"use strict";

const ulistElement = document.querySelector("#toDoList");
const liTemplate = document.querySelector("#liTemplate").innerHTML;

fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => {
        response.json()
        .then(renderTodos);
    });

document.querySelector("#toDoList").addEventListener("click", markListItem);


function renderTodos(data) {
    data.forEach(item => {
        addItemToList(item.id, item.title, item.completed);
    });
}
function addItemToList(id, item, isCompleted) {
    ulistElement.innerHTML += liTemplate.replace("{{id}}", id)
                                        .replace("{{todo}}", item)
                                        .replace("{{completed}}", isCompleted ? "done" : "");
}
function markListItem(e) {
    const currentElement = e.target;
    switchItemStage(currentElement);
}
function switchItemStage(itemElement) {
    itemElement.classList.toggle("done");
}