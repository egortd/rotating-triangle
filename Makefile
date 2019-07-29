develop:
	npx webpack-dev-server
build:
	rm -rf dist && NODE_ENV=production npx webpack
lint:
	npx eslint .
deploy:
	make build && surge ./dist --domain egortd-rotating-triangle.surge.sh