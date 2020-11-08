const nodes = [];
const edges = [];
const scale = 20;
const adjust = {x: 300, y: 250}

nodes.add = function (data) {
	if (!/^[#L]/.test(data[0])) {
		let node = new Node(data[0]);

		node.coords = {
			x: Number(data[1]) * scale + adjust.x,
			y: Number(data[2]) * scale + adjust.y
		};
		// node.coords = { x: Number(data[1]), y: Number(data[2]) };
		if (this.start === node.name) {
			this.start = node;
		} else if (this.end === node.name) {
			this.end = node;
		}
		nodes.push(node);
		return node;
	}
}
nodes.find = function(name) {
	for (const key in this) {
		if (this[key].name === name) {
			return this[key];
		}
	}
}
const newEdge = (from, to) => {
	if (from && to) {
		return ({
			from: from,
			to: to
		});
	}
};
class Node {
	constructor(name) {
		this._name = name;
		this.coords = {x: 0, y: 0};
		this.edges = [];
		this.html = '';
		this.radius = 8;
	}
	get name() {
		return (this._name);
	}
	linkWith(node) {
		let edge = newEdge(this, node);
	
		if (edge) {
			this.edges.push(edge);
			return (edge);
		}
	}
	addEdge(edge) {
		this.edges.push(edge);
	}
}
function createGraph(data) {
	let cols = [];
	let node = null;
	let edge = {};
	let cmd = '';
	nodes.start = '';
	nodes.end = '';

	for (let row in data) {
		if (/^(#){2}/.test(data[row])) {
			if (data[row] === '##end-farm') {
				return { nodes: nodes, edges: edges };
			} else if (cmd === '') {
				cmd = data[row];
			}
		} else if (/^\w+ \d+ \d+$/.test(data[row])) {
			cols = data[row].split(' ');
			node = nodes.add(cols);
			if (cmd === '##start') {
				nodes.start = node;
			} else if (cmd === '##end') {
				nodes.end = node;
			}
			cmd = '';
		} else if (/^\w+-\w+$/.test(data[row]) && !/^[L#]/.test(data[row])) {
			cols = data[row].split('-');
			edge = newEdge(nodes.find(cols[0]), nodes.find(cols[1]));
			edges.push(edge);
			edge.from.addEdge(edge);
			edge.to.addEdge(edge);
			cmd = '';
		}
	}
}

export { createGraph, nodes, edges };