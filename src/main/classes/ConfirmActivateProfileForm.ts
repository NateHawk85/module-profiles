import * as Settings from '../scripts/settings';
import * as ProfileInteractions from '../scripts/profile-interactions';
import {TEMPLATES_PATH} from '../scripts/settings-utils';

/**
 * A FormApplication to be rendered when you want a user's confirmation that yes, in fact, they *do* want to activate said profile.
 */
export default class ConfirmActivateProfileForm extends FormApplication
{
	private readonly profileNameToActivate;

	constructor(profileNameToActivate: string, object = {}, options = {})
	{
		super(object, options);

		this.profileNameToActivate = profileNameToActivate;
	}

	static get defaultOptions(): FormApplicationOptions
	{
		const parent = super.defaultOptions;
		const parentClasses = parent?.classes ?? [];

		return {
			...parent,
			classes: [...parentClasses, 'module-profiles-form'],
			id: 'module-profiles-confirm-activate-profile',
			template: `${TEMPLATES_PATH}/confirm-activate-profile.hbs`,
			title: 'Confirm Activate Profile',
			width: 660
		};
	}

	getData(): any
	{
		return {
			profileNameToActivate: this.profileNameToActivate,
			activeProfileName: Settings.getActiveProfile().name
		};
	}

	async _updateObject(event: any): Promise<void>
	{
		if (event?.submitter?.id === 'moduleProfilesActivateProfileSubmit')
		{
			ProfileInteractions.activateProfile(this.profileNameToActivate, true);
		}
	}
}