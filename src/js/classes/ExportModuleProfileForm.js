import * as Settings from '../scripts/settings.js';

// TODO - can reuse eventually, but not needed right now
export default class ExportModuleProfileForm extends FormApplication
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
			id: 'module-profiles-export-module-profile',
			template: 'modules/module-profiles/templates/export-module-profile.hbs',
			title: 'Export Module Profile',
			height: 500,
			width: 660
		};
	}

	getData(options = {})
	{
		const profile = Settings.getProfileByName(this.profileName);
		return {
			name: this.profileName,
			data: JSON.stringify(profile, null, 2)
		};
	}

	// TODO - clean up import/export form?

	async _updateObject(event, formData) {}
}