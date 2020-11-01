#!/usr/bin/env node

'use strict';
const log = console.log;
const http = require('http');
const fs = require('fs');
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
	log(req.url);
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
server.listen(3000, () => log('listening on port: 3000'));
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
