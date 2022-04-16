import * as Settings from './settings.js';
import * as SettingsUtils from './settings-utils.js';
import ManageModuleProfilesSettingsForm from '../classes/ManageModuleProfilesSettingsForm.js';

const DEFAULT_PROFILE_NAME = 'Default Profile';
export const MODULE_PROFILES_UPDATED_HOOK_NAME = 'moduleProfilesUpdated';

export const SettingKey = {
	MANAGE_PROFILES: 'manageProfiles',
	PROFILES: 'profiles',
	ACTIVE_PROFILE_NAME: 'activeProfileName',
	REGISTER_API: 'registerAPI'
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
		type: ManageModuleProfilesSettingsForm,
		restricted: false
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

	// TODO - can probably remove this setting?
	SettingsUtils.registerSetting(SettingKey.REGISTER_API, {
		name: 'Register API',
		hint: 'Make this module\'s API (ModuleProfiles.api.*function()*) available. If you don\'t write code, you probably don\'t need this.',
		scope: 'world',
		config: true,
		type: Boolean,
		default: false
	});

	const profiles = Settings.getAllProfiles();
	if (!profiles || profiles.length === 0)
	{
		Settings.resetProfiles();
	}

	function buildDefaultProfile()
	{
		const savedModuleConfiguration = Settings.getCurrentModuleConfiguration();

		return {
			name: DEFAULT_PROFILE_NAME,
			modules: savedModuleConfiguration
		};
	}
}

/**
 * Gets the currently active modules from the core game settings.
 * @returns {any} - The currently-active module configuration.
 */
export function getCurrentModuleConfiguration()
{
	return game.settings.get('core', 'moduleConfiguration');
}

// TODO - probably don't need to expose, but... whatever. probs test
export async function setCoreModuleConfiguration(modules)
{
	await game.settings.set('core', 'moduleConfiguration', modules);
}

// TODO - update object type Typescript
/**
 * Gets the saved, currently-active module profile from the game settings.
 * @returns {*} - The currently-active module profile.
 */
export function getActiveProfile()
{
	const activeProfileName = SettingsUtils.getSetting(SettingKey.ACTIVE_PROFILE_NAME);

	return Settings.getProfileByName(activeProfileName);
}

// TODO - update object type Typescript
/**
 * Gets a saved profile from the game settings with the corresponding name.
 * @param profileName {string} - The name of the profile to return.
 * @returns {*} - The module profile with the given name, or `undefined` if none exists.
 */
export function getProfileByName(profileName)
{
	const profiles = Settings.getAllProfiles();

	return profiles.find(profile => profile.name === profileName);
}

// TODO - update object type Typescript
/**
 * Gets the array of all saved profiles from the game settings.
 * @returns {Array<*>} - An array of the saved module profiles.
 */
export function getAllProfiles()
{
	return SettingsUtils.getSetting(SettingKey.PROFILES);
}

/**
 * Activates the profile with the given name, then reloads the page.
 * @param {string} profileName - The name of the profile to load.
 * @returns {Promise<void>}
 * @throws {Error} - When profile name does not exist.
 */
export async function activateProfile(profileName)
{
	const profile = Settings.getProfileByName(profileName);

	if (!profile)
	{
		const errorMessage = `Unable to activate module profile. Profile "${profileName}" does not exist!`;
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	return SettingsUtils.setSetting(SettingKey.ACTIVE_PROFILE_NAME, profile.name)
						.then(() => Settings.setCoreModuleConfiguration(profile.modules))
						.then(() => SettingsUtils.reloadWindow());
}

// TODO - update object type Typescript
/**
 * Creates a new profile in the game settings.
 * @param profileName {string} - The name of the profile to create.
 * @param modules {Map<string, boolean>} - A map of modules, representing the modules and whether they're active.
 * @throws Error - When a profile exists with the given profileName
 */
export async function createProfile(profileName, modules)
{
	if (!profileName)
	{
		const postfix = profileName === '' ? 'Profile name must not be empty.' : 'Profile name is undefined.';
		const errorMessage = `Unable to create module profile. ${postfix}`;
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	if (!modules)
	{
		const errorMessage = 'Unable to create module profile. Please refresh the page and try again.';
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	if (Settings.getProfileByName(profileName))
	{
		const errorMessage = `Unable to create module profile. Profile "${profileName}" already exists!`;
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	const profiles = Settings.getAllProfiles();
	profiles.push({ name: profileName, modules: modules });

	const response = SettingsUtils.setSetting(SettingKey.PROFILES, profiles);
	response.then(() => Hooks.callAll(MODULE_PROFILES_UPDATED_HOOK_NAME));

	// TODO - notify ui.notifications

	return response;
}

// TODO - update object type Typescript
/**
 * Saves the current profile settings to an existing profile.
 * @param profileName {string} - The name of the profile to update.
 * @param modules {Map<string, boolean>} - A map of modules, representing the modules and whether or not they're active.
 * @throws Error - When a profile name is passed and no profiles exist with that name.
 */
export async function saveChangesToProfile(profileName, modules)
{
	const savedProfiles = Settings.getAllProfiles();
	const matchingProfileIndex = savedProfiles.findIndex(profile => profile.name === profileName);

	if (!savedProfiles[matchingProfileIndex])
	{
		const errorMessage = `Unable to save module profile changes. Profile "${profileName}" does not exist!`;
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	savedProfiles[matchingProfileIndex] = { name: profileName, modules: modules };

	const response = SettingsUtils.setSetting(SettingKey.PROFILES, savedProfiles);
	response.then(() => Hooks.callAll(MODULE_PROFILES_UPDATED_HOOK_NAME));

	// TODO - notify ui.notifications

	return response;
}

// TODO - update object type Typescript
/**
 * Deletes the profile with the given name.
 * @param {string} profileName - The name of the profile to delete.
 * @returns {Promise<*>} - The resulting value of the updated profiles setting.
 * @throws {Error} - When no profile with the given name exists.
 */
export async function deleteProfile(profileName)
{
	if (!Settings.getProfileByName(profileName))
	{
		const errorMessage = `Unable to delete module profile. Profile "${profileName}" does not exist!`;
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	const profilesToSave = Settings.getAllProfiles().filter(profile => profile.name !== profileName);
	const response = SettingsUtils.setSetting(SettingKey.PROFILES, profilesToSave);

	if (profilesToSave.length === 0)
	{
		SettingsUtils.reloadWindow();
	}

	response.then(() => Hooks.callAll(MODULE_PROFILES_UPDATED_HOOK_NAME));

	// TODO - notify ui.notifications

	return response;
}

// TODO - test
export function resetProfiles()
{
	SettingsUtils.setSetting(SettingKey.ACTIVE_PROFILE_NAME, DEFAULT_PROFILE_NAME)
				 .then(() => SettingsUtils.setSetting(SettingKey.PROFILES, undefined))
				 .then(() => SettingsUtils.reloadWindow());
}