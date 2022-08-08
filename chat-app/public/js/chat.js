const socket = io();

socket.on('countUpdated', (count) => {
	console.log('The count has been updated', count);
});

document.querySelector('#increment').addEventListener('click', () => {
	console.log('Clicked');
	socket.emit('increment')
})

socket.on('refreshRequested', () => {
	console.log('Refresh ok!!');
})

setTimeout(() => {
	socket.emit('sendRequested')
}, 2000)