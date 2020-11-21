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





			//states[0].innerText = "Start\n\n" + antSize
			// log(states[0].className)
			// log(states[0].children[1].className)
			// states[0].children[1].innerText = antSize
			// log(states[0].children[1].innerText)
			//startRoom.innerText = antSize;



- fix the export alerts
- display the number of ants in the [end] rooms
+ display the number of ants in the [start] 
+ struture the states
+ display controls for the [Xpadding] and [Ypadding]
+ change the function name [updatePositions]
+ create a new function [updatePositions]
- move the map on the [Xaxis] & [Yaxis]
+ remove try/catch after the JSONparse attempt
+ send instructions from the exec.
+ execute exec's instructions.
- get the ant movements.
- create the lib
- test it with the project.
- pause the traffic
- colorier les arretes des chemins trouve
- use adjacency list
- display the state of every rooms on the node and while zooming it can become visible.
- video controls
- zooming
- click on a node and the info appear in the corner about that node.
- stop the executable and keep the map state in the memory.
- use the cache
- react when mouse hover the states
- makes the client independant from the server
- saves all data to make a microservices arch
- updates only when new data available.
- save the farm in cookies.
- save the static files
- check if all the node name is really alphanum
- edit room's radius.
- move nodes with dragndrop
- move layers also
- build a lookup table with element like {name: id}
- use the lookup table to find elements.

##visiting-node [name]

##visited-node [name]

##visit-edge [from-to]

##begin-farm
##end-farm

ayoub, he can also use electron.js to open a browser
and run the app inside of it.

create a new class Visualizer
add a router
[x] - use the symbol primitive for all the object that i have
use it to retrieve them
think of using the name to access objects

when add args --viz ?
	run the server
	server runing
	waiting the browser to be open
	the browser sends [exit]






write arcticles
make video like computerphile
do the js pool
start learning maths
chatroulette
english


https://jvectormap.com/
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Transformations



https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-001-structure-and-interpretation-of-computer-programs-spring-2005/video-lectures/2a-higher-order-procedures/
https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_8.0.0/com.ibm.wmqfte.doc/web_post_file.htm
https://idriesshahfoundation.org/books/learning-how-to-learn/
https://lodev.org/cgtutor/raycasting.html
https://www.youtube.com/watch?v=RXZiMZSkPeY&ab_channel=MovingSoundcloud
https://www.youtube.com/watch?v=S6WePrn7dXc&ab_channel=MediocreExperiences