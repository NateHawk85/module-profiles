import * as ModuleManagementScripts from './ui/module-management-scripts';
import * as Settings from './settings';
import ConfirmActivateProfileForm from '../classes/ConfirmActivateProfileForm';

/**
 * Activates the module profile with the given name. If changes are detected on an open Module Management window and shouldForce is false, a
 * {@link ConfirmActivateProfileForm} will be rendered instead to prevent losing unfinished work.
 * @param {string} profileName - The name of the module profile to activate.
 * @param {boolean} [shouldForce=false] - When true, will activate the profile without checking if the user will lose any unsaved work.
 * @returns {Application} - The confirmation Application when the user has work that may be overridden.
 */
export function activateProfile(profileName: string, shouldForce: boolean = false): ConfirmActivateProfileForm | undefined
{
	if (!profileName)
	{
		const errorMessage = 'Unable to activate profile. Profile name undefined.';
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	const activeProfile = Settings.getActiveProfile();

	if (!shouldForce && ModuleManagementScripts.isModuleManagementWindowOpen() && ModuleManagementScripts.unsavedChangesExistOn(activeProfile.name))
	{
		return <ConfirmActivateProfileForm> new ConfirmActivateProfileForm(profileName).render(true);
	} else
	{
		Settings.activateProfile(profileName);
	}
}