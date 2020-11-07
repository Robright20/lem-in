'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nodes = [];
var edges = [];

nodes.add = function (data) {
	if (!/^[#L]/.test(data[0])) {
		var node = new Node(data[0]);

		node.coords = { x: Number(data[1]), y: Number(data[2]) };
		if (this.start === node.name) {
			this.start = node;
		} else if (this.end === node.name) {
			this.end = node;
		}
		nodes.push(node);
		return node;
	}
};
nodes.find = function (name) {
	for (var key in this) {
		if (this[key].name === name) {
			return this[key];
		}
	}
};
var newEdge = function newEdge(from, to) {
	if (from && to) {
		return {
			from: from,
			to: to
		};
	}
};

var Node = function () {
	function Node(name) {
		_classCallCheck(this, Node);

		this._name = name;
		this.coords = { x: 0, y: 0 };
		this.edges = [];
		this.html = '';
		this.radius = 20;
	}

	_createClass(Node, [{
		key: 'linkWith',
		value: function linkWith(node) {
			var edge = newEdge(this, node);

			if (edge) {
				this.edges.push(edge);
				return edge;
			}
		}
	}, {
		key: 'addEdge',
		value: function addEdge(edge) {
			this.edges.push(edge);
		}
	}, {
		key: 'name',
		get: function get() {
			return this._name;
		}
	}]);

	return Node;
}();

function createGraph(data) {
	var cols = [];
	var node = null;
	var edge = {};
	var cmd = '';
	nodes.start = '';
	nodes.end = '';

	for (var row in data) {
		if (/^(#){2}/.test(data[row])) {
			if (data[row] === '##end-farm') {
				return nodes;
			} else if (cmd === '') {
				cmd = data[row];
			}
		} else if (/^\w+ \d+ \d+$/.test(data[row])) {
			cols = data[row].split(' ');
			node = nodes.add(cols);
			node.coords = { x: Number(cols[1]), y: Number(cols[2]) };
			if (cmd === '##start') {
				nodes.start = node;
			} else if (cmd === '##end') {
				nodes.end = node;
			}
			cmd = '';
		} else if (/^\w+-\w+$/.test(data[row])) {
			cols = data[row].split('-');
			edge = newEdge(nodes.find(cols[0]), nodes.find(cols[1]));
			edges.push(edge);
			edge.from.addEdge(edge);
			cmd = '';
		}
	}
}

exports.createGraph = createGraph;
exports.nodes = nodes;
exports.edges = edges;