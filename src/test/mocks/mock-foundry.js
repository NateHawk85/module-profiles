globalThis.Hooks = {
	once: jest.fn(),
	on: jest.fn()
};

globalThis.game = {
	modules: {
		get: jest.fn()
	},
	settings: {
		get: jest.fn(),
		set: jest.fn(),
		register: jest.fn(),
		registerMenu: jest.fn()
	},
	user: {
		isGM: jest.fn()
	}
}

globalThis.FormApplication = class FormApplication
{
	defaultOptions() {
		return {};
	}
};
