export default class ListView {
    constructor(config) {
        this.config = config;
        this.createElement();
    }

    createElement() {
        this.element = document.createElement('tbody');
        this.element.setAttribute('id', 'tableBody');
        this.element.addEventListener('click', this.onUserClick.bind(this));
    }

    onUserClick(e) {
        const target = e.target;
        switch(true) {
            case target.classList.contains('delete-btn'):
                e.preventDefault();
                this.config.onDelete(e.target.closest('.user').childNodes[1].innerText);
                break;
            case target.classList.contains('edit-btn'):
                e.preventDefault();
                break;
        }

    }

    render(list) {
        list.map(this.renderUser.bind(this));
    }

    renderUser(item) {
        const currElement = document.createElement('tr');
        currElement.classList.add('user');
        currElement.innerHTML = `
            <tr class="user">
                <td class="user-id">${item.id}</td>
                <td>${item.name}</td>
                <td>${item.surname}</td>
                <td>${item.email}</td>
                <td><button class="btn btn-outline-dark delete-btn">Delete</button></td>
                <td><button class="btn btn-outline-dark edit-btn">Edit</button></td>
            </tr>
        `;
        this.element.append(currElement);
    }

    deleteEl(id) {
        const currElem = document.querySelectorAll('.user-id');
        const el = Array.prototype.find.call(currElem, item => item.innerText == id);
        el.parentNode.remove();
    }
}