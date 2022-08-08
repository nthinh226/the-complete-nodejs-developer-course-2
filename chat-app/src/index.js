import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const io = new Server(server);

let count = 0;
io.on('connection', (socket) => {
	console.log('a user connected');

	socket.emit('countUpdated', count);

	socket.on('increment', () => {
		count++;
		// socket.emit('countUpdated', count);
		io.emit('countUpdated', count);
	});
	socket.emit('refreshRequested');
	socket.on('sendRequested', () => {
		io.emit('refreshRequested');
	});
});

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.static(publicDirectoryPath));

server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
