// src/main/scripts/main.ts

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
Hooks.on(
  ManageModuleProfilesSettingsFormFunctions.MODULE_PROFILES_UPDATED_HOOK_NAME,
  ModuleManagementScripts.checkUpdateActiveProfileStatuses
);

// Module Profiles Management window hooks
Hooks.on(
  ManageModuleProfilesSettingsFormFunctions.MODULE_PROFILES_UPDATED_HOOK_NAME,
  ManageModuleProfilesSettingsFormFunctions.reRenderManageModuleProfilesWindows
);
Hooks.on(
  ManageModuleProfilesSettingsFormFunctions.RENDER_HOOK_NAME,
  ManageModuleProfilesSettingsFormFunctions.forceManageModuleProfilesHeightResize
);

// Append an active/total badge to the “Manage Modules” button in the Settings sidebar
Hooks.on("renderSettingsConfig", (_app: SettingsConfig, html: JQuery) => {
  // Count how many modules are active vs. total
  const activeCount = game.modules.filter(m => m.active).length;
  const totalCount  = game.modules.size;

  // Find the “Manage Modules” button by its data attributes
  const btn = html.find('button[data-action="openApp"][data-app="modules"]');
  if (!btn.length) return;

  // Create or update the badge element
  let badge = btn.find('.module-count-badge');
  if (!badge.length) {
    badge = $(`<span class="badge module-count-badge"></span>`)
      .css({ marginLeft: '6px', verticalAlign: 'middle' });
    btn.append(badge);
  }

  // Set the badge text to “active/total”
  badge.text(`${activeCount}/${totalCount}`);
});
