'use strict'

const log = console.log;

const nodesDist = (from, to) => {
	let x = (from.coords.x - to.coords.x);
	let y = (from.coords.y - to.coords.y);
	return (Math.sqrt(x * x + y * y));
}

const nodesAdj = (from, to) => {
	return (Math.abs(from.coords.x - to.coords.x));
}

class Edge {
	constructor(from, to) {
		this.from = from;
		this.to = to;
		this.length = nodesDist(from, to);
		this.angle = Math.acos(nodesAdj(from, to) / this.length);
	}
}

class Node {
	radius = 20;

	constructor(name) {
		this._name = name;
		this.coords = { x: 0, y: 0 };
		this.edges = [];
	}
	get name() {
		return (this._name);
	}
	linkWith(node) {
		return new Edge(this, node);
	}
}

let node1 = new Node("bob");
node1.coords = {x: 50, y: 100};
let node2 = new Node("laura");
node2.coords = {x: 250, y: 250};
node1.linkWith(node2);
const drawNode = (node) => {
	let div = document.createElement('div');

	div.style.width = node.radius * 2 + 'px';
	div.style.height = node.radius * 2 + 'px';
	div.style.left = node.coords.x + 'px';
	div.style.top = node.coords.y + 'px';
	div.className = 'circle';
	document.body.append(div);
}
const drawEdge = (edge) => {
	let div = document.createElement('div');

	div.className = 'line';
	div.style.width = edge.length + 'px';
	div.style.-moz-transform: 'rotate(' + edge.angle + 'rad)';
	div.style.-webkit-transform: 'rotate(' + edge.angle + 'rad)';
	div.style.-o-transform: 'rotate(' + edge.angle + 'rad)';
	div.style.-ms-transform: 'rotate(' + edge.angle + 'rad);
	document.body.append(div);
}
drawNode(node1);
drawNode(node2);
//drawEdge(node1.edges[0]);
