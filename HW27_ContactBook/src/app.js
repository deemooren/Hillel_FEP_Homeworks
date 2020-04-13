// import api from './api';

const PHONE_INPUT_CLASS = 'phone-input';
const EMAIL_INPUT_CLASS = 'email-input';
const KEY_CONTACTS = 'contacts';

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

function onContactsTableContainerClick(e) {
    if(e.target.classList.contains('add-btn')) {
        showModalWindow();
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
    }
}

function onContactFormSubmit(e) {
    e.preventDefault();

    addNewContact();
}

function init() {
    getContacts();
}

function getContacts() {
    let data = localStorage.getItem(KEY_CONTACTS);
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
    console.log(contact);
    const html = contactTemplate.replace('{{id}}', contact.id)
                                .replace('{{name}}', `${contact.surname} ${contact.name} ${contact.patronymic}`)
                                .replace('{{phone}}', `${contact.phone}`)
                                .replace('{{email}}', `${contact.email}`)
                                .replace('{{birthDate}}', contact.birthDate);

    const contactElem = htmlToElement(html);
    contactsContainer.append(contactElem);
}

function showModalWindow() {
    modalWindowContainer.classList.add('active');
}

function hideModalWindow() {
    modalWindowContainer.classList.remove('active');
    contactForm.reset();
}

function addNewContact() {
    const newContact = createContactObj();
    newContact.id = Math.random();
    contacts.push(newContact);
    saveDataInStorage(contacts);
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

function saveDataInStorage(contacts) {
    localStorage.setItem(KEY_CONTACTS, JSON.stringify(contacts));
}