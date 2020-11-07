'use strict'
/* ***************************************** */
/*		get instant coords in devtools		*/

		let x, y;
		document.onmousemove = (e) => {
			x = e.pageX;
			y = e.pageY;
		}

/*		type in live expression
 *		`(${x}, ${y})`						*/
/* ***************************************** */

import { Node, newEdge } from './graph.js';
import { drawNode, drawEdge } from './graphics.js';

const socket = new WebSocket('ws://localhost:8000');
const canvas = document.getElementById('canvas');
const log = console.log;
let data = '';

socket.addEventListener('open', (ev) => {
	socket.send('hello Server');
});
socket.addEventListener('message', (msg) => {
	try {
		data = JSON.parse(msg.data);
		log(data);
	} catch(err) {
		log(msg.data);
	}
});
