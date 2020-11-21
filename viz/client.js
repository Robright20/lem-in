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

import { createGraph, nodes, edges, build_layers, layers, max } from './graph.js';
import { assignLayerPos, drawNode, drawEdge, updatePositions, updateMap, updateNodesColor, updateEdgesColor } from './graphics.js';
const WS_SERVER = 'ws://192.168.99.103:8000';
// const WS_SERVER = 'ws://localhost:8000';
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
let scale = 1;
let transX = 0;
let transY = 0;

farmEvents.drawn = new Promise((resolve) => {
	farmEvents['farmDrawn'] = (res) => {resolve(res)};
})

socket.addEventListener('open', (ev) => {
	socket.send('hello Server');
	setTimeout(() => { socket.send('##get-farm'); }, 1000);
});

socket.addEventListener('message', (msg) => {
	try {socketData = JSON.parse(msg.data);}catch(err){socketData.push(msg.data)}
	log(socketData)
	if (socketData[0] === '##begin-farm') setup(socketData);
	else if (/#visiting-node \w+/.test(socketData[0]))
		setNodeStatus('visiting', socketData[0].split(' ')[1])
	else if (/#visited-node \w+/.test(socketData[0]))
		setNodeStatus('visited', socketData[0].split(' ')[1])
	if (/#visited-edge \w+/.test(socketData[0]))
		setEdgeStatus('visited', socketData[0].split(' ')[1])
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
	let data = await farmEvents.drawn;
	let node = data.nodes.find(nodeName);
	log(status, nodeName)
	if (!node) return log('setNodeStatus: %s not found', nodeName)
	if (status === 'visiting') {
		node.html.setAttribute('stroke', 'black');
		node.html.setAttribute('stroke-width', '5');
	} else if (status === 'visited') {
		node.html.setAttribute('stroke', 'dodgerblue');
		node.html.setAttribute('stroke-width', '5');
	}
}

const setEdgeStatus = async function (status, edgeName) {
	let data = await farmEvents.drawn;
	let edge = data.edges.find(edgeName);
	log(status, edgeName)
	if (!edge) return log('setEdgeStatus: %s not found', edgeName)
	if (status === 'visited') {
		edge.html.setAttribute('stroke', 'dodgerblue');
		node.html.setAttribute('stroke-width', '5');
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
	farmEvents['farmDrawn']({layers, nodes, edges});
}

let originY = null;

document.getElementsByClassName('zoom-btn')[0].onclick = () => {
	//log(layers[max]);
	if (scale >= 5) return
	scale += 0.5;
	let graphH = (layers[max][layers[max].length - 1].coords.y - layers[max][0].coords.y + 10)
	let canvasH = 1044.8//canvas.clientHeight
	//let startY = (layers[max][0].coords.y + graphH / 2)
	let centerOfsset = (canvasH / 2) * scale - (canvasH / 2)
	if (originY == null) originY = layers[max][0].coords.y
	let yOffset = (originY * scale) - layers[max][0].coords.y
	originY = originY * scale
	let graphOffset = (graphH * 1.5) * 2 - graphH
	//let offsetY = (canvasH / 2) * scale
	//offsetY = (scale * (canvasH / 2)) - (canvasH / 2)
	let g = canvas.children[0];
	log(graphOffset, scale)
	g.setAttribute('transform', `scale(${scale}) translate(${transX}, ${-graphOffset})`)
}
document.getElementsByClassName('zoom-btn')[1].onclick = () => {
	if (scale <= 1) return
	scale -= 0.5;
	let g = canvas.children[0];
	g.setAttribute('transform', `scale(${scale}) translate(${transX}, ${transY})`)
}

setTimeout(() => {
	let graphH = (layers[max][layers[max].length - 1].coords.y - layers[max][0].coords.y + 10)
	let canvasH = 1044.8//canvas.clientHeight
	//let startY = (layers[max][0].coords.y + graphH / 2)
	let centerOfsset = (canvasH / 2) * scale - (canvasH / 2)
	if (originY == null) originY = layers[max][0].coords.y
	let yOffset = (originY * scale) - layers[max][0].coords.y
	originY = originY * scale
	let graphOffset = graphH * 0 - graphH
	//let offsetY = (canvasH / 2) * scale
	//offsetY = (scale * (canvasH / 2)) - (canvasH / 2)
	let g = canvas.children[0];
	log(graphOffset, scale)
	g.setAttribute('transform', `scale(${scale}) translate(${transX}, ${-graphOffset})`)
}, 4000)