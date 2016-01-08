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

	if (matches === null || matches.length <= 0) {
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
				file = file.replace(/[\r\n]/g, '');
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

	if (matches === null || matches.length <= 0) {
		return content;
	}

	matches.forEach(function () {
		let exec = re.exec(content);
		let template = exec[0];
		let quote;
		let url;
		if (exec[1]) {
			url = exec[1];
			quote = '"';
		} else {
			url = exec[2];
			quote = '\'';
		}

		let file = fs.readFileSync(path.join(options.base, url), 'utf-8');
		if (options.compress) {
			file = minify(file,
				{
					collapseWhitespace: true,
					removeComments: true,
					/*
						ng2 bindings break the parser for html-minifer, so the
						following blocks the processing of ()="" and []="" attributes
					*/
					ignoreCustomFragments: [/\s\[.*\]=\"[^\"]*\"/, /\s\([^)"]+\)=\"[^\"]*\"/]
				});
				// escape quote chars
			file = file.replace(new RegExp(quote, 'g'), '\\' + quote);
		} else {
			file = file.replace(/[\r\n]\s*/g, '');
		}

		content = content.replace(template, 'template: ' + quote + file + quote);
	});

	return content;
}
