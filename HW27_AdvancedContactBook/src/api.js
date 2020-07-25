const firebase = require('firebase');
const db = firebase.initializeApp({
    databaseURL: "https://contact-book-4b5be.firebaseio.com"
}).database();

export default {
    getContacts,
    addContact,
    editContact,
    deleteContact
};

function getContacts() {
    return (new Promise((resolve, rejected) => {
        firebase.database().ref('/contacts/').once('value').then(function(snapshot) {
            const data = snapshot.val();
            if(!data) {
                resolve([])
            } else {
                const contactsList = Object.values(data);
                const contactsKeys = Object.keys(data);
    
                for(let i = 0; i < contactsList.length; i++) {
                    const currentId = contactsKeys[i];
                    contactsList[Object.keys(contactsList)[i]].id = currentId;
                }
    
                resolve(contactsList)
            }
        });
    }));
}

function addContact(newContact) {
    return new Promise((resolve, rejected) => {
        const objKey = db.ref('contacts').push(newContact).path.pieces_[1]; // adding new obj to database and cashing key
        newContact.id = objKey;
        
        resolve (newContact)
    });
}

function editContact(contact) {
    return new Promise((resolve, rejected) => {
        const contactRef = db.ref().child('contacts/' + contact.id);
        contactRef.set(contact);

        resolve(contact)
    });
}

function deleteContact(id) {
    return new Promise((resolve, rejected) => {
        const contactRef = db.ref().child('contacts/' + id);
        contactRef.remove();

        resolve(id)
    });
}