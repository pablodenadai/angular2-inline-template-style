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
	template: '<h1>Hello World</h1>',
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
