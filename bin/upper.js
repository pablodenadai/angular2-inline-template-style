(function () {
	'use strict';

	module.exports = (file, n) => {
		while (n > 0 && file.indexOf('/') >= 0) {
			file = file.substring(file.indexOf('/') + 1);
			n--;
		}
		return file;
	};
})();
