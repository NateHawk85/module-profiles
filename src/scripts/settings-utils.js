const MODULE_ID = 'module-profiles';

/**
 * Gets the value of a game setting.
 * @param settingKey {string} - The value of the setting.
 * @returns {any}
 */
export function getSetting(settingKey)
{
	return game.settings.get(MODULE_ID, settingKey);
}

/**
 * Sets the value of a game setting.
 * @param settingKey {string} - The key of the setting.
 * @param value {any} - The value of the setting.
 * @returns {Promise<*>} - The value that was set.
 */
export function setSetting(settingKey, value)
{
	return game.settings.set(MODULE_ID, settingKey, value);
}

/**
 * Registers a setting.
 * @param settingKey {string} - The key of the setting in the game settings.
 * @param configuration {Setting} - The menu configuration.
 */
export function registerSetting(settingKey, configuration)
{
	game.settings.register(MODULE_ID, settingKey, configuration);
}

/**
 * Registers a settings menu button.
 * @param menuKey {string} - The key of the menu in the game settings.
 * @param configuration {SettingSubmenuConfig} - The menu configuration.
 */
export function registerMenu(menuKey, configuration)
{
	game.settings.registerMenu(MODULE_ID, menuKey, configuration);
}


/**
 * Registers an API for the current module, accessible by `game.modules.get(MODULE_ID).api.*function()*`.
 * @param api {Object} - The API to expose.
 */
export function registerAPI(api)
{
	game.modules.get(MODULE_ID).api = api;
}