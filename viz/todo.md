nodes - array of Node objects
layers - array of Layers objects(each of them are arrays of Nodes)
cur - pointer to the next layer to visit

push nodes['start'] to the 1st layer (layers[0])
mark it as visited
cur = 0
#loop
for every (elem) in layers[cur]
	visit (elem)s neighbrs (n)
		mark (n) as visited _if it's not visited yet
		push (n) to layers[cur + 1]
cur += 1
if (layer[cur]) exist, goto #loop

//goodbyes post malone
// je te pardonnes



layers_x_pivot = layers.length / 2
layers_y_pivot = layers[i].length / 2
canvas_x_pivot = canvas.wigth / 2
canvas_y_pivot = canvas.height / 2


for every layer with (id > layers_x_pivot)
-  Layer position on canvas'X axis
(canvas_x_pivot +  paddingX * (layers.id - layers_x_pivot))
-  Node in layers position on canvas'Y axis.
> Each node with (id > layers_y_pivot)
(canvas_y_pivot +  paddingY * (node.id - layers_y_pivot))
> Each node with (id < layers_y_pivot)
(canvas_y_pivot -  paddingY * (node.id - layers_y_pivot)) 

for every layer with (id < layers_x_pivot)
-  Layer position on canvas'X axis
(canvas_x_pivot - paddingX * (layers.id - layers_x_pivot))
-  Node in layers position on canvas'Y axis.
> Each node with (id > layers_y_pivot)
(canvas_y_pivot +  paddingY * (node.id - layers_y_pivot))
> Each node with (id < layers_y_pivot)
(canvas_y_pivot -  paddingY * (node.id - layers_y_pivot))