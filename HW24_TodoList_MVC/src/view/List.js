import { htmlToElement } from './helper';

export default class List {
    constructor() {
        this.listElement = document.createElement('ul');
        this.todoItemTeplate = document.getElementById('todoItemTemplate').innerHTML;
    }

    render(list) {
        list.map(this.renderTodoItem.bind(this));
    }

    renderTodoItem(item) {
        const todoHtml = this.getTodoHtml(item);
        const todo = htmlToElement(todoHtml);

        if(item.completed) {
            todo.classList.add('done');
        }

        this.listElement.append(todo);
    }

    getTodoHtml(todo) {
        return this.todoItemTeplate.replace('{{id}}', todo.id)
                                     .replace('{{todo}}', todo.title);
    }

    // htmlToElement(html) {
    //     const template = document.createElement('template');
    //     template.innerHTML = html.trim();

    //     return template.content.firstChild;
    // }
}