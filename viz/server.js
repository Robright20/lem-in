#!/usr/bin/env node

'use strict';
const fs = require('fs');
const http = require('http');
const events = require('events')
const WebSocket = require('ws');
const wss = new WebSocket.Server({ noServer: true });
const MIMETypes = require('./mime')
const log = console.log;
let states = {}
let client = {}
let leminData = {};
let msgCount = 0;
let farmData = [];

const clientState = new Promise((resolve) => {
	states['farmSent'] = (res) => {resolve(res)};
})

const server = http.createServer((req, res) => {
	let uri = (req.url === '/') ? ['index.html'] : req.url.split('/');
	let type = uri[uri.length - 1].split('.');
	type = MIMETypes.getType(type[type.length - 1]);
	res.writeHead(200, {'Content-Type': type});
	fs.readFile(uri[uri.length - 1], null, (err, data) => {
		if (err) res.writeHead(404);
		else res.write(data);
		res.end();
	});
});

server.on('upgrade', (req, sock, head) => {
	wss.handleUpgrade(req, sock, head, (ws) => {
		wss.emit('connection', ws, req);
		client.ws = ws;
	});
});

wss.on('connection', (ws) => {
	ws.send("connected to the server");
	ws.on('message', (msg) => {
		log('received: %s', msg);
		if (msg === '##get-farm' && farmData.length) {	
			ws.send(JSON.stringify(farmData))
			farmData.sent = true;
			states['farmSent'](ws);
		}
	});
});

server.listen(8000, () => log('listening on port: 8000'));

process.stdin.on('data', async (inputStdin) => {
	leminData[`msg${msgCount}`] = String(inputStdin).split('\n');
	if (leminData[`msg${msgCount}`][0] === '##begin-farm')
		getFarmData(leminData[`msg${msgCount}`])
	let res = await clientState;
	for (const key in leminData) {
		res.send(JSON.stringify(leminData[key]));
		delete leminData[key]
	}
	msgCount += 1;
});

process.stdin.on('end', _val => {
	log('stdin closed');
	process.exit();
});

const getFarmData = (data) => {
	let key = 0;
	
	do {
		farmData[key] = data.shift();
	} while (farmData[key] !== '##end-farm' && ++key)
}