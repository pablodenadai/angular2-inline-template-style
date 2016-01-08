import test from 'ava';
import fn from './';

test('inline-template-style', t => {
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
		template: '<div class="navbar-collapse collapse" collapse="isCollapsed"><ul class="nav sidebar-nav"><li><a   href="/#/home">Home Page</a></li><li><a   href="/#/about">About</a></li><li><a   href="/#/contact">Contact</a></li></ul></div><h1>Hello World</h1>',
		styles: ['h1 {  color: #ff0000;}']
	})
	export class ComponentX {
		constructor() {}
	}

	@Component({
		selector: 'foo',
		styles: ['h1 {  color: #ff0000;}']
	})
	export class ComponentY {
		constructor() {}
	}`;

  let options = {
    base: 'samples'
  };

  t.is(fn(content, options), result);
});

test('inline with compress', t => {
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
		styles: ['h1{color:red}']
	})
	export class ComponentX {
		constructor() {}
	}

	@Component({
		selector: 'foo',
		styles: ['h1{color:red}']
	})
	export class ComponentY {
		constructor() {}
	}`;

  let options = {
    base: 'samples',
		compress: true
  };

  t.is(fn(content, options), result);
});

test('inline with compress and angular2 syntax', t => {
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
		template: '<div class="navbar-collapse collapse" collapse="isCollapsed"><ul class="nav sidebar-nav"><li><a [routerLink]="[\\'Home\\']">Home</a></li><li><a [routerLink]="[\\'About\\']">About</a></li><li><a [routerLink]="[\\'Contact\\']" (complete)="onComplete()">Contact</a></li></ul></div><h1>Hello World</h1>',
		styles: ['h1{color:red}']
	})
	export class ComponentX {
		constructor() {}
	}

	@Component({
		selector: 'foo',
		styles: ['h1{color:red}']
	})
	export class ComponentY {
		constructor() {}
	}`;

  let options = {
    base: 'samples',
		compress: true
  };

  t.is(fn(content, options), result);
});

test('inline and match quotes', t => {
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
		styles: ['h1{color:red}']
	})
	export class ComponentX {
		constructor() {}
	}`;
	let options = {
		base: 'samples',
		compress: true
	};
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
		template: '<div class="navbar-collapse collapse" collapse="isCollapsed"><ul class="nav sidebar-nav"><li><a [routerLink]="[\\'Home\\']">Home</a></li><li><a [routerLink]="[\\'About\\']">About</a></li><li><a [routerLink]="[\\'Contact\\']" (complete)="onComplete()">Contact</a></li></ul></div><h1>Hello World</h1>',
		styles: ['h1{color:red}']
	})
	export class ComponentX {
		constructor() {}
	}`;
	t.is(fn(content, options), result);
});
