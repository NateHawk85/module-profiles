import * as Settings from './settings.js';

// TODO - not sure if I'll keep this in the final build or not, but useful for debugging purposes
export function registerApi()
{
	const api = {
		retrieveActiveProfile: Settings.retrieveActiveProfile,
		retrieveAllProfiles: Settings.retrieveAllProfiles,
		retrieveProfile: Settings.retrieveProfile,
		updateProfile: Settings.updateProfile,
		retrieveCurrentModuleConfiguration: Settings.retrieveCurrentModuleConfiguration,
		updateActiveProfileId: Settings.updateActiveProfileName,
		resetProfiles: Settings.resetProfiles
	};

	window.ModuleProfiles = {
		api: api
	};
}