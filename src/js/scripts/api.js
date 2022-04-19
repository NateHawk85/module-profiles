import * as Settings from './settings.js';
import * as SettingsUtils from './settings-utils.js';
import * as ProfileInteractions from './profile-interactions.js';

export function registerApi()
{
	const api = {
		getCurrentModuleConfiguration: Settings.getCurrentModuleConfiguration,
		getAllProfiles: Settings.getAllProfiles,
		getActiveProfile: Settings.getActiveProfile,
		getProfileByName: Settings.getProfileByName,
		saveChangesToProfile: Settings.saveChangesToProfile,
		activateProfile: ProfileInteractions.activateProfile,
		createProfile: Settings.createProfile,
		deleteProfile: Settings.deleteProfile,
		resetProfiles: Settings.resetProfiles
	};

	SettingsUtils.registerAPI(api);
}