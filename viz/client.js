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

import { createGraph, nodes, edges } from './graph.js';
import { drawNode, drawEdge } from './graphics.js';
const WS_SERVER = 'ws://192.168.99.103:8000';
const socket = new WebSocket(WS_SERVER);
const canvas = document.getElementById('canvas');
const log = console.log;
let data = '';

socket.addEventListener('open', (ev) => {
	socket.send('hello Server');
});
socket.addEventListener('message', (msg) => {
	try {
		data = JSON.parse(msg.data);
		if (data[0] === '##begin-farm') {
			createGraph(data);
			for (let i in nodes) {
				if (typeof nodes[i] === 'object')
					drawNode(canvas, nodes[i]);
			}
			for (let i in edges) {
				if (typeof edges[i] === 'object')
					drawEdge(canvas, edges[i]);
			}
		}
	} catch(err) {
		log(err);
		log(msg.data);
	}
});
