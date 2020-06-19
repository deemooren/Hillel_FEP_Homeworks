import UserModel from "./UserModel";
import { USERS_URL } from "../config";

export default class UserCollection {
    constructor(usersUrl) {
        this.url = usersUrl;
        this.list = [];

        this.setData = this.setData.bind(this);
    }

    setData(list) {
        return (this.list = list.map(user => new UserModel(this.url, user)));
    }

    fetch() {
        return fetch(this.url)
                .then(response => response.json())
                .then(this.setData);
    }

    delete(id) {
        const userModel = this.get(id);

        return userModel.delete().then(this.deleteFromList.bind(this));
    }

    add(user) {
        return fetch(USERS_URL, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                .then(response => response.json())
                .then(this.addUserToList.bind(this));
    }

    edit(user) {
        const currUser = this.get(user.id);
        currUser.setData(user);
        
        return currUser.update();
    }

    addUserToList(user) {
        const userModel = new UserModel(this.url, user);
        this.list.push(userModel);

        return userModel;
    }

    get(id) {
        return this.list.find(item => item.id == id);
    }

    deleteFromList(model) {
        return (this.list = this.list.filter(item => item !== model));
    }
}