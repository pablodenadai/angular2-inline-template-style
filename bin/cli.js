#!/usr/bin/env node
(function() {
  'use strict';
  var fs = require('fs');
  var path = require('path');
  var mkdirp = require('mkdirp').sync;
  var minimist = require('minimist');
  var glob = require('glob');

  var args = minimist(process.argv.slice(2), {
    alias: { u: 'up', f: 'flatten', o: 'outDir', b: 'base', },
    string: ['outDir', 'base'],
    boolean: ['flatten'],
    number: ['up'],
  });

  var globPath = args._.slice()[0];
  if (!globPath || typeof globPath === 'undefined' || globPath.length === 0) {
    doUsage();
  } else {
    glob(globPath, {}, function(er, files) {
      if (er) {
        console.error('failed to find files for path: ' + globPath);
        process.exit(1);
      } else {
        files.forEach(function(file) {
          var target = path.join(process.cwd(), file);
          fs.readFile(target, function(err, content) {
            content = require('../index.js')(content.toString(), { base: args['base'] });

            if (args.flatten) {
              file = path.basename(file);
            } else if (typeof args.up === 'number') {
              var up = args.up;
              while (up > 0 && file.indexOf('/')) {
                file = file.substring(file.indexOf('/'), file.length);
                up--;
              }
            }

            var destination = path.join(args['outDir'], file);
            if (!fs.existsSync(path.dirname(destination))) {
              mkdirp(path.dirname(destination));
            }

            fs.writeFile(destination, content, function(err) {
              if (err) {
                console.error('error processing file: ' + file + ', produced error: ' + err);
              }
            });
          });
        });
      }
    });
  }

  function doUsage() {
    console.log('ng2-inline [--outDir|-o] [--base|-b] [--flatten|-f] [--up|-u <count>] <path glob>');
  }

}());
