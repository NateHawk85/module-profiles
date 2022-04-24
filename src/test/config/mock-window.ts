globalThis.window = Object.create(window);

Object.defineProperty(window, 'location', {
	value: {
		reload: jest.fn()
	}
});