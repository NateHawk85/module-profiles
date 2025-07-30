import * as Settings from './settings';
import * as API from './api';
import * as ModuleManagementScripts from './ui/module-management-scripts';
import * as ManageModuleProfilesSettingsFormFunctions from '../classes/ManageModuleProfilesSettingsForm';

// Module setup
Hooks.once('init', Settings.registerModuleSettings);
Hooks.once('init', API.registerApi);

// Module Management window hooks
Hooks.on('renderModuleManagement', ModuleManagementScripts.modifyModuleManagementRender);
Hooks.on('closeDialog', ModuleManagementScripts.refreshStatusElementsOnDependenciesClose);
Hooks.on(ManageModuleProfilesSettingsFormFunctions.MODULE_PROFILES_UPDATED_HOOK_NAME, ModuleManagementScripts.checkUpdateActiveProfileStatuses);

// Module Profiles Management window hooks
Hooks.on(ManageModuleProfilesSettingsFormFunctions.MODULE_PROFILES_UPDATED_HOOK_NAME,
	ManageModuleProfilesSettingsFormFunctions.reRenderManageModuleProfilesWindows);
Hooks.on(ManageModuleProfilesSettingsFormFunctions.RENDER_HOOK_NAME, ManageModuleProfilesSettingsFormFunctions.forceManageModuleProfilesHeightResize);
