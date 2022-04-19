import * as Settings from '../scripts/settings.js';

export default class EditModuleProfileForm extends FormApplication
{
	constructor(profileName, object={}, options={})
	{
		super(object, options);

		this.profileName = profileName;
	}

	static get defaultOptions()
	{
		const parent = super.defaultOptions;
		const parentClasses = parent?.classes ?? [];

		return {
			...parent,
			classes: [...parentClasses, 'module-profiles-form'],
			id: 'module-profiles-edit-module-profile',
			resizable: true,
			template: 'modules/module-profiles/templates/edit-module-profile.hbs',
			title: 'Edit Module Profile',
			width: 450
		};
	}

	getData(options = {})
	{
		// TODO - bug, need to pull in new modules that haven't been saved yet or else you can't edit them
		// TODO - can remove sorting when getting/setting is alphabetized in settings
		const profile = Settings.getProfileByName(this.profileName);
		return {
			name: profile.name,
			modules: Object.entries(profile.modules)
						   .map(keyValuePair => ({moduleName: keyValuePair[0], isActive: keyValuePair[1]}))
						   .sort((a, b) => a.moduleName.localeCompare(b.moduleName))
		}
	}

	async _updateObject(event, formData)
	{
		if (event?.submitter?.id !== 'moduleProfilesEditProfileSubmit')
		{
			return null;
		}

		await Settings.saveChangesToProfile(this.profileName, formData);
	}
}