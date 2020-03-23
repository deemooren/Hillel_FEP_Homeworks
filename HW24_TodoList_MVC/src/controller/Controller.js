import Collection from '../model/Collection';
import List from '../view/List';
import Form from '../view/Form';


export default class Controller {
    constructor() {
        this.listView = new List();
        this.formView = new Form();
        
        this.container = document.getElementById('todosContainer');

        this.todosCollection = new Collection();
        this.todosCollection.fetch()
                            .then(() => this.listView.render(this.todosCollection.list));

        this.container.append(this.listView.listElement);
        this.container.append(this.formView.formElement);
    }
}