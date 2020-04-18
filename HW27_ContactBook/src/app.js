import api from './api';

const PHONE_INPUT_CLASS = 'phone-input';
const EMAIL_INPUT_CLASS = 'email-input';
const CONTACT_ITEM_CLASS = 'contact-item';

const contactsContainer = document.getElementById('contactsContainer');
const contactsTableContainer = document.getElementById('contactsTableContainer');
const modalWindowContainer = document.getElementById('modalWindowContainer');
const contactForm = document.getElementById('contactForm');
const inputs = document.getElementsByClassName('input-field');
const phoneInputTemplate = document.getElementById('phoneInputTemplate').innerHTML;
const emailInputTemplate = document.getElementById('emailInputTemplate').innerHTML;
const contactTemplate = document.getElementById('contactTemplate').innerHTML;

let contacts = [];

contactsTableContainer.addEventListener('click', onContactsTableContainerClick);
modalWindowContainer.addEventListener('click', onModalWindowContainer);
contactForm.addEventListener('submit', onContactFormSubmit);

init();

function init() {
    getContacts();
}

function onContactsTableContainerClick(e) {
    switch(true) {
        case e.target.classList.contains('add-btn'): {
            showModalWindow();
            break;
        }
        case e.target.classList.contains('delete-btn'): {
            onDeleteContactClick(e.target.closest(`.${CONTACT_ITEM_CLASS}`).dataset.id);
            break;
        }
        case e.target.classList.contains('edit-btn'): {
            onEditContactClick(e.target.closest(`.${CONTACT_ITEM_CLASS}`).dataset.id);
            break;
        }
    }
}

function onModalWindowContainer(e) {
    const target = e.target;
    if(target.classList.contains('close-btn')) {
        hideModalWindow();
    } else if(target.classList.contains('add-field-btn')) {
        let template, parentClass;

        if(target.closest('.' + PHONE_INPUT_CLASS)) {
            template = phoneInputTemplate;
            parentClass = PHONE_INPUT_CLASS;
        } else if(target.closest('.' + EMAIL_INPUT_CLASS)) {
            template = emailInputTemplate;
            parentClass = EMAIL_INPUT_CLASS;
        }
        addField(template, parentClass);
    } else if(target.classList.contains('delete-field-btn')) {
        target.parentNode.remove();
    }
}

function onContactFormSubmit(e) {
    e.preventDefault();

    if(formIsNotEmpty()) {
        addNewContact();
    } else {
        console.log('Form is empty');
    }
    hideModalWindow();
}

function onDeleteContactClick(id) {
    deleteContact(id);
    removeElement(id);
}

function onEditContactClick(id) {
    showModalWindow();
    
}

function formIsNotEmpty() {
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value.trim()) {
            return true;
        }
    }
    return false;
}

function getContacts() {
    let data = api.getContacts();
    data = data ? JSON.parse(data) : [];

    setContacts(data);
    renderContacts(data);
}

function setContacts(data) {
    return (contacts = data);
}

function renderContacts(data) {
    data.forEach(item => {
        renderContact(item);
    });
} 

function renderContact(contact) {
    const html = contactTemplate.replace('{{id}}', contact.id)
                                .replace('{{name}}', `${contact.surname} ${contact.name} ${contact.patronymic}`)
                                .replace('{{phone}}', `${arrayToHtmlList(contact.phone)}`)
                                .replace('{{email}}', `${arrayToHtmlList(contact.email)}`)
                                .replace('{{birthDate}}', contact.birthDate);

    const contactElem = htmlToElement(html);
    contactsContainer.append(contactElem);
}

function arrayToHtmlList(arr) {
    const ul = document.createElement('ul');
    arr.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        ul.append(li);
    });
    const html = elementToHtml(ul);

    return html;
}

function elementToHtml(element) {
    const div = document.createElement('div');
    div.append(element);

    return div.innerHTML;
}

function showModalWindow() {
    modalWindowContainer.classList.add('active');
}

function hideModalWindow() {
    modalWindowContainer.classList.remove('active');
    const customFields = document.getElementsByClassName('input-custom');

    while(customFields[0]) {
        customFields[0].parentNode.removeChild(customFields[0]);
    }
    contactForm.reset();
}

function addNewContact() {
    const newContact = createContactObj();
    newContact.id = Math.random();
    contacts.push(newContact);
    api.saveContacts(contacts);
    renderContact(newContact);
}

function createContactObj() {
    let contact = {
        phone: [],
        email: []
    };

    Array.prototype.forEach.call(inputs, element => {
        if(element.name === 'phone' || element.name === 'email') {
            contact[element.name].push(element.value);
        } else {
            contact[element.name] = element.value;
        }
    });

    return contact;
}

function addField(htmlTemplate, parentClass) {
    const element = htmlToElement(htmlTemplate);
    document.querySelector('.' + parentClass).append(element);
}

function htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content.firstChild;
}

function deleteContact(id) {
    contacts = contacts.filter(item => item.id != id);
    api.saveContacts(contacts);
}

function removeElement(id) {
    const contactsElements = document.getElementsByClassName(CONTACT_ITEM_CLASS);
    const currElem = Array.prototype.find.call(contactsElements, (element) => element.dataset.id == id);
    currElem.remove();
}
