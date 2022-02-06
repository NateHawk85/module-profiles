import * as Settings from './settings.js';
import * as API from './api.js';
import * as ModuleManagement from './ui/module-management.js';
import * as StatusButtonScripts from './ui/status-button-scripts.js';

Hooks.once('ready', Settings.registerSettings);

Hooks.on('renderModuleManagement', ModuleManagement.modifyModuleManagementRender);

// TODO - test, if you're going to keep
Hooks.once('ready', API.registerApi);

Hooks.on('closeDialog', StatusButtonScripts.refreshStatusIcons);