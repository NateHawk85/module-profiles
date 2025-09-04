import { MODULE_PROFILES_UPDATED_HOOK_NAME } from '../classes/ManageModuleProfilesSettingsForm';
import * as MappingUtils from './mapping-utils';
import * as Settings from './settings';
import * as SettingsUtils from './settings-utils';
import * as SettingsMigration from './settings-migration';
import { type FoundryVersionStrategy, v10, v11, v12, v13, v9 } from './version-strategies';

export function registerModuleSettings(): void
{
	SettingsUtils.registerSettings();
	SettingsUtils.registerMenus();

	SettingsMigration.migrate().then(() =>
	{
		const profiles = Settings.getAllProfiles();
		if (!profiles || profiles.length === 0)
		{
			Settings.resetProfiles();
		}
	});
}

/**
 * Gets the currently active modules from the core game settings.
 * @returns {ModuleInfo[]} - The currently-active module configuration.
 */
export function getCurrentModuleConfiguration(): ModuleInfo[]
{
	return Settings.getFoundryVersionStrategy().getCurrentModuleConfiguration();
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
 * Gets the array of saved profiles from the game settings in JSON format.
 * @return {string} - The JSON representation of the profile.
 */
export function exportAllProfiles(): string
{
	return JSON.stringify(Settings.getAllProfiles(), null, 2);
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

type CreateProfileParams = {
	name: string;
	description: string;
	modules: ModuleInfo[];
};

/**
 * Creates a new {@link ModuleProfile} in the game settings.
 * @param {CreateProfileParams} params - The profile params.
 * @returns {Promise<ModuleProfile[]>} - The new Array of {@link ModuleProfile}s.
 * @throws Error - When a profile exists with the given profileName
 */
export async function createProfile({ name, description, modules }: CreateProfileParams): Promise<ModuleProfile[]>
{
	if (!name)
	{
		const postfix = name === '' ? 'Profile name must not be empty.' : 'Profile name is undefined.';
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

	if (Settings.getProfileByName(name))
	{
		const errorMessage = `Unable to create module profile. Profile "${name}" already exists!`;
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	const profiles = Settings.getAllProfiles();
	profiles.push({ name: name, description: description, modules: modules });

	const response = SettingsUtils.setProfiles(profiles);
	response.then(() => Hooks.callAll(MODULE_PROFILES_UPDATED_HOOK_NAME));
	ui.notifications.info(`Profile "${name}" has been created!`);

	return response;
}

/**
 * Creates a {@link ModuleProfile} or multiple module profiles out of a JSON representation of those profiles.
 * @param {string} json - The JSON representation of a {@link ModuleProfile} or an Array of {@link ModuleProfile}[] objects.
 * @return {Promise<ModuleProfile[]>} - The saved array of module profiles in the game settings.
 */
export async function importProfiles(json: string): Promise<ModuleProfile[]>
{
	let profiles: ModuleProfile | ModuleProfile[] = JSON.parse(json);

	if (!Array.isArray(profiles))
	{
		profiles = [profiles];
	}

	if (profiles.some(profile => !isValidModuleProfile(profile)))
	{
		const errorMessage = 'Unable to import profiles. Please re-export and try again.';
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	// Written this way to continue trying to create profiles, even when a previous profile could not be created
	for (const profile of profiles)
	{
		try
		{
			await Settings.createProfile(profile);
		} catch (ignored)
		{
		}
	}

	return Settings.getAllProfiles();

	function isValidModuleProfile(profile: ModuleProfile): boolean
	{
		if (!profile || profile.name == null || profile.modules == null || profile.description == null)
		{
			return false;
		}

		return profile.modules.every(module => module.id && module.title && module.hasOwnProperty('isActive'));
	}
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

type UpdateProfileParams = {
	name?: string;
	description?: string;
	modules?: ModuleInfo[];
};

/**
 * Saves the current profile settings to an existing profile.
 * @param {string} profileName - The name of the profile to update.
 * @param {UpdateProfileParams} params - New fields to update on the profile.
 * @returns {Promise<ModuleProfile[]>} - The new Array of module profiles.
 * @throws Error - When a profile name is passed and no profiles exist with that name.
 */
export async function saveChangesToProfile(
	profileName: string,
	params: UpdateProfileParams,
): Promise<ModuleProfile[]>
{
	const savedProfiles = Settings.getAllProfiles();
	const matchingProfileIndex = savedProfiles.findIndex(profile => profile.name === profileName);

	if (!savedProfiles[matchingProfileIndex])
	{
		const errorMessage = `Unable to save module profile changes. Profile "${profileName}" does not exist!`;
		ui.notifications.error(errorMessage);
		throw new Error(errorMessage);
	}

	const existingProfile = savedProfiles[matchingProfileIndex];
	const newProfileName = params.name ?? existingProfile.name;

	savedProfiles[matchingProfileIndex] = {
		name: newProfileName,
		description: params.description ?? existingProfile.description,
		modules: params.modules ?? existingProfile.modules,
	};

	const activeProfileName = SettingsUtils.getActiveProfileName();
	if (activeProfileName === existingProfile.name)
	{
		await SettingsUtils.setActiveProfileName(newProfileName);
	}

	const response = SettingsUtils.setProfiles(savedProfiles);
	response.then(() => Hooks.callAll(MODULE_PROFILES_UPDATED_HOOK_NAME));
	ui.notifications.info(`Changes to profile "${newProfileName}" have been saved!`);

	return response;
}

/**
 * Deletes the profile with the given name. When the currently-active profile is deleted, the first profile is selected.
 * @param {string} profileName - The name of the profile to delete.
 * @return {Promise<ModuleProfile[] | undefined>} - The resulting value of the updated profiles setting, or `undefined` if no profiles remain.
 * @throws {Error} - When no profile with the given name exists.
 */
export async function deleteProfile(profileName: string): Promise<ModuleProfile[] | undefined>
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
		await Settings.resetProfiles();
		return;
	}

	if (profileName === SettingsUtils.getActiveProfileName())
	{
		await SettingsUtils.setActiveProfileName(profilesToSave[0].name);
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

/**
 * Determine whether to show the module icon animations.
 */
export function getShowModuleIconAnimation(): boolean
{
	return SettingsUtils.getShowModuleIconAnimation();
}

export async function setShowModuleIconAnimation(showModuleAnimation: boolean): Promise<boolean>
{
	const response = SettingsUtils.setShowModuleIconAnimation(showModuleAnimation);

	response.then(() => Hooks.callAll(MODULE_PROFILES_UPDATED_HOOK_NAME));
	ui.notifications.info(`Module icon animation has been ${showModuleAnimation ? 'enabled' : 'disabled'}`);

	return response;
}

export async function setCoreModuleConfiguration(moduleInfos: ModuleInfo[]): Promise<Record<string, boolean>>
{
	const moduleInfosToSave = MappingUtils.mapToModuleKeyIsActiveRecord(moduleInfos);
	const coreModuleConfiguration = game.settings.get('core', 'moduleConfiguration');

	const mergedConfiguration = { ...coreModuleConfiguration, ...moduleInfosToSave };

	return await game.settings.set('core', 'moduleConfiguration', mergedConfiguration);
}

export function getFoundryVersionStrategy(): FoundryVersionStrategy
{
	const foundryVersion = game.version.split('.')[0];

	switch (foundryVersion)
	{
		case '9':
			return v9;
		case '10':
			return v10;
		case '11':
			return v11;
		case '12':
			return v12;
		case '13':
			return v13;
		default:
			const errorMessage = `Module Profiles: Foundry version '${game.version}' is not supported. Please disable the Module Profiles module.`;
			ui.notifications.error(errorMessage);
			throw new Error(errorMessage);
	}
}
