'use strict'
const padding = {x: 20, y: 30};
const SVG_NS = "http://www.w3.org/2000/svg";

export function drawNode(canvas, node) {
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
	canvas.append(node.html);
}

export function drawEdge(canvas, edge) {
	edge.html = document.createElementNS(SVG_NS, 'line');

	edge.html.setAttribute('class', 'line');
	edge.html.setAttribute('id', 'edge-' + edge.id)
	edge.html.setAttribute('x1', edge.from.coords.x);
	edge.html.setAttribute('y1', edge.from.coords.y);
	edge.html.setAttribute('x2', edge.to.coords.x);
	edge.html.setAttribute('y2', edge.to.coords.y);
	edge.html.setAttribute('stroke', 'black');
	edge.html.setAttribute('stroke-width', 3);
	canvas.append(edge.html);
}

export function updateEdgePos(edge) {
	edge.html.setAttribute('x1', edge.from.coords.x);
	edge.html.setAttribute('y1', edge.from.coords.y);
	edge.html.setAttribute('x2', edge.to.coords.x);
	edge.html.setAttribute('y2', edge.to.coords.y);
}

export function updateNodePos(node) {
	node.html.setAttribute('cx', node.coords.x);
	node.html.setAttribute('cy', node.coords.y);
}

export const assignLayerPos = (canvas, layers) => {
	const canvas_x_pivot = canvas.width.animVal.value / 2;
	const canvas_y_pivot = canvas.height.animVal.value / 2;
	const layers_x_pivot = layers.length / 2;
	let layers_y_pivot = 0;
	let layerPosition = 0;
	let node = {};

	for (const layerId in layers) {
		if (layerId <= layers_x_pivot) {
			layerPosition = canvas_x_pivot - padding.x * Math.abs(layerId - layers_x_pivot);
		} else {
			layerPosition = canvas_x_pivot + padding.x * Math.abs(layerId - layers_x_pivot);
		}
		for (const nodeId in layers[layerId]) {
			node = layers[layerId][nodeId];
			layers_y_pivot = layers[layerId].length / 2;

			node.coords.x = layerPosition;
			if (nodeId <= layers_y_pivot) {
				node.coords.y = canvas_y_pivot - padding.y * Math.abs(nodeId - layers_y_pivot);
			} else {
				node.coords.y = canvas_y_pivot + padding.y * Math.abs(nodeId - layers_y_pivot);
			}
		}
	}
}

export const updatePositions = (canvas, layers, pad) => {
	const canvas_x_pivot = canvas.width.animVal.value / 2;
	const canvas_y_pivot = canvas.height.animVal.value / 2;
	const layers_x_pivot = layers.length / 2;
	let layers_y_pivot = 0;
	let layerPosition = 0;
	let node = {};
	
	for (const layerId in layers) {
		if (layerId <= layers_x_pivot) {
			layerPosition = canvas_x_pivot - pad.x * Math.abs(layerId - layers_x_pivot);
		} else {
			layerPosition = canvas_x_pivot + pad.x * Math.abs(layerId - layers_x_pivot);
		}
		for (const nodeId in layers[layerId]) {
			node = layers[layerId][nodeId];
			layers_y_pivot = layers[layerId].length / 2;

			node.coords.x = layerPosition;
			if (nodeId <= layers_y_pivot) {
				node.coords.y = canvas_y_pivot - pad.y * Math.abs(nodeId - layers_y_pivot);
			} else {
				node.coords.y = canvas_y_pivot + pad.y * Math.abs(nodeId - layers_y_pivot);
			}
		}
	}
}

export const updateMap = (nodes, edges) => {
	for (let i in edges) {
		if (typeof edges[i] === 'object')
			updateEdgePos(edges[i]);
	}
	for (let i in nodes) {
		if (typeof nodes[i] === 'object')
			updateNodePos(nodes[i]);
	}
}

export const updateNodesColor = (nodes, color) => {
	for (let i in nodes) {
		if (typeof nodes[i] === 'object')
			nodes[i].html.setAttribute('fill', color);
	}
}

export const updateEdgesColor = (edges, color) => {
	for (let i in edges) {
		if (typeof edges[i] === 'object')
			edges[i].html.setAttribute('stroke', color);
	}
}
