import * as Settings from './settings.js';

export function registerApi()
{
	const api = {
		retrieveActiveProfileId: Settings.retrieveActiveProfileId,
		retrieveSavedActiveProfile: Settings.retrieveActiveProfile,
		retrieveAllProfiles: Settings.retrieveAllProfiles,
		retrieveProfile: Settings.retrieveProfile,
		updateProfile: Settings.updateProfile,
		retrieveCurrentModuleConfiguration: Settings.retrieveCurrentModuleConfiguration,
		updateActiveProfileId: Settings.updateActiveProfileId,
		resetProfiles: Settings.resetProfiles
	};

	window.ModuleProfiles = {
		api: api
	};
}