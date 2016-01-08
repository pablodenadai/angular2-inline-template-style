(function () {
	'use strict';
	var path = require('path');

	module.exports = file => {
		return path.basename(file);
	};
})();
