# angular2-inline-template-style

[![Build Status](https://travis-ci.org/ghpabs/angular2-inline-template-style.svg?branch=master)](https://travis-ci.org/ghpabs/angular2-inline-template-style)

Resolve `templateUrl` and `styleUrls` in Angular2 components.

## Install

```
$ npm install --save angular2-inline-template-style
```

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
const styleUrls = require('angular2-inline-template-style');

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

styleUrls(content, {});
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

## CLI
### Usage
```bash
ng2-inline [--outDir|-o] [--base|-b] [--flatten|-f] [--up|-u <count>] <path glob>
```
- --flatten : remove parent directories from source locations (all output is written to --outDir)
- --up <count> : remove ```count``` leading folders from the source locations when writing to --outDir
- --base : as above

## Help wanted
Help wanted for implementing:
- Jade
- Less
- Scss/Sass
- File base path
- Gulp and Grunt plugins
- ES5 or 6 outcome options

## License
MIT
