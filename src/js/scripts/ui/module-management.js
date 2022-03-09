import {Settings} from '../../classes/Settings.js';
import {ManageProfilesSettings} from '../../classes/ManageProfilesSettings.js';
import {CreateModuleProfile} from '../../classes/CreateModuleProfile.js';

// TODO - turn into a class?

const settings = new Settings();

// TODO - test all
export function modifyModuleManagementRender(app, html, data)
{
	console.log('modifying stuff');
	if (game.user?.isGM)
	{
		addFooterElements();
		modifyModuleListElements();
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
		statusButton.classList.add('module-profiles-status-button');
		statusButton.style.flexBasis = '130%';

		return statusButton;
	}

	function buildCreateModuleProfileButton()
	{
		const createModuleProfileButton = document.createElement('button');
		createModuleProfileButton.innerHTML = '<i class="fa fa-plus"></i> Create Module Profile</button>';
		createModuleProfileButton.style.flexBasis = '80%';
		createModuleProfileButton.addEventListener('click', () => new CreateModuleProfile().render(true));

		return createModuleProfileButton;
	}

	function buildManageProfilesButton()
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
	const activeProfile = settings.getActiveProfile();
	const modules = document.getElementById('module-management').querySelectorAll('li'); // TODO - make sure you're picking up the right modules

	// Add status icons and add an "update" event listener to each module in the list
	modules.forEach(module =>
	{
		let statusIconContainer = createModuleStatusIcon();
		if (module.children.length > 0)
		{
			module.children[0].prepend(statusIconContainer);
			module.addEventListener('input', () => updateProfileStatus(activeProfile, modules));
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

	function updateProfileStatus(profile, modules)
	{
		modules.forEach(module =>
		{
			if (module.children[0] && module.children[0].children[1] && module.children[0].children[1].children[0]) // TODO - appropriately handle this
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
}

function updateStatusButtons()
{
	// TODO - clean up
	const activeProfile = settings.getActiveProfile();
	const isUpToDate = isProfileUpToDate(activeProfile);

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
				const result = settings.updateProfile(activeProfile.name, findUnsavedModuleStatuses());
				result.then(() =>
				{
					updateStatusButtons();
				});
			});
		}

		button.disabled = isUpToDate;
	});
}

function isProfileUpToDate(profile)
{
	const unsavedProfile = findUnsavedModuleStatuses();

	return Object.entries(unsavedProfile).every(([moduleId, unsavedStatus]) => profile.modules[moduleId] === unsavedStatus);
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

// TODO - uhhhhh
export function test()
{
	const activeProfile = settings.getActiveProfile();
	document.getElementById('module-management').querySelectorAll('li').forEach(module =>
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
	});

	// updateStatusButtons();

	const isUpToDate = isProfileUpToDate(activeProfile);

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
				const result = settings.updateProfile(activeProfile.name, findUnsavedModuleStatuses());
				result.then(() =>
				{
					updateStatusButtons();
				});
			});
		}

		button.disabled = isUpToDate;
	});
}
//
// Hooks.on('closeDialog', (app, html) =>
// {
// 	if (app.options.template === 'templates/hud/dialog.html')
// 	{
// 		test();
// 	}
// });

