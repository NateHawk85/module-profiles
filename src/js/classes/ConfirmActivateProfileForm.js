import * as Settings from '../scripts/settings.js';
import * as ProfileInteractions from '../scripts/profile-interactions.js';

export default class ConfirmActivateProfileForm extends FormApplication
{
	constructor(profileNameToActivate, object={}, options={})
	{
		super(object, options);

		this.profileNameToActivate = profileNameToActivate;
	}

	static get defaultOptions()
	{
		const parent = super.defaultOptions;
		const parentClasses = parent?.classes ?? [];

		return {
			...parent,
			classes: [...parentClasses, 'module-profiles-form'],
			id: 'module-profiles-confirm-activate-profile',
			template: 'modules/module-profiles/templates/confirm-activate-profile.hbs', // TODO - implement or get rid of "don't ask me again" box
			title: 'Confirm Activate Profile',
			width: 660
		};
	}

	getData(options = {})
	{
		return {
			profileNameToActivate: this.profileNameToActivate,
			activeProfileName: Settings.getActiveProfile().name
		}
	}

	async _updateObject(event, formData)
	{
		if (event?.submitter?.id !== 'moduleProfilesActivateProfileSubmit')
		{
			return null;
		}

		ProfileInteractions.activateProfile(this.profileNameToActivate, true);
	}
}