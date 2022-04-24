import * as Settings from '../scripts/settings';

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
			template: 'modules/module-profiles/templates/confirm-delete-profile.hbs',
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

	async _updateObject(event: any): Promise<ModuleProfile[] | undefined>
	{
		if (event?.submitter?.id === 'moduleProfilesDeleteProfileSubmit')
		{
			return await Settings.deleteProfile(this.profileNameToDelete);
		}
	}
}