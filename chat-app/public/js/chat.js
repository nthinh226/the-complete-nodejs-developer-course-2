const socket = io();

socket.on('message', (meessage) => {
	console.log(meessage);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
	e.preventDefault();
	const message = e.target.elements.message;

	socket.emit('sendMessage', message);
});
