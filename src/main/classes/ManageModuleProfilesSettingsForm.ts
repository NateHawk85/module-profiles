import * as Settings from '../scripts/settings';
import * as ProfileInteractions from '../scripts/profile-interactions';
import CreateModuleProfileForm from './CreateModuleProfileForm';
import ConfirmDeleteProfileForm from './ConfirmDeleteProfileForm';
import EditModuleProfileForm from './EditModuleProfileForm';
import {TEMPLATES_PATH} from '../scripts/settings-utils';

export const RENDER_HOOK_NAME = 'renderManageModuleProfilesSettingsForm';
export const MODULE_PROFILES_UPDATED_HOOK_NAME = 'moduleProfilesUpdated';

/**
 * A FormApplication that provides an interface for a user to manage module profiles.
 */
export default class ManageModuleProfilesSettingsForm extends FormApplication
{
	static FORM_ID = 'module-profiles-manage-profiles';

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
			id: this.FORM_ID,
			template: `${TEMPLATES_PATH}/manage-profiles.hbs`,
			title: 'Manage Module Profiles',
			width: 660
		};
	}

	getData(): any
	{
		const activeProfileName = Settings.getActiveProfile().name;

		const profilesWithActiveFlag = Settings.getAllProfiles().map(profile => ({
			...profile,
			isProfileActive: activeProfileName === profile.name
		}));

		return {
			profiles: profilesWithActiveFlag
		};
	}

	activateListeners(html?: JQuery): void
	{
		if (html)
		{
			super.activateListeners(html);
		}

		const createNewProfileElement = document.getElementById('module-profiles-manage-profiles-create-new');
		createNewProfileElement?.addEventListener('click', () => new CreateModuleProfileForm().render(true));

		const activateProfileElements = <HTMLCollectionOf<HTMLAnchorElement>> document.getElementsByClassName('module-profiles-activate-profile');
		Array.from(activateProfileElements).forEach(element => element.addEventListener('click', () =>
			ProfileInteractions.activateProfile(element.dataset.profileName!)));

		const editProfileElements = <HTMLCollectionOf<HTMLAnchorElement>> document.getElementsByClassName('module-profiles-edit-profile');
		Array.from(editProfileElements).forEach(element => element.addEventListener('click', () =>
			new EditModuleProfileForm(element.dataset.profileName!).render(true)));

		const duplicateProfileElements = <HTMLCollectionOf<HTMLAnchorElement>> document.getElementsByClassName('module-profiles-duplicate-profile');
		Array.from(duplicateProfileElements).forEach(element => element.addEventListener('click', () =>
		{
			const profile = Settings.getProfileByName(element.dataset.profileName!);
			if (profile)
			{
				return Settings.createProfile(profile.name + ' (Copy)', profile.modules);
			}
		}));

		const exportProfileElements = <HTMLCollectionOf<HTMLAnchorElement>> document.getElementsByClassName('module-profiles-export-profile');
		Array.from(exportProfileElements).forEach(element => element.addEventListener('click', async () =>
		{
			const profileName = element.dataset.profileName!;
			const exportedProfile = Settings.exportProfileByName(profileName);

			if (exportedProfile)
			{
				await navigator.clipboard.writeText(exportedProfile);
				ui.notifications.info(`Profile "${profileName}" copied to clipboard!`);
			}
		}));

		const deleteProfileElements = <HTMLCollectionOf<HTMLAnchorElement>> document.getElementsByClassName('module-profiles-delete-profile');
		Array.from(deleteProfileElements).forEach((element) => element.addEventListener('click', () =>
			new ConfirmDeleteProfileForm(element.dataset.profileName!).render(true)));

		// TODO - add import profiles + export profiles functionality? Or just hide and publish, then worry about qol
	}

	async _updateObject() {}
}

/**
 * Re-renders the ManageModuleProfiles windows. This can be useful because profiles can be added/removed while the window is open, and re-rendering the
 * Application instance refreshes that data.
 * @returns {void}
 */
export function reRenderManageModuleProfilesWindows(): void
{
	Object.values(ui.windows)
		  .filter(app => app.options.id === ManageModuleProfilesSettingsForm.FORM_ID)
		  .forEach(app => app.render());
}

// TODO - can be moved to somewhere more appropriate if shared
/**
 * Forces the application to refresh the size of its first element (aka, the window content). This is primarily to be used whenever an Application adds or
 * removes elements so that the height of the Application is consistent with what is added.
 * @param {Application} app - The Application that needs to be resized.
 * @returns {void}
 */
export function forceManageModuleProfilesHeightResize(app: Application): void
{
	if (app?.element?.length > 0)
	{
		app.element[0].style.height = 'auto';
	}
}