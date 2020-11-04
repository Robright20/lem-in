class Edge {
	constructor(from, to) {
		this.from = from;
		this.to = to;
		this.coords = from.coords;
		this.setLength();
		this.setSlope();
		this.setAngle();
		this.html = '';
	}
	setLength = () => {
		this.dx = (this.from.coords.x - this.to.coords.x);
		this.dy = (this.from.coords.y - this.to.coords.y);
		this.length = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
		return (this.length);
	}
	setSlope = () => {
		this.slope = (this.dx / this.dy);
		return (this.slope);
	}
	setAngle = () => {
		let adj = Math.abs(this.dx);
		if (this.slope >= 0) {
			this.angle = (adj / this.length);
		} else {
			this.angle = Math.PI - (adj / this.length);
		}
		return (this.angle);
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
const drawNode = (canvas, node) => {
	node.html = document.createElement('div');

	node.html.style.width = node.radius * 2 + 'px';
	node.html.style.height = node.radius * 2 + 'px';
	node.html.style.left = node.coords.x + 'px';
	node.html.style.top = node.coords.y + 'px';
	node.html.className = 'circle';
	canvas.append(node.html);
}
const drawEdge = (canvas, edge) => {
	edge.html = document.createElement('div');
	let shift = 0;

	if (edge.slope >= 1)
		shift = edge.coords.y;
	else if (edge.slope < 1)
		shift = edge.coords.y / 4;
	edge.html.className = 'line';
	edge.html.style.width = edge.length + 'px';
	edge.html.style.transform = 'rotate(' + edge.angle + 'rad)';
	edge.html.style.left = edge.coords.x + 'px';
	edge.html.style.top = edge.coords.y + shift + 'px';
	canvas.append(edge.html);
}
