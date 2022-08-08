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

let count = 0;

io.on('connection', (socket) => {
	console.log('a new user connected');
	socket.emit('countUpdated', count);

	socket.on('increment', () => {
		count++;
		io.emit('countUpdated', count);
	})
});



app.use(express.static(publicDirectoryPath));

server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
