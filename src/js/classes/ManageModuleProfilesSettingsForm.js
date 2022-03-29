import * as Settings from '../scripts/settings.js';
import * as ProfileInteractions from '../scripts/profile-interactions.js';
import CreateModuleProfileForm from './CreateModuleProfileForm.js';

export default class ManageModuleProfilesSettingsForm extends FormApplication
{
	static get defaultOptions()
	{
		const parent = super.defaultOptions;
		const parentClasses = parent?.classes ?? [];

		return {
			...parent,
			classes: [...parentClasses, 'module-profiles-form'],
			id: 'module-profiles-manage-profiles',
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

		const elements = document.getElementsByClassName('module-profiles-activate-profile');
		Array.from(elements).forEach(element => element.addEventListener('click', () =>
		{
			ProfileInteractions.activateProfile(element.dataset.profileName);
		}));

		const createNew = document.getElementById('module-profiles-manage-profiles-create-new');
		createNew.addEventListener('click', () => new CreateModuleProfileForm().render(true));

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

	// TODO - do you need to do anything with this?
	async _updateObject(event, formData)
	{
		console.log('event | formData');
		console.log(event);
		console.log(formData);
	}
}