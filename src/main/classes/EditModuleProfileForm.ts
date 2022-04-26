import * as Settings from '../scripts/settings';
import * as MappingUtils from '../scripts/mapping-utils';
import {TEMPLATES_PATH} from '../scripts/settings-utils';

/**
 * A FormApplication that allows a user to edit a module profile.
 */
export default class EditModuleProfileForm extends FormApplication
{
	private readonly profileName;

	constructor(profileName: string, object = {}, options = {})
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
			id: 'module-profiles-edit-module-profile',
			resizable: true,
			template: `${TEMPLATES_PATH}/edit-module-profile.hbs`,
			title: 'Edit Module Profile',
			width: 450
		};
	}


	getData(): any
	{
		// TODO - bug, need to pull in new modules that haven't been saved yet or else you can't edit them
		const profile = Settings.getProfileByName(this.profileName);

		if (!profile)
		{
			const errorMessage = `Unable to load profile "${this.profileName}". Please close the window and try again.`;
			ui.notifications.error(errorMessage);
			throw new Error(errorMessage);
		}

		return profile;
	}

	// TODO - can probably update this to receive better data than just a Record, since a ModuleProfile is passed to the frontend
	async _updateObject(event: any, formData: Record<string, boolean>): Promise<ModuleProfile[] | undefined>
	{
		if (event?.submitter?.id === 'moduleProfilesEditProfileSubmit')
		{
			return await Settings.saveChangesToProfile(this.profileName, MappingUtils.mapToModuleInfos(formData));
		}
	}
}