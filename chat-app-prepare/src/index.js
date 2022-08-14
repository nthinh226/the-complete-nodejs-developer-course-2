import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirName, '../public');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const syncAwait = (ms) => {
	const end = Date.now() + ms;
	while (Date.now() < end) continue;
};
let count = 0;
io.on('connection', (socket) => {
	console.log('a new user connected');
	const autoSend = setInterval(() => {
		console.log(count);
		io.emit('serverSendRequest', count);
		count++;
	}, 2000);
	socket.on('clientSendRequest', () => {
		io.emit('serverSendRequest');
	});
	socket.on('stop', () => {
		clearInterval(autoSend);
	});
});

app.use(express.static(publicDirectoryPath));

server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
