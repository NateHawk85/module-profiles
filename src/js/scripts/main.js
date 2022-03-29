import * as Settings from './settings.js';
import * as API from './api.js';
import * as ModuleManagement from './ui/module-management.js';
import * as StatusButtonScripts from './ui/status-button-scripts.js';

Hooks.once('ready', Settings.registerSettings);

Hooks.once('ready', API.registerApi);

Hooks.on('renderModuleManagement', ModuleManagement.modifyModuleManagementRender);

Hooks.on('closeDialog', StatusButtonScripts.refreshStatusIcons);