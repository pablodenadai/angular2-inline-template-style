import test from 'ava';
import fn from './';

test('inline basic', async t => {
	var content = `import {Component} from 'angular2/core';

	@Component({
		selector: 'foo',
		templateUrl: 'component.html',
		styleUrls: ['component.css']
	})
	export class ComponentX {
		constructor() {}
	}

	@Component({
		selector: 'foo',
		styleUrls: [
			'component.css'
		]
	})
	export class ComponentY {
		constructor() {}
	}`;

	var result = `import {Component} from 'angular2/core';

	@Component({
		selector: 'foo',
		template: '<!-- HTML comments like this one should be removed when compression mode is on --><div class="navbar-collapse collapse" collapse="isCollapsed"><ul class="nav sidebar-nav"><!-- Extra spaces for testing compression --><li><a href="/#/home">Home Page</a></li><li><a href="/#/about">About</a></li><li><a href="/#/contact">Contact</a></li></ul></div><h1>Hello World</h1>',
		styles: ['h1 {  color: #ff0000;}h1:after {  content: \\'\\';}']
	})
	export class ComponentX {
		constructor() {}
	}

	@Component({
		selector: 'foo',
		styles: ['h1 {  color: #ff0000;}h1:after {  content: \\'\\';}']
	})
	export class ComponentY {
		constructor() {}
	}`;

  let options = {
	base: 'samples'
  };

	fn(content, options).then((r) => t.is(r, result));
});

test('inline basic less', async t => {
	var content = `import {Component} from 'angular2/core';

	@Component({
		selector: 'foo',
		templateUrl: 'component.html',
		styleUrls: ['component.less']
	})
	export class ComponentX {
		constructor() {}
	}

	@Component({
		selector: 'foo',
		styleUrls: [
			'component.css'
		]
	})
	export class ComponentY {
		constructor() {}
	}`;

	var result = `import {Component} from 'angular2/core';

	@Component({
		selector: 'foo',
		template: '<!-- HTML comments like this one should be removed when compression mode is on --><div class="navbar-collapse collapse" collapse="isCollapsed"><ul class="nav sidebar-nav"><!-- Extra spaces for testing compression --><li>  <a   href="/#/home">Home Page</a></li><li>  <a   href="/#/about">About</a></li><li>  <a   href="/#/contact">Contact</a></li></ul></div><h1>Hello World</h1>',
		styles: ['h1 {  color: #ff0000;}h1:after {  content: \\'\\';}']
	})
	export class ComponentX {
		constructor() {}
	}

	@Component({
		selector: 'foo',
		styles: ['h1 {  color: #ff0000;}h1:after {  content: \\'\\';}']
	})
	export class ComponentY {
		constructor() {}
	}`;

  let options = {
	base: 'samples'
  };

  fn(content, options).then((r) => t.is(r, result));
});

test('inline with compress', async t => {
	var content = `import {Component} from 'angular2/core';

	@Component({
		selector: 'foo',
		templateUrl: 'component.html',
		styleUrls: ['component.css']
	})
	export class ComponentX {
		constructor() {}
	}

	@Component({
		selector: 'foo',
		styleUrls: [
			'component.css'
		]
	})
	export class ComponentY {
		constructor() {}
	}`;

	var result = `import {Component} from 'angular2/core';

	@Component({
		selector: 'foo',
		template: '<div class="navbar-collapse collapse" collapse="isCollapsed"><ul class="nav sidebar-nav"><li><a href="/#/home">Home Page</a></li><li><a href="/#/about">About</a></li><li><a href="/#/contact">Contact</a></li></ul></div><h1>Hello World</h1>',
		styles: ['h1{color:red}h1:after{content:\\'\\'}']
	})
	export class ComponentX {
		constructor() {}
	}

	@Component({
		selector: 'foo',
		styles: ['h1{color:red}h1:after{content:\\'\\'}']
	})
	export class ComponentY {
		constructor() {}
	}`;

	let options = {
		base: 'samples',
		compress: true
	};

	fn(content, options).then((r) => t.is(r, result));
});

test('inline with compress and angular2 syntax', async t => {
	var content = `import {Component} from 'angular2/core';

	@Component({
		selector: 'foo',
		templateUrl: 'component-ng2.html',
		styleUrls: ['component.css']
	})
	export class ComponentX {
		constructor() {}
	}

	@Component({
		selector: 'foo',
		styleUrls: [
			'component.css'
		]
	})
	export class ComponentY {
		constructor() {}
	}`;

	var result = `import {Component} from 'angular2/core';

	@Component({
		selector: 'foo',
		template: '<div class="navbar-collapse collapse" collapse="isCollapsed"><ul class="nav sidebar-nav"><li><a [routerLink]="[\\'Home\\']">Home</a></li><li><a [routerLink]="[\\'About\\']">About</a></li><li><a [routerLink]="[\\'Contact\\']" (complete)="onComplete()">Contact</a></li></ul></div><h1 *ngIf="hello">Hello World</h1>',
		styles: ['h1{color:red}h1:after{content:\\'\\'}']
	})
	export class ComponentX {
		constructor() {}
	}

	@Component({
		selector: 'foo',
		styles: ['h1{color:red}h1:after{content:\\'\\'}']
	})
	export class ComponentY {
		constructor() {}
	}`;

	let options = {
		base: 'samples',
		compress: true
	};

	fn(content, options).then((r) => t.is(r, result));
});

test('inline and match quotes', async t => {
	let options = {
		base: 'samples',
		compress: true
	};

	var content = `import {Component} from 'angular2/core';
	@Component({
		selector: 'foo',
		templateUrl: "component.html",
		styleUrls: ['component.css']
	})
	export class ComponentX {
		constructor() {}
	}`;

	var result = `import {Component} from 'angular2/core';
	@Component({
		selector: 'foo',
		template: "<div class=\\"navbar-collapse collapse\\" collapse=\\"isCollapsed\\"><ul class=\\"nav sidebar-nav\\"><li><a href=\\"/#/home\\">Home Page</a></li><li><a href=\\"/#/about\\">About</a></li><li><a href=\\"/#/contact\\">Contact</a></li></ul></div><h1>Hello World</h1>",
		styles: ['h1{color:red}h1:after{content:\\'\\'}']
	})
	export class ComponentX {
		constructor() {}
	}`;

	fn(content, options).then((r) => t.is(r, result));

	var content2 = `import {Component} from 'angular2/core';
	@Component({
		selector: 'foo',
		templateUrl: 'component-ng2.html',
		styleUrls: ['component.css']
	})
	export class ComponentX {
		constructor() {}
	}`;

	var result2 = `import {Component} from 'angular2/core';
	@Component({
		selector: 'foo',
		template: '<div class="navbar-collapse collapse" collapse="isCollapsed"><ul class="nav sidebar-nav"><li><a [routerLink]="[\\'Home\\']">Home</a></li><li><a [routerLink]="[\\'About\\']">About</a></li><li><a [routerLink]="[\\'Contact\\']" (complete)="onComplete()">Contact</a></li></ul></div><h1 *ngIf="hello">Hello World</h1>',
		styles: ['h1{color:red}h1:after{content:\\'\\'}']
	})
	export class ComponentX {
		constructor() {}
	}`;

	fn(content2, options).then((r) => t.is(r, result2));
});

test('inline with relative path', async t => {
	var content = `import {Component} from 'angular2/core';
	@Component({
		selector: 'foo',
		templateUrl: 'component-ng2.html',
		styleUrls: ['component.css']
	})
	export class ComponentX {
		constructor() {}
	}`;

	var result = `import {Component} from 'angular2/core';
	@Component({
		selector: 'foo',
		template: '<div class="navbar-collapse collapse" collapse="isCollapsed"><ul class="nav sidebar-nav"><li><a [routerLink]="[\\'Home\\']">Home</a></li><li><a [routerLink]="[\\'About\\']">About</a></li><li><a [routerLink]="[\\'Contact\\']" (complete)="onComplete()">Contact</a></li></ul></div><h1 *ngIf="hello">Hello World</h1>',
		styles: ['h1{color:red}h1:after{content:\\'\\'}']
	})
	export class ComponentX {
		constructor() {}
	}`;

	let options = {
		relative: true,
		compress: true
	};

	let path = require('path');
	fn(content, options, path.join(__dirname, 'samples')).then((r) => t.is(r, result));
});

test('when components have custom events and input properties and they are written with indentation', async t => {

	var content = `import {Component} from 'angular2/core';

	@Component({
		selector: 'foo',
		templateUrl: 'custom-components-formatted.html',
		styleUrls: ['component.css']
	})
	export class ComponentX {
		constructor() {}
	}

	@Component({
		selector: 'foo',
		styleUrls: [
			'component.css'
		]
	})
	export class ComponentY {
		constructor() {}
	}`;

	var result = `import {Component} from 'angular2/core';

	@Component({
		selector: 'foo',
		template: '<!-- HTML comments like this one should be removed when compression mode is on --><div class="navbar-collapse collapse" collapse="isCollapsed"><ul class="nav sidebar-nav"><!-- Extra spaces for testing compression --><cutom-list-item (onSecondClick)="secondClick()" [displayValue]="\\'Home\\'"></cutom-list-item><cutom-list-item (onSecondClick)="secondClick()" [displayValue]="\\'About\\'"></cutom-list-item><cutom-list-item (onSecondClick)="secondClick()" (onComplete)="onTaskComplete()" [displayValue]="\\'Contact\\'"></cutom-list-item></ul></div><h1 *ngIf="hello">Hello World</h1>',
		styles: ['h1 {  color: #ff0000;}h1:after {  content: \\'\\';}']
	})
	export class ComponentX {
		constructor() {}
	}

	@Component({
		selector: 'foo',
		styles: ['h1 {  color: #ff0000;}h1:after {  content: \\'\\';}']
	})
	export class ComponentY {
		constructor() {}
	}`;

	let options = {
		base: 'samples'
	};

	fn(content, options).then((r) => t.is(r, result));
});

test('upper', t => {
	let upper = require('./bin/upper');

	t.is(upper('src/main/ts/app.ts', 3), 'app.ts');
	t.is(upper('src/main/ts/app/myapp.ts', 3), 'app/myapp.ts');
});

test('flattener', t => {
	let flatten = require('./bin/flattener');

	t.is(flatten('src/main/ts/app.ts'), 'app.ts');
	t.is(flatten('src/main/ts/app/myapp.ts'), 'myapp.ts');
});
