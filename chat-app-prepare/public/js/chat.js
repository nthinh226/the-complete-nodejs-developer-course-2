const socket = io();

socket.on('serverSendRequest', (count) => {
	console.log('Client receive from server', count);
});

document.querySelector('#sendRequest').addEventListener('click', () => {
	socket.emit('clientSendRequest');
})
document.querySelector('#stopReceiveRequest').addEventListener('click', () => {
	socket.emit('stop');
})
