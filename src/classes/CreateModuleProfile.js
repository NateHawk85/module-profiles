import * as Settings from '../scripts/settings.js';

export class CreateModuleProfile extends FormApplication
{
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
		const currentModuleConfiguration = Settings.getCurrentModuleConfiguration();
		const modulesAsArray = Object.entries(currentModuleConfiguration);

		return {
			modules: modulesAsArray.map(keyValuePair =>
			{
				const response = {
					moduleName: keyValuePair[0],
					isActive: keyValuePair[1]
				}

				return response;
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
			Settings.saveProfile(profileName, Settings.getCurrentModuleConfiguration());
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