'use strict';

const addContactForm = document.querySelector('#addContactForm');
const contactBook = document.querySelector('#contactBook');
const tableRowTemplate = document.querySelector('#tableRowTemplate').innerHTML;
const lastNode = document.querySelector('#lastNode');
const inputElements = document.querySelectorAll('#name, #surname, #phone');

addContactForm.addEventListener('submit', addContactFormSubmit);
contactBook.addEventListener('click', onTabelRowClick);

for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener("blur", inputFieldOnBlur, true);
    inputElements[i].addEventListener("focus", inputFieldOnFocus, true);
}

function addContactFormSubmit(e) {
    e.preventDefault();
    submitForm();
}
function onTabelRowClick(e) {
    if(e.target.classList.contains('delete-btn')) {
        e.target.closest('#contact').remove();
    }
}
function inputFieldOnBlur() {
    if(this.value.trim() === '') {
        this.classList.add('invalid');
    }
}
function inputFieldOnFocus() {
    if(this.classList.contains('invalid')) {
        this.classList.remove('invalid');
    }
}
function submitForm() {
    if(isAllFormInputsAreValid()) {
        const contact = getInputValues();
        addContact(contact);
        clearForm();
    }
}
function isAllFormInputsAreValid() {
    let isValid = true;
    for (let i = 0; i < inputElements.length; i++) {
        if(inputElements[i].classList.contains('invalid') || isEmpty(inputElements[i].value)) {
            isValid = false;
            inputElements[i].classList.add('invalid');
        }
    }
    return isValid;
}
function isEmpty(value) {
    return value.trim() === '';
}
function getInputValues() {
    const formFields = addContactForm.elements;

    return {
        name: formFields['name'].value,
        surname: formFields['surname'].value,
        phone: formFields['phone'].value
    };
}
function addContact(newContact) {
    const html = getNewContactHtml(newContact);
    const contact = htmlToElement(html);
    
    lastNode.before(contact);
}
function getNewContactHtml(contact) {
    return tableRowTemplate.replace('{{name}}',  contact.name)
                           .replace('{{surname}}',contact.surname)
                           .replace('{{phone}}',contact.phone);
}
function htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content.firstChild;
}
function clearForm() {
    addContactForm.reset();
}