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

import { createGraph, nodes, edges, build_layers, layers } from './graph.js';
import { updatePositions, drawNode, drawEdge } from './graphics.js';
//const WS_SERVER = 'ws://192.168.99.103:8000';
const WS_SERVER = 'ws://localhost:8000';
const socket = new WebSocket(WS_SERVER);
const canvas = document.getElementById('canvas');
const log = console.log;
let data = '';

socket.addEventListener('open', (ev) => {
	socket.send('hello Server');
	setTimeout(function(){ socket.send('##get-farm'); }, 3000);
});
socket.addEventListener('message', (msg) => {
	try {data = JSON.parse(msg.data);}catch(err){ log('failed to parse: msg => [%s]', msg.data)}
	try {
		if (data[0] === '##begin-farm') {
			createGraph(data);
			build_layers(nodes);
			updatePositions(canvas, layers);
			log(layers, nodes, edges);
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
