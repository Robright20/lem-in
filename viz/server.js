#!/usr/bin/env node

'use strict';
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ noServer: true });
const log = console.log;
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

/*
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
	ws.on('message', (msg) => {
		log('received: %s', msg);
	});
	socket = ws;
	ws.send('hey!');
});
server.on('upgrade', (req, socket, head) => {
	wss.handleUpgrade(req, socket, head, (ws) => {
		wss.emit('connection', ws, req);
	});
});
server.listen(8000, () => log('listening on port: 8000'));
*/
process.stdin.on('data', inputStdin => {
	log(String(inputStdin));
});
process.stdin.on('end', _val=> {
	log(_val);
});
//process.stdout.write("hello: ");
