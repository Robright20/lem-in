#!/usr/bin/env node

'use strict';
const fs = require('fs');
const http = require('http');
const Websocket = require('ws');
const url = require('url');
const wss = new Websocket.Server({ noServer: true });
const log = console.log;
const contentTypes = {
	'html': 'text/html',
	'css': 'text/css',
	'js': 'application/javascript',
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

const server = http.createServer((req, res) => {
	log(url.parse(req.url));
	uri = (req.url === '/') ? ['index.html'] : req.url.split('/');
	type = uri[uri.length - 1].split('.');
	type = contentTypes.getType(type[type.length - 1]);
	fs.readFile(uri[uri.length - 1], null, (err, data) => {
		if (err) {
			res.writeHead(404);
		} else {
			res.writeHead(200, {'Content-Type': type});
			res.write(data);
		}
		res.end();
	}); 
});
server.on('upgrade', function upgrade(req, socket, head) {
	const pathname = url.parse(req.url).pathname;
	log(pathname);
});
server.listen(8000, () => log('listening on port: 8000'));
/*
process.stdin.on('data', inputStdin => {
	log("bob");
	//log(String(inputStdin));
});

process.stdin.on('end', _val=> {
	log(_val);
});
*/
//process.stdout.write("hello: ");
