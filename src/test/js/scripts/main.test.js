import * as Settings from '../../../js/scripts/settings.js';
import * as API from '../../../js/scripts/api.js';
import * as ModuleManagementScripts from '../../../js/scripts/ui/module-management-scripts.js';
import * as StatusButtonScripts from '../../../js/scripts/ui/status-button-scripts.js';
import * as ManageModuleProfilesSettingsFormFunctions from '../../../js/classes/ManageModuleProfilesSettingsForm.js';

// Necessary to tie function references to main.js function references... may be an issue with Jest
const registerSettings = () => {};
const registerApi = () => {};
const modifyModuleManagementRender = () => {};
const refreshStatusIcons = () => {};
const reRenderManageModuleProfilesWindows = () => {};

jest.mock('../../../js/scripts/settings.js', () => ({
	registerSettings: registerSettings
}));
jest.mock('../../../js/scripts/api.js', () => ({
	registerApi: registerApi
}));
jest.mock('../../../js/scripts/ui/module-management-scripts.js', () => ({
	modifyModuleManagementRender: modifyModuleManagementRender
}));
jest.mock('../../../js/scripts/ui/status-button-scripts.js', () => ({
	refreshStatusIcons: refreshStatusIcons
}));
jest.mock('../../../js/classes/ManageModuleProfilesSettingsForm.js', () => ({
	reRenderManageModuleProfilesWindows: reRenderManageModuleProfilesWindows
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

	expect(Hooks.on).toHaveBeenCalledWith('renderModuleManagement', ModuleManagementScripts.modifyModuleManagementRender);
});

test('WHEN main.js is run THEN additional functionality is added to the "closeDialog" Hook for the Dependency popup', () =>
{
	require('../../../js/scripts/main.js');

	expect(Hooks.on).toHaveBeenCalledWith('closeDialog', StatusButtonScripts.refreshStatusIcons);
});

test('WHEN main.js is run THEN ManageModuleProfilesSettingsForms are re-rendered whenever module profiles are updated', () =>
{
	require('../../../js/scripts/main.js');

	expect(Hooks.on).toHaveBeenCalledWith(Settings.MODULE_PROFILES_UPDATED_HOOK_NAME,
		ManageModuleProfilesSettingsFormFunctions.reRenderManageModuleProfilesWindows);
});