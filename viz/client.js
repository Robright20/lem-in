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
import { assignLayerPos, drawNode, drawEdge, updatePositions, updateMap, updateNodesColor, updateEdgesColor } from './graphics.js';
// const WS_SERVER = 'ws://192.168.99.103:8000';
const WS_SERVER = 'ws://localhost:8000';
const socket = new WebSocket(WS_SERVER);
const canvas = document.getElementById('canvas');
const xpadding = document.getElementById('Xpadding')
const ypadding = document.getElementById('Ypadding')
const nodesColor = document.getElementById('nodesColor')
const edgesColor = document.getElementById('edgesColor')
const states = document.getElementsByClassName('states')
const startRoom = states[0]
const endRoom = states[1]
const padding = {x: 20, y: 30};
const log = console.log;
let socketData = [];
let antSize = 0;
let farmEvents = {}

farmEvents.on = function(event, action) {
	if (!this.callbacks) this.callbacks = {};
	this.callbacks[event] = action;
}

farmEvents.emit = function(event, data) {
	if (this.callbacks.hasOwnProperty(event)) (this.callbacks[event])(data);
}

farmEvents.drawn = new Promise((resolve) => {
	farmEvents.on('farmDrawn', (res) => {resolve(res)});
})

socket.addEventListener('open', (ev) => {
	socket.send('hello Server');
	setTimeout(() => { socket.send('##get-farm'); }, 1000);
});

socket.addEventListener('message', (msg) => {
	try {socketData = JSON.parse(msg.data);}catch(err){socketData.push(msg.data)}
	if (socketData[0] === '##begin-farm') setup(socketData);
	else if (/#visiting-node \w+/.test(socketData[0])) {
		setNodeStatus('visiting', socketData[0].split(' ')[1])
	}
	log(socketData)
});

function getAntSize(data) {
	for (let row in data) {
		if (/^\d+$/.test(data[row])) {
			return Number(data[row]);
		}
	}
	return 0;
}

xpadding.oninput = function() {
	padding.x = this.value;
	updatePositions(canvas, layers, padding);
	updateMap(nodes, edges);
}

ypadding.oninput = function() {
	padding.y = this.value;
	updatePositions(canvas, layers, padding);
	updateMap(nodes, edges);
}

nodesColor.oninput = function() {
	updateNodesColor(nodes, this.value);
}

edgesColor.oninput = function() {
	updateEdgesColor(edges, this.value);
}

const setNodeStatus = async function (status, nodeName) {
	let node = {}
	let data = await farmEvents.drawn;
	if (status === 'visiting') {
		node = data.nodes.find(nodeName)
		if (node) {
			node.html.setAttribute('stroke', 'black');
			node.html.setAttribute('stroke-width', '3');
		} else {
			log('setNodeStatus: %s not found', nodeName)
		}
	}
}

const setup = function(farm) {
	antSize = getAntSize(farm)
	startRoom.children[1].innerText = antSize
	createGraph(farm);
	build_layers(nodes);
	assignLayerPos(canvas, layers);
	log(layers, nodes, edges);
	for (let i in edges) {
		if (typeof edges[i] === 'object')
			drawEdge(canvas, edges[i]);
	}
	for (let i in nodes) {
		if (typeof nodes[i] === 'object')
			drawNode(canvas, nodes[i]);
	}
	farmEvents.emit('farmDrawn', {layers, nodes, edges});
}