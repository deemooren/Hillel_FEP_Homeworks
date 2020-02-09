const USERS_URL = "http://5dd3d5ba8b5e080014dc4bfa.mockapi.io/users";
const ADD_USER_FORM_CLASS = 'add-user-form';
const EDIT_USER_FORM_CLASS = 'edit-user-form';
const INVALID_INPUT_CLASS = 'invalid';
const USER_CLASS = 'user';

const userForm = document.querySelector('#userForm');
const usersTable = document.querySelector('#usersTable');
const tableRowTemplate = document.querySelector('#tableRowTemplate').innerHTML;
const firstNode = document.querySelector('#firstNode');
const inputElements = document.querySelectorAll('#id, #name, #surname, #email');
let users = [];

init();

userForm.addEventListener('submit', userFormSubmit);
userForm.addEventListener('click', onUserFormClick);
usersTable.addEventListener('click', onTabelRowClick);

for(let i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener("blur", inputFieldOnBlur, true);
    inputElements[i].addEventListener("focus", inputFieldOnFocus, true);
}

function userFormSubmit(e) {
    e.preventDefault();
    switch(true) {
        case (e.target.classList.contains(ADD_USER_FORM_CLASS)):
            submitAddForm();
            break;
        case (e.target.classList.contains(EDIT_USER_FORM_CLASS)):
            onSubmitEditForm();
            break;
    }
}
function onSubmitEditForm() {
    const id = userForm['id'].value;
    if(userDataIsChanged(id) && isAllFormInputsAreValid()) {
        const editedUser = getInputValues();
        submitEditForm(id, editedUser);
    } else if (!userDataIsChanged(id)) {
        clearForm();
    }
}
function onUserFormClick(e) {
    if(e.target.classList.contains('cancel-btn')) {
        e.preventDefault();
        clearForm();
    }
}
function onTabelRowClick(e) {
    if(e.target.classList.contains('delete-btn')) {
        e.preventDefault();
        deleteUser(e.target.closest('.' + USER_CLASS).childNodes[1].innerText);
    } else if(e.target.classList.contains('edit-btn')) {
        e.preventDefault();
        clearForm();
        showEditUserForm(e.target.closest('.' + USER_CLASS).childNodes[1].innerText);
    }
}
function inputFieldOnBlur() {
    if(this.value.trim() === '') {
        this.classList.add(INVALID_INPUT_CLASS);
    }
}
function inputFieldOnFocus() {
    this.classList.remove(INVALID_INPUT_CLASS);
}

function init() {
    getUsers();
}
function getUsers() {
    fetch(USERS_URL)
        .then(response => response.json())
        .then(setUsers)
        .then(renderUsers);
}
function setUsers(data) {
    return (users = data);
}
function renderUsers(data) {
    resetListOfUsers();
    data.map(addUser);
}
function resetListOfUsers() {
    const usersList = document.querySelectorAll('.' + USER_CLASS);

    Array.prototype.forEach.call(usersList, item => {
            item.remove();
    });
}
function addUser(newUser) {
    const html = getNewUserHtml(newUser);
    const user = htmlToElement(html);
    
    firstNode.after(user);
}
function getNewUserHtml(user) {
    return tableRowTemplate.replace('{{id}}', user.id)
                           .replace('{{name}}',  user.name)
                           .replace('{{surname}}', user.surname)
                           .replace('{{email}}', user.email);
}
function htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content.firstChild;
}
function submitAddForm() {
    if(isAllFormInputsAreValid()) {
        const user = getInputValues();

        fetch(USERS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(addUserToArray);

        clearForm();
    }
}
function addUserToArray(user) {
    users.push(user);
    renderUsers(users);
}
function isAllFormInputsAreValid() {
    let isValid = true;
    for (let i = 1; i < inputElements.length; i++) {
        if(inputElements[i].classList.contains(INVALID_INPUT_CLASS) || isEmpty(inputElements[i].value)) {
            isValid = false;
            inputElements[i].classList.add(INVALID_INPUT_CLASS);
        }
    }
    return isValid;
}
function isEmpty(value) {
    return value.trim() === '';
}
function getInputValues() {
    const formFields = userForm.elements;

    const newUser = {
        name: formFields['name'].value,
        surname: formFields['surname'].value,
        email: formFields['email'].value
    };

    return newUser;
}
function clearForm() {
    userForm.reset();
    if(userForm.classList.contains(EDIT_USER_FORM_CLASS)) {
        toggleToAddForm();
    }
    Array.prototype.forEach.call(inputElements, element => element.classList.remove(INVALID_INPUT_CLASS));
}
function toggleToAddForm() {
    userForm.classList.remove(EDIT_USER_FORM_CLASS);
    userForm.classList.add(ADD_USER_FORM_CLASS);
}
function deleteUser(id) {
    fetch(`${USERS_URL}/${id}`, {
        method: 'DELETE',
    });

    users = users.filter(user => user.id !== id);
    renderUsers(users);
}
function showEditUserForm(id) {
    userForm.classList.add(EDIT_USER_FORM_CLASS);
    userForm.classList.remove(ADD_USER_FORM_CLASS);

    fillInFields(id);
}
function fillInFields(id) {
    const currentUser = getCurrentUser(id);

    userForm.elements['id'].value = currentUser.id;
    userForm.elements['name'].value = currentUser.name;
    userForm.elements['surname'].value = currentUser.surname;
    userForm.elements['email'].value = currentUser.email;
}
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}
function userDataIsChanged(id) {
    const currentUser = getCurrentUser(id);

    return userForm.elements['name'].value !== currentUser.name 
        || userForm.elements['surname'].value !== currentUser.surname 
        || userForm.elements['email'].value !== currentUser.email;
}
function submitEditForm(id, editedUser) {
    fetch(`${USERS_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUser)
    });
    updateUserInArray(id, editedUser);
    renderUsers(users);

    clearForm();
}
function updateUserInArray(id, editedUser) {
    const user = getCurrentUser(id);

    Object.assign(user, editedUser);
}