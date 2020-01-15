'use strict';

const addContactForm = document.querySelector('#addContactForm');
const contactBook = document.querySelector('#contactBook');
const tableRowTemplate = document.querySelector('#tableRowTemplate').innerHTML;
const lastNode = document.querySelector('#lastNode');

addContactForm.addEventListener('submit', addContactFormSubmit);
contactBook.addEventListener('click', onTabelRowClick);

function addContactFormSubmit(e) {
    e.preventDefault();
    submitForm();
    clearForm();
}
function onTabelRowClick(e) {
    if(e.target.classList.contains('delete-btn')) {
        e.target.closest('#contact').remove();
    }
}
function submitForm() {
    const contact = getInputValues();

    addContact(contact);
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