'use strict';

var fs = require('fs');
var path = require('path');
var minify = require('html-minifier').minify;
var CleanCSS = require('clean-css');

module.exports = function (content, options) {
	options = options || {};
	options.base = options.base || './';

	content = processStyleUrls(content, options);
	content = processTemplateUrl(content, options);

	return content;
};

function processStyleUrls(content, options) {
	let re = /styleUrls\s*:\s*(\[[^](.[^]*?)\])/g;
	let matches = content.match(re);

	if (matches.length < 0) {
		return content;
	}

	matches.forEach(function () {
		let exec = re.exec(content);
		let style = exec[0];
		let urls = exec[1];
		urls = urls.replace(/'/g, '"');
		urls = JSON.parse(urls);

		var result = '';
		urls.forEach(function (url) {
			let file = fs.readFileSync(path.join(options.base, url), 'utf-8');
			if (options.compress) {
				file = new CleanCSS().minify(file).styles;
			} else {
				file = file.replace(/\n/g, '');
			}

			result += file;
		});

		content = content.replace(style, 'styles: [\'' + result + '\']');
	});

	return content;
}

function processTemplateUrl(content, options) {
	let re = /templateUrl\s*:\s*(?:"([^"]+)"|'([^']+)')/g;
	let matches = content.match(re);

	if (matches.length < 0) {
		return content;
	}

	matches.forEach(function () {
		let exec = re.exec(content);
		let template = exec[0];
		let url = exec[1] || exec[2];

		let file = fs.readFileSync(path.join(options.base, url), 'utf-8');
		if (options.compress) {
			file = minify(file, {collapseWhitespace: true, removeComments: true});
		} else {
			file = file.replace(/\n/g, '');
		}

		content = content.replace(template, 'template: \'' + file + '\'');
	});

	return content;
}
