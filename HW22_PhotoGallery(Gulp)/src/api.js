const URL = 'https://jsonplaceholder.typicode.com/photos?_limit=50';

const api = {
    getPhotos
};

function getPhotos () {
    return fetch(URL)
            .then(response => response.json());
}