const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=$$ID$$';
const HIDDEN_CLASS = 'hidden';
const ACTIVE_CLASS = 'active';
const ESCAPE_BTN = 27;

const albumsListElement = document.getElementById('albumsList');
const photosContainerElement = document.getElementById('actual-photos');
const albumTitleTemplate = document.getElementById('albumItemTemplate').innerHTML;
const photoItemTemplate = document.getElementById('photoItemTemplate').innerHTML;
const fullScreenPhotoTemplate = document.getElementById('fullScreenPhoto').innerHTML;
const loader = document.getElementById('loader');

getAlbumsList();

document.getElementById('container').addEventListener('click', onContainerClick);

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
function onContainerClick(e) {
    const targetClassList = e.target.classList;
    switch(true) {
        case(targetClassList.contains('album-title')):
            onTitleClick(e.target);
            break;
        case(targetClassList.contains('image')):
            onPhotoClick(e.target);
            break;
        case(targetClassList.contains('close')):
            onCloseFullScreen();
            break;
    }
}
function onTitleClick(album) {
    loader.classList.remove(HIDDEN_CLASS);
    
    resetPhotosContainer();
    deactivateAllTitles();
    
    album.classList.add(ACTIVE_CLASS);

    const albumPhotosUrl = PHOTOS_URL.replace('$$ID$$', album.dataset.id);

    getPhotos(albumPhotosUrl);
}
function resetPhotosContainer() {
    photosContainerElement.innerHTML = '';
}
function deactivateAllTitles() {
    Array.prototype.forEach.call(albumsListElement.children, title => 
        title.classList.remove(ACTIVE_CLASS)
    );
}
function getPhotos(url) {
    fetch(url)
    .then(response => {
        if(response.ok) {
            loader.classList.add(HIDDEN_CLASS);

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
function onPhotoClick(photo) {
    const html = fullScreenPhotoTemplate.replace('{{url}}', photo.dataset.fullImgUrl);
    const newDiv = htmlToElement(html);
    
    bindEventListener();
    
    container.append(newDiv);

    setTimeout(() => newDiv.classList.add('appeared'), 500);
}
function onCloseFullScreen() {
    const currentFullScreenDiv = getFullScreenImageElement();
    removeElement(currentFullScreenDiv);
    removeEventListener();
}
function removeElement(div) {
    div.remove();
}
function bindEventListener() {
    document.addEventListener('keyup', onKeypress); 
}
function removeEventListener() {
    document.removeEventListener('keyup', onKeypress); 
}
function onKeypress(e) {
    if(e.keyCode === ESCAPE_BTN) {
        onCloseFullScreen();
    }
}
function getFullScreenImageElement() {
    return document.getElementById('full-screen-image');
}