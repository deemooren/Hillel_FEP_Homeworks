const TODOS_KEY = 'todos';

const $todoListElement = $('#todoList');
const $addTodoForm = $('#addTodoForm');
let todos = [];

init();

$addTodoForm.submit(onSubmitForm);
$todoListElement.on('click', '.todo-item', onTodoItemClick);
$todoListElement.on('click', '.delete-btn', onDeleteBtnClick);

function init() {
    getTodos();
}
function onSubmitForm(e) {
    e.preventDefault();
    addTodo();
    resetForm();
}
function onTodoItemClick(e) {
    const $target = $(e.target);
    editTodoItem($target.data('id'));
}
function onDeleteBtnClick(e) {
    e.stopPropagation();

    const $target = $(e.target);
    deleteDotoItem($target.parent().data('id'));
}
function addTodo() {
    const text = $('#todoInput').val().trim();

    if(text.length !== 0) {
        const newTodo = createNewTodo(text);
        todos.push(newTodo);
        saveChanchingInLocalStorage(todos);
        renderTodoItem(newTodo);
    }
}
function getTodos() {
    let data = localStorage.getItem(TODOS_KEY);
    data = data ? JSON.parse(data) : [];

    setTodos(data);
    renderTodos(data);
}
function setTodos(data) {
    return (todos = data);
}
function renderTodos(data) {
    data.forEach(item => {
        renderTodoItem(item);
    });
}
function renderTodoItem(todo) {
    const listTemplate = $('#liElementTemplate').html();
    const $todo = $(listTemplate.replace('{{to-do}}', todo.title)
                                 .replace('{{id}}', todo.id));
    if(todo.isDone) {
        $todo.addClass('done');
    }

    $todoListElement.append($todo);
}
function createNewTodo(value) {
    return {
        id: Date.now(),
        title: value,
        isDone: false
    };
}
function deleteDotoItem(id) {
    const $currElement = getDOMElementByDataId(id);
    $currElement.remove();

    todos = todos.filter(todo => todo.id !== Number(id));
    saveChanchingInLocalStorage(todos);
}
function editTodoItem(id) {
    const $currElement = getDOMElementByDataId(id);
    $currElement.toggleClass('done');

    const currItem = todos.find(item => item.id === id);
    const currStatus = currItem.isDone;
    currItem.isDone = currStatus ? false : true;
    saveChanchingInLocalStorage(todos);
}
function saveChanchingInLocalStorage(todos) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}
function resetForm() {
    $addTodoForm.trigger('reset');
}
function getDOMElementByDataId(id) {
    return $(`.todo-item[data-id='${id}']`);
}