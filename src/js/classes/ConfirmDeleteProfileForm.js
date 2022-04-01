import * as Settings from '../scripts/settings.js';

export default class ConfirmDeleteProfileForm extends FormApplication
{
	constructor(profileNameToDelete, object={}, options={})
	{
		super(object, options);

		this.profileNameToDelete = profileNameToDelete;
	}

	static get defaultOptions()
	{
		const parent = super.defaultOptions;
		const parentClasses = parent?.classes ?? [];

		return {
			...parent,
			classes: [...parentClasses, 'module-profiles-form'],
			id: 'module-profiles-confirm-delete-profile',
			template: 'modules/module-profiles/templates/confirm-delete-profile.hbs',
			title: 'Confirm Delete Profile',
			width: 660
		};
	}

	getData(options = {})
	{
		return {
			profileNameToDelete: this.profileNameToDelete
		}
	}

	async _updateObject(event, formData)
	{
		if (event?.submitter?.id !== 'moduleProfilesDeleteProfileSubmit')
		{
			return null;
		}

		return await Settings.deleteProfile(this.profileNameToDelete);
	}
}