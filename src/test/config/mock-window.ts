const JSDOMEnvironment = require('jest-environment-jsdom');

module.exports = class CustomizedJSDomEnvironment extends JSDOMEnvironment {
	constructor(config: any) {
		super(config);
		this.global.jsdom = this.dom;
	}

	teardown() {
		this.global.jsdom = null;
		return super.teardown();
	}
};

globalThis.window = Object.create(window);

Object.defineProperty(window, 'location', {
	writable: true,
	value: {
		reload: jest.fn()
	}
});