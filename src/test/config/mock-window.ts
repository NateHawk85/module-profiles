globalThis.window = Object.create(window);

Object.defineProperty(window, 'location', {
	writable: true,
	value: {
		reload: jest.fn()
	}
});