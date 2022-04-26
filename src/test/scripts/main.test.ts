import * as Settings from '../../main/scripts/settings';
import * as API from '../../main/scripts/api';
import * as ModuleManagementScripts from '../../main/scripts/ui/module-management-scripts';
import * as ManageModuleProfilesSettingsFormFunctions from '../../main/classes/ManageModuleProfilesSettingsForm';

// Necessary to tie function references to main.ts function references... may be an issue with Jest
const registerSettings = () => {};
const registerApi = () => {};
const modifyModuleManagementRender = () => {};
const reRenderManageModuleProfilesWindows = () => {};
const forceManageModuleProfilesHeightResize = () => {};
const refreshModuleManagementStatusIcons = () => {};
const checkUpdateActiveProfileStatuses = () => {};
const RENDER_HOOK_NAME = 'renderHookName';
const MODULE_PROFILES_UPDATED_HOOK_NAME = 'moduleProfilesUpdatedHookName';

jest.mock('../../main/scripts/settings', () => ({
	registerSettings: registerSettings
}));
jest.mock('../../main/scripts/api', () => ({
	registerApi: registerApi
}));
jest.mock('../../main/scripts/ui/module-management-scripts', () => ({
	modifyModuleManagementRender: modifyModuleManagementRender,
	refreshModuleManagementStatusIcons: refreshModuleManagementStatusIcons,
	checkUpdateActiveProfileStatuses: checkUpdateActiveProfileStatuses
}));
jest.mock('../../main/classes/ManageModuleProfilesSettingsForm', () => ({
	RENDER_HOOK_NAME: RENDER_HOOK_NAME,
	MODULE_PROFILES_UPDATED_HOOK_NAME: MODULE_PROFILES_UPDATED_HOOK_NAME,
	reRenderManageModuleProfilesWindows: reRenderManageModuleProfilesWindows,
	forceManageModuleProfilesHeightResize: forceManageModuleProfilesHeightResize
}));

test('WHEN main.ts is run THEN module-profile settings are registered', () =>
{
	require('../../main/scripts/main');

	expect(Hooks.once).toHaveBeenCalledWith('ready', Settings.registerModuleSettings);
});

test('WHEN main.ts is run THEN the API is registered', () =>
{
	require('../../main/scripts/main');

	expect(Hooks.once).toHaveBeenCalledWith('ready', API.registerApi);
});

test('WHEN main.ts is run THEN the module management render is modified', () =>
{
	require('../../main/scripts/main');

	expect(Hooks.on).toHaveBeenCalledWith('renderModuleManagement', ModuleManagementScripts.modifyModuleManagementRender);
});

test('WHEN main.ts is run THEN the module management status icons are refreshed when a dialog is closed', () =>
{
	require('../../main/scripts/main');

	expect(Hooks.on).toHaveBeenCalledWith('closeDialog', ModuleManagementScripts.refreshModuleManagementStatusIcons);
});

test('WHEN main.ts is run THEN the module management status icons are refreshed when a module profile is updated', () =>
{
	require('../../main/scripts/main');

	expect(Hooks.on).toHaveBeenCalledWith(ManageModuleProfilesSettingsFormFunctions.MODULE_PROFILES_UPDATED_HOOK_NAME,
		ModuleManagementScripts.checkUpdateActiveProfileStatuses);
});

test('WHEN main.ts is run THEN ManageModuleProfilesSettingsForms have their height adjusted whenever they are rendered', () =>
{
	require('../../main/scripts/main');

	expect(Hooks.on).toHaveBeenCalledWith(RENDER_HOOK_NAME, ManageModuleProfilesSettingsFormFunctions.forceManageModuleProfilesHeightResize);
});

test('WHEN main.ts is run THEN ManageModuleProfilesSettingsForms are re-rendered whenever module profiles are updated', () =>
{
	require('../../main/scripts/main');

	expect(Hooks.on).toHaveBeenCalledWith(MODULE_PROFILES_UPDATED_HOOK_NAME, ManageModuleProfilesSettingsFormFunctions.reRenderManageModuleProfilesWindows);
});