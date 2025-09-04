import * as Settings from '../scripts/settings';
import { TEMPLATES_PATH } from '../scripts/settings-utils';

type FormData = {
	moduleProfilesCreateNewProfileName: string;
	moduleProfilesCreateNewProfileDescription: string;
}

/**
 * A FormApplication that allows a user to create a new module profile.
 */
export default class CreateModuleProfileForm extends FormApplication
{
	constructor(object = {}, options = {})
	{
		super(object, options);
	}

	static get defaultOptions(): FormApplicationOptions
	{
		const parent = super.defaultOptions;
		const parentClasses = parent?.classes ?? [];

		return {
			...parent,
			classes: [...parentClasses, 'module-profiles-form'],
			id: 'module-profiles-create-module-profile',
			template: `${TEMPLATES_PATH}/create-module-profile.hbs`,
			title: 'Create New Module Profile',
			width: 660,
		};
	}

	activateListeners(html?: JQuery): void
	{
		if (html)
		{
			super.activateListeners(html);
		}

		document.getElementById('moduleProfilesCreateNewProfileName')!.focus();
	}

	async _updateObject(event: any, formData: FormData): Promise<ModuleProfile[] | undefined>
	{
		if (event?.submitter?.id === 'moduleProfilesCreateNewProfileSubmit')
		{
			return await Settings.createProfile({
				name: formData.moduleProfilesCreateNewProfileName,
				description: formData.moduleProfilesCreateNewProfileDescription,
				modules: Settings.getCurrentModuleConfiguration(),
			});
		}
	}
}
