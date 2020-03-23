import { htmlToElement } from './helper';

export default class Form {
    constructor() {
        this.formElement = this.createForm();
    }

    createForm() {
        const html = document.getElementById('todoFormTemplate').innerHTML;

        return htmlToElement(html);
    }
}