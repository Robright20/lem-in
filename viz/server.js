#!/usr/bin/env node

'use strict';
const log = console.log;

let inputString = '';

process.stdin.on('data', inputStdin => {
	log("bob");
	//log(String(inputStdin));
});

process.stdin.on('end', _val=> {
	log(_val);
});

//process.stdout.write("hello: ");
