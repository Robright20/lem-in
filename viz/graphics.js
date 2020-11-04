export function drawNode(canvas, node, tmpl) {
	node.html = tmpl.content.cloneNode(true);
	console.log(canvas.append(node.html));

	node.html.setAttribute('cx', node.coords.x);
	node.html.setAttribute('cy', node.coords.y);
	node.html.setAttribute('r', node.radius);
	node.html.setAttribute('stroke', 'black');
	node.html.setAttribute('stroke-width', '3');
	node.html.setAttribute('fill', 'red');
}
export function drawEdge(canvas, edge, tmpl) {
	edge.html = document.createElement('line');

	edge.html.className = 'line';
	edge.html.style.width = edge.length + 'px';
	//edge.html.style.transform = 'rotate(' + edge.angle + 'rad)';
	edge.html.style.left = edge.coords.x + 'px';
	edge.html.style.top = edge.coords.y + 'px';
	canvas.append(edge.html);
}
