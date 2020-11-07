const newEdge = (from, to) => {
	return ({
		from: from,
		to: to
	});
};
class Node {
	constructor(name) {
		this._name = name;
		this.coords = {x: 0, y: 0};
		this.edges = [];
		this.html = '';
		this.radius = 20;
	}
	get name() {
		return (this._name);
	}
	linkWith(node) {
		this.edges.push(newEdge(this, node));
	}
}
function createGraph(data) {
	console.log('data');
}

export { newEdge, Node, createGraph };