'use strict'
/* ***************************************** */
/*		get instant coords in devtools		*/

		let x, y;
		// document.onmousemove = (e) => {
		// 	x = e.pageX;
		// 	y = e.pageY;
		// }

/*		type in live expression
 *		`(${x}, ${y})`						*/
/* ***************************************** */

import Graphic from './graphics.js';
import Graph from './graph.js';
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
const padding = {x: 5, y: 5};
const log = console.log;
let socketData = [];
let antSize = 0;
let farmEvents = {}
let scale = 1;
let g = canvas.children[0];
let transX, transY, mousedown;
let centerY =  canvas.clientHeight / 2
let centerX = canvas.clientWidth / 2
let graph;

farmEvents.drawn = new Promise((resolve, reject) => {
	farmEvents['farmDrawn'] = (res) => {resolve(res)};
	farmEvents['farmDrawnFAIL'] = (res) => {reject(res)};
})

socket.addEventListener('open', (ev) => {
	socket.send('hello Server');
	setTimeout(() => { socket.send('##get-farm') }, 1000);
});

socket.addEventListener('message', (msg) => {
	try {socketData = JSON.parse(msg.data)}
	catch(err){socketData.push(msg.data)}
	// log(socketData)
	if (socketData[0] === '##begin-farm')
		setup(socketData);
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
	Graphic.updatePositions(graph, padding);
	Graphic.setGraphHTML(graph.nodes, graph.edges);
}

ypadding.oninput = function() {
	padding.y = this.value;
	Graphic.updatePositions(graph, padding);
	Graphic.setGraphHTML(graph.nodes, graph.edges);
}

nodesColor.oninput = function() {
	Graphic.setNodesColor(graph.nodes, this.value);
}

edgesColor.oninput = function() {
	Graphic.setEdgesColor(graph.edges, this.value);
}

const setNodeStatus = async function (status, nodeName) {
	let data = await farmEvents.drawn;
	let node = data.find({nodes: nodeName});
//	log(status, nodeName)
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
	let edge = data.find({edges: edgeName});
	//log(status, edgeName)
	if (!edge) return log('setEdgeStatus: %s not found', edgeName)
	if (status === 'visited') {
		edge.html.setAttribute('stroke', 'dodgerblue');
		node.html.setAttribute('stroke-width', '5');
	}
}

const setup = function(farm) {
	antSize = getAntSize(farm)
	startRoom.children[1].innerText = antSize
	graph = new Graph(farm);
	graph.buildLayers();
	Graphic.updatePositions(graph, padding);
	xpadding.value = padding.x
	ypadding.value = padding.y
	// log(layers, nodes, edges);
	// log(graph)
	for (let i in graph.edges) {
		if (typeof graph.edges[i] === 'object')
			Graphic.drawEdge(canvas, graph.edges[i]);
	}
	for (let i in graph.nodes) {
		if (typeof graph.nodes[i] === 'object')
			Graphic.drawNode(canvas, graph.nodes[i]);
	}
	// farmEvents['farmDrawn'](graph);
}

document.getElementsByClassName('zoom-btn')[0].onclick = () => {
	if (scale >= 5) {
		scale = 5;
		return
	}
	scale += 0.5;
	if (transX == null || transY == null)
		transY = transX = 0
	g.setAttribute('transform', `scale(${scale}) translate(${transX}, ${transY})`)
}

document.getElementsByClassName('zoom-btn')[1].onclick = () => {
	if (scale <= 1) {
		scale = 1;
		return
	}
	scale -= 0.5;
	g.setAttribute('transform', `scale(${scale}) translate(${transX}, ${transY})`)
}

canvas.onmouseup = () => {mousedown = false}

canvas.onmousedown = (event) => {
	mousedown = true
	x = event.offsetX;
	y = event.offsetY;
}

canvas.onmouseout = (event) => {
	if (!canvas.contains(event.relatedTarget)) mousedown = false
}

canvas.onmousemove = (event) => {
	if (!mousedown || scale <= 1) return
	transX += (event.offsetX - x) / scale
	transY += (event.offsetY - y) / scale
	x = event.offsetX;
	y = event.offsetY;
	g.setAttribute('transform', `scale(${scale}) translate(${transX}, ${transY})`)
}
