import api from './api';

const PHONE_INPUT_CLASS = 'phone-input';
const EMAIL_INPUT_CLASS = 'email-input';
const CONTACT_ITEM_CLASS = 'contact-item';

const searchInput = document.getElementById('searchInput');
const contactsContainer = document.getElementById('contactsContainer');
const formTitle = document.getElementById('formTitle');
const contactsTableContainer = document.getElementById('contactsTableContainer');
const modalWindowContainer = document.getElementById('modalWindowContainer');
const contactForm = document.getElementById('contactForm');
const inputs = document.getElementsByClassName('input-field');
const phoneInputTemplate = document.getElementById('phoneInputTemplate').innerHTML;
const emailInputTemplate = document.getElementById('emailInputTemplate').innerHTML;
const contactTemplate = document.getElementById('contactTemplate').innerHTML;
let spinner;
let birthDatesBlock = null;

let contacts = [];

window.onload = setTransitions;
contactsTableContainer.addEventListener('click', onContactsTableContainerClick);
modalWindowContainer.addEventListener('click', onModalWindowContainer);
contactForm.addEventListener('submit', onContactFormSubmit);
searchInput.addEventListener('input', onSearchInput);

init();

function init() {
    showSpinner();
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
            addPhoneField();
        } else if(target.closest('.' + EMAIL_INPUT_CLASS)) {
            addEmailField();
        }
    } else if(target.classList.contains('delete-field-btn')) {
        target.parentNode.remove();
    }
}

function onContactFormSubmit(e) {
    e.preventDefault();

    if(formIsNotEmpty()) {
        if(inputs.id.value) {
            editContact();
        } else {
            addNewContact();
        }
    } else {
        showMessage();
    }
}

function onDeleteContactClick(id) {
    deleteContact(id);
    removeElement(id);
}

function onEditContactClick(id) {
    const editingContact = contacts.find(contact => contact.id == id);
    fillInForm(editingContact);
    showModalWindow();
}

function onSearchInput(e) {
    const text = e.target.value.trim();
    contactsContainer.innerHTML = '';
    const matches = contacts.filter(contact => isMatch(contact, text));
    renderContacts(matches);
}

function setTransitions() {
    modalWindowContainer.style.transition = '0.2s ease-in-out';
    document.querySelector('.search-input').style.transition = '0.3s ease-in-out';
}

function isMatch(contact, text) {
    text = text.toLowerCase();
    for(let key in contact) {
        let property = String(contact[key]).toLowerCase();
        if(property.indexOf(text) !== -1) {
            return true;
        }
    }
    return false;
}

function formIsNotEmpty() {
    for(let i = 1; i < inputs.length; i++) {
        if(inputs[i].value.trim()) {
            return true;
        }
    }
    return false;
}

function getContacts() {
    let data = api.getContacts()
                .then(setContacts)
                .then(renderContacts)
                .then(removeSpinner)
                .then(checkBirthDates);
}

function setContacts(data) {
    return (contacts = data ? data : []);
}

function renderContacts(data) {
    data.forEach(item => {
        renderContact(item);
    });
}

function renderContact(contact) {
    const html = contactTemplate.replace('{{id}}', contact.id)
                                .replace('{{name}}', `${contact.surname} ${contact.name} ${contact.patronymic}`)
                                .replace('{{phone}}', `${contact.phone ? arrayToHtmlList(contact.phone) : ''}`)
                                .replace('{{email}}', `${contact.email ? arrayToHtmlList(contact.email) : ''}`)
                                .replace('{{birthDate}}', contact.birthDate);

    const contactElem = htmlToElement(html);
    contactsContainer.append(contactElem);
}

function showSpinner() {
    const html = `<div class="loader-container">
                    <div class="loader"></div>
                  </div>`;
    spinner = htmlToElement(html);
    document.body.append(spinner);
}

function removeSpinner() {
    spinner.remove();
}

function fillInForm(contact) {
    for(const key in contact) {
        if((key === 'phone' || key === 'email') && contact[key].length > 0) {
            inputs[key].value = contact[key][0];
            if(contact[key].length > 1) {
                for(let i = 1; i < contact[key].length; i++) {
                    let newField;
                    if(key === 'phone') {
                        newField = addPhoneField();
                    } else if(key === 'email') {
                        newField = addEmailField();
                    }
                    newField.children[0].value = contact[key][i];
                }
            }
        } else {
            inputs[key].value = contact[key];
        }
    }
}

function checkBirthDates() {
    const birthdayPeople = getBirthdayPeople();

    if(birthdayPeople.length > 0) {
        showBirthdaysSpoiler();
        bindCallbacks();
        showNamesInBirthdayList(birthdayPeople);
    }
}

function getBirthdayPeople() {
    const now = new Date();
    const birthdayPeople = contacts.filter(contact => {
        const birthDate = new Date(contact.birthDate);
        if(now.getDate() === birthDate.getDate() && now.getMonth() === birthDate.getMonth()) {
            return contact;
        }
    });

    return birthdayPeople;
}

function showBirthdaysSpoiler() {
    birthDatesBlock = document.getElementById('birthDatesBlock');
    birthDatesBlock.classList.add('actual');
}

function bindCallbacks() {
    birthDatesBlock.addEventListener('click', onBirthDatesBlockClick);
}

function onBirthDatesBlockClick(e) {
    if(e.target.classList.contains('open-hide-spoiler-btn')) {
        birthDatesBlock.classList.toggle('twisted');
    }
}

function showNamesInBirthdayList(list) {
    const birthdayList = document.getElementById('birthdayList');

    for(let i = 0; i < list.length; i++) {
        if(i > 0) {
            birthdayList.innerHTML += ', ';
        }
        birthdayList.innerHTML += `<span class="birthday-person">${list[i].surname} ${list[i].name} ${list[i].patronymic}</span>`;
    }
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

function editContact() {
    const newContact = createContactObj();

    api.editContact(newContact)
        .then(updateContactInArray)
        .then(refreshCurentContact)
        .then(hideModalWindow);
}

function updateContactInArray(newContact) {
    const contact = contacts.find(contact => contact.id == inputs[0].value);
    Object.assign(contact, newContact);
    
    return contact;
}

function refreshCurentContact(contact) {
    const elem = getCurrentContactElem(contact.id);
    elem.children[0].innerText = `${contact.surname} ${contact.name} ${contact.patronymic}`;
    elem.children[1].innerHTML = `${arrayToHtmlList(contact.phone)}`;
    elem.children[2].innerHTML = `${arrayToHtmlList(contact.email)}`;
    elem.children[3].innerText = contact.birthDate;
}

function showModalWindow() {
    formTitle.innerText = inputs[0].value ? 'Edit contact' : 'Add new contact';
    modalWindowContainer.classList.add('active');
}

function hideModalWindow() {
    modalWindowContainer.classList.remove('active');
    resetToCustomConfig();
    contactForm.reset();
}

function resetToCustomConfig() {
    const customFields = document.getElementsByClassName('input-custom');

    while(customFields[0]) {
        customFields[0].parentNode.removeChild(customFields[0]);
    }
}

function addNewContact() {
    const newContact = createContactObj();
    contacts.push(newContact);
    api.addContact(newContact)
        .then(renderContact)
        .then(hideModalWindow);
}

function createContactObj() {
    let contact = {
        phone: [],
        email: []
    };

    Array.prototype.forEach.call(inputs, element => {
        if(element.name === 'phone' || element.name === 'email') {
            if(element.value.trim()) {
                contact[element.name].push(element.value);
            }
        } else {
            contact[element.name] = element.value;
        }
    });

    return contact;
}

function addPhoneField() {
    return addField(phoneInputTemplate, PHONE_INPUT_CLASS);
}

function addEmailField() {
    return addField(emailInputTemplate, EMAIL_INPUT_CLASS);
}

function addField(htmlTemplate, parentClass) {
    const element = htmlToElement(htmlTemplate);
    document.querySelector('.' + parentClass).append(element);

    return element;
}

function htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content.firstChild;
}

function deleteContact(id) {
    api.deleteContact(id)
        .then(deleteContactFromArray);
}

function deleteContactFromArray(id) {
    contacts = contacts.filter(item => item.id != id);
}

function removeElement(id) {
    const currElem = getCurrentContactElem(id);
    currElem.remove();
}

function getCurrentContactElem(id) {
    const contactsElements = document.getElementsByClassName(CONTACT_ITEM_CLASS);
    const currElem = Array.prototype.find.call(contactsElements, (element) => element.dataset.id == id);

    return currElem;
}

function showMessage() {
    hideModalForm();
    activateModalMessage();
}

function hideModalForm() {
    document.getElementById('modalWindowForm').classList.add('hidden');
}

function activeModalForm() {
    document.getElementById('modalWindowForm').classList.remove('hidden');
}

function activateModalMessage() {
    const messageElem = document.getElementById('modalMessage');
    messageElem.innerText = 'Contact hasn`t been saved. All fields were empty.';
    messageElem.classList.add('active');
    setTimeout(function() {
        hideModalWindow();
    }, 1500);
    setTimeout(function() {
        messageElem.classList.remove('active');
        activeModalForm();
    }, 2000);
}