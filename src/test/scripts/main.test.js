import {Settings} from '../../js/classes/Settings.js'
import * as ModuleManagement from '../../js/scripts/ui/module-management.js';
import * as StatusButtonScripts from '../../js/scripts/ui/status-button-scripts.js';

test('WHEN main.js is run THEN module-profile settings are registered', () =>
{
	require('../../js/scripts/main.js');

	expect(Hooks.once).toHaveBeenCalledWith('ready', new Settings().registerSettings);
});

test('WHEN main.js is run THEN the module management render is modified', () =>
{
	require('../../js/scripts/main.js');

	expect(Hooks.on).toHaveBeenCalledWith('renderModuleManagement', ModuleManagement.modifyModuleManagementRender);
});

test('WHEN main.js is run THEN additional functionality is added to the "closeDialog" Hook for the Dependency popup', () =>
{
	require('../../js/scripts/main.js');

	expect(Hooks.on).toHaveBeenCalledWith('closeDialog', StatusButtonScripts.refreshStatusIcons);
});