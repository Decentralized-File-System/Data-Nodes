up:
	(cd node-1;npm run build)
	(cd node-2;npm run build)
	(cd node-3;npm run build)
	docker-compose up 

down:
	docker-compose down
	docker image rm data-nodes_node-one
	docker image rm data-nodes_node-three
	docker image rm data-nodes_node-two
	docker volume rm data-nodes_node-1
	docker volume rm data-nodes_node-2
	docker volume rm data-nodes_node-3