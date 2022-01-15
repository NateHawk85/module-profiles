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
 * @returns {any} - The currently-active module configuration.
 */
export function getCurrentModuleConfiguration()
{
	return game.settings.get('core', 'moduleConfiguration');
}

/**
 * Gets the saved, currently-active module profile from the game settings.
 * @returns {*} - The currently-active module profile.
 */
export function getActiveProfile()
{
	const activeProfileName = SettingsUtils.getSetting(SettingKey.ACTIVE_PROFILE_NAME);
	const profiles = SettingsUtils.getSetting(SettingKey.PROFILES);

	return profiles.find(profile => profile.name === activeProfileName);
}

/**
 * Gets a saved profile from the game settings with the corresponding name.
 * @param profileName {String} - The name of the profile to return.
 * @returns {*}
 */
export function getProfileByName(profileName)
{
	const profiles = getAllProfiles();

	return profiles.find(profile => profile.name === profileName);
}

/**
 * Gets the array of all saved profiles from the game settings.
 * @returns {Array<*>} - An array of the saved module profiles.
 */
export function getAllProfiles()
{
	return SettingsUtils.getSetting(SettingKey.PROFILES);
}

/**
 * Sets the active profile name within the game settings.
 * @param profileName {String} - The name of the profile to get.
 * @returns {Promise<*>}
 */
export function setActiveProfileName(profileName)
{
	return SettingsUtils.setSetting(SettingKey.ACTIVE_PROFILE_NAME, profileName);
}

/**
 * Saves the given profile in the game settings.
 * @param profileName {String} - The name of the profile to save.
 * @param modules {Map<String, boolean>} - A map of modules, representing the modules and whether or not they're active.
 * @throws Error - When a profile exists with the given profileName
 */
export function saveProfile(profileName, modules)
{
	const profiles = getAllProfiles();

	if (profiles.some(profile => profile.name === profileName))
	{
		throw new Error(`Profile "${profileName}" already exists!`);
	}

	profiles.push({name: profileName, modules: modules});
	// TODO - return
	return SettingsUtils.setSetting(SettingKey.PROFILES, profiles);
}

// TODO
//	- expect data in this format
//	{
//		name: String
//		modules: Object (module <String, boolean> map)
//	}
/**
 * Saves the current profile settings to an existing profile.
 * @param profileName {String} - The name of the profile to update.
 * @param modules {Map<String, boolean>} - A map of modules, representing the modules and whether or not they're active.
 * @throws Error - When a profile name is passed and none exists.
 */
export function updateProfile(profileName, modules)
{
	const savedProfiles = SettingsUtils.getSetting(SettingKey.PROFILES);
	const matchingProfileIndex = savedProfiles.findIndex(profile => profile.name === profileName);

	if (!savedProfiles[matchingProfileIndex])
	{
		throw new Error(`Profile "${profileName}" does not exist!`);
	}

	savedProfiles[matchingProfileIndex] = {name: profileName, modules: modules};

	return SettingsUtils.setSetting(SettingKey.PROFILES, savedProfiles);
}

function buildDefaultProfile()
{
	const savedModuleConfiguration = getCurrentModuleConfiguration();

	return {
		name: DEFAULT_PROFILE_NAME,
		modules: savedModuleConfiguration
	};
}

// TODO
export function resetProfiles()
{
	setActiveProfileName(DEFAULT_PROFILE_NAME).then(() =>
	{
		return SettingsUtils.setSetting(SettingKey.PROFILES, undefined);
	});
}