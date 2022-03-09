import * as Settings from '../../classes/Settings.js'
import * as ModuleManagement from '../../scripts/ui/module-management.js';
import * as StatusButtonScripts from '../../scripts/ui/status-button-scripts.js';

test('WHEN js.js is run THEN module-profile settings are registered', () =>
{
	require('../../scripts/js.js');

	expect(Hooks.once).toHaveBeenCalledWith('ready', Settings.registerSettings);
});

test('WHEN js.js is run THEN the module management render is modified', () =>
{
	require('../../scripts/js.js');

	expect(Hooks.on).toHaveBeenCalledWith('renderModuleManagement', ModuleManagement.modifyModuleManagementRender);
});

test('WHEN js.js is run THEN additional functionality is added to the "closeDialog" Hook for the Dependency popup', () =>
{
	require('../../scripts/js.js');

	expect(Hooks.on).toHaveBeenCalledWith('closeDialog', StatusButtonScripts.refreshStatusIcons);
});