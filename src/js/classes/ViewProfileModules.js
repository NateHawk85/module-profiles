import * as Settings from '../scripts/settings.js';

// TODO - this whole class is a test
export class ViewProfileModules extends FormApplication
{
	static get defaultOptions()
	{
		// TODO - go back to json-style objects
		const options = super.defaultOptions ?? {};
		options.classes ??= [];
		options.classes.push('module-profiles-form');
		options.title = 'View Profile Modules';
		options.id = 'create-new-profile';
		options.template = 'modules/module-profiles/templates/view-profile-modules.hbs';
		options.resizable = true;

		return options;
	}

	// TODO - test
	getData(options = {})
	{
		const activeProfile = Settings.getActiveProfile();
		return {
			name: activeProfile.name,
			modules: Object.entries(activeProfile.modules).map(keyValuePair => ({moduleName: keyValuePair[0], isActive: keyValuePair[1]}))
		}
	}


	// SettingsUtils.getSetting('someTestKey');
	// return {
	// 	things: [
	// 		{
	// 			label: 'one',
	// 			title: 'not one',
	// 			content: 'some content here'
	// 		},
	// 		{
	// 			label: 'two',
	// 			title: 'not two',
	// 			content: 'some content here'
	// 		}
	// 	]
	// }

	// TODO - test
	async _updateObject(event, formData)
	{
		console.log('event | formData')
		console.log(event);
		console.log(formData);
	}
}