import * as Settings from '../settings';
import * as ModuleManagementScripts from './module-management-scripts';
import ManageModuleProfilesSettingsForm from '../../classes/ManageModuleProfilesSettingsForm';
import CreateModuleProfileForm from '../../classes/CreateModuleProfileForm';

const MODULE_MANAGEMENT_WINDOW_ID = 'module-management';

// TODO - Needs to be a separate function just for closeDialog instances. updateActiveProfileStatuses() should be exposed and performed when things are changed
// TODO - test
export function refreshModuleManagementStatusIcons(app)
{
	if (app.data.title === 'Dependencies')
	{
		updateActiveProfileStatuses();
	}
}

// TODO - definitely test and rename ^^ that method accordingly
export function checkUpdateActiveProfileStatuses() {
	if (ModuleManagementScripts.isModuleManagementWindowOpen())
	{
		updateActiveProfileStatuses();
	}
}

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

/**
 * Determines if the Module Management window is open.
 * @returns {boolean} - Whether the Module Management window is open.
 */
export function isModuleManagementWindowOpen()
{
	return document.getElementById(MODULE_MANAGEMENT_WINDOW_ID) != null;
}

// TODO - test all
export function modifyModuleManagementRender(app, html, data)
{
	console.log('modifying stuff');
	if (game.user?.isGM)
	{
		addFooterElements();
		modifyModuleListElements();
		updateActiveProfileStatuses();
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
			const result = Settings.saveChangesToProfile(activeProfile.name, findUnsavedModuleStatuses());
			result.then(() => updateStatusButtons());
		});

		return statusButton;
	}

	function buildCreateModuleProfileButton()
	{
		const createModuleProfileButton = document.createElement('button');
		createModuleProfileButton.type = 'button'; // TODO - prevents submission, therefore reloading page? (any button with type="submit" automatically submits form)
		createModuleProfileButton.innerHTML = '<i class="fa fa-plus"></i> Create Module Profile</button>';
		createModuleProfileButton.style.flexBasis = '80%';
		createModuleProfileButton.addEventListener('click', () => new CreateModuleProfileForm().render(true));

		return createModuleProfileButton;
	}

	function buildManageProfilesButton()
	{
		const manageProfilesButton = document.createElement('button');
		manageProfilesButton.type = 'button'; // TODO - prevents submission, therefore reloading page? (any button with type="submit" automatically submits form)
		manageProfilesButton.innerHTML = '<i class="fa fa-cog"></i> Manage Module Profiles</button>';
		manageProfilesButton.addEventListener('click', (event) =>
		{
			event.preventDefault();
			new ManageModuleProfilesSettingsForm().render(true);
		});

		return manageProfilesButton;
	}
}

function modifyModuleListElements()
{
	const activeProfile = Settings.getActiveProfile();
	const moduleElements = document.querySelectorAll('#module-management li[data-module-name]'); // TODO - NodeList, not Array

	// Add status icons and add an "update" event listener to each module in the list
	moduleElements.forEach(module =>
	{
		let statusIconContainer = createModuleStatusIcon();
		if (module.children.length > 0)
		{
			module.children[0].prepend(statusIconContainer);
			module.addEventListener('input', () => updateActiveProfileStatuses(activeProfile, moduleElements));
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

// TODO - test and hook up
function updateActiveProfileStatuses()
{
	const activeProfile = Settings.getActiveProfile();
	const modules = document.querySelectorAll('#module-management li[data-module-name]');
	modules.forEach(module =>
	{
		// TODO - what's this do tho?
		if (module.children[0]?.children[1]?.children[0]) // TODO - appropriately handle this
		{
			const statusIcon = module.children[0].children[0].firstChild;
			const checkbox = module.children[0].children[1].children[0];

			if (activeProfile.modules[checkbox.attributes.name.value] === checkbox.checked)
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
		const buttonProfileName = button.dataset.profileName;
		if (isUpToDate)
		{
			button.style.backgroundColor = '';
			button.innerHTML = `<i class="fa fa-check-circle" style="color: mediumseagreen"></i><b>${(buttonProfileName)}</b> is up to date`;
		} else
		{
			button.style.backgroundColor = 'orangered';
			button.innerHTML = `<i class="far fa-save"></i> Save changes to <b>${(buttonProfileName)}</b>`;
		}

		button.disabled = isUpToDate;
	});
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

// TODO - combine with 'forceManageModuleProfilesHeightResize'?
function forceModuleManagementWindowHeightResize()
{
	Object.values(ui.windows)
		  .filter(app => app.options.id === MODULE_MANAGEMENT_WINDOW_ID)
		  .forEach(app => app.element[0].style.height = 'auto');
}