install: install-deps

run:
	bin/gendiff.js 10

install-deps:
	npm ci

publish: 
	npm publish --dry-run

lint: 
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
	
.PHONY: test