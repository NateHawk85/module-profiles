import * as Settings from './settings.js';
import * as API from './api.js';
import * as ModuleManagement from './module-management.js';

Hooks.once('ready', Settings.registerSettings);

// TODO - test, if you're going to keep
Hooks.once('ready', API.registerApi);

Hooks.on('renderModuleManagement', ModuleManagement.modifyModuleManagementRender);