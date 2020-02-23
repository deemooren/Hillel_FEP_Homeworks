const STICKER_CLASS = 'sticker';
const HIDDEN_CLASS = 'hidden';
const KEY_STICKERS = 'stickers';

const $stickersContainer = $('#stickersContainer');
const $errorMessage = $('.error-message');
const dialog = $('#dialogForm').dialog({
    autoOpen: false,
    height: 340,
    width: 350,
    modal: true,
    buttons: {
        'ADD NEW STICKER': onAddBtnClick,
        CANCEL: closeDialogWindow
    }
});
let stickers = [];

init();

$('#panel').on('click', '#addStickerBtn', openDialogWindow);
$stickersContainer.on('click', '.delete-btn', onDeleteBtnClick);
$stickersContainer.on('blur', '.sticker', onStickerBlur);

function init() {
    getStickers();
}
function openDialogWindow() {
    dialog.dialog( 'open');
}
function closeDialogWindow() {
    $errorMessage.addClass(HIDDEN_CLASS);
    $('#addStickerForm').trigger('reset');
    dialog.dialog('close');
}
function onAddBtnClick() {
    const text = $('#addStickerForm #text').val().trim();
    if(text.length !== 0) {
        createNewSticker(text);
        closeDialogWindow();
    } else {
        $errorMessage.removeClass(HIDDEN_CLASS);
    }
}
function onDeleteBtnClick(e) {
    deleteSticker($(e.target).closest('.' + STICKER_CLASS).data('id'));
}
function onStickerBlur(e) {
    const value = $(e.target).val().trim();
    const id = $(e.target).closest('.' + STICKER_CLASS).data('id');
    
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
    data.forEach(item => {
        renderSticker(item);
    });
}
function renderSticker(item) {
    const newSticker = $('#stickerTemplate').html().replace('{{id}}', item.id)
                                       .replace('{{text}}', item.text);
    
    $stickersContainer.append(newSticker);
}
function createNewSticker(text) {
    const sticker = {
        id: Date.now(),
        text: text
    };
    stickers.push(sticker);
    saveStickersInStorage(stickers);

    renderSticker(sticker);
}
function deleteSticker(id) {
    stickers = stickers.filter(sticker => sticker.id !== Number(id));
    saveStickersInStorage(stickers);

    const currElem = getDOMElemByDataId(id);
    currElem.remove();
}
function editStickerText(id, newText) {
    const editingSticker = stickers.find(sticker => sticker.id === Number(id));
    editingSticker.text = newText;

    saveStickersInStorage(stickers);
}
function saveStickersInStorage(stickers) {
    localStorage.setItem(KEY_STICKERS, JSON.stringify(stickers));
}
function getDOMElemByDataId(id) {
    return $('.sticker[data-id="' + id + '"]');
}