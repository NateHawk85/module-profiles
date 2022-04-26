import * as Settings from './settings';
import * as SettingsUtils from './settings-utils';
import * as MappingUtils from './mapping-utils';
import {MODULE_PROFILES_UPDATED_HOOK_NAME} from '../classes/ManageModuleProfilesSettingsForm';

/**
 * Registers settings for this module. This is only meant to be called on initial game load.
 * @returns {void}
 */
export function registerModuleSettings(): void
{
	SettingsUtils.registerSettings();
	SettingsUtils.registerMenus();

	const profiles = Settings.getAllProfiles();
	if (!profiles || profiles.length === 0)
	{
		Settings.resetProfiles();
	}
}

/**
 * Gets the currently active modules from the core game settings.
 * @returns {ModuleInfo[]} - The currently-active module configuration.
 */
export function getCurrentModuleConfiguration(): ModuleInfo[]
{
	return Array.from(game.modules).map(([key, value]) => ({
		id: key,
		title: value.data.title,
		isActive: value.active
	})).sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Sets the core module configuration.
 * @param {ModuleInfo[]} moduleInfos - The desired modules to activate/disable.
 * @return {Promise<Record<string, boolean>>} - The value set on the core module configuration.
 */
export async function setCoreModuleConfiguration(moduleInfos: ModuleInfo[]): Promise<Record<string, boolean>>
{
	const moduleInfosToSave = MappingUtils.mapToModuleKeyIsActiveRecord(moduleInfos);
	const coreModuleConfiguration = game.settings.get('core', 'moduleConfiguration');

	const mergedConfiguration = { ...coreModuleConfiguration, ...moduleInfosToSave };

	return await game.settings.set('core', 'moduleConfiguration', mergedConfiguration);
}

/**
 * Creates a new profile in the game settings.
 * @param {string} profileName - The name of the profile to create.
 * @param {ModuleInfo[]} modules - The Array of ModuleInfo objects that represent each module's activation status.
 * @returns {Promise<ModuleProfile[]>} - The new Array of module profiles.
 * @throws Error - When a profile exists with the given profileName
 */
export async function createProfile(profileName: string, modules: ModuleInfo[]): Promise<ModuleProfile[]>
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

	const response = SettingsUtils.setProfiles(profiles);
	response.then(() => Hooks.callAll(MODULE_PROFILES_UPDATED_HOOK_NAME));
	ui.notifications.info(`Profile "${profileName}" has been created!`);

	return response;
}

/**
 * Activates the profile with the given name, then reloads the page.
 * @param {string} profileName - The name of the module profile to load.
 * @returns {Promise<void>}
 * @throws {Error} - When profile name does not exist.
 */
export async function activateProfile(profileName: string): Promise<void>
{
	const profile = Settings.getProfileByName(profileName);

	if (!profile)
	{
		const errorMessage = `Unable to activate module profile. Profile "${profileName}" does not exist!`;
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	SettingsUtils.setActiveProfileName(profile.name)
				 .then(() => Settings.setCoreModuleConfiguration(profile.modules))
				 .then(() => SettingsUtils.reloadWindow());
}

/**
 * Saves the current profile settings to an existing profile.
 * @param {string} profileName - The name of the profile to update.
 * @param {ModuleInfo[]} modules - The Array of ModuleInfo objects that represent each module's activation status.
 * @returns {Promise<ModuleProfile[]>} - The new Array of module profiles.
 * @throws Error - When a profile name is passed and no profiles exist with that name.
 */
export async function saveChangesToProfile(profileName: string, modules: ModuleInfo[]): Promise<ModuleProfile[]>
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

	const response = SettingsUtils.setProfiles(savedProfiles);
	response.then(() => Hooks.callAll(MODULE_PROFILES_UPDATED_HOOK_NAME));
	ui.notifications.info(`Changes to profile "${profileName}" have been saved!`);

	return response;
}

/**
 * Gets all saved module profiles from the game settings.
 * @returns {ModuleProfile[]}
 */
export function getAllProfiles(): ModuleProfile[]
{
	return SettingsUtils.getProfiles();
}

/**
 * Gets the saved, currently-active module profile from the game settings.
 * @returns {ModuleProfile} - The currently-active module profile.
 */
export function getActiveProfile(): ModuleProfile
{
	const activeProfileName = SettingsUtils.getActiveProfileName();
	const activeProfile = Settings.getProfileByName(activeProfileName);

	if (!activeProfile)
	{
		const errorMessage = 'Unable to load active profile. Please refresh the Foundry page.';
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	return activeProfile;
}

/**
 * Gets a saved profile from the game settings with the corresponding name.
 * @param {string} profileName - The name of the profile to return.
 * @returns {ModuleProfile | undefined} - The module profile with the given name, or `undefined` if none exists.
 */
export function getProfileByName(profileName: string): ModuleProfile | undefined
{
	const profiles = Settings.getAllProfiles();

	return profiles.find(profile => profile.name === profileName);
}

/**
 * Gets a saved profile from the game settings in JSON format.
 * @param {string} profileName - The name of the profile to return.
 * @return {string | undefined} - The JSON representation of the profile, or `undefined` if none exists.
 */
export function exportProfileByName(profileName: string): string | undefined
{
	const profile = Settings.getProfileByName(profileName);

	return profile ? JSON.stringify(profile, null, 2) : profile;
}

// TODO - what should happen if they try to delete the currently-active profile?
/**
 * Deletes the profile with the given name.
 * @param {string} profileName - The name of the profile to delete.
 * @return {Promise<ModuleProfile[]>} - The resulting value of the updated profiles setting.
 * @throws {Error} - When no profile with the given name exists.
 */
export async function deleteProfile(profileName: string): Promise<ModuleProfile[]>
{
	if (!Settings.getProfileByName(profileName))
	{
		const errorMessage = `Unable to delete module profile. Profile "${profileName}" does not exist!`;
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	const profilesToSave = Settings.getAllProfiles().filter(profile => profile.name !== profileName);
	const response = SettingsUtils.setProfiles(profilesToSave);

	if (profilesToSave.length === 0)
	{
		SettingsUtils.reloadWindow();
	}

	response.then(() => Hooks.callAll(MODULE_PROFILES_UPDATED_HOOK_NAME));
	ui.notifications.info(`Profile "${profileName}" has been deleted!`);

	return response;
}

/**
 * Reset all module profiles to the default values. WARNING: Doing this leads to unrecoverable data loss.
 * @return {Promise<void>}
 */
export async function resetProfiles(): Promise<void>
{
	await SettingsUtils.resetProfiles()
					   .then(() => SettingsUtils.setActiveProfileName(SettingsUtils.DEFAULT_PROFILE_NAME))
					   .then(() => SettingsUtils.reloadWindow());
}