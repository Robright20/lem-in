#!/usr/bin/env node

'use strict';
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
const log = console.log;
const wss = new WebSocket.Server({ noServer: true });
const MIMETypes = {
	'html': 'text/html',
	'css': 'text/css',
	'js': 'text/javascript',
	getType: function (str) {
		for (let key in this) {
			if (key === str)
				return this[key];
		}
		return null;
	}
};
let uri = '';
let type = '';
let socket = '';
let leminData = {};
let msgCount = 0;
let msgToSend = '';
let farmData = '';

const server = http.createServer((req, res) => {
	uri = (req.url === '/') ? ['index.html'] : req.url.split('/');
	type = uri[uri.length - 1].split('.');
	type = MIMETypes.getType(type[type.length - 1]);
	res.writeHead(200, {'Content-Type': type});
	fs.readFile(uri[uri.length - 1], null, (err, data) => {
		if (err) {
			res.writeHead(404);
		} else {
			res.write(data);
		}
		res.end();
	}); 
});

wss.on('connection', (ws) => {
	socket = ws;
	ws.send("connected to the server");
	try {
		for (let data in leminData) {
			msgToSend = JSON.stringify(leminData[data]);
			//ws.send(msgToSend);
			if (leminData['msg0'][0] === '##begin-farm')
				farmData = msgToSend;
		}
		leminData = {};
	} catch (error) {
		ws.send("Waiting for the farm...");
	}
	ws.on('message', (msg) => {
		log('received: %s', msg);
		if (msg === '##get-farm')
			ws.send(farmData);
	});
});

server.on('upgrade', (req, socket, head) => {
	wss.handleUpgrade(req, socket, head, (ws) => {
		wss.emit('connection', ws, req);
	});
});

server.listen(8000, () => log('listening on port: 8000'));

process.stdin.on('data', inputStdin => {
	leminData[`msg${msgCount}`] = String(inputStdin).split('\n');
	msgCount += 1;
	if (socket !== '')
	{
		for (let data in leminData) {
			socket.send(JSON.stringify(leminData[data]));
		}
		leminData = {};
	}
});

process.stdin.on('end', _val => {
	log('stdin closed');
	process.exit();
});
