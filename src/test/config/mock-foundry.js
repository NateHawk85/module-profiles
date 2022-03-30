globalThis.Hooks = {
	once: jest.fn(),
	on: jest.fn(),
	callAll: jest.fn()
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

globalThis.ui = {
	windows: jest.fn(),
	notifications: {
		info: jest.fn(),
		warn: jest.fn(),
		error: jest.fn()
	}
}

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

globalThis.ModuleManagement = class ModuleManagement extends FormApplication {}
