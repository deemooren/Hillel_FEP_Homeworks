const URL = 'https://jsonplaceholder.typicode.com/photos';

const api = {
    getPhotos
};

function getPhotos () {
    return fetch(URL)
            .then(response => response.json());
}