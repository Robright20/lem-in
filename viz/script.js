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


const socket = new WebSocket('ws://192.168.99.103:8000');
const log = console.log;
const canvas = document.getElementById('canvas');
socket.addEventListener('open', (ev) => {
	socket.send('hello Server');
});
socket.addEventListener('message', (msg) => {
	log(msg);
});
/*
let node1 = new Node("bob");
let node2 = new Node("laura");
let node3 = new Node("dany");
let node4 = new Node("jasmine");
node1.coords = {x: 50, y: 100};
node2.coords = {x: 250, y: 250};
node3.coords = {x: 80, y: 140};
node4.coords = {x: 100, y: 50};
node1.linkWith(node2);
node1.linkWith(node3);
node1.linkWith(node4);
drawNode(node1);
drawNode(node2);
drawNode(node3);
drawNode(node4);
drawEdge(node1.edges[0]);
drawEdge(node1.edges[1]);
drawEdge(node1.edges[2]);
*/
