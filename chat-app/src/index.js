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

io.on('connection', (socket) => {
	console.log('a user connected');

	socket.emit('message', "Welcome!");

	socket.on('sendMessage', (message) => {
		io.emit('message', message);
	})
});

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.static(publicDirectoryPath));

server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
