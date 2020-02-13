const STICKER_CLASS = 'sticker';
const KEY_STICKERS = 'stickers';

const panel = document.querySelector('#panel');
const stickersContainer = document.querySelector('#stickersContainer');
const stickerTemplate = document.querySelector('#stickerTemplate').innerHTML;
let stickers = [];

init();

panel.addEventListener('click', onPanelClick);
stickersContainer.addEventListener('click', onStickersContainerClick);
stickersContainer.addEventListener('blur', onStickersContainerBlur, true);

function init() {
    getStickers();
}
function onPanelClick(e) {
    if(e.target.classList.contains('add-btn')) {
        createNewSticker();
    }
}
function onStickersContainerClick(e) {
    if(e.target.classList.contains('delete-btn')) {
        deleteSticker(e.target.closest('.' + STICKER_CLASS).dataset.id);
    }
}
function onStickersContainerBlur(e) {
    const value = e.target.value.trim();
    const id = e.target.closest('.' + STICKER_CLASS).dataset.id;
    
    editStickerText(id, value);
}

function getStickers() {
    let data = localStorage.getItem(KEY_STICKERS);
    data = data ? JSON.parse(data) : [];

    setStickers(data);
    renderStickers(data);
}
function setStickers(data) {
    return (stickers = data);
}
function renderStickers(data) {
    resetStickers();
    data.forEach(item => {
        renderSticker(item);
    });
}
function resetStickers() {
    stickersContainer.innerHTML = '';
}
function renderSticker(item) {
    const htmlSticker = stickerTemplate.replace('{{id}}', item.id)
                                       .replace('{{text}}', item.text);
    
    const sticker = htmlToElement(htmlSticker);
    stickersContainer.append(sticker);
}
function createNewSticker() {
    const sticker = {
        id: Date.now(),
        text: ''
    };
    stickers.push(sticker);
    saveStickersInStorage(stickers);

    renderSticker(sticker);
}
function htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;

    return template.content.firstChild;
}
function deleteSticker(id) {
    stickers = stickers.filter(sticker => sticker.id !== Number(id));
    saveStickersInStorage(stickers);

    renderStickers(stickers);
}
function editStickerText(id, newText) {
    const editingSticker = stickers.find(sticker => sticker.id === Number(id));
    editingSticker.text = newText;

    saveStickersInStorage(stickers);
}
function saveStickersInStorage(stickers) {
    localStorage.setItem(KEY_STICKERS, JSON.stringify(stickers));
}