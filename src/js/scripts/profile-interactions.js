import * as ModuleManagementScripts from './ui/module-management-scripts.js';
import * as Settings from './settings.js';
import ConfirmActivateProfileForm from '../classes/ConfirmActivateProfileForm.js';

/**
 * Activates the module profile with the given name.
 * @param {string} profileName - The name of the module profile to activate.
 * @param {boolean} shouldForce - When true, will activate the profile without checking if the user will lose any unsaved work.
 * @returns {Application} - The confirmation Application when the user has work that may be overridden.
 */
export function activateProfile(profileName, shouldForce)
{
	if (!profileName)
	{
		const errorMessage = 'Unable to activate profile. Profile name undefined.';
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	// TODO - should pass current active profile name to `unsavedChangesExistOn`, not the profile name to activate
	if (!shouldForce && ModuleManagementScripts.isModuleManagementWindowOpen() && ModuleManagementScripts.unsavedChangesExistOn(profileName))
	{
		return new ConfirmActivateProfileForm(profileName).render(true);
	} else
	{
		Settings.activateProfile(profileName);
	}
}

// TODO - everything below this, make sure you know what their method signature is going to be before you continue with frontend stuff

// TODO - copy module profile, with '(Copy) at the end
export function copyProfile(someTypeOfObjectMaybe) {
	return null;
}

// TODO - export functionality (or just remove it)
export function exportProfile(someTypeOfObjectMaybe) {
	return null;
}