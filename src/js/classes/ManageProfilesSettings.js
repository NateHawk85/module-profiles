import {Settings} from './Settings.js';

export class ManageProfilesSettings extends FormApplication
{
	settings = new Settings();

	static get defaultOptions()
	{
		// TODO - go back to json-style objects
		const options = super.defaultOptions ?? {};
		options.classes ??= [];
		options.classes.push('module-profiles-form');
		options.title = 'Manage Module Profiles';
		options.id = 'manage-profiles';
		options.template = 'modules/module-profiles/templates/manage-profiles.hbs';
		options.resizable = true;

		return options;
	}

	// TODO - test
	getData(options = {})
	{
		const profiles = this.settings.getAllProfiles();

		return {
			profiles: profiles.map(profile =>
			{
				return {
					name: profile.name,
					modules: profile.modules
				}
			})
		}
	}


	// TODO - implement this for all the options
	activateListeners(html)
	{
		return super.activateListeners(html);
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