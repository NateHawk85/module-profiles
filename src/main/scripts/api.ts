import * as Settings from './settings';
import * as SettingsUtils from './settings-utils';

/**
 * Registers the module's API. This is only meant to be called on initial game load.
 */
export function registerApi()
{
	const api = {
		getCurrentModuleConfiguration: Settings.getCurrentModuleConfiguration,
		getAllProfiles: Settings.getAllProfiles,
		getActiveProfile: Settings.getActiveProfile,
		getProfileByName: Settings.getProfileByName,
		exportAllProfiles: Settings.exportAllProfiles,
		exportProfileByName: Settings.exportProfileByName,
		createProfile: Settings.createProfile,
		importProfiles: Settings.importProfiles,
		activateProfile: Settings.activateProfile,
		saveChangesToProfile: Settings.saveChangesToProfile,
		deleteProfile: Settings.deleteProfile,
		resetProfiles: Settings.resetProfiles
	};

	SettingsUtils.registerAPI(api);
}