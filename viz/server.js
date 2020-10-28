#!/usr/local/bin/node

const fs = require('fs');
const log = console.log;
const fds = [Number(process.argv[2]), Number(process.argv[3])]
log("Node Process");
log(fds);

const getParentData = (err, len, buf) => {
	log(buf);
}

const oncloseFd = (err) => {
	log(err);
}

fs.close(fds[1], oncloseFd);
fs.read(fds[0], getParentData);
fs.close(fds[0], oncloseFd);
while (true)
	true;
