#!/usr/bin/env node

(() => {
	'use strict';
	var fs = require('fs');
	var path = require('path');
	var mkdirp = require('mkdirp').sync;
	var minimist = require('minimist');
	var glob = require('glob');
	var inliner = require('../index.js');
	var flattener = require('./flattener');
	var upper = require('./upper');
	var chokidar = require('chokidar');

	var args = minimist(process.argv.slice(2), {
		alias: {
			u: 'up',
			f: 'flatten',
			o: 'outDir',
			b: 'base',
			c: 'compress',
			w: 'watch'
		},
		string: ['outDir', 'base'],
		boolean: ['flatten', 'compress', 'watch'],
		number: ['up']
	});

	var globPath = args._.slice()[0];
	if (!globPath || typeof globPath === 'undefined' || globPath.length === 0) {
		doUsage();
	} else if (args.watch) {
		doWatch(globPath, args);
	} else {
		doOnce(globPath, args);
	}

	function doWatch(globPath, args) {
		chokidar.watch(globPath).on('all', (event, path) => {
			console.log(event, path);
			doOnce(path, args);
		});
	}

	function doOnce(globPath, args) {
		glob(globPath, {}, (er, files) => {
			if (er) {
				console.error('failed to find files for path: ' + globPath);
				process.exit(1);
			} else {
				files.forEach((file) => {
					var target = path.join(process.cwd(), file);
					var content = fs.readFileSync(target);
					if (content) {
						content = inliner(content.toString(), {
							base: args.base,
							compress: args.compress
						});

						if (args.flatten) {
							file = flattener.flatten(file);
						} else if (typeof args.up === 'number') {
							file = upper(file, args.up);
						}

						var destination = path.join(args.outDir, file);
						if (!fs.existsSync(path.dirname(destination))) {
							mkdirp(path.dirname(destination));
						}

						fs.writeFile(destination, content, err => {
							if (err) {
								console.error('error processing file: ' + file + ', produced error: ' + err);
							}
						});
					} else {
						console.error('failed to read target: ' + target);
					}
				});
			}
		});
	}

	function doUsage() {
		console.log('ng2-inline [--outDir|-o] [--base|-b] [--flatten|-f] [--up|-u <count>] <path glob>');
	}
})();
