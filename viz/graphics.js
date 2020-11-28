'use strict'

const SVG_NS = "http://www.w3.org/2000/svg";
const Graphic = {};

Graphic.drawNode = function(canvas, node) {
	node.html = document.createElementNS(SVG_NS, 'circle');

	node.html.setAttribute('class', 'circle');
	node.html.setAttribute('id', node.name)
	node.html.setAttribute('cx', node.coords.x);
	node.html.setAttribute('cy', node.coords.y);
	node.html.setAttribute('r', node.radius);
	/* node.html.setAttribute('stroke', 'black');
	node.html.setAttribute('stroke-width', '3'); */
	//node.html.setAttribute('fill', 'hsla(5, 100%,50%,.5)');
	node.html.setAttribute('fill', 'red');
	canvas.children[0].append(node.html);
}

Graphic.drawEdge = function(canvas, edge) {
	edge.html = document.createElementNS(SVG_NS, 'line');

	edge.html.setAttribute('class', 'line');
	edge.html.setAttribute('id', edge.name)
	edge.html.setAttribute('x1', edge.from.coords.x);
	edge.html.setAttribute('y1', edge.from.coords.y);
	edge.html.setAttribute('x2', edge.to.coords.x);
	edge.html.setAttribute('y2', edge.to.coords.y);
	edge.html.setAttribute('stroke', 'dodgerblue');
	edge.html.setAttribute('stroke-width', 3);
	canvas.children[0].append(edge.html);
}

Graphic.setEdgeHTML = function(edge) {
	edge.html.setAttribute('x1', edge.from.coords.x);
	edge.html.setAttribute('y1', edge.from.coords.y);
	edge.html.setAttribute('x2', edge.to.coords.x);
	edge.html.setAttribute('y2', edge.to.coords.y);
}

Graphic.setNodeHTML = function(node) {
	node.html.setAttribute('cx', node.coords.x);
	node.html.setAttribute('cy', node.coords.y);
}

Graphic.updatePositions = function(graph, padding) {
	let layersMaxCenterY = graph.layersMax.length / 2;
	let layerCenterY, node;
	let layerX = 0;

	console.log('->', graph)
	for (const layerId in graph.layers) {
		layerX = padding.x * layerId;
		layerCenterY = graph.layers[layerId].length / 2;

		for (const id in graph.layers[layerId]) {
			node = graph.layers[layerId][id]
			node.coords.x = layerX;
			node.coords.y = layersMaxCenterY
			if (id <= layerCenterY)
				node.coords.y -= padding.y * Math.abs(layerCenterY - id);
			else
				node.coords.y += padding.y * Math.abs(layerCenterY - id);
		}
	}
}

Graphic.setGraphHTML = function(nodes, edges) {
	for (let i in edges) {
		if (typeof edges[i] === 'object')
			this.setEdgeHTML(edges[i]);
	}
	for (let i in nodes) {
		if (typeof nodes[i] === 'object')
			this.setNodeHTML(nodes[i]);
	}
}

Graphic.setNodesColor = function(nodes, color) {
	for (let i in nodes) {
		if (typeof nodes[i] === 'object')
			nodes[i].html.setAttribute('fill', color);
	}
}

Graphic.setEdgesColor = function(edges, color) {
	for (let i in edges) {
		if (typeof edges[i] === 'object')
			edges[i].html.setAttribute('stroke', color);
	}
}

export default Graphic;
