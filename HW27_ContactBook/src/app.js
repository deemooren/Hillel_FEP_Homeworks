// import './styles.scss';
// import api from './api';

const contactsTableContainer = document.getElementById('contactsTableContainer');
const modalWindowContainer = document.getElementById('modalWindowContainer');

document.addEventListener("DOMContentLoaded", function(event) { 
    setTimeout(function() {
        document.body.classList.remove('preload');
    });
});
contactsTableContainer.addEventListener('click', onContactsTableContainerClick);
modalWindowContainer.addEventListener('click', onModalWindowContainer);


function onContactsTableContainerClick(e) {
    if(e.target.classList.contains('add-btn')) {
        showModalWindow();
    }
}

function onModalWindowContainer(e) {
    if(e.target.classList.contains('close-btn')) {
        hideModalWindow();
    }
}




function showModalWindow() {
    modalWindowContainer.classList.add('active');
}

function hideModalWindow() {
    modalWindowContainer.classList.remove('active');
}