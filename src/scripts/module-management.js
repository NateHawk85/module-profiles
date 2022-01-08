// TODO - test?
import * as Settings from '../scripts/settings.js';
import {ManageProfilesSettings} from '../classes/ManageProfilesSettings.js';

// TODO - test all
export function modifyModuleManagementRender(app, html, options)
{
	// TODO - definitely test
	if (game.user?.isGM)
	{
		addFooterElements(html);
		modifyModuleListElements();
	}
}

function addFooterElements(html)
{
	// Create the elements
	const preFooterDiv = document.createElement('div');
	preFooterDiv.classList.add('module-profiles-footer-row');

	const statusButton = createStatusButton();
	const saveCurrentConfigurationButton = createCreateModuleProfileButton();
	const manageProfilesButton = createManageProfilesButton();
	preFooterDiv.append(statusButton, saveCurrentConfigurationButton, manageProfilesButton);

	// Add elements just below the module list
	const moduleList = document.getElementById('module-list');
	moduleList.after(preFooterDiv);

	// Update status of status buttons
	updateStatusButtons();

	function createStatusButton()
	{
		const statusButton = document.createElement('button');
		statusButton.classList.add('module-profiles-status-button');
		statusButton.style.flexBasis = '130%';

		return statusButton;
	}

	function createCreateModuleProfileButton()
	{
		const createModuleProfileButton = document.createElement('button');
		createModuleProfileButton.innerHTML = '<i class="fa fa-plus"></i> Create Module Profile</button>';
		createModuleProfileButton.style.flexBasis = '80%';
		createModuleProfileButton.addEventListener('click', () =>
		{
			// TODO - save as new module profile
		});

		return createModuleProfileButton;
	}

	function createManageProfilesButton()
	{
		// TODO - bug, when status button is "Save changes to...", clicking this reloads page
		const manageProfilesButton = document.createElement('button');
		manageProfilesButton.innerHTML = '<i class="fa fa-cog"></i> Manage Module Profiles</button>';
		manageProfilesButton.addEventListener('click', () => new ManageProfilesSettings().render(true));

		return manageProfilesButton;
	}
}

function modifyModuleListElements()
{
	const modules = document.getElementById('module-management').querySelectorAll('li');

	// Add status icons and add an "update" event listener to each module in the list
	modules.forEach(module =>
	{
		let icon = createModuleStatusIcon();
		module.children[0].prepend(icon);
		module.addEventListener('change', () => updateProfileStatus(icon));
	});

	function createModuleStatusIcon()
	{
		const span = document.createElement('span');
		span.classList.add('module-profiles-status-container');
		span.innerHTML = '<span class="module-profiles-status module-profiles-status-saved"></span>';
		return span;
	}

	function updateProfileStatus(container)
	{
		// TODO - calculate status. Also, bug with modules that require dependencies
		const status = container.firstChild;

		if (status.classList.contains('module-profiles-status-saved'))
		{
			status.classList.remove('module-profiles-status-saved');
			status.classList.add('module-profiles-status-changed');
		} else
		{
			status.classList.remove('module-profiles-status-changed');
			status.classList.add('module-profiles-status-saved');
		}

		updateStatusButtons();
	}
}

function updateStatusButtons()
{
	// TODO - clean up
	const saved = Settings.retrieveActiveProfile();
	const isUpToDate = isActiveProfileUpToDate();

	// TODO - find current profile name
	const profileName = saved.name;

	const profileButtons = document.getElementsByClassName('module-profiles-status-button');
	Array.from(profileButtons).forEach(button =>
	{
		if (isUpToDate)
		{
			button.style.backgroundColor = '';
			button.innerHTML = `<i class="fa fa-check-circle" style="color: mediumseagreen"></i><b>${profileName}</b> is up to date`;
		} else
		{
			button.style.backgroundColor = 'orangered';
			button.innerHTML = `<i class="far fa-save"></i> Save changes to <b>${profileName}</b>`;
			button.addEventListener('click', (event) =>
			{
				// TODO - pop open save window with two buttons
				//	- save as current profile
				//	- save as new profile
			});
		}

		button.disabled = isUpToDate;
	});
}

function isActiveProfileUpToDate()
{
	const saved = Settings.retrieveActiveProfile();
	const unsaved = findUnsavedModuleStatuses();

	return Object.entries(unsaved).every(([moduleId, unsavedStatus]) => saved.modules[moduleId] === unsavedStatus);
}

function findUnsavedModuleStatuses()
{
	const activeModulesIds = Array.from($('#module-list input:checked')).map(module => module.attributes.name.value);
	const inactiveModuleIds = Array.from($('#module-list input:not(:checked)')).map(module => module.attributes.name.value);

	const moduleList = {};
	activeModulesIds.forEach(moduleId => moduleList[moduleId] = true);
	inactiveModuleIds.forEach(moduleId => moduleList[moduleId] = false);

	return moduleList;
}
