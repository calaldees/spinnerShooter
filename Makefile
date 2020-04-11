serve: core.js
	python3 -m http.server

core.js:
	curl https://raw.githubusercontent.com/calaldees/libs/master/es6/core.js -o core.js

.PHONY: _core.js
_core.js:
	ln -s ../libs/es6/core.js core.js
