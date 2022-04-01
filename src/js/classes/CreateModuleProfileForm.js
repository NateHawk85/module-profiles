import * as Settings from '../scripts/settings.js';

export default class CreateModuleProfileForm extends FormApplication
{
	static get defaultOptions()
	{
		const parent = super.defaultOptions;
		const parentClasses = parent?.classes ?? [];

		return {
			...parent,
			classes: [...parentClasses, 'module-profiles-form'],
			id: 'module-profiles-create-module-profile',
			template: 'modules/module-profiles/templates/create-module-profile.hbs',
			title: 'Create New Module Profile',
			width: 660
		};
	}

	activateListeners(html)
	{
		if (html)
		{
			super.activateListeners(html);
		}

		document.getElementById('moduleProfilesCreateNewProfileName').focus();
	}

	async _updateObject(event, formData)
	{
		if (event?.submitter?.id !== 'moduleProfilesCreateNewProfileSubmit')
		{
			return null;
		}

		return await Settings.createProfile(formData.moduleProfilesCreateNewProfileName, Settings.getCurrentModuleConfiguration());
	}
}