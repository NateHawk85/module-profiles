import {Settings} from './Settings.js';

export class CreateModuleProfile extends FormApplication
{
	settings = new Settings();

	static get defaultOptions()
	{
		// TODO - go back to json-style objects
		const options = super.defaultOptions ?? {};
		options.classes ??= [];
		options.classes.push('module-profiles-form');
		options.title = 'Create Module Profile';
		options.id = 'create-new-profile';
		options.template = 'modules/module-profiles/templates/create-profile.hbs';
		options.resizable = true;

		return options;
	}

	// TODO - test
	getData(options = {})
	{
		// TODO - don't need?
		const currentModuleConfiguration = this.settings.getCurrentModuleConfiguration();
		const modulesAsArray = Object.entries(currentModuleConfiguration);

		return {
			modules: modulesAsArray.map(keyValuePair =>
			{
				return {
					moduleName: keyValuePair[0],
					isActive: keyValuePair[1]
				};
			})
		}


	}

	// TODO - onclick logic?
	activateListeners(html)
	{
		super.activateListeners(html);
		html.find('#moduleProfilesCreateNewSubmit')[0].addEventListener('click', () =>
		{
			const profileName = document.getElementById('moduleProfilesCreateName').value;
			this.settings.saveProfile(profileName, this.settings.getCurrentModuleConfiguration());
		});
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