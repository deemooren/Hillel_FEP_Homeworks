const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=$$ID$$';

let albumsListElement = document.querySelector('#albumsList');
const photosContainerElement = document.querySelector('#photos');
const albumTitleTemplate = document.querySelector('#albumItemTemplate').innerHTML;
const photoItemTemplate = document.querySelector('#photoItemTemplate').innerHTML;
const loader = document.querySelector('#loader');

getAlbumsList();

albumsListElement.addEventListener('click', onAlbumsClick);
photosContainerElement.addEventListener('click', onPhotoContainerClick);

function onAlbumsClick(e) {
    if(e.target.classList.contains('album-title')) {
        onTitleClick(e.target);
    }
}

function onTitleClick(album) {
    loader.classList.remove('hidden');
    
    resetPhotosContainer();
    deactivateAllTitles();
    
    album.classList.add('active');

    const albumPhotosUrl = PHOTOS_URL.replace('$$ID$$', album.dataset.id);

    getPhotos(albumPhotosUrl);
}

function getPhotos(url) {
    fetch(url)
    .then(response => {
        if(response.ok) {
            loader.classList.add('hidden');

            return response.json();
        }
    })
    .then(showAllPhotos);
}

function showAllPhotos(photos) {
    photos.forEach(photo => {
        showPhoto(photo);
    });
}

function showPhoto(photo) {
    const html = photoItemTemplate
                    .replace('{{tinyImgUrl}}', photo.thumbnailUrl)
                    .replace('{{altText}}', photo.title)
                    .replace('{{fullImgUrl}}', photo.url);

    const newPhoto = htmlToElement(html);
    photosContainerElement.append(newPhoto);
}

function resetPhotosContainer() {
    photosContainerElement.innerHTML = '';
}

function deactivateAllTitles() {
    Array.prototype.forEach.call(albumsListElement.children, title => 
        title.classList.remove('active')
    );
}

function getAlbumsList() {
    fetch(ALBUMS_URL)
        .then(response => response.json())
        .then(renderAlbumsList);
}

function renderAlbumsList(data) {
    data.forEach(item => {
        showAlbum(item);
    });
}

function showAlbum(item) {
    const html = albumTitleTemplate
                    .replace('{{album}}', item.title)
                    .replace('{{albumId}}', item.id);
    
    const newAlbumTitleElement = htmlToElement(html);
    albumsListElement.appendChild(newAlbumTitleElement);
}

function htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;

    return template.content.firstChild;
}