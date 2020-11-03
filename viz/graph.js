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
		this.angle = (adj / this.length);
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

let node1 = new Node("bob");
let node2 = new Node("laura");
let node3 = new Node("dany");
let node4 = new Node("jasmine");
node1.coords = {x: 50, y: 100};
node2.coords = {x: 250, y: 250};
node3.coords = {x: 80, y: 140};
node4.coords = {x: 100, y: 50};
node1.linkWith(node2);
node1.linkWith(node3);
node1.linkWith(node4);

console.log(node1.edges[0]);
