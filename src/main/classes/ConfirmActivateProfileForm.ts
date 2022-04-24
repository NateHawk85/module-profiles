import * as Settings from '../scripts/settings';
import * as ProfileInteractions from '../scripts/profile-interactions';

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
			template: 'modules/module-profiles/templates/confirm-activate-profile.hbs',
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