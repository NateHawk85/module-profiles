import ManageModuleProfilesSettingsForm from '../classes/ManageModuleProfilesSettingsForm';
import * as Settings from './settings';

export type SettingsDataVersion = `${string}.${string}.${string}`;

export const MODULE_ID = 'module-profiles';
export const TEMPLATES_PATH = `modules/${MODULE_ID}/templates`;
export const DEFAULT_PROFILE_NAME = 'Default Profile';

const PROFILES_SETTING = 'profiles';
const ACTIVE_PROFILE_NAME_SETTING = 'activeProfileName';
const SHOW_MODULE_ICON_ANIMATION_SETTING = 'showModuleIconAnimation';
const SETTINGS_DATA_VERSION_SETTING = 'settingsDataVersion';

/**
 * Registers settings for the module. This is only meant to be called on initial game load.
 */
export function registerSettings(): void
{
	game.settings.register(MODULE_ID, PROFILES_SETTING, {
		name: 'Profiles',
		hint: 'Existing module profiles',
		default: [buildDefaultProfile()],
		type: Array,
		scope: 'world',
	});

	game.settings.register(MODULE_ID, ACTIVE_PROFILE_NAME_SETTING, {
		name: 'Active Profile Name',
		default: DEFAULT_PROFILE_NAME,
		type: String,
		scope: 'world',
	});

	game.settings.register(MODULE_ID, SHOW_MODULE_ICON_ANIMATION_SETTING, {
		name: 'Show Module Icon Animation',
		default: true,
		type: Boolean,
		scope: 'world',
		config: true,
	});

	game.settings.register(MODULE_ID, SETTINGS_DATA_VERSION_SETTING, {
		name: 'Settings Data Version (for migration purposes)',
		default: '0.0.0',
		type: String,
		scope: 'world',
	});

	function buildDefaultProfile(): ModuleProfile
	{
		const savedModuleConfiguration = Settings.getCurrentModuleConfiguration();

		return {
			name: DEFAULT_PROFILE_NAME,
			description: '',
			modules: savedModuleConfiguration,
		};
	}
}

/**
 * Registers menus for the module. This is only meant to be called on initial game load.
 */
export function registerMenus(): void
{
	game.settings.registerMenu(MODULE_ID, 'manageProfiles', {
		name: 'Manage Profiles',
		label: 'Manage Profiles',
		icon: 'fas fa-cog',
		type: ManageModuleProfilesSettingsForm,
		restricted: true,
	});
}

/**
 * Registers an API for the current module, accessible by `game.modules.get(MODULE_ID).api.*function()*`. This is meant to be called only on initial game load.
 * @param {Record<string, Function>} api - The API to expose.
 * @returns {void}
 */
export function registerAPI(api: Record<string, Function>): void
{
	// @ts-ignore - Not recognized due to Foundry object
	game.modules.get(MODULE_ID)!.api = api;

	console.debug(`${MODULE_ID} API registered`);
}

/**
 * Reloads the current window.
 * @returns {void}
 */
export function reloadWindow(): void
{
	window.location.reload();
}

/**
 * Get the Profiles game setting.
 * @return {ModuleProfile[]} - The value of the game setting.
 */
export function getProfiles(): ModuleProfile[]
{
	return <ModuleProfile[]>game.settings.get(MODULE_ID, PROFILES_SETTING);
}

/**
 * Set the Profiles game setting.
 * @param {ModuleProfile[]} profiles - The value to save to the game setting.
 * @return {Promise<ModuleProfile[]>} - A Promise resolving to the new game setting value.
 */
export async function setProfiles(profiles: ModuleProfile[]): Promise<ModuleProfile[]>
{
	// Filter out references to modules that are no longer installed
	profiles.forEach(profile => profile.modules = profile.modules.filter(moduleInfo => moduleInfo.title !== undefined));

	// Sort profiles by profile name, and module infos by module title
	profiles.sort((a, b) => a.name.localeCompare(b.name));
	// @ts-ignore - undefined titles are filtered before this line
	profiles.forEach(profile => profile.modules.sort((a, b) => a.title.localeCompare(b.title)));

	return await game.settings.set(MODULE_ID, PROFILES_SETTING, profiles);
}

/**
 * Resets the Profiles game setting to the default profile.
 */
export function resetProfiles(): Promise<void>
{
	return game.settings.set(MODULE_ID, PROFILES_SETTING, undefined);
}

/**
 * Get the Active Profile Name game setting.
 * @return {string} - The value of the game setting.
 */
export function getActiveProfileName(): string
{
	return <string>game.settings.get(MODULE_ID, ACTIVE_PROFILE_NAME_SETTING);
}

/**
 * Set the Active Profile Name game setting.
 * @param {string} activeProfileName - The value to save to the game setting.
 * @return {Promise<string>} - A Promise resolving to the new game setting value.
 */
export function setActiveProfileName(activeProfileName: string): Promise<string>
{
	return game.settings.set(MODULE_ID, ACTIVE_PROFILE_NAME_SETTING, activeProfileName);
}

/**
 * Get the Show Module Animation game setting.
 * @return {string} - The value of the game setting.
 */
export function getShowModuleIconAnimation(): boolean
{
	return <boolean>game.settings.get(MODULE_ID, SHOW_MODULE_ICON_ANIMATION_SETTING);
}

/**
 * Set the Show Module Animation game setting.
 * @param {boolean} showModuleAnimation - The value to save to the game setting.
 * @return {Promise<boolean>} - A Promise resolving to the new game setting value.
 */
export function setShowModuleIconAnimation(showModuleAnimation: boolean): Promise<boolean>
{
	return game.settings.set(MODULE_ID, SHOW_MODULE_ICON_ANIMATION_SETTING, showModuleAnimation);
}

/**
 * Get the Settings Data Version game setting.
 * @return {string} - The value of the game setting.
 */
export function getSettingsDataVersion(): SettingsDataVersion
{
	return <SettingsDataVersion>game.settings.get(MODULE_ID, SETTINGS_DATA_VERSION_SETTING);
}

/**
 * Set the Settings Data Version game setting.
 * @param {string} settingsDataVersion - The value to save to the game setting.
 * @return {Promise<string>} - A Promise resolving to the new game setting value.
 */
export function setSettingsDataVersion(settingsDataVersion: SettingsDataVersion): Promise<string>
{
	return game.settings.set(MODULE_ID, SETTINGS_DATA_VERSION_SETTING, settingsDataVersion);
}
