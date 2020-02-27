const CONTACTS_URL = "http://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts";
const CREATE_NEW_CONTACT_TITLE = 'Create New Contact';
const EDIT_CONTACT_TITLE = 'Edit Contact';

const $contactsTable = $('#contactsTable');
const formInputs = $('.form-input');
let contacts = [];

const dialog = $('#addContactDialog').dialog({
    autoOpen: false,
    height: 510,
    width: 500,
    modal: true,
    buttons: {
        Save: submitForm,
        Cancel: closeDialog
    }
});
$( "#datepicker" ).datepicker({ 
    dateFormat: 'yy-mm-dd'
});

init();

$('#addContact').on('click', onAddContactClick);
$contactsTable.on('click', '.contact .delete-btn', onDeleteBtnClick);
$contactsTable.on('click', '.contact .edit-btn', onEditBtnClick);


function onAddContactClick() {
    openDialogWindow();
}
function submitForm(e) {
    if(isFormForCreating()) {
        createContact();
    } else {
        const id = formInputs[0].value;
        editContact(id);
    }
}
function onDeleteBtnClick(e) {
    const id = $(e.target).closest('.contact').find('.contact-id').text();
    deleteContact(id);
}
function onEditBtnClick(e) {
    openDialogWindow(EDIT_CONTACT_TITLE);
    const id = $(e.target).closest('.contact').find('.contact-id').text();
    fillFormInputs(id);
}
function init() {
    getContacts();
}
function getContacts() {
    fetch(CONTACTS_URL)
        .then(response => response.json())
        .then(setContacts)
        .then(renderContacts);
}
function setContacts(data) {
    return (contacts = data);
}
function renderContacts(data) {
    if(data.length === 0) {
        $('messageEmptyBook').removeClass('hidden');
    } else {
        data.map(renderContact);
    }
}
function renderContact(contact) {
    const contactHtml = getNewContactHtml(contact);
    $contactsTable.prepend(contactHtml);
}
function getNewContactHtml(contact) {
    let date = parseDate(contact.date);

    return $('#tableRowTemplate').html().replace('{{id}}', contact.id)
                                        .replace('{{name}}',  contact.name)
                                        .replace('{{surname}}', contact.surname)
                                        .replace('{{phone}}', contact.phone)
                                        .replace('{{email}}', contact.email)
                                        .replace('{{birthDate}}', date);
}
function parseDate(date) {
    const result = date.match(/(\d{1,4}([\-])\d{1,2}([\-])\d{1,4})/);
    return result  ? result[0] : '';
}
function openDialogWindow(title = CREATE_NEW_CONTACT_TITLE) {
    dialog.dialog('option', 'title', title);
    dialog.dialog('open');
}
function closeDialog() {
    clearForm();
    hideTip();
    dialog.dialog('close');
}
function isFormForCreating() {
    return dialog.dialog('option', 'title') === CREATE_NEW_CONTACT_TITLE;
}
function createContact() {
    if(isFormInputsAreValid()) {
        const contact = getInputValues();

        fetch(CONTACTS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
            .then(response => response.json())
            .then(handleContact);

        closeDialog();
    } else {
        showTip();
    }
}
function isFormInputsAreValid() {
    for(let i = 1; i < formInputs.length; i++) {
        if(formInputs[i].value.trim().length !== 0) {
            return true;
        }
    }
    return false;
}
function handleContact(contact) {
    addContactToArray(contact);
    renderContact(contact);
}
function getInputValues() {
    const newContact = {};

    for(let i = 0; i < formInputs.length; i++) {
        newContact[formInputs[i].name] = formInputs[i].value.trim();
    }

    return newContact;
}
function addContactToArray(contact) {
    contacts.push(contact);
}
function clearForm() {
    $('#addContactForm')[0].reset();
}
function deleteContact(id) {
    fetch(`${CONTACTS_URL}/${id}`, {
        method: 'DELETE'
    });
    
    contacts = contacts.filter(contact => +contact.id !== +id);

    const currContactElement = getElemByID(id);
    currContactElement.remove();
}
function getElemByID(id) {
    const contactsElem = $('.contact');

    for(let i = 0; i < contactsElem.length; i++) {
        if($(contactsElem[i]).find('.contact-id').text() === id) {
            return contactsElem[i];
        }
    }
}
function fillFormInputs(id) {
    const contact = getContactFromArray(id);

    for(let i = 0; i < formInputs.length; i++) {
        formInputs[i].value = contact[formInputs[i].name];
    }
}
function editContact(id) {
    if(isFormInputsAreValid()) {
        const updatedContact = getInputValues();

        fetch(`${CONTACTS_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedContact)
        });

        updateContactInArray(id, updatedContact);
        const editedElement = $(getElemByID(id));
        
        for(let i = 0; i < formInputs.length; i++) {
            const contentText = $(formInputs[i]).val().trim();
            $(editedElement.children()[i]).text(contentText);
        }

        closeDialog();
    } else {
        showTip();
    }
}
function updateContactInArray(id, editedContact) {
    const contact = getContactFromArray(id);

    Object.assign(contact, editedContact);
}
function showTip() {
    $('#tip').removeClass('hidden');
}
function hideTip() {
    $('#tip').addClass('hidden');
}
function getContactFromArray(id) {
    return contacts.find(contact => +contact.id === +id);
}