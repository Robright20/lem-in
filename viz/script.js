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
const drawNode = (node) => {
	node.html = document.createElement('div');

	node.html.style.width = node.radius * 2 + 'px';
	node.html.style.height = node.radius * 2 + 'px';
	node.html.style.left = node.coords.x + 'px';
	node.html.style.top = node.coords.y + 'px';
	node.html.className = 'circle';
	canvas.append(node.html);
}
const drawEdge = (edge) => {
	edge.html = document.createElement('div');
	let angle = 0; 
	let shift = 0;

	if (edge.slope >= 0) {
		angle = edge.angle;
		if (edge.slope >= 1)
			shift = edge.coords.y;
		else if (edge.slope < 1)
			shift = edge.coords.y / 4;
	} else {
		angle = Math.PI - edge.angle;
	}
	edge.html.className = 'line';
	edge.html.style.width = edge.length + 'px';
	edge.html.style.transform = 'rotate(' + angle + 'rad)';
	edge.html.style.left = edge.coords.x + 'px';
	edge.html.style.top = edge.coords.y + shift + 'px';
	canvas.append(edge.html);
}
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
