import * as Settings from '../scripts/settings';

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
			template: 'modules/module-profiles/templates/edit-module-profile.hbs',
			title: 'Edit Module Profile',
			width: 450
		};
	}

	getData(): any
	{
		// TODO - bug, need to pull in new modules that haven't been saved yet or else you can't edit them
		// TODO - can remove sorting when getting/setting is alphabetized in settings
		const profile = Settings.getProfileByName(this.profileName);

		if (!profile)
		{
			const errorMessage = `Unable to load profile "${this.profileName}". Please close the window and try again.`;
			ui.notifications.error(errorMessage);
			throw new Error(errorMessage);
		}

		return profile;
	}

	async _updateObject(event: any, formData: Record<string, boolean>)
	{
		// TODO - map formData to ModuleInfo[]
		if (event?.submitter?.id === 'moduleProfilesEditProfileSubmit')
		{
			//@ts-ignore - TODO - this is actually an issue though
			await Settings.saveChangesToProfile(this.profileName, formData);
		}
	}
}