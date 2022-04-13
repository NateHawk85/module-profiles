import * as Settings from '../scripts/settings.js';
import * as ProfileInteractions from '../scripts/profile-interactions.js';
import CreateModuleProfileForm from './CreateModuleProfileForm.js';
import ConfirmDeleteProfileForm from './ConfirmDeleteProfileForm.js';
import EditModuleProfileForm from './EditModuleProfileForm.js';

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
		return {
			profiles: Settings.getAllProfiles()
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

		const deleteProfileElements = document.getElementsByClassName('module-profiles-delete-profile');
		Array.from(deleteProfileElements).forEach(element => element.addEventListener('click', () =>
			new ConfirmDeleteProfileForm(element.dataset.profileName).render(true)));

		// TODO - add events for edit, copy, export
	}

	async _updateObject(event, formData) {}
}

export function reRenderManageModuleProfilesWindows()
{
	Object.values(ui.windows)
		  .filter(element => element.options.id === ManageModuleProfilesSettingsForm.FORM_ID)
		  .forEach(element => element.render());
}