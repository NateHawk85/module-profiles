import {ManageProfilesSettings} from '../classes/ManageProfilesSettings.js';
import * as SettingsUtils from './settings-utils.js';

const DEFAULT_PROFILE_NAME = 'Default Profile';

export const SettingKey = {
	MANAGE_PROFILES: 'manageProfiles',
	PROFILES: 'profiles',
	ACTIVE_PROFILE_NAME: 'activeProfileName'
};

/**
 * Registers settings for this module. This is only intended to be called upon during initialization.
 */
export function registerSettings()
{
	SettingsUtils.registerMenu(SettingKey.MANAGE_PROFILES, {
		name: undefined,
		label: 'Manage Profiles',
		hint: undefined,
		icon: 'fas fa-cog',
		type: ManageProfilesSettings,
		restricted: false,
	});

	const defaultProfile = buildDefaultProfile();
	SettingsUtils.registerSetting(SettingKey.PROFILES, {
		name: 'Module Profiles Settings',
		hint: 'Settings definitions for the Module Profiles module',
		default: [defaultProfile],
		type: Array,
		scope: 'world'
	});

	SettingsUtils.registerSetting(SettingKey.ACTIVE_PROFILE_NAME, {
		name: 'Active Profile Name',
		default: DEFAULT_PROFILE_NAME,
		type: String,
		scope: 'world'
	});
}

/**
 * Gets the currently active modules from the core game settings.
 * @returns {any}
 */
export function retrieveCurrentModuleConfiguration()
{
	return game.settings.get('core', 'moduleConfiguration');
}

/**
 * Gets the saved, currently-active module profile from the game settings.
 * @returns {any}
 */
export function retrieveActiveProfile()
{
	const activeProfileName = SettingsUtils.getSetting(SettingKey.ACTIVE_PROFILE_NAME);
	const profiles = SettingsUtils.getSetting(SettingKey.PROFILES);

	return profiles.find(profile => profile.name === activeProfileName);
}

// TODO
export function retrieveAllProfiles()
{
	return SettingsUtils.getSetting(SettingKey.PROFILES);
}

// TODO - this needs fixed
export function retrieveProfile(profileName)
{
	return retrieveAllProfiles()[profileName];
}

// TODO
//	- expect data in this format
//	{
//		name: String
//		modules: Object (module list)
//	}
/**
 * Saves the current profile settings.
 * @param {string} profileId
 * @param updatedProfile {any}
 */
export function updateProfile(updatedProfile)
{
	const profileId = convertToCamelCase(updatedProfile.name);

	const allSavedProfiles = SettingsUtils.getSetting(SettingKey.PROFILES);
	const savedProfile = allSavedProfiles[profileId] ?? {};

	allSavedProfiles[profileId] = mergeObject(savedProfile, updatedProfile, {overwrite: true, inplace: false});

	return SettingsUtils.setSetting(SettingKey.PROFILES, allSavedProfiles);
}

// TODO
export function updateActiveProfileName(profileName)
{
	return SettingsUtils.setSetting(SettingKey.ACTIVE_PROFILE_NAME, profileName);
}


// TODO - move somewhere else, or don't export
export function convertToCamelCase(input)
{
	const camelCase = input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

	return camelCase.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\[\]\\\/]/gi, '');
}

function buildDefaultProfile()
{
	const savedModuleConfiguration = retrieveCurrentModuleConfiguration();

	return {
		name: DEFAULT_PROFILE_NAME,
		modules: savedModuleConfiguration
	};
}

// TODO
export function resetProfiles()
{
	updateActiveProfileName([DEFAULT_PROFILE_NAME]).then(() =>
	{
		return SettingsUtils.setSetting(SettingKey.PROFILES, undefined);
	});
}