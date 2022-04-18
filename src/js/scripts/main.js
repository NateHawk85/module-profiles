import * as Settings from './settings.js';
import * as API from './api.js';
import * as ModuleManagementScripts from './ui/module-management-scripts.js';
import * as ManageModuleProfilesSettingsFormFunctions from '../classes/ManageModuleProfilesSettingsForm.js';

// Register module setup
Hooks.once('ready', Settings.registerSettings);
Hooks.once('ready', API.registerApi);

// Module Management window modifications
Hooks.on('renderModuleManagement', ModuleManagementScripts.modifyModuleManagementRender);
Hooks.on('closeDialog', ModuleManagementScripts.refreshModuleManagementStatusIcons);

// Adjust Module Profiles Management window
Hooks.on(ManageModuleProfilesSettingsFormFunctions.MODULE_PROFILES_UPDATED_HOOK_NAME,
	ManageModuleProfilesSettingsFormFunctions.reRenderManageModuleProfilesWindows);
Hooks.on(ManageModuleProfilesSettingsFormFunctions.RENDER_HOOK_NAME, ManageModuleProfilesSettingsFormFunctions.forceManageModuleProfilesHeightResize);