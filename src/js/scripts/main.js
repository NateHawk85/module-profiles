import * as Settings from './settings.js';
import * as API from './api.js';
import * as ModuleManagementScripts from './ui/module-management-scripts.js';
import * as ManageModuleProfilesSettingsFormFunctions from '../classes/ManageModuleProfilesSettingsForm.js';

// Module setup
Hooks.once('ready', Settings.registerSettings);
Hooks.once('ready', API.registerApi);

// Module Management window hooks
Hooks.on('renderModuleManagement', ModuleManagementScripts.modifyModuleManagementRender);
Hooks.on('closeDialog', ModuleManagementScripts.refreshModuleManagementStatusIcons);
Hooks.on(ManageModuleProfilesSettingsFormFunctions.MODULE_PROFILES_UPDATED_HOOK_NAME, ModuleManagementScripts.checkUpdateActiveProfileStatuses);

// Module Profiles Management window hooks
Hooks.on(ManageModuleProfilesSettingsFormFunctions.MODULE_PROFILES_UPDATED_HOOK_NAME,
	ManageModuleProfilesSettingsFormFunctions.reRenderManageModuleProfilesWindows);
Hooks.on(ManageModuleProfilesSettingsFormFunctions.RENDER_HOOK_NAME, ManageModuleProfilesSettingsFormFunctions.forceManageModuleProfilesHeightResize);

// TODO - add importing, but after that, the majority of everything else is just cleanup