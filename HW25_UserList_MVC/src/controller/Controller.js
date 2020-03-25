import UserCollection from "../model/UserCollection";
import { USERS_URL } from '../config';
import ListView from "../view/List";
import FormView from "../view/Form";

export default class Controller {
    constructor() {
        this.userCollection = new UserCollection(USERS_URL);
        this.listView = new ListView({
            onDelete: (id) => {
                this.userCollection.delete(id).then(this.listView.deleteEl(id));
            }
        });
        this.formView = new FormView();

        this.container = document.querySelector('#usersTable');

        this.container.append(this.listView.element);
        this.listView.element.append(this.formView.element);
        
        this.getData();
    }

    getData() {
        this.userCollection.fetch().then(() => this.renderUsers());
    }

    renderUsers() {
        this.listView.render(this.userCollection.list);
    }
}