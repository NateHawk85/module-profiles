import {Settings} from '../classes/Settings.js';
import * as API from './api.js';
import * as ModuleManagement from './ui/module-management.js';
import * as StatusButtonScripts from './ui/status-button-scripts.js';

// TODO - test
Hooks.once('ready', () => {
	const settings = new Settings();
	settings.registerSettings();
});

Hooks.on('renderModuleManagement', ModuleManagement.modifyModuleManagementRender);

// TODO - test, if you're going to keep
Hooks.once('ready', API.registerApi);

Hooks.on('closeDialog', StatusButtonScripts.refreshStatusIcons);