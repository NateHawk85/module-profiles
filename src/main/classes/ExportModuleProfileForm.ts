import * as Settings from '../scripts/settings';

// TODO - can reuse eventually, but not needed right now
export default class ExportModuleProfileForm extends FormApplication
{
	private readonly profileName;

	constructor(profileName: string, object={}, options={})
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

	getData(): any
	{
		const profileAsJson = Settings.exportProfileByName(this.profileName);
		return {
			name: this.profileName,
			data: profileAsJson
		};
	}

	// TODO - clean up import/export form?
	async _updateObject() {}
}