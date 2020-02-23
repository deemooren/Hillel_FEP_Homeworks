const STICKER_CLASS = 'sticker';
const HIDDEN_CLASS = 'hidden';
const KEY_STICKERS = 'stickers';

const $stickersContainer = $('#stickersContainer');
const $errorMessage = $('#errorMessage');
const $panel = $('#panel');
let currentZIndex = 1;
let stickers = [];

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

init();

$panel.on('click', '#addStickerBtn', openDialogWindow);
$panel.on('click', '#resetPositionsBtn', onResetBtnClick);
$stickersContainer.on('click', '.delete-btn', onDeleteBtnClick);
$stickersContainer.on('focus', '.sticker', onStickerFocus);
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
function onStickerFocus(e) {
    refreshZIndex($(e.target).parent());
}
function onResetBtnClick() {
    let topPosition = 0;
    stickers.map(sticker => {
        sticker.positionLeft = 0;
        sticker.positionTop = (topPosition += 60);
    });

    saveStickersInStorage(stickers);

    $stickersContainer.html('');
    renderStickers(stickers);
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
    const newStickerHtml = $('#stickerTemplate').html().replace('{{id}}', item.id)
                                       .replace('{{text}}', item.text);
    
    $stickersContainer.append(newStickerHtml);
    const $newElem = $(getDOMElemByDataId(item.id));

    $newElem.css('left', item.positionLeft);
    $newElem.css('top', item.positionTop);

    $newElem.draggable({
        containment: "parent",
        start: (e) => refreshZIndex($(e.target)),
        stop: saveStickerPosition
    });
}
function createNewSticker(text) {
    const sticker = {
        id: Date.now(),
        text: text,
        positionLeft: '',
        positionTop: ''
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
function refreshZIndex($currElem) {
    $currElem.css('z-index', ++currentZIndex);
}
function saveStickerPosition() {
    const $currElement = $(this);
    
    const currSticker = stickers.find(sticker => sticker.id === Number($currElement.data('id')));
    currSticker.positionLeft = String($currElement.css('left'));
    currSticker.positionTop = String($currElement.css('top'));

    saveStickersInStorage(stickers);
}