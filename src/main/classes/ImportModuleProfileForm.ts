import * as Settings from '../scripts/settings';
import {TEMPLATES_PATH} from '../scripts/settings-utils';
import {ModuleProfile} from '../types';

export default class ImportModuleProfileForm extends FormApplication
{
	constructor(object = {}, options = {})
	{
		super(object, options);
	}

	static get defaultOptions()
	{
		const parent = super.defaultOptions;
		const parentClasses = parent?.classes ?? [];

		return {
			...parent,
			classes: [...parentClasses, 'module-profiles-form'],
			id: 'module-profiles-import-module-profile',
			template: `${TEMPLATES_PATH}/import-module-profile.hbs`,
			title: 'Import Module Profile(s)',
			height: 800,
			width: 660
		};
	}

	async _updateObject(event: any, formData: Record<string, string>): Promise<ModuleProfile[] | undefined>
	{
		if (event?.submitter?.id === 'moduleProfilesImportProfileSubmit')
		{
			return Settings.importProfiles(formData['import-module-profile-text']);
		}
	}
}