const STICKER_CLASS = 'sticker';
const HIDDEN_CLASS = 'hidden';
const KEY_STICKERS = 'stickers';
const MAX_STICKERS_QUANTITY = 42;
const STICKERS_STEP = 30;

const $stickersContainer = $('#stickersContainer');
const $errorMessage = $('#errorMessage');
const $panel = $('#panel');
let currentZIndex = 1;
let stickers = [];
let lastEditedStickerID = 0;

const dialogForm = $('#dialogForm').dialog({
    autoOpen: false,
    height: 340,
    width: 350,
    modal: true,
    buttons: {
        'ADD NEW STICKER': onAddBtnClick,
        CANCEL: closeDialogWindow
    }
});
const dialogWarning = $('#dialogWarning').dialog({
    autoOpen: false,
    height: 85,
    width: 350,
    hide: {
    effect: "fade",
    duration: 400
    }
});

init();

$panel.on('click', '#addStickerBtn', onAddStickerClick);
$panel.on('click', '#resetPositionsBtn', onResetBtnClick);
$stickersContainer.on('click', '.delete-btn', onDeleteBtnClick);
$stickersContainer.on('focus', '.sticker', onStickerFocus);
$stickersContainer.on('blur', '.sticker', onStickerBlur);

function init() {
    getStickers();
}
function onAddStickerClick() {
    if(stickers.length < MAX_STICKERS_QUANTITY) {
        openDialogWindow();
    } else {
        dialogWarning.dialog('open');
        setTimeout(() => dialogWarning.dialog('close') , 800);
    }
}
function closeDialogWindow() {
    $errorMessage.addClass(HIDDEN_CLASS);
    $('#addStickerForm').trigger('reset');
    dialogForm.dialog('close');
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
    let topPosition = 20;
    stickers.map(sticker => {
        sticker.positionLeft = 0;
        sticker.positionTop = topPosition;
        topPosition += STICKERS_STEP;
        sticker.customWidth = '250px';
        sticker.customHeight = '250px';
    });

    saveStickersInStorage(stickers);

    $stickersContainer.html('');
    renderStickers(stickers);
}
function openDialogWindow() {
    dialogForm.dialog( 'open');
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

    $newElem.css('width', item.customWidth);
    $newElem.css('height', item.customHeight);

    refreshZIndex($newElem);

    $newElem.draggable({
        containment: "parent",
        start: (e) => refreshZIndex($(e.target)),
        stop: saveStickerPosition
    }).resizable({
        stop: saveStickerSize,
        maxHeight: 450,
        maxWidth: 450,
        minHeight: 250,
        minWidth: 250
    });
}
function createNewSticker(text) {
    const currnetPosition = getCurrnetPosition();

    const sticker = {
        id: Date.now(),
        text: text,
        positionLeft: currnetPosition.left,
        positionTop: currnetPosition.top,
        customWidth: '',
        customHeight: ''
    };
    lastEditedStickerID = sticker.id;
    stickers.push(sticker);
    saveStickersInStorage(stickers);

    renderSticker(sticker);
}
function getCurrnetPosition() {
    if(lastEditedStickerID === 0) {
        return {
            left: 400,
            top: 0
        };
    } else {
        const lastEditedSticker = getStickerFromArrayByID(lastEditedStickerID);
        return {
            left: lastEditedSticker.positionLeft,
            top: parseInt(lastEditedSticker.positionTop) + STICKERS_STEP
        };
    }
}
function deleteSticker(id) {
    if(lastEditedStickerID === id) {
        lastEditedStickerID = 0;
    }

    stickers = stickers.filter(sticker => sticker.id !== Number(id));
    saveStickersInStorage(stickers);

    const currElem = getDOMElemByDataId(id);
    currElem.remove();
}
function editStickerText(id, newText) {
    const editingSticker = getStickerFromArrayByID(id);
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

    lastEditedStickerID = $currElement.data('id');

    const currSticker = getStickerFromArrayByID(lastEditedStickerID);
    currSticker.positionLeft = String($currElement.css('left'));
    currSticker.positionTop = String($currElement.css('top'));

    saveStickersInStorage(stickers);
}
function saveStickerSize() {
    const $currElement = $(this);
    const currID = $currElement.data('id');
    
    const currSticker = getStickerFromArrayByID(currID);
    currSticker.customWidth = String($currElement.css('width'));
    currSticker.customHeight = String($currElement.css('height'));

    saveStickersInStorage(stickers);
}
function getStickerFromArrayByID(id) {
    return stickers.find(sticker => sticker.id === Number(id));
}