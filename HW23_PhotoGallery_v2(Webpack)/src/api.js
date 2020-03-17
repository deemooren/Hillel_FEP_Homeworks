const URL = 'https://jsonplaceholder.typicode.com/photos?_limit=50';

export default {
    getPhotos
};

function getPhotos () {
    return fetch(URL)
            .then(response => response.json());
}