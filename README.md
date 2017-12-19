# angular2-inline-template-style

[![Build Status](https://travis-ci.org/pablodenadai/angular2-inline-template-style.svg?branch=master)](https://travis-ci.org/pablodenadai/angular2-inline-template-style)

Resolve `templateUrl` and `styleUrls` in Angular2 components.

## Install

```
$ npm install --save angular2-inline-template-style
```

## Build from source

Just clone the repository and run:

```
npm install

npm link
```

Linking requires administration rights, e.g. sudo on Mac.
After the package has been linked, you should be able to call ng2-inline from command line.


## Usage

```css
/* component.css */
h1 {
  color: #ff0000;
}
```

```html
/* component.html */
<h1>Hello World</h1>
```

```js
const ng2Inline = require('angular2-inline-template-style');

let content = `
  import {Component} from 'angular2/core';

  @Component({
    selector: 'foo',
    templateUrl: 'component.html'
    styleUrls: ['component.css']
  })
  export class ComponentX {
    constructor() {}
  }
`;

ng2Inline(content, {});
```

```js
// Output
import {Component} from 'angular2/core';

@Component({
	selector: 'foo',
	template: '<h1>Hello World</h1>',
	styles: ['h1 { color: #ff0000; }']
})
export class ComponentX {
	constructor() {}
}
```

## API
### styleUrls(content, [options])
#### content
Type: `string`
The file content to be processed.

#### options
##### base
Type: `string`
Default: `'./'`
Base folder for templates and stylesheet files.
##### compress
Type: `boolean`
Default: `false`
Use [html-min](https://github.com/kangax/html-minifier) and [clean-css](https://github.com/jakubpawlowicz/clean-css) to compress the templates before they are inlined.
##### includePaths
Type: `string[]`
Default: `[]`
Alternate folder paths for node-sass to search for @imports
Use [node-sass](https://github.com/sass/node-sass#includepaths)

## CLI
### Usage
```bash
ng2-inline [--outDir|-o] [--base|-b] [--relative|-r] [--flatten|-f] [--up|-u <count>] [--compress|-c] [--watch|-w] [--sourceOverwrite|-s] <path glob>
```
- --flatten: remove parent directories from source locations (all output is written to --outDir)
- --up <count>: remove `count` leading folders from the source locations when writing to --outDir
- --base: as above
- --compress: as above
- --watch: runs [chokidar](https://github.com/paulmillr/chokidar) on the glob and on change runs a single file inline
- --sourceOverwrite: allows overwriting input .js files with the respective output file. This only works in case --outDir is not set.
- --relative: keeps the relative path
- --silent: output only errors

### Examples
```bash
ng2-inline -o dist -f -b src/components "src/components/**/*.js"
```

It will take all .js files (recursively) from `src/components` and insert template/style URLs, found relative to `src/components`, and output them to `./dist/` with leading paths removed.

**Important!** note that glob pattern `"src/components/**/*.js"` is surrounded with quotation marks. Without it, only a single file will get matched and passed down to `ng2-inline`.

## Plugins
 - [grunt-ng2-inline](https://github.com/m-architek/grunt-ng2-inline)

## Help wanted
Help wanted for implementing:

- [ ] Jade
- [x] ~~Less~~ thanks [@synarque](https://github.com/synarque)
- [x] ~~Scss/Sass~~ thanks [@dfenstermaker](https://github.com/dfenstermaker)
- [x] ~~Relative file path~~
- [x] ~~Grunt plugin~~ thanks [@m-architek](https://github.com/m-architek)
- [x] ~~Gulp plugin~~ thanks [@dfenstermaker](https://github.com/dfenstermaker/gulp-angular-inline)
- [x] ~~CLI~~ thanks [@jiminys](https://github.com/jiminys)
- [x] ~~Compression~~ thanks [@jiminys](https://github.com/jiminys)

## License
MIT
