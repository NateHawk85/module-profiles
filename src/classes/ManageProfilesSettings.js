export class ManageProfilesSettings extends FormApplication
{
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
		// SettingsUtils.getSetting('someTestKey');
		return {
			things: [
				{
					label: 'one',
					title: 'not one',
					content: 'some content here'
				},
				{
					label: 'two',
					title: 'not two',
					content: 'some content here'
				}
			]
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