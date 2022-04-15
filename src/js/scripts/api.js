import * as Settings from './settings.js';
import * as SettingsUtils from './settings-utils.js';
import * as ProfileInteractions from './profile-interactions.js';

// TODO - make better
export function registerApi()
{
	const api = {
		getActiveProfile: Settings.getActiveProfile,
		getAllProfiles: Settings.getAllProfiles,
		getProfileByName: Settings.getProfileByName,
		saveChangesToProfile: Settings.saveChangesToProfile,
		getCurrentModuleConfiguration: Settings.getCurrentModuleConfiguration,
		resetProfiles: Settings.resetProfiles,
		deleteProfile: Settings.deleteProfile,
		createProfile: Settings.createProfile,
		activateProfile: ProfileInteractions.activateProfile
	};

	SettingsUtils.registerAPI(api);
}