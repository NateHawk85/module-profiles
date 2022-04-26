// @ts-ignore - Mocking for Foundry
globalThis.Hooks = {
	once: jest.fn(),
	on: jest.fn(),
	callAll: jest.fn()
};

// @ts-ignore - Mocking for Foundry
globalThis.game = {
	modules: new Map(),
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

// @ts-ignore - Mocking for Foundry
globalThis.ui = {
	windows: jest.fn(),
	notifications: {
		info: jest.fn(),
		warn: jest.fn(),
		error: jest.fn()
	}
}

// @ts-ignore - Mocking for Foundry
globalThis.FormApplication = class FormApplication
{
	static DEFAULT_OPTIONS = {
		classes: ['form'],
		closeOnSubmit: true,
		editable: true,
		sheetConfig: false,
		submitOnChange: false,
		submitOnClose: false
	}

	static get defaultOptions() {
		return this.DEFAULT_OPTIONS;
	}

	render() {}
};

// @ts-ignore - Mocking for Foundry
globalThis.ModuleManagement = class ModuleManagement extends FormApplication {

}
