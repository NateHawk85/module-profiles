import {ManageProfilesSettings} from "./ManageProfilesSettings.js";

export default class Settings {
    static MODULE_NAME = 'module-profiles';

    // Settings keys
    static MANAGE_PROFILES = 'manageProfiles';

    /**
     * Register module settings
     */
    registerSettings() {
        game.settings.registerMenu(
            Settings.MODULE_NAME,
            Settings.MANAGE_PROFILES,
            {
                name: 'Manage Profiles',
                label: "Manage Profiles",
                icon: "fas fa-cogs",
                type: ManageProfilesSettings,
                restricted: false,
            }
        );
    }
}