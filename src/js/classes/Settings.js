import {ManageProfilesSettings} from './ManageProfilesSettings.js';
import * as SettingsUtils from '../scripts/settings-utils.js';

const DEFAULT_PROFILE_NAME = 'Default Profile';

export const SettingKey = {
	MANAGE_PROFILES: 'manageProfiles',
	PROFILES: 'profiles',
	ACTIVE_PROFILE_NAME: 'activeProfileName',
	REGISTER_API: 'registerAPI'
};

export class Settings
{
	/**
	 * Registers settings for this module. This is only intended to be called upon during initialization.
	 */
	registerSettings()
	{
		SettingsUtils.registerMenu(SettingKey.MANAGE_PROFILES, {
			name: undefined,
			label: 'Manage Profiles',
			hint: undefined,
			icon: 'fas fa-cog',
			type: ManageProfilesSettings,
			restricted: false,
		});

		const defaultProfile = this.buildDefaultProfile();
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

		SettingsUtils.registerSetting(SettingKey.REGISTER_API, {
			name: 'Register API',
			hint: 'Make this module\'s API (ModuleProfiles.api.*function()*) available. If you don\'t write code, you probably don\'t need this.',
			scope: 'world',
			config: true,
			type: Boolean,
			default: false
		});

		// TODO - test
		if (this.getAllProfiles().length === 0)
		{
			this.resetProfiles();
		}
	}

	// TODO
	buildDefaultProfile()
	{
		const savedModuleConfiguration = this.getCurrentModuleConfiguration();

		return {
			name: DEFAULT_PROFILE_NAME,
			modules: savedModuleConfiguration
		};
	}

	/**
	 * Gets the currently active modules from the core game settings.
	 * @returns {any} - The currently-active module configuration.
	 */
	getCurrentModuleConfiguration()
	{
		return game.settings.get('core', 'moduleConfiguration');
	}

	/**
	 * Gets the saved, currently-active module profile from the game settings.
	 * @returns {*} - The currently-active module profile.
	 */
	getActiveProfile()
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
	getProfileByName(profileName)
	{
		const profiles = this.getAllProfiles();

		return profiles.find(profile => profile.name === profileName);
	}

	/**
	 * Gets the array of all saved profiles from the game settings.
	 * @returns {Array<*>} - An array of the saved module profiles.
	 */
	getAllProfiles()
	{
		return SettingsUtils.getSetting(SettingKey.PROFILES);
	}

	/**
	 * Sets the active profile name within the game settings.
	 * @param profileName {String} - The name of the profile to get.
	 * @returns {Promise<*>}
	 */
	setActiveProfileName(profileName)
	{
		return SettingsUtils.setSetting(SettingKey.ACTIVE_PROFILE_NAME, profileName);
	}

	// TODO - implement, do in place of "set active profile name"
	async loadProfile(profileName)
	{
		const profile = this.getProfileByName(profileName);

		if (!profile)
		{
			throw new Error('You dummy!');
		}

		const onSetActiveProfileName = SettingsUtils.setSetting(SettingKey.ACTIVE_PROFILE_NAME, profileName);
		const onSave = onSetActiveProfileName.then(() => this.setCoreModuleConfiguration(profile.modules));
		onSave.then(() => window.location.reload());
	}

	// TODO - probably don't need to expose, but... whatever. probs test
	async setCoreModuleConfiguration(modules)
	{
		await game.settings.set('core', 'moduleConfiguration', modules);
	}

	/**
	 * Saves the given profile in the game settings.
	 * @param profileName {String} - The name of the profile to save.
	 * @param modules {Map<String, boolean>} - A map of modules, representing the modules and whether or not they're active.
	 * @throws Error - When a profile exists with the given profileName
	 */
	saveProfile(profileName, modules)
	{
		const profiles = this.getAllProfiles();

		if (profiles.some(profile => profile.name === profileName))
		{
			throw new Error(`Profile "${profileName}" already exists!`);
		}

		profiles.push({name: profileName, modules: modules});
		return SettingsUtils.setSetting(SettingKey.PROFILES, profiles);
	}

	/**
	 * Saves the current profile settings to an existing profile.
	 * @param profileName {String} - The name of the profile to update.
	 * @param modules {Map<String, boolean>} - A map of modules, representing the modules and whether or not they're active.
	 * @throws Error - When a profile name is passed and none exists.
	 */
	updateProfile(profileName, modules)
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

	// TODO - test
	deleteProfile(profileName)
	{
		const savedProfiles = this.getAllProfiles();

		if (!savedProfiles.some(profile => profile.name === profileName))
		{
			throw new Error(`Profile "${profileName}" does not exist!`);
		}

		return SettingsUtils.setSetting(SettingKey.PROFILES, savedProfiles.filter(profile => profile.name !== profileName));
	}

	// TODO
	resetProfiles()
	{
		this.setActiveProfileName(DEFAULT_PROFILE_NAME).then(() =>
		{
			return SettingsUtils.setSetting(SettingKey.PROFILES, undefined);
		});
	}
}