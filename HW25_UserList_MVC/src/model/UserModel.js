let urlWeakMap = new WeakMap();

export default class UserModel {
    constructor(collectionUrl, data) {
        this.url = collectionUrl;
        this.setData(data);
    }
    
    set url(value) {
        urlWeakMap.set(this, value);
    }

    get url() {
        return urlWeakMap.get(this);
    }

    setData(data) {
        Object.assign(this, data);
    }

    delete() {
        return fetch(`${this.url}/${this.id}`, {
            method: 'DELETE',
        });
    }

    update() {
        return fetch(`${this.url}/${this.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        })
        .then(response => response.json());
    }
}