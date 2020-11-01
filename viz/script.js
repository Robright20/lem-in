'use strict'

//get instant coords in devtools
var x, y; document.onmousemove=(e)=>{x=e.pageX;y=e.pageY;}
//type in live expression
// `(${x}, ${y})`

const log = console.log;
const canvas = document.getElementById('canvas');
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
		this.coords = from.coords;
		this.html = '';
	}
}
class Node {
	radius = 20;

	constructor(name) {
		this._name = name;
		this.coords = {x: 0, y: 0};
		this.edges = [];
		this.html = '';
	}
	get name() {
		return (this._name);
	}
	linkWith(node) {
		this.edges.push(new Edge(this, node));
	}
}
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

	edge.html.className = 'line';
	edge.html.style.width = edge.length + 'px';
	edge.html.style.transform = 'rotate(' + edge.angle + 'rad)';
	edge.html.style.left = edge.coords.x + 'px';
	edge.html.style.top = edge.coords.y + 'px';
	canvas.append(edge.html);
}
let node1 = new Node("bob");
node1.coords = {x: 50, y: 100};
let node2 = new Node("laura");
node2.coords = {x: 250, y: 250};
node1.linkWith(node2);
drawNode(node1);
drawNode(node2);
drawEdge(node1.edges[0]);
