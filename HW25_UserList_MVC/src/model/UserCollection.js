import UserModel from "./UserModel";

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

    get(id) {
        return this.list.find(item => item.id == id);
    }

    deleteFromList(model) {
        return (this.list = this.list.filter(item => item !== model));
    }
}