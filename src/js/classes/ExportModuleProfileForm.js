import * as Settings from '../scripts/settings.js';

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

	// TODO - button onclick for export? copied shamelessly from compendium folders
	//  event.stopPropagation();
	//             let exportText = document.querySelector('#import-export textarea[name=\'exportData\']');
	//             exportText.select();
	//             exportText.setSelectionRange(0, 99999); /*For mobile devices*/
	//             document.execCommand("copy");
	//             ui.notifications.info(game.i18n.localize('CF.clipboardNotification'));

	// TODO - clean up import/export form?

	async _updateObject(event, formData) {}
}