import * as Settings from '../../../js/scripts/settings.js';
import * as API from '../../../js/scripts/api.js';
import * as ModuleManagementScripts from '../../../js/scripts/ui/module-management-scripts.js';
import * as ManageModuleProfilesSettingsFormFunctions from '../../../js/classes/ManageModuleProfilesSettingsForm.js';

// Necessary to tie function references to main.js function references... may be an issue with Jest
const registerSettings = () => {};
const registerApi = () => {};
const modifyModuleManagementRender = () => {};
const reRenderManageModuleProfilesWindows = () => {};
const forceManageModuleProfilesHeightResize = () => {};
const refreshModuleManagementStatusIcons = () => {};
const RENDER_HOOK_NAME = 'renderHookName';
const MODULE_PROFILES_UPDATED_HOOK_NAME = 'moduleProfilesUpdatedHookName';

jest.mock('../../../js/scripts/settings.js', () => ({
	registerSettings: registerSettings
}));
jest.mock('../../../js/scripts/api.js', () => ({
	registerApi: registerApi
}));
jest.mock('../../../js/scripts/ui/module-management-scripts.js', () => ({
	modifyModuleManagementRender: modifyModuleManagementRender,
	refreshModuleManagementStatusIcons: refreshModuleManagementStatusIcons
}));
jest.mock('../../../js/classes/ManageModuleProfilesSettingsForm.js', () => ({
	RENDER_HOOK_NAME: RENDER_HOOK_NAME,
	MODULE_PROFILES_UPDATED_HOOK_NAME: MODULE_PROFILES_UPDATED_HOOK_NAME,
	reRenderManageModuleProfilesWindows: reRenderManageModuleProfilesWindows,
	forceManageModuleProfilesHeightResize: forceManageModuleProfilesHeightResize
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

test('WHEN main.js is run THEN the module management status icons are refreshed when a dialog is closed', () =>
{
	require('../../../js/scripts/main.js');

	expect(Hooks.on).toHaveBeenCalledWith('closeDialog', ModuleManagementScripts.refreshModuleManagementStatusIcons);
});

test('WHEN main.js is run THEN ManageModuleProfilesSettingsForms have their height adjusted whenever they are rendered', () =>
{
	require('../../../js/scripts/main.js');

	expect(Hooks.on).toHaveBeenCalledWith(RENDER_HOOK_NAME, ManageModuleProfilesSettingsFormFunctions.forceManageModuleProfilesHeightResize);
});

test('WHEN main.js is run THEN ManageModuleProfilesSettingsForms are re-rendered whenever module profiles are updated', () =>
{
	require('../../../js/scripts/main.js');

	expect(Hooks.on).toHaveBeenCalledWith(MODULE_PROFILES_UPDATED_HOOK_NAME, ManageModuleProfilesSettingsFormFunctions.reRenderManageModuleProfilesWindows);
});