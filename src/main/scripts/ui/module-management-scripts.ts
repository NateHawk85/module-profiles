import * as Settings from '../settings';
import { FoundryVersion } from '../settings';
import * as MappingUtils from '../mapping-utils';
import ManageModuleProfilesSettingsForm from '../../classes/ManageModuleProfilesSettingsForm';
import CreateModuleProfileForm from '../../classes/CreateModuleProfileForm';
import { MODULE_ID } from '../settings-utils';

const MODULE_MANAGEMENT_WINDOW_ID = 'module-management';

// When the Dependencies dialog closes, refresh statuses
export function refreshStatusElementsOnDependenciesClose(app: Dialog): void {
  if (app.data.title === 'Dependencies') {
    updateAllStatusElements();
  }
}

// Called on Hooks.closeDialog or similar to refresh when Module Management is open
export function checkUpdateActiveProfileStatuses(): void {
  if (isModuleManagementWindowOpen()) {
    updateAllStatusElements();
  }
}

/**
 * Do unsaved changes exist vs. the named profile?
 */
export function unsavedChangesExistOn(profileName: string): boolean {
  const savedProfile = Settings.getProfileByName(profileName);
  if (!savedProfile) return false;

  const unsavedModuleInfos = findUnsavedModuleInfos();
  return unsavedModuleInfos.some(unsavedModuleInfo => {
    const savedModuleInfo = savedProfile.modules.find(m => m.id === unsavedModuleInfo.id);
    return unsavedModuleInfo.isActive !== savedModuleInfo?.isActive;
  });
}

/**
 * Is the Module Management window currently in the DOM?
 */
export function isModuleManagementWindowOpen(): boolean {
  return document.getElementById(MODULE_MANAGEMENT_WINDOW_ID) !== null;
}

/**
 * Hook to modify the Module Management UI when it renders.
 */
export function modifyModuleManagementRender(app: ModuleManagement, html: JQuery, data: ModuleManagement.Data): void {
  if (!game.user?.isGM) return;

  addFooterElements();
  modifyModuleListElements();
  updateAllStatusElements();

  function addFooterElements(): void {
    // Build footer row & buttons
    const preFooterDiv = document.createElement('div');
    preFooterDiv.classList.add('module-profiles-footer-row');
    preFooterDiv.append(
      buildStatusButton(),
      buildCreateModuleProfileButton(),
      buildManageProfilesButton()
    );

    // Insert between <menu> and <footer> in v13
    const menuEl   = document.querySelector('#module-management > section > menu');
    const footerEl = document.querySelector('#module-management > section > footer');
    if (menuEl && footerEl) {
      menuEl.parentElement!.insertBefore(preFooterDiv, footerEl);
    }
    else {
      // Fallback for v9/v10
      const moduleList =
        document.getElementById('package-list') ??
        document.getElementById('module-list');
      if (moduleList) {
        moduleList.after(preFooterDiv);
      } else {
        const container =
          document.querySelector('#module-management .package-list')?.parentElement ??
          document.querySelector('#module-management .app') ??
          document.querySelector('#module-management');
        container?.append(preFooterDiv);
      }
    }

    updateProfileStatusButtons();
    forceModuleManagementWindowHeightResize();

    function buildStatusButton(): HTMLButtonElement {
      const activeProfile = Settings.getActiveProfile();
      const statusButton = document.createElement('button');
      statusButton.type = 'button';
      statusButton.classList.add('module-profiles-status-button');
      statusButton.style.flex = '1';
      statusButton.dataset.profileName = activeProfile.name;

      statusButton.addEventListener('click', event => {
        event.preventDefault();
        const moduleInfos = findUnsavedModuleInfos();
        Settings.saveChangesToProfile(activeProfile.name, moduleInfos)
          .then(() => updateProfileStatusButtons());
      });

      return statusButton;
    }

    function buildCreateModuleProfileButton(): HTMLButtonElement {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.innerHTML = `<i class="fa fa-plus"></i> ${game.i18n.localize('MODULE_MANAGEMENT.createNewButton.text')}`;
      btn.style.flex = '1';
      btn.addEventListener('click', () => new CreateModuleProfileForm().render(true));
      return btn;
    }

    function buildManageProfilesButton(): HTMLButtonElement {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.innerHTML = `<i class="fa fa-cog"></i> ${game.i18n.localize('MODULE_MANAGEMENT.manageModuleProfilesButton.text')}`;
      btn.addEventListener('click', event => {
        event.preventDefault();
        new ManageModuleProfilesSettingsForm().render(true);
      });
      return btn;
    }

    function forceModuleManagementWindowHeightResize(): void {
      Object.values(ui.windows)
        .filter(w => w.options.id === MODULE_MANAGEMENT_WINDOW_ID)
        .forEach(w => w.element[0].style.height = 'auto');
    }
  }

  function modifyModuleListElements(): void {
    const moduleElements = getModuleListElements();
    moduleElements.forEach(li => {
      const blinker = createModuleStatusBlinker();
      if (li.children.length > 0) {
        li.children[0].prepend(blinker);
        li.addEventListener('input', () => updateAllStatusElements());
      } else {
        console.warn(`${MODULE_ID} – invalid module element`, li);
      }
    });

    function createModuleStatusBlinker(): HTMLSpanElement {
      const span = document.createElement('span');
      span.classList.add('module-profiles-status-container');
      span.innerHTML = '<span class="module-profiles-status module-profiles-status-saved"></span>';
      return span;
    }
  }
}

/**
 * Update all the little status blinkers and the main status buttons.
 */
function updateAllStatusElements(): void {
  const activeProfile = Settings.getActiveProfile();
  const modules = getModuleListElements();

  modules.forEach(li => {
    const blinker  = li.querySelector<HTMLSpanElement>('.module-profiles-status');
    const checkbox = li.querySelector<HTMLInputElement>('input[type=checkbox]');
    if (!blinker || !checkbox) return;       // nothing to do

    // @ts-ignore - Foundry puts module.id in checkbox.name
    const moduleId = checkbox.name;
    const matching = activeProfile.modules.find(m => m.id === moduleId);
    if (!matching) {
      // no profile info → treat as “changed” (or skip entirely)
      blinker.classList.replace('module-profiles-status-saved', 'module-profiles-status-changed');
      return;
    }

    if (matching.isActive === checkbox.checked) {
      blinker.classList.replace('module-profiles-status-changed', 'module-profiles-status-saved');
    } else {
      blinker.classList.replace('module-profiles-status-saved', 'module-profiles-status-changed');
    }
  });

  updateProfileStatusButtons();
}

function updateProfileStatusButtons(): void {
  const activeProfile = Settings.getActiveProfile();
  const isUpToDate = !unsavedChangesExistOn(activeProfile.name);

  Array.from(document.getElementsByClassName('module-profiles-status-button') as HTMLCollectionOf<HTMLButtonElement>)
    .forEach(button => {
      if (isUpToDate) {
        const txt = game.i18n.localize('MODULE_MANAGEMENT.statusButton.upToDate');
        button.style.backgroundColor = '';
        button.innerHTML = `<i class="fa fa-check-circle" style="color: mediumseagreen"></i>
                            <b>${button.dataset.profileName}</b> ${txt}`;
      } else {
        const txt = game.i18n.localize('MODULE_MANAGEMENT.statusButton.saveChanges');
        button.style.backgroundColor = 'orangered';
        button.innerHTML = `<i class="far fa-save"></i> ${txt} <b>${button.dataset.profileName}</b>`;
      }
      button.disabled = isUpToDate;
    });
}

function findUnsavedModuleInfos(): ModuleInfo[] {
  const listEl = document.getElementById('module-list')
    ?? document.querySelector('#module-management .package-list');
  if (!listEl) return [];

  const checkboxes = listEl.querySelectorAll<HTMLInputElement>('input[type=checkbox]');
  const moduleStates = Array.from(checkboxes).reduce<Record<string, boolean>>((acc, cb) => {
    // @ts-ignore name exists
    acc[cb.name] = cb.checked;
    return acc;
  }, {});

  return MappingUtils.mapToModuleInfos(moduleStates);
}

function getModuleListElements(): NodeListOf<HTMLLIElement> {
  return (Settings.getFoundryVersion() === FoundryVersion.v9)
    ? document.querySelectorAll('#module-management li[data-module-name]')
    : document.querySelectorAll('#module-management li[data-module-id]');
}
