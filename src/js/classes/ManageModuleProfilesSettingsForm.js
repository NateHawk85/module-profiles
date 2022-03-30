import * as Settings from '../scripts/settings.js';
import * as ProfileInteractions from '../scripts/profile-interactions.js';
import CreateModuleProfileForm from './CreateModuleProfileForm.js';
import ConfirmDeleteProfileForm from './ConfirmDeleteProfileForm.js';

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
		{
			ProfileInteractions.activateProfile(element.dataset.profileName);
		}));

		const deleteProfileElements = document.getElementsByClassName('module-profiles-delete-profile');
		Array.from(deleteProfileElements).forEach(element => element.addEventListener('click', () =>
		{
			new ConfirmDeleteProfileForm(element.dataset.profileName).render(true);
		}));


		addClickEventToElementsWithClass(ProfileInteractions.deleteProfile, 'module-profiles-delete-profile');


		// TODO - pass in profile name instead of an event, make this cleaner
		addClickEventToElementsWithClass(ProfileInteractions.editProfile, 'module-profiles-edit-profile');
		addClickEventToElementsWithClass(ProfileInteractions.copyProfile, 'module-profiles-copy-profile');
		addClickEventToElementsWithClass(ProfileInteractions.exportProfile, 'module-profiles-export-profile');

		function addClickEventToElementsWithClass(callback, className)
		{
			const elements = document.getElementsByClassName(className);
			Array.from(elements).forEach(element => element.addEventListener('click', callback));
		}
	}

	async _updateObject(event, formData) {}
}

export function reRenderManageModuleProfilesWindows()
{
	Object.values(ui.windows)
		  .filter(element => element.options.id === ManageModuleProfilesSettingsForm.FORM_ID)
		  .forEach(element => element.render(true));
}