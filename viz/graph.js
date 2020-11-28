'use strict'

// import Graphic from './graphics.js';
const log = console.log;

class Node {
	constructor(id, name) {
		if (typeof id !== 'number' || typeof name !== 'string')
			throw Error(`from: ${from}, to: ${to}`)
		this.id = id;
		this.name = name;
		this.coords = {x: 0, y: 0};
		this.neighbrs = [];
		this.edges = [];
		this.radius = 5;
	}
	addLink = (edge) => {
		let to = edge.from;
		if (to.id === this.id)
			to = edge.to;
		this.neighbrs.push(to.id);
		this.edges.push(edge.id);
	}
}

class Edge {
	constructor(from, to) {	
		if (from && to) {
			this.from = from;
			this.to = to;
		} else
			throw Error(`from: ${from}, to: ${to}`)
	}
}

export default class Graph {
	constructor(data) {
		let cols, cmd;
		this._nodes = ['start', 'end'];
		this._edges = [];
		this._layers = [];
		this._layersMax = 0;
		this._index = {};
	
		for (let row in data) {
			if (/^(#){2}/.test(data[row])) {
				if (data[row] === '##end-farm') return
				else if ((data[row] == '##start' || data[row] == '##end') && cmd == null)
					cmd = data[row];
			} else if (/^\w+ \d+ \d+$/.test(data[row])) {
				cols = data[row].split(' ');
				this.addNode(cols, cmd);
				cmd = null;
			} else if (/^\w+-\w+$/.test(data[row]) && !/^[L#]/.test(data[row])) {
				cols = data[row].split('-');
				if (this.addEdge(cols, data[row]))
					cmd = null;
			}
		}
	}
	addNode = (data, cmd) => {
		const scale = 20;
		const adjust = {x: 300, y: 250};
		let node;
		
		if (!/^[#L]/.test(data[0])) {
			node = new Node(this._nodes.length, data[0]);
			node.coords = {
				x: Number(data[1]) * scale + adjust.x,
				y: Number(data[2]) * scale + adjust.y
			};
			if (cmd === '##start') {
				node.id = 0;
				this._nodes[0] = node;
			} else if (cmd === '##end') {
				node.id = 1;
				this._nodes[1] = node;
			} else
				this._nodes.push(node);
			this._index[node.name] = node.id;
			return node;
		}
	}
	addEdge = (data, name) => {
		try {
			let edge = new Edge(this.find({nodes: data[0]}), this.find({nodes: data[1]}));

			if (edge) {
				edge.id = this._edges.length;
				edge.name = name;
				edge.from.addLink(edge)
				edge.to.addLink(edge)
				this._edges.push(edge);
				this._index[edge.name] = edge.id;
				return true;
			}
		} catch (err) { log(err) }
	}
	find = (options) => {
		let result;

		if (typeof options !== 'object') return
		Object.keys(options).forEach(key => {
			let id;

			if (key === 'nodes') {
				id = this._index[options['nodes']];
				if (id != null) result = this._nodes[id];
			} else if (key === 'edges') {
				id = this._index[options['edges']];
				if (id != null) result = this._edges[id];
			}
		})
		return result;
	}
	buildLayers = () => {
		let cur = 0;
		this.layers[0] = [this.nodes[0]];
		this.nodes[0].visited = true;
		
		do {
			this.layers[cur].forEach(node => {
				node.neighbrs.forEach(id => {
					if (this.nodes[id].visited == null) {
						this.nodes[id].visited = true;
						if (this.layers[cur + 1])
							this.layers[cur + 1].push(this.nodes[id]);
						else
							this.layers[cur + 1] = [this.nodes[id]];
					}
				})
			});
			if (this.layers[cur].length > this.layersMax.length)
				this._layersMax = cur;
			cur += 1;
		} while (this.layers[cur]);
	}
	get nodes() {
		return this._nodes;
	}
	get edges() {
		return this._edges;
	}
	get layers() {
		return this._layers;
	}
	get layersMax() {
		return this._layers[this._layersMax];
	}
}