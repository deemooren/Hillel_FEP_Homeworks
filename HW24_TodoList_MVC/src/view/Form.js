import { htmlToElement } from './helper';

import './form.scss';

export default class Form {
    constructor() {
        this.formElement = this.createForm();
    }

    createForm() {
        const html = document.getElementById('todoFormTemplate').innerHTML;

        return htmlToElement(html);
    }
}