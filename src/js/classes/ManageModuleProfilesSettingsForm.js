import * as Settings from '../scripts/settings.js';
import * as ProfileInteractions from '../scripts/profile-interactions.js';
import CreateModuleProfileForm from './CreateModuleProfileForm.js';
import ConfirmDeleteProfileForm from './ConfirmDeleteProfileForm.js';
import ExportModuleProfileForm from './ExportModuleProfileForm.js';
import EditModuleProfileForm from './EditModuleProfileForm.js';

export const RENDER_HOOK_NAME = 'renderManageModuleProfilesSettingsForm';
export const MODULE_PROFILES_UPDATED_HOOK_NAME = 'moduleProfilesUpdated';

export default class ManageModuleProfilesSettingsForm extends FormApplication
{
	static FORM_ID = 'module-profiles-manage-profiles';

	static get defaultOptions()
	{
		const parent = super.defaultOptions;
		const parentClasses = parent?.classes ?? [];

		return {
			...parent,
			classes: [...parentClasses, 'module-profiles-form'],
			id: this.FORM_ID,
			template: 'modules/module-profiles/templates/manage-profiles.hbs',
			title: 'Manage Module Profiles',
			width: 660
		};
	}

	getData(options = {})
	{
		const allProfiles = Settings.getAllProfiles();
		const activeProfileName = Settings.getActiveProfile().name;

		const profilesWithActiveFlag = allProfiles.map(profile => ({
			...profile,
			isActive: activeProfileName === profile.name
		}));

		return {
			profiles: profilesWithActiveFlag
		};
	}

	activateListeners(html)
	{
		if (html)
		{
			super.activateListeners(html);
		}

		const createNewProfileElement = document.getElementById('module-profiles-manage-profiles-create-new');
		createNewProfileElement?.addEventListener('click', () => new CreateModuleProfileForm().render(true));

		const activateProfileElements = document.getElementsByClassName('module-profiles-activate-profile');
		Array.from(activateProfileElements).forEach(element => element.addEventListener('click', () =>
			ProfileInteractions.activateProfile(element.dataset.profileName)));

		const editProfileElements = document.getElementsByClassName('module-profiles-edit-profile');
		Array.from(editProfileElements).forEach(element => element.addEventListener('click', () =>
			new EditModuleProfileForm(element.dataset.profileName).render(true)));

		const duplicateProfileElements = document.getElementsByClassName('module-profiles-duplicate-profile');
		Array.from(duplicateProfileElements).forEach(element => element.addEventListener('click', () =>
		{
			const profile = Settings.getProfileByName(element.dataset.profileName);
			return Settings.createProfile(profile.name + ' (Copy)', profile.modules);
		}));

		const exportProfileElements = document.getElementsByClassName('module-profiles-export-profile');
		Array.from(exportProfileElements).forEach(element => element.addEventListener('click', () =>
			new ExportModuleProfileForm(element.dataset.profileName).render(true)));

		const deleteProfileElements = document.getElementsByClassName('module-profiles-delete-profile');
		Array.from(deleteProfileElements).forEach(element => element.addEventListener('click', () =>
			new ConfirmDeleteProfileForm(element.dataset.profileName).render(true)));

		// TODO - add import profiles + export profiles functionality? Or just hide and publish, then worry about qol
	}

	async _updateObject(event, formData) {}
}

/**
 * Re-renders the ManageModuleProfiles windows. This can be useful because profiles can be added/removed while the window is open, and re-rendering the
 * Application instance refreshes that data.
 * @return {void}
 */
export function reRenderManageModuleProfilesWindows()
{
	Object.values(ui.windows)
		  .filter(app => app.options.id === ManageModuleProfilesSettingsForm.FORM_ID)
		  .forEach(app => app.render());
}

// TODO - can be moved to somewhere more appropriate if shared
/**
 * Forces the application to refresh the size of its first element (aka, the window content). This is primarily to be used whenever an Application adds or
 * removes elements so that the height of the Application is consistent with what is added.
 * @param {Application} app - The Application that needs to be resized.
 * @return {void}
 */
export function forceManageModuleProfilesHeightResize(app)
{
	if (app?.element?.length > 0)
	{
		app.element[0].style.height = 'auto';
	}
}