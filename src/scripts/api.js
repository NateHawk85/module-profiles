import * as Settings from './settings.js';

// TODO - not sure if I'll keep this in the final build or not, but useful for debugging purposes
export function registerApi()
{
	const api = {
		getActiveProfile: Settings.getActiveProfile,
		getAllProfiles: Settings.getAllProfiles,
		getProfileByName: Settings.getProfileByName,
		updateProfile: Settings.updateProfile,
		getCurrentModuleConfiguration: Settings.getCurrentModuleConfiguration,
		setActiveProfileName: Settings.setActiveProfileName,
		resetProfiles: Settings.resetProfiles
	};

	window.ModuleProfiles = {
		api: api
	};
}