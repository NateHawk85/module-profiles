import * as Settings from '../settings.js';
import * as ModuleManagementScripts from './module-management-scripts.js';
import ManageModuleProfilesSettingsForm from '../../classes/ManageModuleProfilesSettingsForm.js';
import CreateModuleProfileForm from '../../classes/CreateModuleProfileForm.js';

const MODULE_MANAGEMENT_WINDOW_ID = 'module-management';

// TODO - hook into the 'renderDialog' hook to refresh Module Management on close
//		if (arg1.data.title === 'Dependencies')

// TODO - hook into the 'closeDialog' hook to refresh Module Management on close
// 		if (arg1.data.title === 'Dependencies')

/**
 * Determines if changes exist on the Module Management window that don't align with a given profile.
 * @param {string} profileName
 * @returns {boolean} - Whether unsaved changes exist on the profile with the given name.
 */
export function unsavedChangesExistOn(profileName)
{
	const savedProfile = Settings.getProfileByName(profileName);
	const unsavedProfile = findUnsavedModuleStatuses();

	return Object.entries(unsavedProfile).some(([moduleId, unsavedStatus]) => savedProfile.modules[moduleId] !== unsavedStatus);
}

// TODO - test all
// TODO - make sure to check statuses on initial load
export function modifyModuleManagementRender(app, html, data)
{
	console.log('modifying stuff');
	if (game.user?.isGM)
	{
		const activeProfile = Settings.getActiveProfile();
		addFooterElements();
		modifyModuleListElements(activeProfile);
		const moduleElements = document.querySelectorAll('#module-management li[data-module-name]');
		updateProfileStatus(activeProfile, moduleElements);
	}
}

function addFooterElements()
{
	// Create the elements
	const preFooterDiv = document.createElement('div');
	preFooterDiv.classList.add('module-profiles-footer-row');

	const statusButton = buildStatusButton();
	const saveCurrentConfigurationButton = buildCreateModuleProfileButton();
	const manageProfilesButton = buildManageProfilesButton();
	preFooterDiv.append(statusButton, saveCurrentConfigurationButton, manageProfilesButton);

	// Add elements just below the module list
	const moduleList = document.getElementById('module-list');
	console.log('module-list: ');
	console.log(moduleList);
	moduleList.after(preFooterDiv);

	// Update status of status buttons
	updateStatusButtons();

	function buildStatusButton()
	{
		const statusButton = document.createElement('button');
		statusButton.type = 'button'; // TODO - prevents submission, therefore reloading page?
		statusButton.classList.add('module-profiles-status-button');
		statusButton.style.flexBasis = '130%';

		return statusButton;
	}

	function buildCreateModuleProfileButton()
	{
		const createModuleProfileButton = document.createElement('button');
		createModuleProfileButton.type = 'button'; // TODO - prevents submission, therefore reloading page?
		createModuleProfileButton.innerHTML = '<i class="fa fa-plus"></i> Create Module Profile</button>';
		createModuleProfileButton.style.flexBasis = '80%';
		createModuleProfileButton.addEventListener('click', () => new CreateModuleProfileForm().render(true));

		return createModuleProfileButton;
	}

	function buildManageProfilesButton()
	{
		// TODO - bug, when status button is "Save changes to...", clicking this reloads page
		const manageProfilesButton = document.createElement('button');
		manageProfilesButton.type = 'button'; // TODO - prevents submission, therefore reloading page?
		manageProfilesButton.innerHTML = '<i class="fa fa-cog"></i> Manage Module Profiles</button>';
		manageProfilesButton.addEventListener('click', (event) =>
		{
			event.preventDefault();
			new ManageModuleProfilesSettingsForm().render(true);
		});

		return manageProfilesButton;
	}
}

function modifyModuleListElements(activeProfile)
{
	const moduleElements = document.querySelectorAll('#module-management li[data-module-name]'); // TODO - NodeList, not Array

	// Add status icons and add an "update" event listener to each module in the list
	moduleElements.forEach(module =>
	{
		let statusIconContainer = createModuleStatusIcon();
		if (module.children.length > 0)
		{
			module.children[0].prepend(statusIconContainer);
			module.addEventListener('input', () => updateProfileStatus(activeProfile, moduleElements));
		} else
		{
			console.log(module); // TODO - what's going on here? Why is there a module with no children?
		}
	});

	function createModuleStatusIcon()
	{
		const span = document.createElement('span');
		span.classList.add('module-profiles-status-container');
		span.innerHTML = '<span class="module-profiles-status module-profiles-status-saved"></span>';
		return span;
	}
}

function updateProfileStatus(profile, modules)
{
	modules.forEach(module =>
	{
		// TODO - what's this do tho?
		if (module.children[0]?.children[1]?.children[0]) // TODO - appropriately handle this
		{
			const statusIcon = module.children[0].children[0].firstChild;
			const checkbox = module.children[0].children[1].children[0];

			if (profile.modules[checkbox.attributes.name.value] === checkbox.checked)
			{
				statusIcon.classList.remove('module-profiles-status-changed');
				statusIcon.classList.add('module-profiles-status-saved');
			} else
			{
				statusIcon.classList.remove('module-profiles-status-saved');
				statusIcon.classList.add('module-profiles-status-changed');
			}
		}
	});

	updateStatusButtons();
}

function updateStatusButtons()
{
	// TODO - clean up
	const activeProfile = Settings.getActiveProfile();
	const isUpToDate = !ModuleManagementScripts.unsavedChangesExistOn(activeProfile.name);

	const profileButtons = document.getElementsByClassName('module-profiles-status-button');
	Array.from(profileButtons).forEach(button =>
	{
		if (isUpToDate)
		{
			button.style.backgroundColor = '';
			button.innerHTML = `<i class="fa fa-check-circle" style="color: mediumseagreen"></i><b>${(activeProfile.name)}</b> is up to date`;
		} else
		{
			button.style.backgroundColor = 'orangered';
			button.innerHTML = `<i class="far fa-save"></i> Save changes to <b>${(activeProfile.name)}</b>`;
			button.addEventListener('click', (event) =>
			{
				event.preventDefault();
				const result = Settings.saveChangesToProfile(activeProfile.name, findUnsavedModuleStatuses());
				result.then(() =>
				{
					updateStatusButtons();
				});
			});
		}

		button.disabled = isUpToDate;
	});
}

// TODO - test
export function isModuleManagementWindowOpen()
{
	// TODO - implement
	return document.getElementById('module-management') != null;
}

function findUnsavedModuleStatuses()
{
	const moduleCheckboxes = document.getElementById('module-list').querySelectorAll('input[type=checkbox]');
	const activeModuleIds = Array.from(moduleCheckboxes)
								 .filter(checkbox => checkbox.checked)
								 .map(module => module.attributes.name.value);
	const inactiveModuleIds = Array.from(moduleCheckboxes)
								   .filter(checkbox => !checkbox.checked)
								   .map(module => module.attributes.name.value);

	const moduleList = {};
	activeModuleIds.forEach(moduleId => moduleList[moduleId] = true);
	inactiveModuleIds.forEach(moduleId => moduleList[moduleId] = false);

	return moduleList;
}

