import * as Settings from '../scripts/settings';
import {TEMPLATES_PATH} from '../scripts/settings-utils';


/**
 * A FormApplication to be rendered when you want a user's confirmation that yes, in fact, they *do* want to delete said profile.
 */
export default class ConfirmDeleteProfileForm extends FormApplication
{
	private readonly profileNameToDelete;

	constructor(profileNameToDelete: string, object = {}, options = {})
	{
		super(object, options);

		this.profileNameToDelete = profileNameToDelete;
	}

	static get defaultOptions(): FormApplicationOptions
	{
		const parent = super.defaultOptions;
		const parentClasses = parent?.classes ?? [];

		return {
			...parent,
			classes: [...parentClasses, 'module-profiles-form'],
			id: 'module-profiles-confirm-delete-profile',
			template: `${TEMPLATES_PATH}/confirm-delete-profile.hbs`,
			title: 'Confirm Delete Profile',
			width: 660
		};
	}

	getData(): any
	{
		return {
			profileNameToDelete: this.profileNameToDelete
		};
	}

	// TODO - bug, name for button on module management does not update when active profile name switches
	async _updateObject(event: any): Promise<ModuleProfile[] | undefined>
	{
		if (event?.submitter?.id === 'moduleProfilesDeleteProfileSubmit')
		{
			return await Settings.deleteProfile(this.profileNameToDelete);
		}
	}
}