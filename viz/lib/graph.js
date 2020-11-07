'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var newEdge = function newEdge(from, to) {
	return {
		from: from,
		to: to
	};
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
			this.edges.push(newEdge(this, node));
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
	console.log('data');
}

exports.newEdge = newEdge;
exports.Node = Node;
exports.createGraph = createGraph;