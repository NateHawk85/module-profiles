import * as Settings from './settings';
import * as SettingsUtils from './settings-utils';
import * as ProfileInteractions from './profile-interactions';

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