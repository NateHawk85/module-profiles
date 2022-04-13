import * as Settings from '../scripts/settings.js';

// TODO - this whole class is a test
export default class EditModuleProfileForm extends FormApplication
{
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

	// TODO - test
	getData(options = {})
	{
		const activeProfile = Settings.getActiveProfile();
		return {
			name: activeProfile.name,
			modules: Object.entries(activeProfile.modules)
						   .map(keyValuePair => ({moduleName: keyValuePair[0], isActive: keyValuePair[1]}))
						   .sort((a, b) => a.moduleName.localeCompare(b.moduleName))
		}
	}

	// TODO - test
	async _updateObject(event, formData)
	{
		console.log('event | formData')
		console.log(event);
		console.log(formData);
	}
}