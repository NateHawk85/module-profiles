import * as Settings from './settings.js';
import * as API from './api.js';
import * as ModuleManagementScripts from './ui/module-management-scripts.js';
import * as StatusButtonScripts from './ui/status-button-scripts.js';
import * as ManageModuleProfilesSettingsFormFunctions from '../classes/ManageModuleProfilesSettingsForm.js';

Hooks.once('ready', Settings.registerSettings);

Hooks.once('ready', API.registerApi);

Hooks.on('renderModuleManagement', ModuleManagementScripts.modifyModuleManagementRender);

Hooks.on('closeDialog', StatusButtonScripts.refreshStatusIcons);

Hooks.on(Settings.MODULE_PROFILES_UPDATED_HOOK_NAME, ManageModuleProfilesSettingsFormFunctions.reRenderManageModuleProfilesWindows);

// TODO - test/pull into method - this resizes the "Manage Module Profiles" form when a new element is added
Hooks.on('renderManageModuleProfilesSettingsForm', (app) => app.element[0].style.height = 'auto');