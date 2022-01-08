const MODULE_NAME = 'module-profiles';

/**
 * Gets the value of a game setting.
 * @param settingKey {string} - The value of the setting.
 * @returns {any}
 */
export function getSetting(settingKey)
{
	return game.settings.get(MODULE_NAME, settingKey);
}

/**
 * Sets the value of a game setting.
 * @param settingKey {string} - The key of the setting.
 * @param value {any} - The value of the setting.
 * @returns {Promise<*>} - The value that was set.
 */
export function setSetting(settingKey, value)
{
	return game.settings.set(MODULE_NAME, settingKey, value);
}

/**
 * Registers a setting.
 * @param settingKey {string} - The key of the setting in the game settings.
 * @param configuration {Setting} - The menu configuration.
 */
export function registerSetting(settingKey, configuration)
{
	game.settings.register(MODULE_NAME, settingKey, configuration);
}

/**
 * Registers a settings menu button.
 * @param menuKey {string} - The key of the menu in the game settings.
 * @param configuration {SettingSubmenuConfig} - The menu configuration.
 */
export function registerMenu(menuKey, configuration)
{
	game.settings.registerMenu(MODULE_NAME, menuKey, configuration);
}