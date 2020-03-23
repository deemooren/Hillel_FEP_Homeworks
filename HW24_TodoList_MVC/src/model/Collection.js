import { TODOS_URL } from '../config';
import Model from './Model';

export default class Collection {
    fetch() {
        return fetch(TODOS_URL)
                .then(response => response.json())
                .then(data => this.setData(data));
    }

    setData(data) {
        this.list = data.map(item => new Model(item));
    }
}