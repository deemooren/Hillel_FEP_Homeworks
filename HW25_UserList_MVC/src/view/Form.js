export default class FormView {
    constructor(config) {
        this.config = config;
        this.createElement();
        this.formInputs = document.getElementsByClassName('form-input');
        this.userForm = document.getElementById('userForm');
        this.userForm.addEventListener('submit', this.onSubmitForm.bind(this));
    }

    onSubmitForm(e) {
        e.preventDefault();
        const user = this.getInputValues();

        user.id ? this.config.onSave(user) : this.config.onAdd(user);
    }

    createElement() {
        this.element = document.createElement('tr');
        this.element.setAttribute('id', 'lastRow');
        this.element.innerHTML = `
            <input type="text" class="user-id form-input" name="id" id="id">
            <td><input type="text" class="form-control form-input" name="name" id="name" placeholder="Name"></td>
            <td><input type="text" class="form-control form-input" name="surname" id="surname" placeholder="Surname"></td>
            <td><input type="email" class="form-control form-input" name="email" id="email" placeholder="E-mail"></td>
            <td><button class="btn btn-dark save-btn">Save</button></td>
            <td><button class="btn btn-dark cancel-btn">Cancel</button></td>
        `;
    }

    getInputValues() {
        const newContact = {};
        for(let i = 0; i < this.formInputs.length; i++) {
            newContact[this.formInputs[i].name] = this.formInputs[i].value.trim();
        }
    
        return newContact;
    }

    fillFormInpts(user) {
        Array.prototype.forEach.call(this.formInputs, (input) => {
            input.value = user[input.name];
        });
    }

    reset() {
        this.userForm.reset();
    }
}