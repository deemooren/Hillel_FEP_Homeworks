import { htmlToElement } from './helper';

import './list.scss';

export default class List {
    constructor() {
        this.listElement = document.createElement('ul');
        this.todoItemTeplate = document.getElementById('todoItemTemplate').innerHTML;
    }

    render(list) {
        list.map(this.renderTodoItem.bind(this));
        this.listElement.classList.add('todo-list');
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
}