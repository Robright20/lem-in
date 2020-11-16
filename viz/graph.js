'use strict'
const log = console.log;
const nodes = ['start', 'end'];
const edges = [];
const layers = [];
const scale = 20;
const adjust = {x: 300, y: 250}

nodes.add = function (data, cmd) {
	if (!/^[#L]/.test(data[0])) {
		let node = new Node(data[0]);

		node.coords = {
			x: Number(data[1]) * scale + adjust.x,
			y: Number(data[2]) * scale + adjust.y
		};
		node.id = nodes.length;
		if (cmd === '##start') {
			this[0] = node;
			node.id = 0;
		} else if (cmd === '##end') {
			this[1] = node;
			node.id = 1;
		} else {
			nodes.push(node);
		}
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

edges.find = function(name) {
	for (const key in this) {
		if (this[key].name === name) {
			return this[key];
		}
	}
}

const newEdge = (from, to) => {
	if (from && to) {
		return ({
			_from: from.id,
			_to: to.id,
			get from() {
				return (nodes[this._from]);
			},
			get to() {
				return (nodes[this._to]);
			},
			set from(node) {
				this._from = node.id;
			},
			set to(node) {
				this._to = node.id;
			}
		});
	}
};

class Node {
	constructor(name) {
		this.name = name;
		this.coords = {x: 0, y: 0};
		this.edges = [];
		this.html = '';
		this.radius = 8;
	}
}

function createGraph(data) {
	let cols = [];
	let edge = {};
	let cmd = '';

	for (let row in data) {
		if (/^(#){2}/.test(data[row])) {
			if (data[row] === '##end-farm') {
				return { nodes: nodes, edges: edges };
			} else if ((data[row] == '##start' || data[row] == '##end') && cmd === '') {
				cmd = data[row];
			}
		} else if (/^\w+ \d+ \d+$/.test(data[row])) {
			cols = data[row].split(' ');
			nodes.add(cols, cmd);
			cmd = '';
		} else if (/^\w+-\w+$/.test(data[row]) && !/^[L#]/.test(data[row])) {
			cols = data[row].split('-');
			edge = newEdge(nodes.find(cols[0]), nodes.find(cols[1]));
			if (edge) {
				edge.id = edges.length;
				edge.name = data[row];
				edge.from.edges.push(edges.length);
				edge.to.edges.push(edges.length);
				edges.push(edge);
				cmd = '';
			}
		}
	}
}

function build_layers(nodes) {
	let cur = 0;
	let edge = [];
	let to = {};
	layers[0] = [nodes[0]];
	nodes[0].visited = true;

	do {
		layers[cur].forEach(node => {
			node.edges.forEach(edgeId => {
				edge = edges[edgeId];
				to = node === edge.from ? edge.to : edge.from;
				if (to.visited === undefined) {
					to.visited = true;
					if (layers[cur + 1]) {
						layers[cur + 1].push(to);
					} else {
						layers[cur + 1] = [to];
					}
				}
			})
		});
		cur += 1;
	} while (layers[cur]);
	return (layers);
}

export { createGraph, nodes, edges, build_layers, layers };
