import * as Settings from '../../../js/scripts/settings.js';
import * as API from '../../../js/scripts/api.js';
import * as ModuleManagement from '../../../js/scripts/ui/module-management.js';
import * as StatusButtonScripts from '../../../js/scripts/ui/status-button-scripts.js';

// Necessary to tie function references to main.js function references... may be an issue with Jest
const registerSettings = () => {};
const registerApi = () => {};
const modifyModuleManagementRender = () => {};
const refreshStatusIcons = () => {};

jest.mock('../../../js/scripts/settings.js', () => ({
	registerSettings: registerSettings
}));
jest.mock('../../../js/scripts/api.js', () => ({
	registerApi: registerApi
}));
jest.mock('../../../js/scripts/ui/module-management.js', () => ({
	modifyModuleManagementRender: modifyModuleManagementRender
}));
jest.mock('../../../js/scripts/ui/status-button-scripts.js', () => ({
	refreshStatusIcons: refreshStatusIcons
}));

test('WHEN main.js is run THEN module-profile settings are registered', () =>
{
	require('../../../js/scripts/main.js');

	expect(Hooks.once).toHaveBeenCalledWith('ready', Settings.registerSettings);
});

test('WHEN main.js is run THEN the API is registered', () =>
{
	require('../../../js/scripts/main.js');

	expect(Hooks.once).toHaveBeenCalledWith('ready', API.registerApi);
});

test('WHEN main.js is run THEN the module management render is modified', () =>
{
	require('../../../js/scripts/main.js');

	expect(Hooks.on).toHaveBeenCalledWith('renderModuleManagement', ModuleManagement.modifyModuleManagementRender);
});

test('WHEN main.js is run THEN additional functionality is added to the "closeDialog" Hook for the Dependency popup', () =>
{
	require('../../../js/scripts/main.js');

	expect(Hooks.on).toHaveBeenCalledWith('closeDialog', StatusButtonScripts.refreshStatusIcons);
});