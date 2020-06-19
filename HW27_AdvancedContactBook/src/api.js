const KEY_CONTACTS = 'contacts';

export default {
    getContacts,
    saveContacts
};

function getContacts() {
    return JSON.parse(localStorage.getItem(KEY_CONTACTS));
}

function saveContacts(contacts) {
    localStorage.setItem(KEY_CONTACTS, JSON.stringify(contacts));
}