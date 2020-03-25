export default class FormView {
    constructor() {
        this.createElement();
    }

    createElement() {
        this.element = document.createElement('tr');
        this.element.innerHTML = `
            <input type="text" class="user-id" name="id" id="id">
            <th><input type="text" class="form-control" name="name" id="name" placeholder="Name"></th>
            <td><input type="text" class="form-control" name="surname" id="surname" placeholder="Surname"></td>
            <td><input type="email" class="form-control" name="email" id="email" placeholder="E-mail"></td>
            <td><button class="btn btn-dark save-btn">Save</button></td>
            <td><button class="btn btn-dark cancel-btn">Cancel</button></td>
        `;
    }
}