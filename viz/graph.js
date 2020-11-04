export const newEdge = (from, to) => {
	return ({
		from: from,
		to: to
	});
};
export class Node {
	radius = '20';

	constructor(name) {
		this._name = name;
		this.coords = {x: '', y: ''};
		this.edges = [];
		this.html = '';
	}
	get name() {
		return (this._name);
	}
	linkWith(node) {
		this.edges.push(newEdge(this, node));
	}
}
