import './styles.scss';

const sendMessageForm = document.getElementById('sendMessageFrom');
const inputFields = document.getElementsByClassName('input-field');
const allMessagesContainer = document.getElementById('allMessagesContainer');
const messageTemplate = document.getElementById('messageTemplate').innerHTML;
const allMessages = {};
const ws = new WebSocket('wss://fep-app.herokuapp.com/');

scrollToBottom();

ws.onmessage = onSocketMessage;
sendMessageForm.addEventListener('submit', onSubmitMessageForm);

function onSubmitMessageForm(e) {
    e.preventDefault();
    sendNewMessage();
}

function sendNewMessage() {
    const mewMessage = getInputValues();

    ws.send(
        JSON.stringify({
            action: 'message',
            payload: mewMessage
        })
    );

    resetForm();
}

function getInputValues() {
    const message = {};
    message.id = Math.random();
    for(let i = 0; i < inputFields.length; i++) {
        message[inputFields[i].name] = inputFields[i].value;
    }

    return message;
}

function onSocketMessage(message) {
    console.log(message);
    const packetData = JSON.parse(message.data);

    if(!allMessages[packetData.payload.id]) {
        allMessages[packetData.payload.id] = createMessage(packetData.payload);    
    }
}

function createMessage(message) {
    const html = messageTemplate.replace('{{author}}', message.author)
                                .replace('{{message}}', message.message);
    const el = htmlToElement(html);
                            
    allMessagesContainer.append(el);

    scrollToBottom();
}

function htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content.firstChild;
}

function scrollToBottom() {
    allMessagesContainer.scrollTop = allMessagesContainer.scrollHeight;
}

function resetForm() {
    document.querySelector('#sendMessageFrom #message').value = "";
}