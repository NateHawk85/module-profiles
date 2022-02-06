import * as Settings from '../../scripts/settings.js'
import * as ModuleManagement from '../../scripts/ui/module-management.js';
import * as StatusButtonScripts from '../../scripts/ui/status-button-scripts.js';

test('WHEN main.js is run THEN module-profile settings are registered', () =>
{
	require('../../scripts/main.js');

	expect(Hooks.once).toHaveBeenCalledWith('ready', Settings.registerSettings);
});

test('WHEN main.js is run THEN the module management render is modified', () =>
{
	require('../../scripts/main.js');

	expect(Hooks.on).toHaveBeenCalledWith('renderModuleManagement', ModuleManagement.modifyModuleManagementRender);
});

test('WHEN main.js is run THEN additional functionality is added to the "closeDialog" Hook for the Dependency popup', () =>
{
	require('../../scripts/main.js');

	expect(Hooks.on).toHaveBeenCalledWith('closeDialog', StatusButtonScripts.refreshStatusIcons);
});