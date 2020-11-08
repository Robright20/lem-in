export const SVG_NS = "http://www.w3.org/2000/svg";

export function drawNode(canvas, node) {
	node.html = document.createElementNS(SVG_NS, 'circle');

	node.html.setAttribute('class', 'circle');
	node.html.setAttribute('cx', node.coords.x);
	node.html.setAttribute('cy', node.coords.y);
	node.html.setAttribute('r', node.radius);
	/* node.html.setAttribute('stroke', 'black');
	node.html.setAttribute('stroke-width', '3'); */
	//node.html.setAttribute('fill', 'hsla(5, 100%,50%,.5)');
	node.html.setAttribute('fill', 'red');
	canvas.append(node.html);
}
export function drawEdge(canvas, edge) {
	edge.html = document.createElementNS(SVG_NS, 'line');

	edge.html.setAttribute('class', 'line');
	edge.html.setAttribute('x1', edge.from.coords.x);
	edge.html.setAttribute('y1', edge.from.coords.y);
	edge.html.setAttribute('x2', edge.to.coords.x);
	edge.html.setAttribute('y2', edge.to.coords.y);
	edge.html.setAttribute('stroke', 'black');
	edge.html.setAttribute('stroke-width', 3);
	canvas.append(edge.html);
}
