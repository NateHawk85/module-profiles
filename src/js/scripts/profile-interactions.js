import * as ModuleManagementScripts from '../scripts/ui/module-management.js';
import * as Settings from './settings.js';
import ConfirmActivateProfileForm from '../classes/ConfirmActivateProfileForm.js';

// TODO - jsdoc
export function activateProfile(profileName, shouldForce)
{
	if (!profileName)
	{
		const errorMessage = 'Unable to activate profile. Profile name undefined.';
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	if (!shouldForce && ModuleManagementScripts.isModuleManagementWindowOpen() && ModuleManagementScripts.unsavedChangesExistOn(profileName))
	{
		return new ConfirmActivateProfileForm(profileName).render(true);
	} else
	{
		return Settings.activateProfile(profileName);
	}
}

// TODO - everything below this, make sure you know what their method signature is going to be before you continue with frontend stuff

// TODO - pop open window to edit name of profile + selected module list
// TODO - check api.editCallback()
export function editProfile(event) {
	return null;
}

// TODO - copy module profile, with '(Copy) at the end
export function copyProfile(event) {
	return null;
}

// TODO - export functionality (or just remove it)
export function exportProfile(event) {
	return null;
}

// TODO - 'are you sure?'
// TODO - check api.deleteCallback({name})
export function deleteProfile(event) {
	return null;
}