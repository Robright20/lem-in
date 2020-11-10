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