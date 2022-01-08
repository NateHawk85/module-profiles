import * as Settings from './settings.js';

// TODO - not sure if I'll keep this in the final build or not, but useful for debugging purposes
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