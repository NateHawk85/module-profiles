import * as Settings from '../settings';
import * as MappingUtils from '../mapping-utils';
import * as ModuleManagementScripts from './module-management-scripts';
import ManageModuleProfilesSettingsForm from '../../classes/ManageModuleProfilesSettingsForm';
import CreateModuleProfileForm from '../../classes/CreateModuleProfileForm';
import {MODULE_ID} from '../settings-utils';
import {ModuleInfo} from '../../types';

const MODULE_MANAGEMENT_WINDOW_ID = 'module-management';

// TODO - Needs to be a separate function just for closeDialog instances. updateActiveProfileStatuses() should be exposed and performed when things are changed
export function refreshStatusElementsOnDependenciesClose(app: Dialog): void
{
	if (app.data.title === 'Dependencies')
	{
		updateAllStatusElements();
	}
}

// TODO - definitely test and rename ^^ that method accordingly
export function checkUpdateActiveProfileStatuses(): void
{
	if (ModuleManagementScripts.isModuleManagementWindowOpen())
	{
		updateAllStatusElements();
	}
}

/**
 * Determines if changes exist on the Module Management window that don't align with a given profile.
 * @param {string} profileName
 * @returns {boolean} - Whether unsaved changes exist on the profile with the given name.
 */
export function unsavedChangesExistOn(profileName: string): boolean
{
	const savedProfile = Settings.getProfileByName(profileName);

	if (!savedProfile)
	{
		return false;
	}

	const unsavedModuleInfos = findUnsavedModuleInfos();

	return unsavedModuleInfos.some(unsavedModuleInfo =>
	{
		const savedModuleInfo = savedProfile.modules.find(savedModuleInfo => savedModuleInfo.id === unsavedModuleInfo.id);

		return unsavedModuleInfo.isActive !== savedModuleInfo?.isActive;
	});


	// return Object.entries(unsavedModuleInfos).some(([moduleId, unsavedStatus]) => savedProfile.modules[moduleId] !== unsavedStatus);
}

/**
 * Determines if the Module Management window is open.
 * @returns {boolean} - Whether the Module Management window is open.
 */
export function isModuleManagementWindowOpen(): boolean
{
	return document.getElementById(MODULE_MANAGEMENT_WINDOW_ID) != null;
}

// TODO - test all
export function modifyModuleManagementRender(app: ModuleManagement, html: JQuery, data: ModuleManagement.Data)
{
	if (game.user?.isGM)
	{
		addFooterElements();
		modifyModuleListElements();
		updateAllStatusElements();
	}

	function addFooterElements(): void
	{
		// Create the elements
		const preFooterDiv = document.createElement('div');
		preFooterDiv.classList.add('module-profiles-footer-row');

		const statusButton = buildStatusButton();
		const saveCurrentConfigurationButton = buildCreateModuleProfileButton();
		const manageProfilesButton = buildManageProfilesButton();
		preFooterDiv.append(statusButton, saveCurrentConfigurationButton, manageProfilesButton);

		// Add elements just below the module list
		const moduleList = document.getElementById('module-list')!;
		moduleList.after(preFooterDiv);

		// Update status of status buttons
		updateProfileStatusButtons();

		// Update the height of the window with the new elements
		forceModuleManagementWindowHeightResize();

		function buildStatusButton()
		{
			const activeProfile = Settings.getActiveProfile();

			const statusButton = document.createElement('button');
			statusButton.type = 'button'; // TODO - prevents submission, therefore reloading page? (any button with type="submit" automatically submits form)
			statusButton.classList.add('module-profiles-status-button');
			statusButton.style.flexBasis = '130%';
			statusButton.dataset.profileName = activeProfile.name; // TODO - make this a little more... easier to find? idk

			statusButton.addEventListener('click', (event) =>
			{
				event.preventDefault();

				const moduleInfos = findUnsavedModuleInfos();

				Settings.saveChangesToProfile(activeProfile.name, moduleInfos)
						.then(() => updateProfileStatusButtons());
			});

			return statusButton;
		}

		function buildCreateModuleProfileButton()
		{
			const createModuleProfileButton = document.createElement('button');
			createModuleProfileButton.type = 'button'; // TODO - prevents submission, therefore reloading page? (any button with type="submit" automatically
													   // submits form)
			createModuleProfileButton.innerHTML = `<i class="fa fa-plus"></i> ${game.i18n.localize('MODULE_PROFILES.MODULE_MANAGEMENT.createNewButton.text')}</button>`;
			createModuleProfileButton.style.flexBasis = '80%';
			createModuleProfileButton.addEventListener('click', () => new CreateModuleProfileForm().render(true));

			return createModuleProfileButton;
		}

		function buildManageProfilesButton()
		{
			const manageProfilesButton = document.createElement('button');
			manageProfilesButton.type = 'button'; // TODO - prevents submission, therefore reloading page? (any button with type="submit" automatically submits
												  // form)
			manageProfilesButton.innerHTML = `<i class="fa fa-cog"></i> ${game.i18n.localize('MODULE_PROFILES.MODULE_MANAGEMENT.manageModuleProfilesButton.text')}</button>`;
			manageProfilesButton.addEventListener('click', (event) =>
			{
				event.preventDefault();
				new ManageModuleProfilesSettingsForm().render(true);
			});

			return manageProfilesButton;
		}

		// TODO - combine with 'forceManageModuleProfilesHeightResize'?
		function forceModuleManagementWindowHeightResize(): void
		{
			Object.values(ui.windows)
				  .filter(app => app.options.id === MODULE_MANAGEMENT_WINDOW_ID)
				  .forEach(app => app.element[0].style.height = 'auto');
		}
	}

	function modifyModuleListElements()
	{
		const moduleElements = document.querySelectorAll('#module-management li[data-module-name]');

		// Add status blinkers and add an "update" event listener to each module in the list
		moduleElements.forEach(module =>
		{
			let statusBlinkerContainer = createModuleStatusBlinker();
			if (module.children.length > 0)
			{
				module.children[0].prepend(statusBlinkerContainer);
				module.addEventListener('input', () => updateAllStatusElements());
			} else
			{
				console.log(`Error with ${MODULE_ID} - invalid module`);
				console.log(module);
			}
		});

		function createModuleStatusBlinker()
		{
			const span = document.createElement('span');
			span.classList.add('module-profiles-status-container');
			span.innerHTML = '<span class="module-profiles-status module-profiles-status-saved"></span>';
			return span;
		}
	}
}

function updateAllStatusElements(): void
{
	const activeProfile = Settings.getActiveProfile();
	const modules = <NodeListOf<HTMLLIElement>> document.querySelectorAll('#module-management li[data-module-name]');
	modules.forEach(module =>
	{
		if (module.children[0]?.children[1]?.children[0]) // TODO - appropriately handle this
		{
			const statusBlinker = <HTMLSpanElement> module.children[0].children[0].firstChild!;
			const checkbox = <HTMLInputElement> module.children[0].children[1].children[0];

			// @ts-ignore - 'name' field exists on Foundry checkboxes with the given module IDs
			const matchingModuleInfo = activeProfile.modules.find(module => module.id === checkbox.attributes.name.value)!;

			if (matchingModuleInfo && matchingModuleInfo.isActive === checkbox.checked)
			{
				statusBlinker.classList.remove('module-profiles-status-changed');
				statusBlinker.classList.add('module-profiles-status-saved');
			} else
			{
				statusBlinker.classList.remove('module-profiles-status-saved');
				statusBlinker.classList.add('module-profiles-status-changed');
			}
		}
	});

	updateProfileStatusButtons();
}

function updateProfileStatusButtons(): void
{
	const activeProfile = Settings.getActiveProfile();
	const isUpToDate = !ModuleManagementScripts.unsavedChangesExistOn(activeProfile.name);

	const profileButtons = <HTMLCollectionOf<HTMLButtonElement>> document.getElementsByClassName('module-profiles-status-button');
	Array.from(profileButtons).forEach(button =>
	{
		const buttonProfileName = button.dataset.profileName;
		if (isUpToDate)
		{
			const statusButtonText = game.i18n.localize('MODULE_PROFILES.MODULE_MANAGEMENT.statusButton.upToDate');
			button.style.backgroundColor = '';
			button.innerHTML = `<i class="fa fa-check-circle" style="color: mediumseagreen"></i><b>${(buttonProfileName)}</b> ${statusButtonText}`;
		} else
		{
			button.style.backgroundColor = 'orangered';
			button.innerHTML = `<i class="far fa-save"></i> ${game.i18n.localize('MODULE_PROFILES.MODULE_MANAGEMENT.statusButton.saveChanges')} <b>${(buttonProfileName)}</b>`;
		}

		button.disabled = isUpToDate;
	});
}

function findUnsavedModuleInfos(): ModuleInfo[]
{
	const moduleCheckboxes = <NodeListOf<HTMLInputElement>> document.getElementById('module-list')!.querySelectorAll('input[type=checkbox]');
	const activeModuleIds: string[] = Array.from(moduleCheckboxes)
										   .filter(checkbox => checkbox.checked)
		// @ts-ignore - 'name' field exists on Foundry checkboxes with the given module IDs
										   .map(checkbox => checkbox.attributes.name.value);
	const inactiveModuleIds: string[] = Array.from(moduleCheckboxes)
											 .filter(checkbox => !checkbox.checked)
		// @ts-ignore - 'name' field exists on Foundry checkboxes with the given module IDs
											 .map(checkbox => checkbox.attributes.name.value);

	const moduleList: Record<string, boolean> = {};
	activeModuleIds.forEach(moduleId => moduleList[moduleId] = true);
	inactiveModuleIds.forEach(moduleId => moduleList[moduleId] = false);

	return MappingUtils.mapToModuleInfos(moduleList);
}