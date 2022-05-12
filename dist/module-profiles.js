/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/classes/ConfirmActivateProfileForm.ts":
/*!********************************************************!*\
  !*** ./src/main/classes/ConfirmActivateProfileForm.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConfirmActivateProfileForm)
/* harmony export */ });
/* harmony import */ var _scripts_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _scripts_profile_interactions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/profile-interactions */ "./src/main/scripts/profile-interactions.ts");
/* harmony import */ var _scripts_settings_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scripts/settings-utils */ "./src/main/scripts/settings-utils.ts");



/**
 * A FormApplication to be rendered when you want a user's confirmation that yes, in fact, they *do* want to activate said profile.
 */
class ConfirmActivateProfileForm extends FormApplication {
    constructor(profileNameToActivate, object = {}, options = {}) {
        super(object, options);
        this.profileNameToActivate = profileNameToActivate;
    }
    static get defaultOptions() {
        const parent = super.defaultOptions;
        const parentClasses = parent?.classes ?? [];
        return {
            ...parent,
            classes: [...parentClasses, 'module-profiles-form'],
            id: 'module-profiles-confirm-activate-profile',
            template: `${_scripts_settings_utils__WEBPACK_IMPORTED_MODULE_2__.TEMPLATES_PATH}/confirm-activate-profile.hbs`,
            title: 'Confirm Activate Profile',
            width: 660
        };
    }
    getData() {
        return {
            profileNameToActivate: this.profileNameToActivate,
            activeProfileName: _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.getActiveProfile().name
        };
    }
    async _updateObject(event) {
        if (event?.submitter?.id === 'moduleProfilesActivateProfileSubmit') {
            _scripts_profile_interactions__WEBPACK_IMPORTED_MODULE_1__.activateProfile(this.profileNameToActivate, true);
        }
    }
}


/***/ }),

/***/ "./src/main/classes/ConfirmDeleteProfileForm.ts":
/*!******************************************************!*\
  !*** ./src/main/classes/ConfirmDeleteProfileForm.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConfirmDeleteProfileForm)
/* harmony export */ });
/* harmony import */ var _scripts_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _scripts_settings_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/settings-utils */ "./src/main/scripts/settings-utils.ts");


/**
 * A FormApplication to be rendered when you want a user's confirmation that yes, in fact, they *do* want to delete said profile.
 */
class ConfirmDeleteProfileForm extends FormApplication {
    constructor(profileNameToDelete, object = {}, options = {}) {
        super(object, options);
        this.profileNameToDelete = profileNameToDelete;
    }
    static get defaultOptions() {
        const parent = super.defaultOptions;
        const parentClasses = parent?.classes ?? [];
        return {
            ...parent,
            classes: [...parentClasses, 'module-profiles-form'],
            id: 'module-profiles-confirm-delete-profile',
            template: `${_scripts_settings_utils__WEBPACK_IMPORTED_MODULE_1__.TEMPLATES_PATH}/confirm-delete-profile.hbs`,
            title: 'Confirm Delete Profile',
            width: 660
        };
    }
    getData() {
        return {
            profileNameToDelete: this.profileNameToDelete
        };
    }
    // TODO - bug, name for button on module management does not update when active profile name switches
    async _updateObject(event) {
        if (event?.submitter?.id === 'moduleProfilesDeleteProfileSubmit') {
            return await _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.deleteProfile(this.profileNameToDelete);
        }
    }
}


/***/ }),

/***/ "./src/main/classes/CreateModuleProfileForm.ts":
/*!*****************************************************!*\
  !*** ./src/main/classes/CreateModuleProfileForm.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateModuleProfileForm)
/* harmony export */ });
/* harmony import */ var _scripts_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _scripts_settings_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/settings-utils */ "./src/main/scripts/settings-utils.ts");


/**
 * A FormApplication that allows a user to create a new module profile.
 */
class CreateModuleProfileForm extends FormApplication {
    constructor(object = {}, options = {}) {
        super(object, options);
    }
    static get defaultOptions() {
        const parent = super.defaultOptions;
        const parentClasses = parent?.classes ?? [];
        return {
            ...parent,
            classes: [...parentClasses, 'module-profiles-form'],
            id: 'module-profiles-create-module-profile',
            template: `${_scripts_settings_utils__WEBPACK_IMPORTED_MODULE_1__.TEMPLATES_PATH}/create-module-profile.hbs`,
            title: 'Create New Module Profile',
            width: 660
        };
    }
    activateListeners(html) {
        if (html) {
            super.activateListeners(html);
        }
        document.getElementById('moduleProfilesCreateNewProfileName').focus();
    }
    async _updateObject(event, formData) {
        if (event?.submitter?.id === 'moduleProfilesCreateNewProfileSubmit') {
            return await _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.createProfile(formData.moduleProfilesCreateNewProfileName, _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.getCurrentModuleConfiguration());
        }
    }
}


/***/ }),

/***/ "./src/main/classes/EditModuleProfileForm.ts":
/*!***************************************************!*\
  !*** ./src/main/classes/EditModuleProfileForm.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditModuleProfileForm)
/* harmony export */ });
/* harmony import */ var _scripts_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _scripts_mapping_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/mapping-utils */ "./src/main/scripts/mapping-utils.ts");
/* harmony import */ var _scripts_settings_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scripts/settings-utils */ "./src/main/scripts/settings-utils.ts");



/**
 * A FormApplication that allows a user to edit a module profile.
 */
class EditModuleProfileForm extends FormApplication {
    constructor(profileName, object = {}, options = {}) {
        super(object, options);
        this.profileName = profileName;
    }
    static get defaultOptions() {
        const parent = super.defaultOptions;
        const parentClasses = parent?.classes ?? [];
        return {
            ...parent,
            classes: [...parentClasses, 'module-profiles-form'],
            id: 'module-profiles-edit-module-profile',
            resizable: true,
            template: `${_scripts_settings_utils__WEBPACK_IMPORTED_MODULE_2__.TEMPLATES_PATH}/edit-module-profile.hbs`,
            title: 'Edit Module Profile',
            width: 450
        };
    }
    getData() {
        const profile = _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.getProfileByName(this.profileName);
        if (!profile) {
            const errorMessage = `Unable to load profile "${this.profileName}". Please close the window and try again.`;
            ui.notifications.error(errorMessage);
            throw new Error(errorMessage);
        }
        return profile;
    }
    async _updateObject(event, formData) {
        if (event?.submitter?.id === 'moduleProfilesEditProfileSubmit') {
            return await _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.saveChangesToProfile(this.profileName, _scripts_mapping_utils__WEBPACK_IMPORTED_MODULE_1__.mapToModuleInfos(formData));
        }
    }
}


/***/ }),

/***/ "./src/main/classes/ImportModuleProfileForm.ts":
/*!*****************************************************!*\
  !*** ./src/main/classes/ImportModuleProfileForm.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImportModuleProfileForm)
/* harmony export */ });
/* harmony import */ var _scripts_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _scripts_settings_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/settings-utils */ "./src/main/scripts/settings-utils.ts");


class ImportModuleProfileForm extends FormApplication {
    constructor(object = {}, options = {}) {
        super(object, options);
    }
    static get defaultOptions() {
        const parent = super.defaultOptions;
        const parentClasses = parent?.classes ?? [];
        return {
            ...parent,
            classes: [...parentClasses, 'module-profiles-form'],
            id: 'module-profiles-import-module-profile',
            template: `${_scripts_settings_utils__WEBPACK_IMPORTED_MODULE_1__.TEMPLATES_PATH}/import-module-profile.hbs`,
            title: 'Import Module Profile(s)',
            height: 800,
            width: 660
        };
    }
    async _updateObject(event, formData) {
        if (event?.submitter?.id === 'moduleProfilesImportProfileSubmit') {
            return _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.importProfiles(formData['import-module-profile-text']);
        }
    }
}


/***/ }),

/***/ "./src/main/classes/ManageModuleProfilesSettingsForm.ts":
/*!**************************************************************!*\
  !*** ./src/main/classes/ManageModuleProfilesSettingsForm.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MODULE_PROFILES_UPDATED_HOOK_NAME": () => (/* binding */ MODULE_PROFILES_UPDATED_HOOK_NAME),
/* harmony export */   "RENDER_HOOK_NAME": () => (/* binding */ RENDER_HOOK_NAME),
/* harmony export */   "default": () => (/* binding */ ManageModuleProfilesSettingsForm),
/* harmony export */   "forceManageModuleProfilesHeightResize": () => (/* binding */ forceManageModuleProfilesHeightResize),
/* harmony export */   "reRenderManageModuleProfilesWindows": () => (/* binding */ reRenderManageModuleProfilesWindows)
/* harmony export */ });
/* harmony import */ var _scripts_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scripts/settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _scripts_profile_interactions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/profile-interactions */ "./src/main/scripts/profile-interactions.ts");
/* harmony import */ var _CreateModuleProfileForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateModuleProfileForm */ "./src/main/classes/CreateModuleProfileForm.ts");
/* harmony import */ var _ConfirmDeleteProfileForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConfirmDeleteProfileForm */ "./src/main/classes/ConfirmDeleteProfileForm.ts");
/* harmony import */ var _EditModuleProfileForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EditModuleProfileForm */ "./src/main/classes/EditModuleProfileForm.ts");
/* harmony import */ var _ImportModuleProfileForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ImportModuleProfileForm */ "./src/main/classes/ImportModuleProfileForm.ts");
/* harmony import */ var _scripts_settings_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../scripts/settings-utils */ "./src/main/scripts/settings-utils.ts");







const RENDER_HOOK_NAME = 'renderManageModuleProfilesSettingsForm';
const MODULE_PROFILES_UPDATED_HOOK_NAME = 'moduleProfilesUpdated';
/**
 * A FormApplication that provides an interface for a user to manage module profiles.
 */
class ManageModuleProfilesSettingsForm extends FormApplication {
    constructor(object = {}, options = {}) {
        super(object, options);
    }
    static get defaultOptions() {
        const parent = super.defaultOptions;
        const parentClasses = parent?.classes ?? [];
        return {
            ...parent,
            classes: [...parentClasses, 'module-profiles-form'],
            id: this.FORM_ID,
            template: `${_scripts_settings_utils__WEBPACK_IMPORTED_MODULE_6__.TEMPLATES_PATH}/manage-profiles.hbs`,
            title: 'Manage Module Profiles',
            width: 660
        };
    }
    getData() {
        const activeProfileName = _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.getActiveProfile().name;
        const profilesWithActiveFlag = _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.getAllProfiles().map(profile => ({
            ...profile,
            isProfileActive: activeProfileName === profile.name
        }));
        return {
            profiles: profilesWithActiveFlag
        };
    }
    activateListeners(html) {
        if (html) {
            super.activateListeners(html);
        }
        const createNewProfileElement = document.getElementById('module-profiles-manage-profiles-create-new');
        createNewProfileElement?.addEventListener('click', () => new _CreateModuleProfileForm__WEBPACK_IMPORTED_MODULE_2__["default"]().render(true));
        const importProfileElement = document.getElementById('module-profiles-manage-profiles-import');
        importProfileElement?.addEventListener('click', (e) => {
            // Prevents window from automatically closing
            e.preventDefault();
            new _ImportModuleProfileForm__WEBPACK_IMPORTED_MODULE_5__["default"]().render(true);
        });
        const exportAllProfilesElement = document.getElementById('module-profiles-manage-profiles-export-all');
        exportAllProfilesElement?.addEventListener('click', async (e) => {
            // Prevents window from automatically closing
            e.preventDefault();
            const exportedProfiles = _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.exportAllProfiles();
            if (exportedProfiles) {
                await navigator.clipboard.writeText(exportedProfiles);
                ui.notifications.info(`All profiles have been copied to clipboard!`);
            }
        });
        const activateProfileElements = document.getElementsByClassName('module-profiles-activate-profile');
        Array.from(activateProfileElements).forEach(element => element.addEventListener('click', () => _scripts_profile_interactions__WEBPACK_IMPORTED_MODULE_1__.activateProfile(element.dataset.profileName)));
        const editProfileElements = document.getElementsByClassName('module-profiles-edit-profile');
        Array.from(editProfileElements).forEach(element => element.addEventListener('click', () => new _EditModuleProfileForm__WEBPACK_IMPORTED_MODULE_4__["default"](element.dataset.profileName).render(true)));
        const duplicateProfileElements = document.getElementsByClassName('module-profiles-duplicate-profile');
        Array.from(duplicateProfileElements).forEach(element => element.addEventListener('click', () => {
            const profile = _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.getProfileByName(element.dataset.profileName);
            if (profile) {
                return _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.createProfile(profile.name + ' (Copy)', profile.modules);
            }
        }));
        const exportProfileElements = document.getElementsByClassName('module-profiles-export-profile');
        Array.from(exportProfileElements).forEach(element => element.addEventListener('click', async () => {
            const profileName = element.dataset.profileName;
            const exportedProfile = _scripts_settings__WEBPACK_IMPORTED_MODULE_0__.exportProfileByName(profileName);
            if (exportedProfile) {
                await navigator.clipboard.writeText(exportedProfile);
                ui.notifications.info(`Profile "${profileName}" copied to clipboard!`);
            }
        }));
        const deleteProfileElements = document.getElementsByClassName('module-profiles-delete-profile');
        Array.from(deleteProfileElements).forEach((element) => element.addEventListener('click', () => new _ConfirmDeleteProfileForm__WEBPACK_IMPORTED_MODULE_3__["default"](element.dataset.profileName).render(true)));
    }
    async _updateObject() { }
}
ManageModuleProfilesSettingsForm.FORM_ID = 'module-profiles-manage-profiles';
/**
 * Re-renders the ManageModuleProfiles windows. This can be useful because profiles can be added/removed while the window is open, and re-rendering the
 * Application instance refreshes that data.
 * @returns {void}
 */
function reRenderManageModuleProfilesWindows() {
    Object.values(ui.windows)
        .filter(app => app.options.id === ManageModuleProfilesSettingsForm.FORM_ID)
        .forEach(app => app.render());
}
/**
 * Forces the application to refresh the size of its first element (aka, the window content). This is primarily to be used whenever an Application adds or
 * removes elements so that the height of the Application is consistent with what is added.
 * @param {Application} app - The Application that needs to be resized.
 * @returns {void}
 */
function forceManageModuleProfilesHeightResize(app) {
    if (app?.element?.length > 0) {
        app.element[0].style.height = 'auto';
    }
}


/***/ }),

/***/ "./src/main/scripts/api.ts":
/*!*********************************!*\
  !*** ./src/main/scripts/api.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerApi": () => (/* binding */ registerApi)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _settings_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings-utils */ "./src/main/scripts/settings-utils.ts");


/**
 * Registers the module's API. This is only meant to be called on initial game load.
 */
function registerApi() {
    const api = {
        getCurrentModuleConfiguration: _settings__WEBPACK_IMPORTED_MODULE_0__.getCurrentModuleConfiguration,
        getAllProfiles: _settings__WEBPACK_IMPORTED_MODULE_0__.getAllProfiles,
        getActiveProfile: _settings__WEBPACK_IMPORTED_MODULE_0__.getActiveProfile,
        getProfileByName: _settings__WEBPACK_IMPORTED_MODULE_0__.getProfileByName,
        exportAllProfiles: _settings__WEBPACK_IMPORTED_MODULE_0__.exportAllProfiles,
        exportProfileByName: _settings__WEBPACK_IMPORTED_MODULE_0__.exportProfileByName,
        createProfile: _settings__WEBPACK_IMPORTED_MODULE_0__.createProfile,
        importProfiles: _settings__WEBPACK_IMPORTED_MODULE_0__.importProfiles,
        activateProfile: _settings__WEBPACK_IMPORTED_MODULE_0__.activateProfile,
        saveChangesToProfile: _settings__WEBPACK_IMPORTED_MODULE_0__.saveChangesToProfile,
        deleteProfile: _settings__WEBPACK_IMPORTED_MODULE_0__.deleteProfile,
        resetProfiles: _settings__WEBPACK_IMPORTED_MODULE_0__.resetProfiles
    };
    _settings_utils__WEBPACK_IMPORTED_MODULE_1__.registerAPI(api);
}


/***/ }),

/***/ "./src/main/scripts/mapping-utils.ts":
/*!*******************************************!*\
  !*** ./src/main/scripts/mapping-utils.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapToModuleInfos": () => (/* binding */ mapToModuleInfos),
/* harmony export */   "mapToModuleKeyIsActiveRecord": () => (/* binding */ mapToModuleKeyIsActiveRecord)
/* harmony export */ });
/**
 * Maps an array of ModuleInfo objects into a Record, identical to how the core module configuration stores which modules are active and which aren't.
 * @param {ModuleInfo[]} moduleInfos
 * @return {Record<string, boolean>} - The corresponding Record representation of the inputted data.
 */
function mapToModuleKeyIsActiveRecord(moduleInfos) {
    const record = {};
    moduleInfos.forEach(module => record[module.id] = module.isActive);
    return record;
}
/**
 * Maps a Record into an array of matching ModuleInfo objects stored in the game settings.
 * @param {Record<string, boolean>} moduleIDIsActiveRecord
 * @return {ModuleInfo[]} - The corresponding array of ModuleInfo objects based on the inputted data.
 */
function mapToModuleInfos(moduleIDIsActiveRecord) {
    const moduleInfos = [];
    Object.entries(moduleIDIsActiveRecord).forEach(([key, value]) => moduleInfos.push({
        id: key,
        title: game.modules.get(key)?.data.title,
        isActive: value
    }));
    moduleInfos.sort((a, b) => {
        if (!a.title) {
            return 1;
        }
        if (!b.title) {
            return -1;
        }
        return a.title.localeCompare(b.title);
    });
    return moduleInfos;
}


/***/ }),

/***/ "./src/main/scripts/profile-interactions.ts":
/*!**************************************************!*\
  !*** ./src/main/scripts/profile-interactions.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activateProfile": () => (/* binding */ activateProfile)
/* harmony export */ });
/* harmony import */ var _ui_module_management_scripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui/module-management-scripts */ "./src/main/scripts/ui/module-management-scripts.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _classes_ConfirmActivateProfileForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/ConfirmActivateProfileForm */ "./src/main/classes/ConfirmActivateProfileForm.ts");



/**
 * Activates the module profile with the given name. If changes are detected on an open Module Management window and shouldForce is false, a
 * {@link ConfirmActivateProfileForm} will be rendered instead to prevent losing unfinished work.
 * @param {string} profileName - The name of the module profile to activate.
 * @param {boolean} [shouldForce=false] - When true, will activate the profile without checking if the user will lose any unsaved work.
 * @returns {Application} - The confirmation Application when the user has work that may be overridden.
 */
function activateProfile(profileName, shouldForce = false) {
    if (!profileName) {
        const errorMessage = 'Unable to activate profile. Profile name undefined.';
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    const activeProfile = _settings__WEBPACK_IMPORTED_MODULE_1__.getActiveProfile();
    if (!shouldForce && _ui_module_management_scripts__WEBPACK_IMPORTED_MODULE_0__.isModuleManagementWindowOpen() && _ui_module_management_scripts__WEBPACK_IMPORTED_MODULE_0__.unsavedChangesExistOn(activeProfile.name)) {
        return new _classes_ConfirmActivateProfileForm__WEBPACK_IMPORTED_MODULE_2__["default"](profileName).render(true);
    }
    else {
        _settings__WEBPACK_IMPORTED_MODULE_1__.activateProfile(profileName);
    }
}


/***/ }),

/***/ "./src/main/scripts/settings-utils.ts":
/*!********************************************!*\
  !*** ./src/main/scripts/settings-utils.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_PROFILE_NAME": () => (/* binding */ DEFAULT_PROFILE_NAME),
/* harmony export */   "MODULE_ID": () => (/* binding */ MODULE_ID),
/* harmony export */   "TEMPLATES_PATH": () => (/* binding */ TEMPLATES_PATH),
/* harmony export */   "getActiveProfileName": () => (/* binding */ getActiveProfileName),
/* harmony export */   "getProfiles": () => (/* binding */ getProfiles),
/* harmony export */   "registerAPI": () => (/* binding */ registerAPI),
/* harmony export */   "registerMenus": () => (/* binding */ registerMenus),
/* harmony export */   "registerSettings": () => (/* binding */ registerSettings),
/* harmony export */   "reloadWindow": () => (/* binding */ reloadWindow),
/* harmony export */   "resetProfiles": () => (/* binding */ resetProfiles),
/* harmony export */   "setActiveProfileName": () => (/* binding */ setActiveProfileName),
/* harmony export */   "setProfiles": () => (/* binding */ setProfiles)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/ManageModuleProfilesSettingsForm */ "./src/main/classes/ManageModuleProfilesSettingsForm.ts");


const MODULE_ID = 'module-profiles';
const TEMPLATES_PATH = `modules/${MODULE_ID}/templates`;
const DEFAULT_PROFILE_NAME = 'Default Profile';
const PROFILES_SETTING = 'profiles';
const ACTIVE_PROFILE_NAME_SETTING = 'activeProfileName';
/**
 * Registers settings for the module. This is only meant to be called on initial game load.
 */
function registerSettings() {
    game.settings.register(MODULE_ID, PROFILES_SETTING, {
        name: 'Profiles',
        hint: 'Existing module profiles',
        default: [buildDefaultProfile()],
        type: Array,
        scope: 'world'
    });
    game.settings.register(MODULE_ID, ACTIVE_PROFILE_NAME_SETTING, {
        name: 'Active Profile Name',
        default: DEFAULT_PROFILE_NAME,
        type: String,
        scope: 'world'
    });
    function buildDefaultProfile() {
        const savedModuleConfiguration = _settings__WEBPACK_IMPORTED_MODULE_0__.getCurrentModuleConfiguration();
        return {
            name: DEFAULT_PROFILE_NAME,
            modules: savedModuleConfiguration
        };
    }
}
/**
 * Registers menus for the module. This is only meant to be called on initial game load.
 */
function registerMenus() {
    game.settings.registerMenu(MODULE_ID, 'manageProfiles', {
        name: 'Manage Profiles',
        label: 'Manage Profiles',
        icon: 'fas fa-cog',
        type: _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_1__["default"],
        restricted: true
    });
}
/**
 * Registers an API for the current module, accessible by `game.modules.get(MODULE_ID).api.*function()*`. This is meant to be called only on initial game load.
 * @param {Record<string, Function>} api - The API to expose.
 * @returns {void}
 */
function registerAPI(api) {
    // @ts-ignore - Not recognized due to Foundry object
    game.modules.get(MODULE_ID).api = api;
}
/**
 * Reloads the current window.
 * @returns {void}
 */
function reloadWindow() {
    window.location.reload();
}
/**
 * Get the Profiles game setting.
 * @return {ModuleProfile[]} - The value of the game setting.
 */
function getProfiles() {
    return game.settings.get(MODULE_ID, PROFILES_SETTING);
}
/**
 * Set the Profiles game setting.
 * @param {ModuleProfile[]} profiles - The value to save to the game setting.
 * @return {Promise<ModuleProfile[]>} - A Promise resolving to the new game setting value.
 */
async function setProfiles(profiles) {
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
function resetProfiles() {
    return game.settings.set(MODULE_ID, PROFILES_SETTING, undefined);
}
/**
 * Get the Active Profile Name game setting.
 * @return {string} - The value of the game setting.
 */
function getActiveProfileName() {
    return game.settings.get(MODULE_ID, ACTIVE_PROFILE_NAME_SETTING);
}
/**
 * Set the Active Profile Name game setting.
 * @param {string} activeProfileName - The value to save to the game setting.
 * @return {Promise<string>} - A Promise resolving to the new game setting value.
 */
function setActiveProfileName(activeProfileName) {
    return game.settings.set(MODULE_ID, ACTIVE_PROFILE_NAME_SETTING, activeProfileName);
}


/***/ }),

/***/ "./src/main/scripts/settings.ts":
/*!**************************************!*\
  !*** ./src/main/scripts/settings.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activateProfile": () => (/* binding */ activateProfile),
/* harmony export */   "createProfile": () => (/* binding */ createProfile),
/* harmony export */   "deleteProfile": () => (/* binding */ deleteProfile),
/* harmony export */   "exportAllProfiles": () => (/* binding */ exportAllProfiles),
/* harmony export */   "exportProfileByName": () => (/* binding */ exportProfileByName),
/* harmony export */   "getActiveProfile": () => (/* binding */ getActiveProfile),
/* harmony export */   "getAllProfiles": () => (/* binding */ getAllProfiles),
/* harmony export */   "getCurrentModuleConfiguration": () => (/* binding */ getCurrentModuleConfiguration),
/* harmony export */   "getProfileByName": () => (/* binding */ getProfileByName),
/* harmony export */   "importProfiles": () => (/* binding */ importProfiles),
/* harmony export */   "registerModuleSettings": () => (/* binding */ registerModuleSettings),
/* harmony export */   "resetProfiles": () => (/* binding */ resetProfiles),
/* harmony export */   "saveChangesToProfile": () => (/* binding */ saveChangesToProfile),
/* harmony export */   "setCoreModuleConfiguration": () => (/* binding */ setCoreModuleConfiguration)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _settings_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings-utils */ "./src/main/scripts/settings-utils.ts");
/* harmony import */ var _mapping_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mapping-utils */ "./src/main/scripts/mapping-utils.ts");
/* harmony import */ var _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../classes/ManageModuleProfilesSettingsForm */ "./src/main/classes/ManageModuleProfilesSettingsForm.ts");




function registerModuleSettings() {
    _settings_utils__WEBPACK_IMPORTED_MODULE_1__.registerSettings();
    _settings_utils__WEBPACK_IMPORTED_MODULE_1__.registerMenus();
    const profiles = _settings__WEBPACK_IMPORTED_MODULE_0__.getAllProfiles();
    if (!profiles || profiles.length === 0) {
        _settings__WEBPACK_IMPORTED_MODULE_0__.resetProfiles();
    }
}
/**
 * Gets the currently active modules from the core game settings.
 * @returns {ModuleInfo[]} - The currently-active module configuration.
 */
function getCurrentModuleConfiguration() {
    return Array.from(game.modules).map(([key, value]) => ({
        id: key,
        title: value.data.title,
        isActive: value.active
    })).sort((a, b) => a.title.localeCompare(b.title));
}
/**
 * Gets all saved module profiles from the game settings.
 * @returns {ModuleProfile[]}
 */
function getAllProfiles() {
    return _settings_utils__WEBPACK_IMPORTED_MODULE_1__.getProfiles();
}
/**
 * Gets the saved, currently-active module profile from the game settings.
 * @returns {ModuleProfile} - The currently-active module profile.
 */
function getActiveProfile() {
    const activeProfileName = _settings_utils__WEBPACK_IMPORTED_MODULE_1__.getActiveProfileName();
    const activeProfile = _settings__WEBPACK_IMPORTED_MODULE_0__.getProfileByName(activeProfileName);
    if (!activeProfile) {
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
function getProfileByName(profileName) {
    const profiles = _settings__WEBPACK_IMPORTED_MODULE_0__.getAllProfiles();
    return profiles.find(profile => profile.name === profileName);
}
/**
 * Gets the array of saved profiles from the game settings in JSON format.
 * @return {string} - The JSON representation of the profile.
 */
function exportAllProfiles() {
    return JSON.stringify(_settings__WEBPACK_IMPORTED_MODULE_0__.getAllProfiles(), null, 2);
}
/**
 * Gets a saved profile from the game settings in JSON format.
 * @param {string} profileName - The name of the profile to return.
 * @return {string | undefined} - The JSON representation of the profile, or `undefined` if none exists.
 */
function exportProfileByName(profileName) {
    const profile = _settings__WEBPACK_IMPORTED_MODULE_0__.getProfileByName(profileName);
    return profile ? JSON.stringify(profile, null, 2) : profile;
}
/**
 * Creates a new {@link ModuleProfile} in the game settings.
 * @param {string} profileName - The name of the profile to create.
 * @param {ModuleInfo[]} modules - The Array of {@link ModuleInfo} objects that represent each module's activation status.
 * @returns {Promise<ModuleProfile[]>} - The new Array of {@link ModuleProfile}s.
 * @throws Error - When a profile exists with the given profileName
 */
async function createProfile(profileName, modules) {
    if (!profileName) {
        const postfix = profileName === '' ? 'Profile name must not be empty.' : 'Profile name is undefined.';
        const errorMessage = `Unable to create module profile. ${postfix}`;
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    if (!modules) {
        const errorMessage = 'Unable to create module profile. Please refresh the page and try again.';
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    if (_settings__WEBPACK_IMPORTED_MODULE_0__.getProfileByName(profileName)) {
        const errorMessage = `Unable to create module profile. Profile "${profileName}" already exists!`;
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    const profiles = _settings__WEBPACK_IMPORTED_MODULE_0__.getAllProfiles();
    profiles.push({ name: profileName, modules: modules });
    const response = _settings_utils__WEBPACK_IMPORTED_MODULE_1__.setProfiles(profiles);
    response.then(() => Hooks.callAll(_classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__.MODULE_PROFILES_UPDATED_HOOK_NAME));
    ui.notifications.info(`Profile "${profileName}" has been created!`);
    return response;
}
/**
 * Creates a {@link ModuleProfile} or multiple module profiles out of a JSON representation of those profiles.
 * @param {string} json - The JSON representation of a {@link ModuleProfile} or an Array of {@link ModuleProfile}[] objects.
 * @return {Promise<ModuleProfile[]>} - The saved array of module profiles in the game settings.
 */
async function importProfiles(json) {
    let profiles = JSON.parse(json);
    if (!Array.isArray(profiles)) {
        profiles = [profiles];
    }
    if (profiles.some(profile => !isValidModuleProfile(profile))) {
        const errorMessage = 'Unable to import profiles. Please re-export and try again.';
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    // Written this way to continue trying to create profiles, even when a previous profile could not be created
    for (const profile of profiles) {
        try {
            await _settings__WEBPACK_IMPORTED_MODULE_0__.createProfile(profile.name, profile.modules);
        }
        catch (ignored) { }
    }
    return _settings__WEBPACK_IMPORTED_MODULE_0__.getAllProfiles();
    function isValidModuleProfile(profile) {
        if (!profile || !profile.name || !profile.modules) {
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
async function activateProfile(profileName) {
    const profile = _settings__WEBPACK_IMPORTED_MODULE_0__.getProfileByName(profileName);
    if (!profile) {
        const errorMessage = `Unable to activate module profile. Profile "${profileName}" does not exist!`;
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    _settings_utils__WEBPACK_IMPORTED_MODULE_1__.setActiveProfileName(profile.name)
        .then(() => _settings__WEBPACK_IMPORTED_MODULE_0__.setCoreModuleConfiguration(profile.modules))
        .then(() => _settings_utils__WEBPACK_IMPORTED_MODULE_1__.reloadWindow());
}
/**
 * Saves the current profile settings to an existing profile.
 * @param {string} profileName - The name of the profile to update.
 * @param {ModuleInfo[]} modules - The Array of {@link ModuleInfo} objects that represent each module's activation status.
 * @returns {Promise<ModuleProfile[]>} - The new Array of module profiles.
 * @throws Error - When a profile name is passed and no profiles exist with that name.
 */
async function saveChangesToProfile(profileName, modules) {
    const savedProfiles = _settings__WEBPACK_IMPORTED_MODULE_0__.getAllProfiles();
    const matchingProfileIndex = savedProfiles.findIndex(profile => profile.name === profileName);
    if (!savedProfiles[matchingProfileIndex]) {
        const errorMessage = `Unable to save module profile changes. Profile "${profileName}" does not exist!`;
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    savedProfiles[matchingProfileIndex] = { name: profileName, modules: modules };
    const response = _settings_utils__WEBPACK_IMPORTED_MODULE_1__.setProfiles(savedProfiles);
    response.then(() => Hooks.callAll(_classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__.MODULE_PROFILES_UPDATED_HOOK_NAME));
    ui.notifications.info(`Changes to profile "${profileName}" have been saved!`);
    return response;
}
/**
 * Deletes the profile with the given name. When the currently-active profile is deleted, the first profile is selected.
 * @param {string} profileName - The name of the profile to delete.
 * @return {Promise<ModuleProfile[] | undefined>} - The resulting value of the updated profiles setting, or `undefined` if no profiles remain.
 * @throws {Error} - When no profile with the given name exists.
 */
async function deleteProfile(profileName) {
    if (!_settings__WEBPACK_IMPORTED_MODULE_0__.getProfileByName(profileName)) {
        const errorMessage = `Unable to delete module profile. Profile "${profileName}" does not exist!`;
        ui.notifications.error(errorMessage);
        throw new Error(errorMessage);
    }
    const profilesToSave = _settings__WEBPACK_IMPORTED_MODULE_0__.getAllProfiles().filter(profile => profile.name !== profileName);
    const response = _settings_utils__WEBPACK_IMPORTED_MODULE_1__.setProfiles(profilesToSave);
    if (profilesToSave.length === 0) {
        await _settings__WEBPACK_IMPORTED_MODULE_0__.resetProfiles();
        return;
    }
    if (profileName === _settings_utils__WEBPACK_IMPORTED_MODULE_1__.getActiveProfileName()) {
        await _settings_utils__WEBPACK_IMPORTED_MODULE_1__.setActiveProfileName(profilesToSave[0].name);
    }
    response.then(() => Hooks.callAll(_classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__.MODULE_PROFILES_UPDATED_HOOK_NAME));
    ui.notifications.info(`Profile "${profileName}" has been deleted!`);
    return response;
}
/**
 * Reset all module profiles to the default values. WARNING: Doing this leads to unrecoverable data loss.
 * @return {Promise<void>}
 */
async function resetProfiles() {
    await _settings_utils__WEBPACK_IMPORTED_MODULE_1__.resetProfiles()
        .then(() => _settings_utils__WEBPACK_IMPORTED_MODULE_1__.setActiveProfileName(_settings_utils__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_PROFILE_NAME))
        .then(() => _settings_utils__WEBPACK_IMPORTED_MODULE_1__.reloadWindow());
}
async function setCoreModuleConfiguration(moduleInfos) {
    const moduleInfosToSave = _mapping_utils__WEBPACK_IMPORTED_MODULE_2__.mapToModuleKeyIsActiveRecord(moduleInfos);
    const coreModuleConfiguration = game.settings.get('core', 'moduleConfiguration');
    const mergedConfiguration = { ...coreModuleConfiguration, ...moduleInfosToSave };
    return await game.settings.set('core', 'moduleConfiguration', mergedConfiguration);
}


/***/ }),

/***/ "./src/main/scripts/ui/module-management-scripts.ts":
/*!**********************************************************!*\
  !*** ./src/main/scripts/ui/module-management-scripts.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkUpdateActiveProfileStatuses": () => (/* binding */ checkUpdateActiveProfileStatuses),
/* harmony export */   "isModuleManagementWindowOpen": () => (/* binding */ isModuleManagementWindowOpen),
/* harmony export */   "modifyModuleManagementRender": () => (/* binding */ modifyModuleManagementRender),
/* harmony export */   "refreshStatusElementsOnDependenciesClose": () => (/* binding */ refreshStatusElementsOnDependenciesClose),
/* harmony export */   "unsavedChangesExistOn": () => (/* binding */ unsavedChangesExistOn)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _mapping_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mapping-utils */ "./src/main/scripts/mapping-utils.ts");
/* harmony import */ var _module_management_scripts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module-management-scripts */ "./src/main/scripts/ui/module-management-scripts.ts");
/* harmony import */ var _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../classes/ManageModuleProfilesSettingsForm */ "./src/main/classes/ManageModuleProfilesSettingsForm.ts");
/* harmony import */ var _classes_CreateModuleProfileForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../classes/CreateModuleProfileForm */ "./src/main/classes/CreateModuleProfileForm.ts");





const MODULE_MANAGEMENT_WINDOW_ID = 'module-management';
// TODO - Needs to be a separate function just for closeDialog instances. updateActiveProfileStatuses() should be exposed and performed when things are changed
function refreshStatusElementsOnDependenciesClose(app) {
    if (app.data.title === 'Dependencies') {
        updateAllStatusElements();
    }
}
// TODO - definitely test and rename ^^ that method accordingly
function checkUpdateActiveProfileStatuses() {
    if (_module_management_scripts__WEBPACK_IMPORTED_MODULE_2__.isModuleManagementWindowOpen()) {
        updateAllStatusElements();
    }
}
/**
 * Determines if changes exist on the Module Management window that don't align with a given profile.
 * @param {string} profileName
 * @returns {boolean} - Whether unsaved changes exist on the profile with the given name.
 */
function unsavedChangesExistOn(profileName) {
    const savedProfile = _settings__WEBPACK_IMPORTED_MODULE_0__.getProfileByName(profileName);
    if (!savedProfile) {
        return false;
    }
    const unsavedModuleInfos = findUnsavedModuleInfos();
    return unsavedModuleInfos.some(unsavedModuleInfo => {
        const savedModuleInfo = savedProfile.modules.find(savedModuleInfo => savedModuleInfo.id === unsavedModuleInfo.id);
        return unsavedModuleInfo.isActive !== savedModuleInfo?.isActive;
    });
    // return Object.entries(unsavedModuleInfos).some(([moduleId, unsavedStatus]) => savedProfile.modules[moduleId] !== unsavedStatus);
}
/**
 * Determines if the Module Management window is open.
 * @returns {boolean} - Whether the Module Management window is open.
 */
function isModuleManagementWindowOpen() {
    return document.getElementById(MODULE_MANAGEMENT_WINDOW_ID) != null;
}
// TODO - test all
function modifyModuleManagementRender(app, html, data) {
    if (game.user?.isGM) {
        addFooterElements();
        modifyModuleListElements();
        updateAllStatusElements();
    }
    function addFooterElements() {
        // Create the elements
        const preFooterDiv = document.createElement('div');
        preFooterDiv.classList.add('module-profiles-footer-row');
        const statusButton = buildStatusButton();
        const saveCurrentConfigurationButton = buildCreateModuleProfileButton();
        const manageProfilesButton = buildManageProfilesButton();
        preFooterDiv.append(statusButton, saveCurrentConfigurationButton, manageProfilesButton);
        // Add elements just below the module list
        const moduleList = document.getElementById('module-list');
        console.log('module-list: ');
        console.log(moduleList);
        moduleList.after(preFooterDiv);
        // Update status of status buttons
        updateProfileStatusButtons();
        // Update the height of the window with the new elements
        forceModuleManagementWindowHeightResize();
        function buildStatusButton() {
            const activeProfile = _settings__WEBPACK_IMPORTED_MODULE_0__.getActiveProfile();
            const statusButton = document.createElement('button');
            statusButton.type = 'button'; // TODO - prevents submission, therefore reloading page? (any button with type="submit" automatically submits form)
            statusButton.classList.add('module-profiles-status-button');
            statusButton.style.flexBasis = '130%';
            statusButton.dataset.profileName = activeProfile.name; // TODO - make this a little more... easier to find? idk
            statusButton.addEventListener('click', (event) => {
                event.preventDefault();
                const moduleInfos = findUnsavedModuleInfos();
                _settings__WEBPACK_IMPORTED_MODULE_0__.saveChangesToProfile(activeProfile.name, moduleInfos)
                    .then(() => updateProfileStatusButtons());
            });
            return statusButton;
        }
        function buildCreateModuleProfileButton() {
            const createModuleProfileButton = document.createElement('button');
            createModuleProfileButton.type = 'button'; // TODO - prevents submission, therefore reloading page? (any button with type="submit" automatically
            // submits form)
            createModuleProfileButton.innerHTML = '<i class="fa fa-plus"></i> Create Module Profile</button>';
            createModuleProfileButton.style.flexBasis = '80%';
            createModuleProfileButton.addEventListener('click', () => new _classes_CreateModuleProfileForm__WEBPACK_IMPORTED_MODULE_4__["default"]().render(true));
            return createModuleProfileButton;
        }
        function buildManageProfilesButton() {
            const manageProfilesButton = document.createElement('button');
            manageProfilesButton.type = 'button'; // TODO - prevents submission, therefore reloading page? (any button with type="submit" automatically submits
            // form)
            manageProfilesButton.innerHTML = '<i class="fa fa-cog"></i> Manage Module Profiles</button>';
            manageProfilesButton.addEventListener('click', (event) => {
                event.preventDefault();
                new _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__["default"]().render(true);
            });
            return manageProfilesButton;
        }
        // TODO - combine with 'forceManageModuleProfilesHeightResize'?
        function forceModuleManagementWindowHeightResize() {
            Object.values(ui.windows)
                .filter(app => app.options.id === MODULE_MANAGEMENT_WINDOW_ID)
                .forEach(app => app.element[0].style.height = 'auto');
        }
    }
    function modifyModuleListElements() {
        const moduleElements = document.querySelectorAll('#module-management li[data-module-name]');
        // Add status blinkers and add an "update" event listener to each module in the list
        moduleElements.forEach(module => {
            let statusBlinkerContainer = createModuleStatusBlinker();
            if (module.children.length > 0) {
                module.children[0].prepend(statusBlinkerContainer);
                module.addEventListener('input', () => updateAllStatusElements());
            }
            else {
                console.log(module);
            }
        });
        function createModuleStatusBlinker() {
            const span = document.createElement('span');
            span.classList.add('module-profiles-status-container');
            span.innerHTML = '<span class="module-profiles-status module-profiles-status-saved"></span>';
            return span;
        }
    }
}
function updateAllStatusElements() {
    const activeProfile = _settings__WEBPACK_IMPORTED_MODULE_0__.getActiveProfile();
    const modules = document.querySelectorAll('#module-management li[data-module-name]');
    modules.forEach(module => {
        if (module.children[0]?.children[1]?.children[0]) // TODO - appropriately handle this
         {
            const statusBlinker = module.children[0].children[0].firstChild;
            const checkbox = module.children[0].children[1].children[0];
            // @ts-ignore - 'name' field exists on Foundry checkboxes with the given module IDs
            const matchingModuleInfo = activeProfile.modules.find(module => module.id === checkbox.attributes.name.value);
            if (matchingModuleInfo && matchingModuleInfo.isActive === checkbox.checked) {
                statusBlinker.classList.remove('module-profiles-status-changed');
                statusBlinker.classList.add('module-profiles-status-saved');
            }
            else {
                statusBlinker.classList.remove('module-profiles-status-saved');
                statusBlinker.classList.add('module-profiles-status-changed');
            }
        }
    });
    updateProfileStatusButtons();
}
function updateProfileStatusButtons() {
    const activeProfile = _settings__WEBPACK_IMPORTED_MODULE_0__.getActiveProfile();
    const isUpToDate = !_module_management_scripts__WEBPACK_IMPORTED_MODULE_2__.unsavedChangesExistOn(activeProfile.name);
    const profileButtons = document.getElementsByClassName('module-profiles-status-button');
    Array.from(profileButtons).forEach(button => {
        const buttonProfileName = button.dataset.profileName;
        if (isUpToDate) {
            button.style.backgroundColor = '';
            button.innerHTML = `<i class="fa fa-check-circle" style="color: mediumseagreen"></i><b>${(buttonProfileName)}</b> is up to date`;
        }
        else {
            button.style.backgroundColor = 'orangered';
            button.innerHTML = `<i class="far fa-save"></i> Save changes to <b>${(buttonProfileName)}</b>`;
        }
        button.disabled = isUpToDate;
    });
}
function findUnsavedModuleInfos() {
    const moduleCheckboxes = document.getElementById('module-list').querySelectorAll('input[type=checkbox]');
    const activeModuleIds = Array.from(moduleCheckboxes)
        .filter(checkbox => checkbox.checked)
        // @ts-ignore - 'name' field exists on Foundry checkboxes with the given module IDs
        .map(checkbox => checkbox.attributes.name.value);
    const inactiveModuleIds = Array.from(moduleCheckboxes)
        .filter(checkbox => !checkbox.checked)
        // @ts-ignore - 'name' field exists on Foundry checkboxes with the given module IDs
        .map(checkbox => checkbox.attributes.name.value);
    const moduleList = {};
    activeModuleIds.forEach(moduleId => moduleList[moduleId] = true);
    inactiveModuleIds.forEach(moduleId => moduleList[moduleId] = false);
    return _mapping_utils__WEBPACK_IMPORTED_MODULE_1__.mapToModuleInfos(moduleList);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./src/main/scripts/main.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./src/main/scripts/settings.ts");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./src/main/scripts/api.ts");
/* harmony import */ var _ui_module_management_scripts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/module-management-scripts */ "./src/main/scripts/ui/module-management-scripts.ts");
/* harmony import */ var _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../classes/ManageModuleProfilesSettingsForm */ "./src/main/classes/ManageModuleProfilesSettingsForm.ts");




// Module setup
Hooks.once('ready', _settings__WEBPACK_IMPORTED_MODULE_0__.registerModuleSettings);
Hooks.once('ready', _api__WEBPACK_IMPORTED_MODULE_1__.registerApi);
// Module Management window hooks
Hooks.on('renderModuleManagement', _ui_module_management_scripts__WEBPACK_IMPORTED_MODULE_2__.modifyModuleManagementRender);
Hooks.on('closeDialog', _ui_module_management_scripts__WEBPACK_IMPORTED_MODULE_2__.refreshStatusElementsOnDependenciesClose);
Hooks.on(_classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__.MODULE_PROFILES_UPDATED_HOOK_NAME, _ui_module_management_scripts__WEBPACK_IMPORTED_MODULE_2__.checkUpdateActiveProfileStatuses);
// Module Profiles Management window hooks
Hooks.on(_classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__.MODULE_PROFILES_UPDATED_HOOK_NAME, _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__.reRenderManageModuleProfilesWindows);
Hooks.on(_classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__.RENDER_HOOK_NAME, _classes_ManageModuleProfilesSettingsForm__WEBPACK_IMPORTED_MODULE_3__.forceManageModuleProfilesHeightResize);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUNuRCxvQkFBb0IsNkNBQWU7QUFDbkM7QUFDQSxtQ0FBbUMsdUZBQW9EO0FBQ3ZGLHdCQUF3QixtR0FBZ0U7QUFDeEYsU0FBUyx3R0FBMkUsRUFBRSwyRkFBd0Q7QUFDOUk7QUFDQSxTQUFTLHdHQUEyRSxFQUFFLDBHQUE2RTtBQUNuSyxTQUFTLHVGQUEwRCxFQUFFLDRHQUErRSIsInNvdXJjZXMiOlsid2VicGFjazovL21vZHVsZS1wcm9maWxlcy8uL3NyYy9tYWluL2NsYXNzZXMvQ29uZmlybUFjdGl2YXRlUHJvZmlsZUZvcm0udHMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzLy4vc3JjL21haW4vY2xhc3Nlcy9Db25maXJtRGVsZXRlUHJvZmlsZUZvcm0udHMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzLy4vc3JjL21haW4vY2xhc3Nlcy9DcmVhdGVNb2R1bGVQcm9maWxlRm9ybS50cyIsIndlYnBhY2s6Ly9tb2R1bGUtcHJvZmlsZXMvLi9zcmMvbWFpbi9jbGFzc2VzL0VkaXRNb2R1bGVQcm9maWxlRm9ybS50cyIsIndlYnBhY2s6Ly9tb2R1bGUtcHJvZmlsZXMvLi9zcmMvbWFpbi9jbGFzc2VzL0ltcG9ydE1vZHVsZVByb2ZpbGVGb3JtLnRzIiwid2VicGFjazovL21vZHVsZS1wcm9maWxlcy8uL3NyYy9tYWluL2NsYXNzZXMvTWFuYWdlTW9kdWxlUHJvZmlsZXNTZXR0aW5nc0Zvcm0udHMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzLy4vc3JjL21haW4vc2NyaXB0cy9hcGkudHMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzLy4vc3JjL21haW4vc2NyaXB0cy9tYXBwaW5nLXV0aWxzLnRzIiwid2VicGFjazovL21vZHVsZS1wcm9maWxlcy8uL3NyYy9tYWluL3NjcmlwdHMvcHJvZmlsZS1pbnRlcmFjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzLy4vc3JjL21haW4vc2NyaXB0cy9zZXR0aW5ncy11dGlscy50cyIsIndlYnBhY2s6Ly9tb2R1bGUtcHJvZmlsZXMvLi9zcmMvbWFpbi9zY3JpcHRzL3NldHRpbmdzLnRzIiwid2VicGFjazovL21vZHVsZS1wcm9maWxlcy8uL3NyYy9tYWluL3NjcmlwdHMvdWkvbW9kdWxlLW1hbmFnZW1lbnQtc2NyaXB0cy50cyIsIndlYnBhY2s6Ly9tb2R1bGUtcHJvZmlsZXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbW9kdWxlLXByb2ZpbGVzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tb2R1bGUtcHJvZmlsZXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tb2R1bGUtcHJvZmlsZXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tb2R1bGUtcHJvZmlsZXMvLi9zcmMvbWFpbi9zY3JpcHRzL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2V0dGluZ3MgZnJvbSAnLi4vc2NyaXB0cy9zZXR0aW5ncyc7XHJcbmltcG9ydCAqIGFzIFByb2ZpbGVJbnRlcmFjdGlvbnMgZnJvbSAnLi4vc2NyaXB0cy9wcm9maWxlLWludGVyYWN0aW9ucyc7XHJcbmltcG9ydCB7IFRFTVBMQVRFU19QQVRIIH0gZnJvbSAnLi4vc2NyaXB0cy9zZXR0aW5ncy11dGlscyc7XHJcbi8qKlxyXG4gKiBBIEZvcm1BcHBsaWNhdGlvbiB0byBiZSByZW5kZXJlZCB3aGVuIHlvdSB3YW50IGEgdXNlcidzIGNvbmZpcm1hdGlvbiB0aGF0IHllcywgaW4gZmFjdCwgdGhleSAqZG8qIHdhbnQgdG8gYWN0aXZhdGUgc2FpZCBwcm9maWxlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlybUFjdGl2YXRlUHJvZmlsZUZvcm0gZXh0ZW5kcyBGb3JtQXBwbGljYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IocHJvZmlsZU5hbWVUb0FjdGl2YXRlLCBvYmplY3QgPSB7fSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgc3VwZXIob2JqZWN0LCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLnByb2ZpbGVOYW1lVG9BY3RpdmF0ZSA9IHByb2ZpbGVOYW1lVG9BY3RpdmF0ZTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdE9wdGlvbnMoKSB7XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gc3VwZXIuZGVmYXVsdE9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgcGFyZW50Q2xhc3NlcyA9IHBhcmVudD8uY2xhc3NlcyA/PyBbXTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5wYXJlbnQsXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IFsuLi5wYXJlbnRDbGFzc2VzLCAnbW9kdWxlLXByb2ZpbGVzLWZvcm0nXSxcclxuICAgICAgICAgICAgaWQ6ICdtb2R1bGUtcHJvZmlsZXMtY29uZmlybS1hY3RpdmF0ZS1wcm9maWxlJyxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IGAke1RFTVBMQVRFU19QQVRIfS9jb25maXJtLWFjdGl2YXRlLXByb2ZpbGUuaGJzYCxcclxuICAgICAgICAgICAgdGl0bGU6ICdDb25maXJtIEFjdGl2YXRlIFByb2ZpbGUnLFxyXG4gICAgICAgICAgICB3aWR0aDogNjYwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldERhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcHJvZmlsZU5hbWVUb0FjdGl2YXRlOiB0aGlzLnByb2ZpbGVOYW1lVG9BY3RpdmF0ZSxcclxuICAgICAgICAgICAgYWN0aXZlUHJvZmlsZU5hbWU6IFNldHRpbmdzLmdldEFjdGl2ZVByb2ZpbGUoKS5uYW1lXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGFzeW5jIF91cGRhdGVPYmplY3QoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQ/LnN1Ym1pdHRlcj8uaWQgPT09ICdtb2R1bGVQcm9maWxlc0FjdGl2YXRlUHJvZmlsZVN1Ym1pdCcpIHtcclxuICAgICAgICAgICAgUHJvZmlsZUludGVyYWN0aW9ucy5hY3RpdmF0ZVByb2ZpbGUodGhpcy5wcm9maWxlTmFtZVRvQWN0aXZhdGUsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBTZXR0aW5ncyBmcm9tICcuLi9zY3JpcHRzL3NldHRpbmdzJztcclxuaW1wb3J0IHsgVEVNUExBVEVTX1BBVEggfSBmcm9tICcuLi9zY3JpcHRzL3NldHRpbmdzLXV0aWxzJztcclxuLyoqXHJcbiAqIEEgRm9ybUFwcGxpY2F0aW9uIHRvIGJlIHJlbmRlcmVkIHdoZW4geW91IHdhbnQgYSB1c2VyJ3MgY29uZmlybWF0aW9uIHRoYXQgeWVzLCBpbiBmYWN0LCB0aGV5ICpkbyogd2FudCB0byBkZWxldGUgc2FpZCBwcm9maWxlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlybURlbGV0ZVByb2ZpbGVGb3JtIGV4dGVuZHMgRm9ybUFwcGxpY2F0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKHByb2ZpbGVOYW1lVG9EZWxldGUsIG9iamVjdCA9IHt9LCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBzdXBlcihvYmplY3QsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMucHJvZmlsZU5hbWVUb0RlbGV0ZSA9IHByb2ZpbGVOYW1lVG9EZWxldGU7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRPcHRpb25zKCkge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHN1cGVyLmRlZmF1bHRPcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IHBhcmVudENsYXNzZXMgPSBwYXJlbnQ/LmNsYXNzZXMgPz8gW107XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4ucGFyZW50LFxyXG4gICAgICAgICAgICBjbGFzc2VzOiBbLi4ucGFyZW50Q2xhc3NlcywgJ21vZHVsZS1wcm9maWxlcy1mb3JtJ10sXHJcbiAgICAgICAgICAgIGlkOiAnbW9kdWxlLXByb2ZpbGVzLWNvbmZpcm0tZGVsZXRlLXByb2ZpbGUnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYCR7VEVNUExBVEVTX1BBVEh9L2NvbmZpcm0tZGVsZXRlLXByb2ZpbGUuaGJzYCxcclxuICAgICAgICAgICAgdGl0bGU6ICdDb25maXJtIERlbGV0ZSBQcm9maWxlJyxcclxuICAgICAgICAgICAgd2lkdGg6IDY2MFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBnZXREYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHByb2ZpbGVOYW1lVG9EZWxldGU6IHRoaXMucHJvZmlsZU5hbWVUb0RlbGV0ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyBUT0RPIC0gYnVnLCBuYW1lIGZvciBidXR0b24gb24gbW9kdWxlIG1hbmFnZW1lbnQgZG9lcyBub3QgdXBkYXRlIHdoZW4gYWN0aXZlIHByb2ZpbGUgbmFtZSBzd2l0Y2hlc1xyXG4gICAgYXN5bmMgX3VwZGF0ZU9iamVjdChldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudD8uc3VibWl0dGVyPy5pZCA9PT0gJ21vZHVsZVByb2ZpbGVzRGVsZXRlUHJvZmlsZVN1Ym1pdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IFNldHRpbmdzLmRlbGV0ZVByb2ZpbGUodGhpcy5wcm9maWxlTmFtZVRvRGVsZXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgU2V0dGluZ3MgZnJvbSAnLi4vc2NyaXB0cy9zZXR0aW5ncyc7XHJcbmltcG9ydCB7IFRFTVBMQVRFU19QQVRIIH0gZnJvbSAnLi4vc2NyaXB0cy9zZXR0aW5ncy11dGlscyc7XHJcbi8qKlxyXG4gKiBBIEZvcm1BcHBsaWNhdGlvbiB0aGF0IGFsbG93cyBhIHVzZXIgdG8gY3JlYXRlIGEgbmV3IG1vZHVsZSBwcm9maWxlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3JlYXRlTW9kdWxlUHJvZmlsZUZvcm0gZXh0ZW5kcyBGb3JtQXBwbGljYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3Iob2JqZWN0ID0ge30sIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIHN1cGVyKG9iamVjdCwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRPcHRpb25zKCkge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHN1cGVyLmRlZmF1bHRPcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IHBhcmVudENsYXNzZXMgPSBwYXJlbnQ/LmNsYXNzZXMgPz8gW107XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4ucGFyZW50LFxyXG4gICAgICAgICAgICBjbGFzc2VzOiBbLi4ucGFyZW50Q2xhc3NlcywgJ21vZHVsZS1wcm9maWxlcy1mb3JtJ10sXHJcbiAgICAgICAgICAgIGlkOiAnbW9kdWxlLXByb2ZpbGVzLWNyZWF0ZS1tb2R1bGUtcHJvZmlsZScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgJHtURU1QTEFURVNfUEFUSH0vY3JlYXRlLW1vZHVsZS1wcm9maWxlLmhic2AsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnQ3JlYXRlIE5ldyBNb2R1bGUgUHJvZmlsZScsXHJcbiAgICAgICAgICAgIHdpZHRoOiA2NjBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgYWN0aXZhdGVMaXN0ZW5lcnMoaHRtbCkge1xyXG4gICAgICAgIGlmIChodG1sKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLmFjdGl2YXRlTGlzdGVuZXJzKGh0bWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kdWxlUHJvZmlsZXNDcmVhdGVOZXdQcm9maWxlTmFtZScpLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBfdXBkYXRlT2JqZWN0KGV2ZW50LCBmb3JtRGF0YSkge1xyXG4gICAgICAgIGlmIChldmVudD8uc3VibWl0dGVyPy5pZCA9PT0gJ21vZHVsZVByb2ZpbGVzQ3JlYXRlTmV3UHJvZmlsZVN1Ym1pdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IFNldHRpbmdzLmNyZWF0ZVByb2ZpbGUoZm9ybURhdGEubW9kdWxlUHJvZmlsZXNDcmVhdGVOZXdQcm9maWxlTmFtZSwgU2V0dGluZ3MuZ2V0Q3VycmVudE1vZHVsZUNvbmZpZ3VyYXRpb24oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIFNldHRpbmdzIGZyb20gJy4uL3NjcmlwdHMvc2V0dGluZ3MnO1xyXG5pbXBvcnQgKiBhcyBNYXBwaW5nVXRpbHMgZnJvbSAnLi4vc2NyaXB0cy9tYXBwaW5nLXV0aWxzJztcclxuaW1wb3J0IHsgVEVNUExBVEVTX1BBVEggfSBmcm9tICcuLi9zY3JpcHRzL3NldHRpbmdzLXV0aWxzJztcclxuLyoqXHJcbiAqIEEgRm9ybUFwcGxpY2F0aW9uIHRoYXQgYWxsb3dzIGEgdXNlciB0byBlZGl0IGEgbW9kdWxlIHByb2ZpbGUuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0TW9kdWxlUHJvZmlsZUZvcm0gZXh0ZW5kcyBGb3JtQXBwbGljYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IocHJvZmlsZU5hbWUsIG9iamVjdCA9IHt9LCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBzdXBlcihvYmplY3QsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMucHJvZmlsZU5hbWUgPSBwcm9maWxlTmFtZTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdE9wdGlvbnMoKSB7XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gc3VwZXIuZGVmYXVsdE9wdGlvbnM7XHJcbiAgICAgICAgY29uc3QgcGFyZW50Q2xhc3NlcyA9IHBhcmVudD8uY2xhc3NlcyA/PyBbXTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5wYXJlbnQsXHJcbiAgICAgICAgICAgIGNsYXNzZXM6IFsuLi5wYXJlbnRDbGFzc2VzLCAnbW9kdWxlLXByb2ZpbGVzLWZvcm0nXSxcclxuICAgICAgICAgICAgaWQ6ICdtb2R1bGUtcHJvZmlsZXMtZWRpdC1tb2R1bGUtcHJvZmlsZScsXHJcbiAgICAgICAgICAgIHJlc2l6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IGAke1RFTVBMQVRFU19QQVRIfS9lZGl0LW1vZHVsZS1wcm9maWxlLmhic2AsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnRWRpdCBNb2R1bGUgUHJvZmlsZScsXHJcbiAgICAgICAgICAgIHdpZHRoOiA0NTBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZ2V0RGF0YSgpIHtcclxuICAgICAgICBjb25zdCBwcm9maWxlID0gU2V0dGluZ3MuZ2V0UHJvZmlsZUJ5TmFtZSh0aGlzLnByb2ZpbGVOYW1lKTtcclxuICAgICAgICBpZiAoIXByb2ZpbGUpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYFVuYWJsZSB0byBsb2FkIHByb2ZpbGUgXCIke3RoaXMucHJvZmlsZU5hbWV9XCIuIFBsZWFzZSBjbG9zZSB0aGUgd2luZG93IGFuZCB0cnkgYWdhaW4uYDtcclxuICAgICAgICAgICAgdWkubm90aWZpY2F0aW9ucy5lcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb2ZpbGU7XHJcbiAgICB9XHJcbiAgICBhc3luYyBfdXBkYXRlT2JqZWN0KGV2ZW50LCBmb3JtRGF0YSkge1xyXG4gICAgICAgIGlmIChldmVudD8uc3VibWl0dGVyPy5pZCA9PT0gJ21vZHVsZVByb2ZpbGVzRWRpdFByb2ZpbGVTdWJtaXQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBTZXR0aW5ncy5zYXZlQ2hhbmdlc1RvUHJvZmlsZSh0aGlzLnByb2ZpbGVOYW1lLCBNYXBwaW5nVXRpbHMubWFwVG9Nb2R1bGVJbmZvcyhmb3JtRGF0YSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBTZXR0aW5ncyBmcm9tICcuLi9zY3JpcHRzL3NldHRpbmdzJztcclxuaW1wb3J0IHsgVEVNUExBVEVTX1BBVEggfSBmcm9tICcuLi9zY3JpcHRzL3NldHRpbmdzLXV0aWxzJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1wb3J0TW9kdWxlUHJvZmlsZUZvcm0gZXh0ZW5kcyBGb3JtQXBwbGljYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3Iob2JqZWN0ID0ge30sIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIHN1cGVyKG9iamVjdCwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRPcHRpb25zKCkge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHN1cGVyLmRlZmF1bHRPcHRpb25zO1xyXG4gICAgICAgIGNvbnN0IHBhcmVudENsYXNzZXMgPSBwYXJlbnQ/LmNsYXNzZXMgPz8gW107XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4ucGFyZW50LFxyXG4gICAgICAgICAgICBjbGFzc2VzOiBbLi4ucGFyZW50Q2xhc3NlcywgJ21vZHVsZS1wcm9maWxlcy1mb3JtJ10sXHJcbiAgICAgICAgICAgIGlkOiAnbW9kdWxlLXByb2ZpbGVzLWltcG9ydC1tb2R1bGUtcHJvZmlsZScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgJHtURU1QTEFURVNfUEFUSH0vaW1wb3J0LW1vZHVsZS1wcm9maWxlLmhic2AsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnSW1wb3J0IE1vZHVsZSBQcm9maWxlKHMpJyxcclxuICAgICAgICAgICAgaGVpZ2h0OiA4MDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiA2NjBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgYXN5bmMgX3VwZGF0ZU9iamVjdChldmVudCwgZm9ybURhdGEpIHtcclxuICAgICAgICBpZiAoZXZlbnQ/LnN1Ym1pdHRlcj8uaWQgPT09ICdtb2R1bGVQcm9maWxlc0ltcG9ydFByb2ZpbGVTdWJtaXQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTZXR0aW5ncy5pbXBvcnRQcm9maWxlcyhmb3JtRGF0YVsnaW1wb3J0LW1vZHVsZS1wcm9maWxlLXRleHQnXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIFNldHRpbmdzIGZyb20gJy4uL3NjcmlwdHMvc2V0dGluZ3MnO1xyXG5pbXBvcnQgKiBhcyBQcm9maWxlSW50ZXJhY3Rpb25zIGZyb20gJy4uL3NjcmlwdHMvcHJvZmlsZS1pbnRlcmFjdGlvbnMnO1xyXG5pbXBvcnQgQ3JlYXRlTW9kdWxlUHJvZmlsZUZvcm0gZnJvbSAnLi9DcmVhdGVNb2R1bGVQcm9maWxlRm9ybSc7XHJcbmltcG9ydCBDb25maXJtRGVsZXRlUHJvZmlsZUZvcm0gZnJvbSAnLi9Db25maXJtRGVsZXRlUHJvZmlsZUZvcm0nO1xyXG5pbXBvcnQgRWRpdE1vZHVsZVByb2ZpbGVGb3JtIGZyb20gJy4vRWRpdE1vZHVsZVByb2ZpbGVGb3JtJztcclxuaW1wb3J0IEltcG9ydE1vZHVsZVByb2ZpbGVGb3JtIGZyb20gJy4vSW1wb3J0TW9kdWxlUHJvZmlsZUZvcm0nO1xyXG5pbXBvcnQgeyBURU1QTEFURVNfUEFUSCB9IGZyb20gJy4uL3NjcmlwdHMvc2V0dGluZ3MtdXRpbHMnO1xyXG5leHBvcnQgY29uc3QgUkVOREVSX0hPT0tfTkFNRSA9ICdyZW5kZXJNYW5hZ2VNb2R1bGVQcm9maWxlc1NldHRpbmdzRm9ybSc7XHJcbmV4cG9ydCBjb25zdCBNT0RVTEVfUFJPRklMRVNfVVBEQVRFRF9IT09LX05BTUUgPSAnbW9kdWxlUHJvZmlsZXNVcGRhdGVkJztcclxuLyoqXHJcbiAqIEEgRm9ybUFwcGxpY2F0aW9uIHRoYXQgcHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBhIHVzZXIgdG8gbWFuYWdlIG1vZHVsZSBwcm9maWxlcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbmFnZU1vZHVsZVByb2ZpbGVzU2V0dGluZ3NGb3JtIGV4dGVuZHMgRm9ybUFwcGxpY2F0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKG9iamVjdCA9IHt9LCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBzdXBlcihvYmplY3QsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBkZWZhdWx0T3B0aW9ucygpIHtcclxuICAgICAgICBjb25zdCBwYXJlbnQgPSBzdXBlci5kZWZhdWx0T3B0aW9ucztcclxuICAgICAgICBjb25zdCBwYXJlbnRDbGFzc2VzID0gcGFyZW50Py5jbGFzc2VzID8/IFtdO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLnBhcmVudCxcclxuICAgICAgICAgICAgY2xhc3NlczogWy4uLnBhcmVudENsYXNzZXMsICdtb2R1bGUtcHJvZmlsZXMtZm9ybSddLFxyXG4gICAgICAgICAgICBpZDogdGhpcy5GT1JNX0lELFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogYCR7VEVNUExBVEVTX1BBVEh9L21hbmFnZS1wcm9maWxlcy5oYnNgLFxyXG4gICAgICAgICAgICB0aXRsZTogJ01hbmFnZSBNb2R1bGUgUHJvZmlsZXMnLFxyXG4gICAgICAgICAgICB3aWR0aDogNjYwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldERhdGEoKSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlUHJvZmlsZU5hbWUgPSBTZXR0aW5ncy5nZXRBY3RpdmVQcm9maWxlKCkubmFtZTtcclxuICAgICAgICBjb25zdCBwcm9maWxlc1dpdGhBY3RpdmVGbGFnID0gU2V0dGluZ3MuZ2V0QWxsUHJvZmlsZXMoKS5tYXAocHJvZmlsZSA9PiAoe1xyXG4gICAgICAgICAgICAuLi5wcm9maWxlLFxyXG4gICAgICAgICAgICBpc1Byb2ZpbGVBY3RpdmU6IGFjdGl2ZVByb2ZpbGVOYW1lID09PSBwcm9maWxlLm5hbWVcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcHJvZmlsZXM6IHByb2ZpbGVzV2l0aEFjdGl2ZUZsYWdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgYWN0aXZhdGVMaXN0ZW5lcnMoaHRtbCkge1xyXG4gICAgICAgIGlmIChodG1sKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLmFjdGl2YXRlTGlzdGVuZXJzKGh0bWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjcmVhdGVOZXdQcm9maWxlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2R1bGUtcHJvZmlsZXMtbWFuYWdlLXByb2ZpbGVzLWNyZWF0ZS1uZXcnKTtcclxuICAgICAgICBjcmVhdGVOZXdQcm9maWxlRWxlbWVudD8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuZXcgQ3JlYXRlTW9kdWxlUHJvZmlsZUZvcm0oKS5yZW5kZXIodHJ1ZSkpO1xyXG4gICAgICAgIGNvbnN0IGltcG9ydFByb2ZpbGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZHVsZS1wcm9maWxlcy1tYW5hZ2UtcHJvZmlsZXMtaW1wb3J0Jyk7XHJcbiAgICAgICAgaW1wb3J0UHJvZmlsZUVsZW1lbnQ/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgLy8gUHJldmVudHMgd2luZG93IGZyb20gYXV0b21hdGljYWxseSBjbG9zaW5nXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbmV3IEltcG9ydE1vZHVsZVByb2ZpbGVGb3JtKCkucmVuZGVyKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGV4cG9ydEFsbFByb2ZpbGVzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2R1bGUtcHJvZmlsZXMtbWFuYWdlLXByb2ZpbGVzLWV4cG9ydC1hbGwnKTtcclxuICAgICAgICBleHBvcnRBbGxQcm9maWxlc0VsZW1lbnQ/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcclxuICAgICAgICAgICAgLy8gUHJldmVudHMgd2luZG93IGZyb20gYXV0b21hdGljYWxseSBjbG9zaW5nXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgZXhwb3J0ZWRQcm9maWxlcyA9IFNldHRpbmdzLmV4cG9ydEFsbFByb2ZpbGVzKCk7XHJcbiAgICAgICAgICAgIGlmIChleHBvcnRlZFByb2ZpbGVzKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChleHBvcnRlZFByb2ZpbGVzKTtcclxuICAgICAgICAgICAgICAgIHVpLm5vdGlmaWNhdGlvbnMuaW5mbyhgQWxsIHByb2ZpbGVzIGhhdmUgYmVlbiBjb3BpZWQgdG8gY2xpcGJvYXJkIWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgYWN0aXZhdGVQcm9maWxlRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2R1bGUtcHJvZmlsZXMtYWN0aXZhdGUtcHJvZmlsZScpO1xyXG4gICAgICAgIEFycmF5LmZyb20oYWN0aXZhdGVQcm9maWxlRWxlbWVudHMpLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gUHJvZmlsZUludGVyYWN0aW9ucy5hY3RpdmF0ZVByb2ZpbGUoZWxlbWVudC5kYXRhc2V0LnByb2ZpbGVOYW1lKSkpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRQcm9maWxlRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2R1bGUtcHJvZmlsZXMtZWRpdC1wcm9maWxlJyk7XHJcbiAgICAgICAgQXJyYXkuZnJvbShlZGl0UHJvZmlsZUVsZW1lbnRzKS5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG5ldyBFZGl0TW9kdWxlUHJvZmlsZUZvcm0oZWxlbWVudC5kYXRhc2V0LnByb2ZpbGVOYW1lKS5yZW5kZXIodHJ1ZSkpKTtcclxuICAgICAgICBjb25zdCBkdXBsaWNhdGVQcm9maWxlRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2R1bGUtcHJvZmlsZXMtZHVwbGljYXRlLXByb2ZpbGUnKTtcclxuICAgICAgICBBcnJheS5mcm9tKGR1cGxpY2F0ZVByb2ZpbGVFbGVtZW50cykuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2ZpbGUgPSBTZXR0aW5ncy5nZXRQcm9maWxlQnlOYW1lKGVsZW1lbnQuZGF0YXNldC5wcm9maWxlTmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChwcm9maWxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU2V0dGluZ3MuY3JlYXRlUHJvZmlsZShwcm9maWxlLm5hbWUgKyAnIChDb3B5KScsIHByb2ZpbGUubW9kdWxlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgY29uc3QgZXhwb3J0UHJvZmlsZUVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kdWxlLXByb2ZpbGVzLWV4cG9ydC1wcm9maWxlJyk7XHJcbiAgICAgICAgQXJyYXkuZnJvbShleHBvcnRQcm9maWxlRWxlbWVudHMpLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9maWxlTmFtZSA9IGVsZW1lbnQuZGF0YXNldC5wcm9maWxlTmFtZTtcclxuICAgICAgICAgICAgY29uc3QgZXhwb3J0ZWRQcm9maWxlID0gU2V0dGluZ3MuZXhwb3J0UHJvZmlsZUJ5TmFtZShwcm9maWxlTmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChleHBvcnRlZFByb2ZpbGUpIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGV4cG9ydGVkUHJvZmlsZSk7XHJcbiAgICAgICAgICAgICAgICB1aS5ub3RpZmljYXRpb25zLmluZm8oYFByb2ZpbGUgXCIke3Byb2ZpbGVOYW1lfVwiIGNvcGllZCB0byBjbGlwYm9hcmQhYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlUHJvZmlsZUVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kdWxlLXByb2ZpbGVzLWRlbGV0ZS1wcm9maWxlJyk7XHJcbiAgICAgICAgQXJyYXkuZnJvbShkZWxldGVQcm9maWxlRWxlbWVudHMpLmZvckVhY2goKGVsZW1lbnQpID0+IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuZXcgQ29uZmlybURlbGV0ZVByb2ZpbGVGb3JtKGVsZW1lbnQuZGF0YXNldC5wcm9maWxlTmFtZSkucmVuZGVyKHRydWUpKSk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBfdXBkYXRlT2JqZWN0KCkgeyB9XHJcbn1cclxuTWFuYWdlTW9kdWxlUHJvZmlsZXNTZXR0aW5nc0Zvcm0uRk9STV9JRCA9ICdtb2R1bGUtcHJvZmlsZXMtbWFuYWdlLXByb2ZpbGVzJztcclxuLyoqXHJcbiAqIFJlLXJlbmRlcnMgdGhlIE1hbmFnZU1vZHVsZVByb2ZpbGVzIHdpbmRvd3MuIFRoaXMgY2FuIGJlIHVzZWZ1bCBiZWNhdXNlIHByb2ZpbGVzIGNhbiBiZSBhZGRlZC9yZW1vdmVkIHdoaWxlIHRoZSB3aW5kb3cgaXMgb3BlbiwgYW5kIHJlLXJlbmRlcmluZyB0aGVcclxuICogQXBwbGljYXRpb24gaW5zdGFuY2UgcmVmcmVzaGVzIHRoYXQgZGF0YS5cclxuICogQHJldHVybnMge3ZvaWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVSZW5kZXJNYW5hZ2VNb2R1bGVQcm9maWxlc1dpbmRvd3MoKSB7XHJcbiAgICBPYmplY3QudmFsdWVzKHVpLndpbmRvd3MpXHJcbiAgICAgICAgLmZpbHRlcihhcHAgPT4gYXBwLm9wdGlvbnMuaWQgPT09IE1hbmFnZU1vZHVsZVByb2ZpbGVzU2V0dGluZ3NGb3JtLkZPUk1fSUQpXHJcbiAgICAgICAgLmZvckVhY2goYXBwID0+IGFwcC5yZW5kZXIoKSk7XHJcbn1cclxuLyoqXHJcbiAqIEZvcmNlcyB0aGUgYXBwbGljYXRpb24gdG8gcmVmcmVzaCB0aGUgc2l6ZSBvZiBpdHMgZmlyc3QgZWxlbWVudCAoYWthLCB0aGUgd2luZG93IGNvbnRlbnQpLiBUaGlzIGlzIHByaW1hcmlseSB0byBiZSB1c2VkIHdoZW5ldmVyIGFuIEFwcGxpY2F0aW9uIGFkZHMgb3JcclxuICogcmVtb3ZlcyBlbGVtZW50cyBzbyB0aGF0IHRoZSBoZWlnaHQgb2YgdGhlIEFwcGxpY2F0aW9uIGlzIGNvbnNpc3RlbnQgd2l0aCB3aGF0IGlzIGFkZGVkLlxyXG4gKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHAgLSBUaGUgQXBwbGljYXRpb24gdGhhdCBuZWVkcyB0byBiZSByZXNpemVkLlxyXG4gKiBAcmV0dXJucyB7dm9pZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JjZU1hbmFnZU1vZHVsZVByb2ZpbGVzSGVpZ2h0UmVzaXplKGFwcCkge1xyXG4gICAgaWYgKGFwcD8uZWxlbWVudD8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGFwcC5lbGVtZW50WzBdLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBTZXR0aW5ncyBmcm9tICcuL3NldHRpbmdzJztcclxuaW1wb3J0ICogYXMgU2V0dGluZ3NVdGlscyBmcm9tICcuL3NldHRpbmdzLXV0aWxzJztcclxuLyoqXHJcbiAqIFJlZ2lzdGVycyB0aGUgbW9kdWxlJ3MgQVBJLiBUaGlzIGlzIG9ubHkgbWVhbnQgdG8gYmUgY2FsbGVkIG9uIGluaXRpYWwgZ2FtZSBsb2FkLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQXBpKCkge1xyXG4gICAgY29uc3QgYXBpID0ge1xyXG4gICAgICAgIGdldEN1cnJlbnRNb2R1bGVDb25maWd1cmF0aW9uOiBTZXR0aW5ncy5nZXRDdXJyZW50TW9kdWxlQ29uZmlndXJhdGlvbixcclxuICAgICAgICBnZXRBbGxQcm9maWxlczogU2V0dGluZ3MuZ2V0QWxsUHJvZmlsZXMsXHJcbiAgICAgICAgZ2V0QWN0aXZlUHJvZmlsZTogU2V0dGluZ3MuZ2V0QWN0aXZlUHJvZmlsZSxcclxuICAgICAgICBnZXRQcm9maWxlQnlOYW1lOiBTZXR0aW5ncy5nZXRQcm9maWxlQnlOYW1lLFxyXG4gICAgICAgIGV4cG9ydEFsbFByb2ZpbGVzOiBTZXR0aW5ncy5leHBvcnRBbGxQcm9maWxlcyxcclxuICAgICAgICBleHBvcnRQcm9maWxlQnlOYW1lOiBTZXR0aW5ncy5leHBvcnRQcm9maWxlQnlOYW1lLFxyXG4gICAgICAgIGNyZWF0ZVByb2ZpbGU6IFNldHRpbmdzLmNyZWF0ZVByb2ZpbGUsXHJcbiAgICAgICAgaW1wb3J0UHJvZmlsZXM6IFNldHRpbmdzLmltcG9ydFByb2ZpbGVzLFxyXG4gICAgICAgIGFjdGl2YXRlUHJvZmlsZTogU2V0dGluZ3MuYWN0aXZhdGVQcm9maWxlLFxyXG4gICAgICAgIHNhdmVDaGFuZ2VzVG9Qcm9maWxlOiBTZXR0aW5ncy5zYXZlQ2hhbmdlc1RvUHJvZmlsZSxcclxuICAgICAgICBkZWxldGVQcm9maWxlOiBTZXR0aW5ncy5kZWxldGVQcm9maWxlLFxyXG4gICAgICAgIHJlc2V0UHJvZmlsZXM6IFNldHRpbmdzLnJlc2V0UHJvZmlsZXNcclxuICAgIH07XHJcbiAgICBTZXR0aW5nc1V0aWxzLnJlZ2lzdGVyQVBJKGFwaSk7XHJcbn1cclxuIiwiLyoqXHJcbiAqIE1hcHMgYW4gYXJyYXkgb2YgTW9kdWxlSW5mbyBvYmplY3RzIGludG8gYSBSZWNvcmQsIGlkZW50aWNhbCB0byBob3cgdGhlIGNvcmUgbW9kdWxlIGNvbmZpZ3VyYXRpb24gc3RvcmVzIHdoaWNoIG1vZHVsZXMgYXJlIGFjdGl2ZSBhbmQgd2hpY2ggYXJlbid0LlxyXG4gKiBAcGFyYW0ge01vZHVsZUluZm9bXX0gbW9kdWxlSW5mb3NcclxuICogQHJldHVybiB7UmVjb3JkPHN0cmluZywgYm9vbGVhbj59IC0gVGhlIGNvcnJlc3BvbmRpbmcgUmVjb3JkIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBpbnB1dHRlZCBkYXRhLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvTW9kdWxlS2V5SXNBY3RpdmVSZWNvcmQobW9kdWxlSW5mb3MpIHtcclxuICAgIGNvbnN0IHJlY29yZCA9IHt9O1xyXG4gICAgbW9kdWxlSW5mb3MuZm9yRWFjaChtb2R1bGUgPT4gcmVjb3JkW21vZHVsZS5pZF0gPSBtb2R1bGUuaXNBY3RpdmUpO1xyXG4gICAgcmV0dXJuIHJlY29yZDtcclxufVxyXG4vKipcclxuICogTWFwcyBhIFJlY29yZCBpbnRvIGFuIGFycmF5IG9mIG1hdGNoaW5nIE1vZHVsZUluZm8gb2JqZWN0cyBzdG9yZWQgaW4gdGhlIGdhbWUgc2V0dGluZ3MuXHJcbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgYm9vbGVhbj59IG1vZHVsZUlESXNBY3RpdmVSZWNvcmRcclxuICogQHJldHVybiB7TW9kdWxlSW5mb1tdfSAtIFRoZSBjb3JyZXNwb25kaW5nIGFycmF5IG9mIE1vZHVsZUluZm8gb2JqZWN0cyBiYXNlZCBvbiB0aGUgaW5wdXR0ZWQgZGF0YS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXBUb01vZHVsZUluZm9zKG1vZHVsZUlESXNBY3RpdmVSZWNvcmQpIHtcclxuICAgIGNvbnN0IG1vZHVsZUluZm9zID0gW107XHJcbiAgICBPYmplY3QuZW50cmllcyhtb2R1bGVJRElzQWN0aXZlUmVjb3JkKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IG1vZHVsZUluZm9zLnB1c2goe1xyXG4gICAgICAgIGlkOiBrZXksXHJcbiAgICAgICAgdGl0bGU6IGdhbWUubW9kdWxlcy5nZXQoa2V5KT8uZGF0YS50aXRsZSxcclxuICAgICAgICBpc0FjdGl2ZTogdmFsdWVcclxuICAgIH0pKTtcclxuICAgIG1vZHVsZUluZm9zLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICBpZiAoIWEudGl0bGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYi50aXRsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhLnRpdGxlLmxvY2FsZUNvbXBhcmUoYi50aXRsZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtb2R1bGVJbmZvcztcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBNb2R1bGVNYW5hZ2VtZW50U2NyaXB0cyBmcm9tICcuL3VpL21vZHVsZS1tYW5hZ2VtZW50LXNjcmlwdHMnO1xyXG5pbXBvcnQgKiBhcyBTZXR0aW5ncyBmcm9tICcuL3NldHRpbmdzJztcclxuaW1wb3J0IENvbmZpcm1BY3RpdmF0ZVByb2ZpbGVGb3JtIGZyb20gJy4uL2NsYXNzZXMvQ29uZmlybUFjdGl2YXRlUHJvZmlsZUZvcm0nO1xyXG4vKipcclxuICogQWN0aXZhdGVzIHRoZSBtb2R1bGUgcHJvZmlsZSB3aXRoIHRoZSBnaXZlbiBuYW1lLiBJZiBjaGFuZ2VzIGFyZSBkZXRlY3RlZCBvbiBhbiBvcGVuIE1vZHVsZSBNYW5hZ2VtZW50IHdpbmRvdyBhbmQgc2hvdWxkRm9yY2UgaXMgZmFsc2UsIGFcclxuICoge0BsaW5rIENvbmZpcm1BY3RpdmF0ZVByb2ZpbGVGb3JtfSB3aWxsIGJlIHJlbmRlcmVkIGluc3RlYWQgdG8gcHJldmVudCBsb3NpbmcgdW5maW5pc2hlZCB3b3JrLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZmlsZU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgbW9kdWxlIHByb2ZpbGUgdG8gYWN0aXZhdGUuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Nob3VsZEZvcmNlPWZhbHNlXSAtIFdoZW4gdHJ1ZSwgd2lsbCBhY3RpdmF0ZSB0aGUgcHJvZmlsZSB3aXRob3V0IGNoZWNraW5nIGlmIHRoZSB1c2VyIHdpbGwgbG9zZSBhbnkgdW5zYXZlZCB3b3JrLlxyXG4gKiBAcmV0dXJucyB7QXBwbGljYXRpb259IC0gVGhlIGNvbmZpcm1hdGlvbiBBcHBsaWNhdGlvbiB3aGVuIHRoZSB1c2VyIGhhcyB3b3JrIHRoYXQgbWF5IGJlIG92ZXJyaWRkZW4uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGVQcm9maWxlKHByb2ZpbGVOYW1lLCBzaG91bGRGb3JjZSA9IGZhbHNlKSB7XHJcbiAgICBpZiAoIXByb2ZpbGVOYW1lKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ1VuYWJsZSB0byBhY3RpdmF0ZSBwcm9maWxlLiBQcm9maWxlIG5hbWUgdW5kZWZpbmVkLic7XHJcbiAgICAgICAgdWkubm90aWZpY2F0aW9ucy5lcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYWN0aXZlUHJvZmlsZSA9IFNldHRpbmdzLmdldEFjdGl2ZVByb2ZpbGUoKTtcclxuICAgIGlmICghc2hvdWxkRm9yY2UgJiYgTW9kdWxlTWFuYWdlbWVudFNjcmlwdHMuaXNNb2R1bGVNYW5hZ2VtZW50V2luZG93T3BlbigpICYmIE1vZHVsZU1hbmFnZW1lbnRTY3JpcHRzLnVuc2F2ZWRDaGFuZ2VzRXhpc3RPbihhY3RpdmVQcm9maWxlLm5hbWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb25maXJtQWN0aXZhdGVQcm9maWxlRm9ybShwcm9maWxlTmFtZSkucmVuZGVyKHRydWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgU2V0dGluZ3MuYWN0aXZhdGVQcm9maWxlKHByb2ZpbGVOYW1lKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBTZXR0aW5ncyBmcm9tICcuL3NldHRpbmdzJztcclxuaW1wb3J0IE1hbmFnZU1vZHVsZVByb2ZpbGVzU2V0dGluZ3NGb3JtIGZyb20gJy4uL2NsYXNzZXMvTWFuYWdlTW9kdWxlUHJvZmlsZXNTZXR0aW5nc0Zvcm0nO1xyXG5leHBvcnQgY29uc3QgTU9EVUxFX0lEID0gJ21vZHVsZS1wcm9maWxlcyc7XHJcbmV4cG9ydCBjb25zdCBURU1QTEFURVNfUEFUSCA9IGBtb2R1bGVzLyR7TU9EVUxFX0lEfS90ZW1wbGF0ZXNgO1xyXG5leHBvcnQgY29uc3QgREVGQVVMVF9QUk9GSUxFX05BTUUgPSAnRGVmYXVsdCBQcm9maWxlJztcclxuY29uc3QgUFJPRklMRVNfU0VUVElORyA9ICdwcm9maWxlcyc7XHJcbmNvbnN0IEFDVElWRV9QUk9GSUxFX05BTUVfU0VUVElORyA9ICdhY3RpdmVQcm9maWxlTmFtZSc7XHJcbi8qKlxyXG4gKiBSZWdpc3RlcnMgc2V0dGluZ3MgZm9yIHRoZSBtb2R1bGUuIFRoaXMgaXMgb25seSBtZWFudCB0byBiZSBjYWxsZWQgb24gaW5pdGlhbCBnYW1lIGxvYWQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJTZXR0aW5ncygpIHtcclxuICAgIGdhbWUuc2V0dGluZ3MucmVnaXN0ZXIoTU9EVUxFX0lELCBQUk9GSUxFU19TRVRUSU5HLCB7XHJcbiAgICAgICAgbmFtZTogJ1Byb2ZpbGVzJyxcclxuICAgICAgICBoaW50OiAnRXhpc3RpbmcgbW9kdWxlIHByb2ZpbGVzJyxcclxuICAgICAgICBkZWZhdWx0OiBbYnVpbGREZWZhdWx0UHJvZmlsZSgpXSxcclxuICAgICAgICB0eXBlOiBBcnJheSxcclxuICAgICAgICBzY29wZTogJ3dvcmxkJ1xyXG4gICAgfSk7XHJcbiAgICBnYW1lLnNldHRpbmdzLnJlZ2lzdGVyKE1PRFVMRV9JRCwgQUNUSVZFX1BST0ZJTEVfTkFNRV9TRVRUSU5HLCB7XHJcbiAgICAgICAgbmFtZTogJ0FjdGl2ZSBQcm9maWxlIE5hbWUnLFxyXG4gICAgICAgIGRlZmF1bHQ6IERFRkFVTFRfUFJPRklMRV9OQU1FLFxyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBzY29wZTogJ3dvcmxkJ1xyXG4gICAgfSk7XHJcbiAgICBmdW5jdGlvbiBidWlsZERlZmF1bHRQcm9maWxlKCkge1xyXG4gICAgICAgIGNvbnN0IHNhdmVkTW9kdWxlQ29uZmlndXJhdGlvbiA9IFNldHRpbmdzLmdldEN1cnJlbnRNb2R1bGVDb25maWd1cmF0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogREVGQVVMVF9QUk9GSUxFX05BTUUsXHJcbiAgICAgICAgICAgIG1vZHVsZXM6IHNhdmVkTW9kdWxlQ29uZmlndXJhdGlvblxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFJlZ2lzdGVycyBtZW51cyBmb3IgdGhlIG1vZHVsZS4gVGhpcyBpcyBvbmx5IG1lYW50IHRvIGJlIGNhbGxlZCBvbiBpbml0aWFsIGdhbWUgbG9hZC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1lbnVzKCkge1xyXG4gICAgZ2FtZS5zZXR0aW5ncy5yZWdpc3Rlck1lbnUoTU9EVUxFX0lELCAnbWFuYWdlUHJvZmlsZXMnLCB7XHJcbiAgICAgICAgbmFtZTogJ01hbmFnZSBQcm9maWxlcycsXHJcbiAgICAgICAgbGFiZWw6ICdNYW5hZ2UgUHJvZmlsZXMnLFxyXG4gICAgICAgIGljb246ICdmYXMgZmEtY29nJyxcclxuICAgICAgICB0eXBlOiBNYW5hZ2VNb2R1bGVQcm9maWxlc1NldHRpbmdzRm9ybSxcclxuICAgICAgICByZXN0cmljdGVkOiB0cnVlXHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogUmVnaXN0ZXJzIGFuIEFQSSBmb3IgdGhlIGN1cnJlbnQgbW9kdWxlLCBhY2Nlc3NpYmxlIGJ5IGBnYW1lLm1vZHVsZXMuZ2V0KE1PRFVMRV9JRCkuYXBpLipmdW5jdGlvbigpKmAuIFRoaXMgaXMgbWVhbnQgdG8gYmUgY2FsbGVkIG9ubHkgb24gaW5pdGlhbCBnYW1lIGxvYWQuXHJcbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgRnVuY3Rpb24+fSBhcGkgLSBUaGUgQVBJIHRvIGV4cG9zZS5cclxuICogQHJldHVybnMge3ZvaWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJBUEkoYXBpKSB7XHJcbiAgICAvLyBAdHMtaWdub3JlIC0gTm90IHJlY29nbml6ZWQgZHVlIHRvIEZvdW5kcnkgb2JqZWN0XHJcbiAgICBnYW1lLm1vZHVsZXMuZ2V0KE1PRFVMRV9JRCkuYXBpID0gYXBpO1xyXG59XHJcbi8qKlxyXG4gKiBSZWxvYWRzIHRoZSBjdXJyZW50IHdpbmRvdy5cclxuICogQHJldHVybnMge3ZvaWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVsb2FkV2luZG93KCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG59XHJcbi8qKlxyXG4gKiBHZXQgdGhlIFByb2ZpbGVzIGdhbWUgc2V0dGluZy5cclxuICogQHJldHVybiB7TW9kdWxlUHJvZmlsZVtdfSAtIFRoZSB2YWx1ZSBvZiB0aGUgZ2FtZSBzZXR0aW5nLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2ZpbGVzKCkge1xyXG4gICAgcmV0dXJuIGdhbWUuc2V0dGluZ3MuZ2V0KE1PRFVMRV9JRCwgUFJPRklMRVNfU0VUVElORyk7XHJcbn1cclxuLyoqXHJcbiAqIFNldCB0aGUgUHJvZmlsZXMgZ2FtZSBzZXR0aW5nLlxyXG4gKiBAcGFyYW0ge01vZHVsZVByb2ZpbGVbXX0gcHJvZmlsZXMgLSBUaGUgdmFsdWUgdG8gc2F2ZSB0byB0aGUgZ2FtZSBzZXR0aW5nLlxyXG4gKiBAcmV0dXJuIHtQcm9taXNlPE1vZHVsZVByb2ZpbGVbXT59IC0gQSBQcm9taXNlIHJlc29sdmluZyB0byB0aGUgbmV3IGdhbWUgc2V0dGluZyB2YWx1ZS5cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRQcm9maWxlcyhwcm9maWxlcykge1xyXG4gICAgLy8gRmlsdGVyIG91dCByZWZlcmVuY2VzIHRvIG1vZHVsZXMgdGhhdCBhcmUgbm8gbG9uZ2VyIGluc3RhbGxlZFxyXG4gICAgcHJvZmlsZXMuZm9yRWFjaChwcm9maWxlID0+IHByb2ZpbGUubW9kdWxlcyA9IHByb2ZpbGUubW9kdWxlcy5maWx0ZXIobW9kdWxlSW5mbyA9PiBtb2R1bGVJbmZvLnRpdGxlICE9PSB1bmRlZmluZWQpKTtcclxuICAgIC8vIFNvcnQgcHJvZmlsZXMgYnkgcHJvZmlsZSBuYW1lLCBhbmQgbW9kdWxlIGluZm9zIGJ5IG1vZHVsZSB0aXRsZVxyXG4gICAgcHJvZmlsZXMuc29ydCgoYSwgYikgPT4gYS5uYW1lLmxvY2FsZUNvbXBhcmUoYi5uYW1lKSk7XHJcbiAgICAvLyBAdHMtaWdub3JlIC0gdW5kZWZpbmVkIHRpdGxlcyBhcmUgZmlsdGVyZWQgYmVmb3JlIHRoaXMgbGluZVxyXG4gICAgcHJvZmlsZXMuZm9yRWFjaChwcm9maWxlID0+IHByb2ZpbGUubW9kdWxlcy5zb3J0KChhLCBiKSA9PiBhLnRpdGxlLmxvY2FsZUNvbXBhcmUoYi50aXRsZSkpKTtcclxuICAgIHJldHVybiBhd2FpdCBnYW1lLnNldHRpbmdzLnNldChNT0RVTEVfSUQsIFBST0ZJTEVTX1NFVFRJTkcsIHByb2ZpbGVzKTtcclxufVxyXG4vKipcclxuICogUmVzZXRzIHRoZSBQcm9maWxlcyBnYW1lIHNldHRpbmcgdG8gdGhlIGRlZmF1bHQgcHJvZmlsZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldFByb2ZpbGVzKCkge1xyXG4gICAgcmV0dXJuIGdhbWUuc2V0dGluZ3Muc2V0KE1PRFVMRV9JRCwgUFJPRklMRVNfU0VUVElORywgdW5kZWZpbmVkKTtcclxufVxyXG4vKipcclxuICogR2V0IHRoZSBBY3RpdmUgUHJvZmlsZSBOYW1lIGdhbWUgc2V0dGluZy5cclxuICogQHJldHVybiB7c3RyaW5nfSAtIFRoZSB2YWx1ZSBvZiB0aGUgZ2FtZSBzZXR0aW5nLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZVByb2ZpbGVOYW1lKCkge1xyXG4gICAgcmV0dXJuIGdhbWUuc2V0dGluZ3MuZ2V0KE1PRFVMRV9JRCwgQUNUSVZFX1BST0ZJTEVfTkFNRV9TRVRUSU5HKTtcclxufVxyXG4vKipcclxuICogU2V0IHRoZSBBY3RpdmUgUHJvZmlsZSBOYW1lIGdhbWUgc2V0dGluZy5cclxuICogQHBhcmFtIHtzdHJpbmd9IGFjdGl2ZVByb2ZpbGVOYW1lIC0gVGhlIHZhbHVlIHRvIHNhdmUgdG8gdGhlIGdhbWUgc2V0dGluZy5cclxuICogQHJldHVybiB7UHJvbWlzZTxzdHJpbmc+fSAtIEEgUHJvbWlzZSByZXNvbHZpbmcgdG8gdGhlIG5ldyBnYW1lIHNldHRpbmcgdmFsdWUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWN0aXZlUHJvZmlsZU5hbWUoYWN0aXZlUHJvZmlsZU5hbWUpIHtcclxuICAgIHJldHVybiBnYW1lLnNldHRpbmdzLnNldChNT0RVTEVfSUQsIEFDVElWRV9QUk9GSUxFX05BTUVfU0VUVElORywgYWN0aXZlUHJvZmlsZU5hbWUpO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIFNldHRpbmdzIGZyb20gJy4vc2V0dGluZ3MnO1xyXG5pbXBvcnQgKiBhcyBTZXR0aW5nc1V0aWxzIGZyb20gJy4vc2V0dGluZ3MtdXRpbHMnO1xyXG5pbXBvcnQgKiBhcyBNYXBwaW5nVXRpbHMgZnJvbSAnLi9tYXBwaW5nLXV0aWxzJztcclxuaW1wb3J0IHsgTU9EVUxFX1BST0ZJTEVTX1VQREFURURfSE9PS19OQU1FIH0gZnJvbSAnLi4vY2xhc3Nlcy9NYW5hZ2VNb2R1bGVQcm9maWxlc1NldHRpbmdzRm9ybSc7XHJcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1vZHVsZVNldHRpbmdzKCkge1xyXG4gICAgU2V0dGluZ3NVdGlscy5yZWdpc3RlclNldHRpbmdzKCk7XHJcbiAgICBTZXR0aW5nc1V0aWxzLnJlZ2lzdGVyTWVudXMoKTtcclxuICAgIGNvbnN0IHByb2ZpbGVzID0gU2V0dGluZ3MuZ2V0QWxsUHJvZmlsZXMoKTtcclxuICAgIGlmICghcHJvZmlsZXMgfHwgcHJvZmlsZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgU2V0dGluZ3MucmVzZXRQcm9maWxlcygpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBjdXJyZW50bHkgYWN0aXZlIG1vZHVsZXMgZnJvbSB0aGUgY29yZSBnYW1lIHNldHRpbmdzLlxyXG4gKiBAcmV0dXJucyB7TW9kdWxlSW5mb1tdfSAtIFRoZSBjdXJyZW50bHktYWN0aXZlIG1vZHVsZSBjb25maWd1cmF0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRNb2R1bGVDb25maWd1cmF0aW9uKCkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZ2FtZS5tb2R1bGVzKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gKHtcclxuICAgICAgICBpZDoga2V5LFxyXG4gICAgICAgIHRpdGxlOiB2YWx1ZS5kYXRhLnRpdGxlLFxyXG4gICAgICAgIGlzQWN0aXZlOiB2YWx1ZS5hY3RpdmVcclxuICAgIH0pKS5zb3J0KChhLCBiKSA9PiBhLnRpdGxlLmxvY2FsZUNvbXBhcmUoYi50aXRsZSkpO1xyXG59XHJcbi8qKlxyXG4gKiBHZXRzIGFsbCBzYXZlZCBtb2R1bGUgcHJvZmlsZXMgZnJvbSB0aGUgZ2FtZSBzZXR0aW5ncy5cclxuICogQHJldHVybnMge01vZHVsZVByb2ZpbGVbXX1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGxQcm9maWxlcygpIHtcclxuICAgIHJldHVybiBTZXR0aW5nc1V0aWxzLmdldFByb2ZpbGVzKCk7XHJcbn1cclxuLyoqXHJcbiAqIEdldHMgdGhlIHNhdmVkLCBjdXJyZW50bHktYWN0aXZlIG1vZHVsZSBwcm9maWxlIGZyb20gdGhlIGdhbWUgc2V0dGluZ3MuXHJcbiAqIEByZXR1cm5zIHtNb2R1bGVQcm9maWxlfSAtIFRoZSBjdXJyZW50bHktYWN0aXZlIG1vZHVsZSBwcm9maWxlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZVByb2ZpbGUoKSB7XHJcbiAgICBjb25zdCBhY3RpdmVQcm9maWxlTmFtZSA9IFNldHRpbmdzVXRpbHMuZ2V0QWN0aXZlUHJvZmlsZU5hbWUoKTtcclxuICAgIGNvbnN0IGFjdGl2ZVByb2ZpbGUgPSBTZXR0aW5ncy5nZXRQcm9maWxlQnlOYW1lKGFjdGl2ZVByb2ZpbGVOYW1lKTtcclxuICAgIGlmICghYWN0aXZlUHJvZmlsZSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdVbmFibGUgdG8gbG9hZCBhY3RpdmUgcHJvZmlsZS4gUGxlYXNlIHJlZnJlc2ggdGhlIEZvdW5kcnkgcGFnZS4nO1xyXG4gICAgICAgIHVpLm5vdGlmaWNhdGlvbnMuZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhY3RpdmVQcm9maWxlO1xyXG59XHJcbi8qKlxyXG4gKiBHZXRzIGEgc2F2ZWQgcHJvZmlsZSBmcm9tIHRoZSBnYW1lIHNldHRpbmdzIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgbmFtZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2ZpbGVOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb2ZpbGUgdG8gcmV0dXJuLlxyXG4gKiBAcmV0dXJucyB7TW9kdWxlUHJvZmlsZSB8IHVuZGVmaW5lZH0gLSBUaGUgbW9kdWxlIHByb2ZpbGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZSwgb3IgYHVuZGVmaW5lZGAgaWYgbm9uZSBleGlzdHMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvZmlsZUJ5TmFtZShwcm9maWxlTmFtZSkge1xyXG4gICAgY29uc3QgcHJvZmlsZXMgPSBTZXR0aW5ncy5nZXRBbGxQcm9maWxlcygpO1xyXG4gICAgcmV0dXJuIHByb2ZpbGVzLmZpbmQocHJvZmlsZSA9PiBwcm9maWxlLm5hbWUgPT09IHByb2ZpbGVOYW1lKTtcclxufVxyXG4vKipcclxuICogR2V0cyB0aGUgYXJyYXkgb2Ygc2F2ZWQgcHJvZmlsZXMgZnJvbSB0aGUgZ2FtZSBzZXR0aW5ncyBpbiBKU09OIGZvcm1hdC5cclxuICogQHJldHVybiB7c3RyaW5nfSAtIFRoZSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwcm9maWxlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydEFsbFByb2ZpbGVzKCkge1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KFNldHRpbmdzLmdldEFsbFByb2ZpbGVzKCksIG51bGwsIDIpO1xyXG59XHJcbi8qKlxyXG4gKiBHZXRzIGEgc2F2ZWQgcHJvZmlsZSBmcm9tIHRoZSBnYW1lIHNldHRpbmdzIGluIEpTT04gZm9ybWF0LlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZmlsZU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvZmlsZSB0byByZXR1cm4uXHJcbiAqIEByZXR1cm4ge3N0cmluZyB8IHVuZGVmaW5lZH0gLSBUaGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgcHJvZmlsZSwgb3IgYHVuZGVmaW5lZGAgaWYgbm9uZSBleGlzdHMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0UHJvZmlsZUJ5TmFtZShwcm9maWxlTmFtZSkge1xyXG4gICAgY29uc3QgcHJvZmlsZSA9IFNldHRpbmdzLmdldFByb2ZpbGVCeU5hbWUocHJvZmlsZU5hbWUpO1xyXG4gICAgcmV0dXJuIHByb2ZpbGUgPyBKU09OLnN0cmluZ2lmeShwcm9maWxlLCBudWxsLCAyKSA6IHByb2ZpbGU7XHJcbn1cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcge0BsaW5rIE1vZHVsZVByb2ZpbGV9IGluIHRoZSBnYW1lIHNldHRpbmdzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZmlsZU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvZmlsZSB0byBjcmVhdGUuXHJcbiAqIEBwYXJhbSB7TW9kdWxlSW5mb1tdfSBtb2R1bGVzIC0gVGhlIEFycmF5IG9mIHtAbGluayBNb2R1bGVJbmZvfSBvYmplY3RzIHRoYXQgcmVwcmVzZW50IGVhY2ggbW9kdWxlJ3MgYWN0aXZhdGlvbiBzdGF0dXMuXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPE1vZHVsZVByb2ZpbGVbXT59IC0gVGhlIG5ldyBBcnJheSBvZiB7QGxpbmsgTW9kdWxlUHJvZmlsZX1zLlxyXG4gKiBAdGhyb3dzIEVycm9yIC0gV2hlbiBhIHByb2ZpbGUgZXhpc3RzIHdpdGggdGhlIGdpdmVuIHByb2ZpbGVOYW1lXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlUHJvZmlsZShwcm9maWxlTmFtZSwgbW9kdWxlcykge1xyXG4gICAgaWYgKCFwcm9maWxlTmFtZSkge1xyXG4gICAgICAgIGNvbnN0IHBvc3RmaXggPSBwcm9maWxlTmFtZSA9PT0gJycgPyAnUHJvZmlsZSBuYW1lIG11c3Qgbm90IGJlIGVtcHR5LicgOiAnUHJvZmlsZSBuYW1lIGlzIHVuZGVmaW5lZC4nO1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBVbmFibGUgdG8gY3JlYXRlIG1vZHVsZSBwcm9maWxlLiAke3Bvc3RmaXh9YDtcclxuICAgICAgICB1aS5ub3RpZmljYXRpb25zLmVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIW1vZHVsZXMpIHtcclxuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnVW5hYmxlIHRvIGNyZWF0ZSBtb2R1bGUgcHJvZmlsZS4gUGxlYXNlIHJlZnJlc2ggdGhlIHBhZ2UgYW5kIHRyeSBhZ2Fpbi4nO1xyXG4gICAgICAgIHVpLm5vdGlmaWNhdGlvbnMuZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGlmIChTZXR0aW5ncy5nZXRQcm9maWxlQnlOYW1lKHByb2ZpbGVOYW1lKSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBVbmFibGUgdG8gY3JlYXRlIG1vZHVsZSBwcm9maWxlLiBQcm9maWxlIFwiJHtwcm9maWxlTmFtZX1cIiBhbHJlYWR5IGV4aXN0cyFgO1xyXG4gICAgICAgIHVpLm5vdGlmaWNhdGlvbnMuZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHByb2ZpbGVzID0gU2V0dGluZ3MuZ2V0QWxsUHJvZmlsZXMoKTtcclxuICAgIHByb2ZpbGVzLnB1c2goeyBuYW1lOiBwcm9maWxlTmFtZSwgbW9kdWxlczogbW9kdWxlcyB9KTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gU2V0dGluZ3NVdGlscy5zZXRQcm9maWxlcyhwcm9maWxlcyk7XHJcbiAgICByZXNwb25zZS50aGVuKCgpID0+IEhvb2tzLmNhbGxBbGwoTU9EVUxFX1BST0ZJTEVTX1VQREFURURfSE9PS19OQU1FKSk7XHJcbiAgICB1aS5ub3RpZmljYXRpb25zLmluZm8oYFByb2ZpbGUgXCIke3Byb2ZpbGVOYW1lfVwiIGhhcyBiZWVuIGNyZWF0ZWQhYCk7XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbn1cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSB7QGxpbmsgTW9kdWxlUHJvZmlsZX0gb3IgbXVsdGlwbGUgbW9kdWxlIHByb2ZpbGVzIG91dCBvZiBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhvc2UgcHJvZmlsZXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBqc29uIC0gVGhlIEpTT04gcmVwcmVzZW50YXRpb24gb2YgYSB7QGxpbmsgTW9kdWxlUHJvZmlsZX0gb3IgYW4gQXJyYXkgb2Yge0BsaW5rIE1vZHVsZVByb2ZpbGV9W10gb2JqZWN0cy5cclxuICogQHJldHVybiB7UHJvbWlzZTxNb2R1bGVQcm9maWxlW10+fSAtIFRoZSBzYXZlZCBhcnJheSBvZiBtb2R1bGUgcHJvZmlsZXMgaW4gdGhlIGdhbWUgc2V0dGluZ3MuXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1wb3J0UHJvZmlsZXMoanNvbikge1xyXG4gICAgbGV0IHByb2ZpbGVzID0gSlNPTi5wYXJzZShqc29uKTtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9maWxlcykpIHtcclxuICAgICAgICBwcm9maWxlcyA9IFtwcm9maWxlc107XHJcbiAgICB9XHJcbiAgICBpZiAocHJvZmlsZXMuc29tZShwcm9maWxlID0+ICFpc1ZhbGlkTW9kdWxlUHJvZmlsZShwcm9maWxlKSkpIHtcclxuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnVW5hYmxlIHRvIGltcG9ydCBwcm9maWxlcy4gUGxlYXNlIHJlLWV4cG9ydCBhbmQgdHJ5IGFnYWluLic7XHJcbiAgICAgICAgdWkubm90aWZpY2F0aW9ucy5lcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgLy8gV3JpdHRlbiB0aGlzIHdheSB0byBjb250aW51ZSB0cnlpbmcgdG8gY3JlYXRlIHByb2ZpbGVzLCBldmVuIHdoZW4gYSBwcmV2aW91cyBwcm9maWxlIGNvdWxkIG5vdCBiZSBjcmVhdGVkXHJcbiAgICBmb3IgKGNvbnN0IHByb2ZpbGUgb2YgcHJvZmlsZXMpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCBTZXR0aW5ncy5jcmVhdGVQcm9maWxlKHByb2ZpbGUubmFtZSwgcHJvZmlsZS5tb2R1bGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGlnbm9yZWQpIHsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFNldHRpbmdzLmdldEFsbFByb2ZpbGVzKCk7XHJcbiAgICBmdW5jdGlvbiBpc1ZhbGlkTW9kdWxlUHJvZmlsZShwcm9maWxlKSB7XHJcbiAgICAgICAgaWYgKCFwcm9maWxlIHx8ICFwcm9maWxlLm5hbWUgfHwgIXByb2ZpbGUubW9kdWxlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9maWxlLm1vZHVsZXMuZXZlcnkobW9kdWxlID0+IG1vZHVsZS5pZCAmJiBtb2R1bGUudGl0bGUgJiYgbW9kdWxlLmhhc093blByb3BlcnR5KCdpc0FjdGl2ZScpKTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogQWN0aXZhdGVzIHRoZSBwcm9maWxlIHdpdGggdGhlIGdpdmVuIG5hbWUsIHRoZW4gcmVsb2FkcyB0aGUgcGFnZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2ZpbGVOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIG1vZHVsZSBwcm9maWxlIHRvIGxvYWQuXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gLSBXaGVuIHByb2ZpbGUgbmFtZSBkb2VzIG5vdCBleGlzdC5cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhY3RpdmF0ZVByb2ZpbGUocHJvZmlsZU5hbWUpIHtcclxuICAgIGNvbnN0IHByb2ZpbGUgPSBTZXR0aW5ncy5nZXRQcm9maWxlQnlOYW1lKHByb2ZpbGVOYW1lKTtcclxuICAgIGlmICghcHJvZmlsZSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBVbmFibGUgdG8gYWN0aXZhdGUgbW9kdWxlIHByb2ZpbGUuIFByb2ZpbGUgXCIke3Byb2ZpbGVOYW1lfVwiIGRvZXMgbm90IGV4aXN0IWA7XHJcbiAgICAgICAgdWkubm90aWZpY2F0aW9ucy5lcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgU2V0dGluZ3NVdGlscy5zZXRBY3RpdmVQcm9maWxlTmFtZShwcm9maWxlLm5hbWUpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4gU2V0dGluZ3Muc2V0Q29yZU1vZHVsZUNvbmZpZ3VyYXRpb24ocHJvZmlsZS5tb2R1bGVzKSlcclxuICAgICAgICAudGhlbigoKSA9PiBTZXR0aW5nc1V0aWxzLnJlbG9hZFdpbmRvdygpKTtcclxufVxyXG4vKipcclxuICogU2F2ZXMgdGhlIGN1cnJlbnQgcHJvZmlsZSBzZXR0aW5ncyB0byBhbiBleGlzdGluZyBwcm9maWxlLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZmlsZU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvZmlsZSB0byB1cGRhdGUuXHJcbiAqIEBwYXJhbSB7TW9kdWxlSW5mb1tdfSBtb2R1bGVzIC0gVGhlIEFycmF5IG9mIHtAbGluayBNb2R1bGVJbmZvfSBvYmplY3RzIHRoYXQgcmVwcmVzZW50IGVhY2ggbW9kdWxlJ3MgYWN0aXZhdGlvbiBzdGF0dXMuXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPE1vZHVsZVByb2ZpbGVbXT59IC0gVGhlIG5ldyBBcnJheSBvZiBtb2R1bGUgcHJvZmlsZXMuXHJcbiAqIEB0aHJvd3MgRXJyb3IgLSBXaGVuIGEgcHJvZmlsZSBuYW1lIGlzIHBhc3NlZCBhbmQgbm8gcHJvZmlsZXMgZXhpc3Qgd2l0aCB0aGF0IG5hbWUuXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUNoYW5nZXNUb1Byb2ZpbGUocHJvZmlsZU5hbWUsIG1vZHVsZXMpIHtcclxuICAgIGNvbnN0IHNhdmVkUHJvZmlsZXMgPSBTZXR0aW5ncy5nZXRBbGxQcm9maWxlcygpO1xyXG4gICAgY29uc3QgbWF0Y2hpbmdQcm9maWxlSW5kZXggPSBzYXZlZFByb2ZpbGVzLmZpbmRJbmRleChwcm9maWxlID0+IHByb2ZpbGUubmFtZSA9PT0gcHJvZmlsZU5hbWUpO1xyXG4gICAgaWYgKCFzYXZlZFByb2ZpbGVzW21hdGNoaW5nUHJvZmlsZUluZGV4XSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBVbmFibGUgdG8gc2F2ZSBtb2R1bGUgcHJvZmlsZSBjaGFuZ2VzLiBQcm9maWxlIFwiJHtwcm9maWxlTmFtZX1cIiBkb2VzIG5vdCBleGlzdCFgO1xyXG4gICAgICAgIHVpLm5vdGlmaWNhdGlvbnMuZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxuICAgIHNhdmVkUHJvZmlsZXNbbWF0Y2hpbmdQcm9maWxlSW5kZXhdID0geyBuYW1lOiBwcm9maWxlTmFtZSwgbW9kdWxlczogbW9kdWxlcyB9O1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBTZXR0aW5nc1V0aWxzLnNldFByb2ZpbGVzKHNhdmVkUHJvZmlsZXMpO1xyXG4gICAgcmVzcG9uc2UudGhlbigoKSA9PiBIb29rcy5jYWxsQWxsKE1PRFVMRV9QUk9GSUxFU19VUERBVEVEX0hPT0tfTkFNRSkpO1xyXG4gICAgdWkubm90aWZpY2F0aW9ucy5pbmZvKGBDaGFuZ2VzIHRvIHByb2ZpbGUgXCIke3Byb2ZpbGVOYW1lfVwiIGhhdmUgYmVlbiBzYXZlZCFgKTtcclxuICAgIHJldHVybiByZXNwb25zZTtcclxufVxyXG4vKipcclxuICogRGVsZXRlcyB0aGUgcHJvZmlsZSB3aXRoIHRoZSBnaXZlbiBuYW1lLiBXaGVuIHRoZSBjdXJyZW50bHktYWN0aXZlIHByb2ZpbGUgaXMgZGVsZXRlZCwgdGhlIGZpcnN0IHByb2ZpbGUgaXMgc2VsZWN0ZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9maWxlTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9maWxlIHRvIGRlbGV0ZS5cclxuICogQHJldHVybiB7UHJvbWlzZTxNb2R1bGVQcm9maWxlW10gfCB1bmRlZmluZWQ+fSAtIFRoZSByZXN1bHRpbmcgdmFsdWUgb2YgdGhlIHVwZGF0ZWQgcHJvZmlsZXMgc2V0dGluZywgb3IgYHVuZGVmaW5lZGAgaWYgbm8gcHJvZmlsZXMgcmVtYWluLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gLSBXaGVuIG5vIHByb2ZpbGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBleGlzdHMuXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlUHJvZmlsZShwcm9maWxlTmFtZSkge1xyXG4gICAgaWYgKCFTZXR0aW5ncy5nZXRQcm9maWxlQnlOYW1lKHByb2ZpbGVOYW1lKSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBVbmFibGUgdG8gZGVsZXRlIG1vZHVsZSBwcm9maWxlLiBQcm9maWxlIFwiJHtwcm9maWxlTmFtZX1cIiBkb2VzIG5vdCBleGlzdCFgO1xyXG4gICAgICAgIHVpLm5vdGlmaWNhdGlvbnMuZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHByb2ZpbGVzVG9TYXZlID0gU2V0dGluZ3MuZ2V0QWxsUHJvZmlsZXMoKS5maWx0ZXIocHJvZmlsZSA9PiBwcm9maWxlLm5hbWUgIT09IHByb2ZpbGVOYW1lKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gU2V0dGluZ3NVdGlscy5zZXRQcm9maWxlcyhwcm9maWxlc1RvU2F2ZSk7XHJcbiAgICBpZiAocHJvZmlsZXNUb1NhdmUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgYXdhaXQgU2V0dGluZ3MucmVzZXRQcm9maWxlcygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChwcm9maWxlTmFtZSA9PT0gU2V0dGluZ3NVdGlscy5nZXRBY3RpdmVQcm9maWxlTmFtZSgpKSB7XHJcbiAgICAgICAgYXdhaXQgU2V0dGluZ3NVdGlscy5zZXRBY3RpdmVQcm9maWxlTmFtZShwcm9maWxlc1RvU2F2ZVswXS5uYW1lKTtcclxuICAgIH1cclxuICAgIHJlc3BvbnNlLnRoZW4oKCkgPT4gSG9va3MuY2FsbEFsbChNT0RVTEVfUFJPRklMRVNfVVBEQVRFRF9IT09LX05BTUUpKTtcclxuICAgIHVpLm5vdGlmaWNhdGlvbnMuaW5mbyhgUHJvZmlsZSBcIiR7cHJvZmlsZU5hbWV9XCIgaGFzIGJlZW4gZGVsZXRlZCFgKTtcclxuICAgIHJldHVybiByZXNwb25zZTtcclxufVxyXG4vKipcclxuICogUmVzZXQgYWxsIG1vZHVsZSBwcm9maWxlcyB0byB0aGUgZGVmYXVsdCB2YWx1ZXMuIFdBUk5JTkc6IERvaW5nIHRoaXMgbGVhZHMgdG8gdW5yZWNvdmVyYWJsZSBkYXRhIGxvc3MuXHJcbiAqIEByZXR1cm4ge1Byb21pc2U8dm9pZD59XHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVzZXRQcm9maWxlcygpIHtcclxuICAgIGF3YWl0IFNldHRpbmdzVXRpbHMucmVzZXRQcm9maWxlcygpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4gU2V0dGluZ3NVdGlscy5zZXRBY3RpdmVQcm9maWxlTmFtZShTZXR0aW5nc1V0aWxzLkRFRkFVTFRfUFJPRklMRV9OQU1FKSlcclxuICAgICAgICAudGhlbigoKSA9PiBTZXR0aW5nc1V0aWxzLnJlbG9hZFdpbmRvdygpKTtcclxufVxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0Q29yZU1vZHVsZUNvbmZpZ3VyYXRpb24obW9kdWxlSW5mb3MpIHtcclxuICAgIGNvbnN0IG1vZHVsZUluZm9zVG9TYXZlID0gTWFwcGluZ1V0aWxzLm1hcFRvTW9kdWxlS2V5SXNBY3RpdmVSZWNvcmQobW9kdWxlSW5mb3MpO1xyXG4gICAgY29uc3QgY29yZU1vZHVsZUNvbmZpZ3VyYXRpb24gPSBnYW1lLnNldHRpbmdzLmdldCgnY29yZScsICdtb2R1bGVDb25maWd1cmF0aW9uJyk7XHJcbiAgICBjb25zdCBtZXJnZWRDb25maWd1cmF0aW9uID0geyAuLi5jb3JlTW9kdWxlQ29uZmlndXJhdGlvbiwgLi4ubW9kdWxlSW5mb3NUb1NhdmUgfTtcclxuICAgIHJldHVybiBhd2FpdCBnYW1lLnNldHRpbmdzLnNldCgnY29yZScsICdtb2R1bGVDb25maWd1cmF0aW9uJywgbWVyZ2VkQ29uZmlndXJhdGlvbik7XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgU2V0dGluZ3MgZnJvbSAnLi4vc2V0dGluZ3MnO1xyXG5pbXBvcnQgKiBhcyBNYXBwaW5nVXRpbHMgZnJvbSAnLi4vbWFwcGluZy11dGlscyc7XHJcbmltcG9ydCAqIGFzIE1vZHVsZU1hbmFnZW1lbnRTY3JpcHRzIGZyb20gJy4vbW9kdWxlLW1hbmFnZW1lbnQtc2NyaXB0cyc7XHJcbmltcG9ydCBNYW5hZ2VNb2R1bGVQcm9maWxlc1NldHRpbmdzRm9ybSBmcm9tICcuLi8uLi9jbGFzc2VzL01hbmFnZU1vZHVsZVByb2ZpbGVzU2V0dGluZ3NGb3JtJztcclxuaW1wb3J0IENyZWF0ZU1vZHVsZVByb2ZpbGVGb3JtIGZyb20gJy4uLy4uL2NsYXNzZXMvQ3JlYXRlTW9kdWxlUHJvZmlsZUZvcm0nO1xyXG5jb25zdCBNT0RVTEVfTUFOQUdFTUVOVF9XSU5ET1dfSUQgPSAnbW9kdWxlLW1hbmFnZW1lbnQnO1xyXG4vLyBUT0RPIC0gTmVlZHMgdG8gYmUgYSBzZXBhcmF0ZSBmdW5jdGlvbiBqdXN0IGZvciBjbG9zZURpYWxvZyBpbnN0YW5jZXMuIHVwZGF0ZUFjdGl2ZVByb2ZpbGVTdGF0dXNlcygpIHNob3VsZCBiZSBleHBvc2VkIGFuZCBwZXJmb3JtZWQgd2hlbiB0aGluZ3MgYXJlIGNoYW5nZWRcclxuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hTdGF0dXNFbGVtZW50c09uRGVwZW5kZW5jaWVzQ2xvc2UoYXBwKSB7XHJcbiAgICBpZiAoYXBwLmRhdGEudGl0bGUgPT09ICdEZXBlbmRlbmNpZXMnKSB7XHJcbiAgICAgICAgdXBkYXRlQWxsU3RhdHVzRWxlbWVudHMoKTtcclxuICAgIH1cclxufVxyXG4vLyBUT0RPIC0gZGVmaW5pdGVseSB0ZXN0IGFuZCByZW5hbWUgXl4gdGhhdCBtZXRob2QgYWNjb3JkaW5nbHlcclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrVXBkYXRlQWN0aXZlUHJvZmlsZVN0YXR1c2VzKCkge1xyXG4gICAgaWYgKE1vZHVsZU1hbmFnZW1lbnRTY3JpcHRzLmlzTW9kdWxlTWFuYWdlbWVudFdpbmRvd09wZW4oKSkge1xyXG4gICAgICAgIHVwZGF0ZUFsbFN0YXR1c0VsZW1lbnRzKCk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIERldGVybWluZXMgaWYgY2hhbmdlcyBleGlzdCBvbiB0aGUgTW9kdWxlIE1hbmFnZW1lbnQgd2luZG93IHRoYXQgZG9uJ3QgYWxpZ24gd2l0aCBhIGdpdmVuIHByb2ZpbGUuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9maWxlTmFtZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBXaGV0aGVyIHVuc2F2ZWQgY2hhbmdlcyBleGlzdCBvbiB0aGUgcHJvZmlsZSB3aXRoIHRoZSBnaXZlbiBuYW1lLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVuc2F2ZWRDaGFuZ2VzRXhpc3RPbihwcm9maWxlTmFtZSkge1xyXG4gICAgY29uc3Qgc2F2ZWRQcm9maWxlID0gU2V0dGluZ3MuZ2V0UHJvZmlsZUJ5TmFtZShwcm9maWxlTmFtZSk7XHJcbiAgICBpZiAoIXNhdmVkUHJvZmlsZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHVuc2F2ZWRNb2R1bGVJbmZvcyA9IGZpbmRVbnNhdmVkTW9kdWxlSW5mb3MoKTtcclxuICAgIHJldHVybiB1bnNhdmVkTW9kdWxlSW5mb3Muc29tZSh1bnNhdmVkTW9kdWxlSW5mbyA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2F2ZWRNb2R1bGVJbmZvID0gc2F2ZWRQcm9maWxlLm1vZHVsZXMuZmluZChzYXZlZE1vZHVsZUluZm8gPT4gc2F2ZWRNb2R1bGVJbmZvLmlkID09PSB1bnNhdmVkTW9kdWxlSW5mby5pZCk7XHJcbiAgICAgICAgcmV0dXJuIHVuc2F2ZWRNb2R1bGVJbmZvLmlzQWN0aXZlICE9PSBzYXZlZE1vZHVsZUluZm8/LmlzQWN0aXZlO1xyXG4gICAgfSk7XHJcbiAgICAvLyByZXR1cm4gT2JqZWN0LmVudHJpZXModW5zYXZlZE1vZHVsZUluZm9zKS5zb21lKChbbW9kdWxlSWQsIHVuc2F2ZWRTdGF0dXNdKSA9PiBzYXZlZFByb2ZpbGUubW9kdWxlc1ttb2R1bGVJZF0gIT09IHVuc2F2ZWRTdGF0dXMpO1xyXG59XHJcbi8qKlxyXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBNb2R1bGUgTWFuYWdlbWVudCB3aW5kb3cgaXMgb3Blbi5cclxuICogQHJldHVybnMge2Jvb2xlYW59IC0gV2hldGhlciB0aGUgTW9kdWxlIE1hbmFnZW1lbnQgd2luZG93IGlzIG9wZW4uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNNb2R1bGVNYW5hZ2VtZW50V2luZG93T3BlbigpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChNT0RVTEVfTUFOQUdFTUVOVF9XSU5ET1dfSUQpICE9IG51bGw7XHJcbn1cclxuLy8gVE9ETyAtIHRlc3QgYWxsXHJcbmV4cG9ydCBmdW5jdGlvbiBtb2RpZnlNb2R1bGVNYW5hZ2VtZW50UmVuZGVyKGFwcCwgaHRtbCwgZGF0YSkge1xyXG4gICAgaWYgKGdhbWUudXNlcj8uaXNHTSkge1xyXG4gICAgICAgIGFkZEZvb3RlckVsZW1lbnRzKCk7XHJcbiAgICAgICAgbW9kaWZ5TW9kdWxlTGlzdEVsZW1lbnRzKCk7XHJcbiAgICAgICAgdXBkYXRlQWxsU3RhdHVzRWxlbWVudHMoKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGFkZEZvb3RlckVsZW1lbnRzKCkge1xyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgZWxlbWVudHNcclxuICAgICAgICBjb25zdCBwcmVGb290ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBwcmVGb290ZXJEaXYuY2xhc3NMaXN0LmFkZCgnbW9kdWxlLXByb2ZpbGVzLWZvb3Rlci1yb3cnKTtcclxuICAgICAgICBjb25zdCBzdGF0dXNCdXR0b24gPSBidWlsZFN0YXR1c0J1dHRvbigpO1xyXG4gICAgICAgIGNvbnN0IHNhdmVDdXJyZW50Q29uZmlndXJhdGlvbkJ1dHRvbiA9IGJ1aWxkQ3JlYXRlTW9kdWxlUHJvZmlsZUJ1dHRvbigpO1xyXG4gICAgICAgIGNvbnN0IG1hbmFnZVByb2ZpbGVzQnV0dG9uID0gYnVpbGRNYW5hZ2VQcm9maWxlc0J1dHRvbigpO1xyXG4gICAgICAgIHByZUZvb3RlckRpdi5hcHBlbmQoc3RhdHVzQnV0dG9uLCBzYXZlQ3VycmVudENvbmZpZ3VyYXRpb25CdXR0b24sIG1hbmFnZVByb2ZpbGVzQnV0dG9uKTtcclxuICAgICAgICAvLyBBZGQgZWxlbWVudHMganVzdCBiZWxvdyB0aGUgbW9kdWxlIGxpc3RcclxuICAgICAgICBjb25zdCBtb2R1bGVMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZHVsZS1saXN0Jyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ21vZHVsZS1saXN0OiAnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhtb2R1bGVMaXN0KTtcclxuICAgICAgICBtb2R1bGVMaXN0LmFmdGVyKHByZUZvb3RlckRpdik7XHJcbiAgICAgICAgLy8gVXBkYXRlIHN0YXR1cyBvZiBzdGF0dXMgYnV0dG9uc1xyXG4gICAgICAgIHVwZGF0ZVByb2ZpbGVTdGF0dXNCdXR0b25zKCk7XHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBoZWlnaHQgb2YgdGhlIHdpbmRvdyB3aXRoIHRoZSBuZXcgZWxlbWVudHNcclxuICAgICAgICBmb3JjZU1vZHVsZU1hbmFnZW1lbnRXaW5kb3dIZWlnaHRSZXNpemUoKTtcclxuICAgICAgICBmdW5jdGlvbiBidWlsZFN0YXR1c0J1dHRvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgYWN0aXZlUHJvZmlsZSA9IFNldHRpbmdzLmdldEFjdGl2ZVByb2ZpbGUoKTtcclxuICAgICAgICAgICAgY29uc3Qgc3RhdHVzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIHN0YXR1c0J1dHRvbi50eXBlID0gJ2J1dHRvbic7IC8vIFRPRE8gLSBwcmV2ZW50cyBzdWJtaXNzaW9uLCB0aGVyZWZvcmUgcmVsb2FkaW5nIHBhZ2U/IChhbnkgYnV0dG9uIHdpdGggdHlwZT1cInN1Ym1pdFwiIGF1dG9tYXRpY2FsbHkgc3VibWl0cyBmb3JtKVxyXG4gICAgICAgICAgICBzdGF0dXNCdXR0b24uY2xhc3NMaXN0LmFkZCgnbW9kdWxlLXByb2ZpbGVzLXN0YXR1cy1idXR0b24nKTtcclxuICAgICAgICAgICAgc3RhdHVzQnV0dG9uLnN0eWxlLmZsZXhCYXNpcyA9ICcxMzAlJztcclxuICAgICAgICAgICAgc3RhdHVzQnV0dG9uLmRhdGFzZXQucHJvZmlsZU5hbWUgPSBhY3RpdmVQcm9maWxlLm5hbWU7IC8vIFRPRE8gLSBtYWtlIHRoaXMgYSBsaXR0bGUgbW9yZS4uLiBlYXNpZXIgdG8gZmluZD8gaWRrXHJcbiAgICAgICAgICAgIHN0YXR1c0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vZHVsZUluZm9zID0gZmluZFVuc2F2ZWRNb2R1bGVJbmZvcygpO1xyXG4gICAgICAgICAgICAgICAgU2V0dGluZ3Muc2F2ZUNoYW5nZXNUb1Byb2ZpbGUoYWN0aXZlUHJvZmlsZS5uYW1lLCBtb2R1bGVJbmZvcylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB1cGRhdGVQcm9maWxlU3RhdHVzQnV0dG9ucygpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0dXNCdXR0b247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkQ3JlYXRlTW9kdWxlUHJvZmlsZUJ1dHRvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlTW9kdWxlUHJvZmlsZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBjcmVhdGVNb2R1bGVQcm9maWxlQnV0dG9uLnR5cGUgPSAnYnV0dG9uJzsgLy8gVE9ETyAtIHByZXZlbnRzIHN1Ym1pc3Npb24sIHRoZXJlZm9yZSByZWxvYWRpbmcgcGFnZT8gKGFueSBidXR0b24gd2l0aCB0eXBlPVwic3VibWl0XCIgYXV0b21hdGljYWxseVxyXG4gICAgICAgICAgICAvLyBzdWJtaXRzIGZvcm0pXHJcbiAgICAgICAgICAgIGNyZWF0ZU1vZHVsZVByb2ZpbGVCdXR0b24uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEgZmEtcGx1c1wiPjwvaT4gQ3JlYXRlIE1vZHVsZSBQcm9maWxlPC9idXR0b24+JztcclxuICAgICAgICAgICAgY3JlYXRlTW9kdWxlUHJvZmlsZUJ1dHRvbi5zdHlsZS5mbGV4QmFzaXMgPSAnODAlJztcclxuICAgICAgICAgICAgY3JlYXRlTW9kdWxlUHJvZmlsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG5ldyBDcmVhdGVNb2R1bGVQcm9maWxlRm9ybSgpLnJlbmRlcih0cnVlKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVNb2R1bGVQcm9maWxlQnV0dG9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBidWlsZE1hbmFnZVByb2ZpbGVzQnV0dG9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBtYW5hZ2VQcm9maWxlc0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBtYW5hZ2VQcm9maWxlc0J1dHRvbi50eXBlID0gJ2J1dHRvbic7IC8vIFRPRE8gLSBwcmV2ZW50cyBzdWJtaXNzaW9uLCB0aGVyZWZvcmUgcmVsb2FkaW5nIHBhZ2U/IChhbnkgYnV0dG9uIHdpdGggdHlwZT1cInN1Ym1pdFwiIGF1dG9tYXRpY2FsbHkgc3VibWl0c1xyXG4gICAgICAgICAgICAvLyBmb3JtKVxyXG4gICAgICAgICAgICBtYW5hZ2VQcm9maWxlc0J1dHRvbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYSBmYS1jb2dcIj48L2k+IE1hbmFnZSBNb2R1bGUgUHJvZmlsZXM8L2J1dHRvbj4nO1xyXG4gICAgICAgICAgICBtYW5hZ2VQcm9maWxlc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIG5ldyBNYW5hZ2VNb2R1bGVQcm9maWxlc1NldHRpbmdzRm9ybSgpLnJlbmRlcih0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtYW5hZ2VQcm9maWxlc0J1dHRvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVE9ETyAtIGNvbWJpbmUgd2l0aCAnZm9yY2VNYW5hZ2VNb2R1bGVQcm9maWxlc0hlaWdodFJlc2l6ZSc/XHJcbiAgICAgICAgZnVuY3Rpb24gZm9yY2VNb2R1bGVNYW5hZ2VtZW50V2luZG93SGVpZ2h0UmVzaXplKCkge1xyXG4gICAgICAgICAgICBPYmplY3QudmFsdWVzKHVpLndpbmRvd3MpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGFwcCA9PiBhcHAub3B0aW9ucy5pZCA9PT0gTU9EVUxFX01BTkFHRU1FTlRfV0lORE9XX0lEKVxyXG4gICAgICAgICAgICAgICAgLmZvckVhY2goYXBwID0+IGFwcC5lbGVtZW50WzBdLnN0eWxlLmhlaWdodCA9ICdhdXRvJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbW9kaWZ5TW9kdWxlTGlzdEVsZW1lbnRzKCkge1xyXG4gICAgICAgIGNvbnN0IG1vZHVsZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI21vZHVsZS1tYW5hZ2VtZW50IGxpW2RhdGEtbW9kdWxlLW5hbWVdJyk7XHJcbiAgICAgICAgLy8gQWRkIHN0YXR1cyBibGlua2VycyBhbmQgYWRkIGFuIFwidXBkYXRlXCIgZXZlbnQgbGlzdGVuZXIgdG8gZWFjaCBtb2R1bGUgaW4gdGhlIGxpc3RcclxuICAgICAgICBtb2R1bGVFbGVtZW50cy5mb3JFYWNoKG1vZHVsZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0dXNCbGlua2VyQ29udGFpbmVyID0gY3JlYXRlTW9kdWxlU3RhdHVzQmxpbmtlcigpO1xyXG4gICAgICAgICAgICBpZiAobW9kdWxlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG1vZHVsZS5jaGlsZHJlblswXS5wcmVwZW5kKHN0YXR1c0JsaW5rZXJDb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgbW9kdWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4gdXBkYXRlQWxsU3RhdHVzRWxlbWVudHMoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtb2R1bGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlTW9kdWxlU3RhdHVzQmxpbmtlcigpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdtb2R1bGUtcHJvZmlsZXMtc3RhdHVzLWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cIm1vZHVsZS1wcm9maWxlcy1zdGF0dXMgbW9kdWxlLXByb2ZpbGVzLXN0YXR1cy1zYXZlZFwiPjwvc3Bhbj4nO1xyXG4gICAgICAgICAgICByZXR1cm4gc3BhbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlQWxsU3RhdHVzRWxlbWVudHMoKSB7XHJcbiAgICBjb25zdCBhY3RpdmVQcm9maWxlID0gU2V0dGluZ3MuZ2V0QWN0aXZlUHJvZmlsZSgpO1xyXG4gICAgY29uc3QgbW9kdWxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNtb2R1bGUtbWFuYWdlbWVudCBsaVtkYXRhLW1vZHVsZS1uYW1lXScpO1xyXG4gICAgbW9kdWxlcy5mb3JFYWNoKG1vZHVsZSA9PiB7XHJcbiAgICAgICAgaWYgKG1vZHVsZS5jaGlsZHJlblswXT8uY2hpbGRyZW5bMV0/LmNoaWxkcmVuWzBdKSAvLyBUT0RPIC0gYXBwcm9wcmlhdGVseSBoYW5kbGUgdGhpc1xyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0JsaW5rZXIgPSBtb2R1bGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZmlyc3RDaGlsZDtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tib3ggPSBtb2R1bGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF07XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgLSAnbmFtZScgZmllbGQgZXhpc3RzIG9uIEZvdW5kcnkgY2hlY2tib3hlcyB3aXRoIHRoZSBnaXZlbiBtb2R1bGUgSURzXHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoaW5nTW9kdWxlSW5mbyA9IGFjdGl2ZVByb2ZpbGUubW9kdWxlcy5maW5kKG1vZHVsZSA9PiBtb2R1bGUuaWQgPT09IGNoZWNrYm94LmF0dHJpYnV0ZXMubmFtZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaGluZ01vZHVsZUluZm8gJiYgbWF0Y2hpbmdNb2R1bGVJbmZvLmlzQWN0aXZlID09PSBjaGVja2JveC5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNCbGlua2VyLmNsYXNzTGlzdC5yZW1vdmUoJ21vZHVsZS1wcm9maWxlcy1zdGF0dXMtY2hhbmdlZCcpO1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzQmxpbmtlci5jbGFzc0xpc3QuYWRkKCdtb2R1bGUtcHJvZmlsZXMtc3RhdHVzLXNhdmVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNCbGlua2VyLmNsYXNzTGlzdC5yZW1vdmUoJ21vZHVsZS1wcm9maWxlcy1zdGF0dXMtc2F2ZWQnKTtcclxuICAgICAgICAgICAgICAgIHN0YXR1c0JsaW5rZXIuY2xhc3NMaXN0LmFkZCgnbW9kdWxlLXByb2ZpbGVzLXN0YXR1cy1jaGFuZ2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHVwZGF0ZVByb2ZpbGVTdGF0dXNCdXR0b25zKCk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlUHJvZmlsZVN0YXR1c0J1dHRvbnMoKSB7XHJcbiAgICBjb25zdCBhY3RpdmVQcm9maWxlID0gU2V0dGluZ3MuZ2V0QWN0aXZlUHJvZmlsZSgpO1xyXG4gICAgY29uc3QgaXNVcFRvRGF0ZSA9ICFNb2R1bGVNYW5hZ2VtZW50U2NyaXB0cy51bnNhdmVkQ2hhbmdlc0V4aXN0T24oYWN0aXZlUHJvZmlsZS5uYW1lKTtcclxuICAgIGNvbnN0IHByb2ZpbGVCdXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kdWxlLXByb2ZpbGVzLXN0YXR1cy1idXR0b24nKTtcclxuICAgIEFycmF5LmZyb20ocHJvZmlsZUJ1dHRvbnMpLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICBjb25zdCBidXR0b25Qcm9maWxlTmFtZSA9IGJ1dHRvbi5kYXRhc2V0LnByb2ZpbGVOYW1lO1xyXG4gICAgICAgIGlmIChpc1VwVG9EYXRlKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnJztcclxuICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhIGZhLWNoZWNrLWNpcmNsZVwiIHN0eWxlPVwiY29sb3I6IG1lZGl1bXNlYWdyZWVuXCI+PC9pPjxiPiR7KGJ1dHRvblByb2ZpbGVOYW1lKX08L2I+IGlzIHVwIHRvIGRhdGVgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2VyZWQnO1xyXG4gICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFyIGZhLXNhdmVcIj48L2k+IFNhdmUgY2hhbmdlcyB0byA8Yj4keyhidXR0b25Qcm9maWxlTmFtZSl9PC9iPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IGlzVXBUb0RhdGU7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBmaW5kVW5zYXZlZE1vZHVsZUluZm9zKCkge1xyXG4gICAgY29uc3QgbW9kdWxlQ2hlY2tib3hlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2R1bGUtbGlzdCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJyk7XHJcbiAgICBjb25zdCBhY3RpdmVNb2R1bGVJZHMgPSBBcnJheS5mcm9tKG1vZHVsZUNoZWNrYm94ZXMpXHJcbiAgICAgICAgLmZpbHRlcihjaGVja2JveCA9PiBjaGVja2JveC5jaGVja2VkKVxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmUgLSAnbmFtZScgZmllbGQgZXhpc3RzIG9uIEZvdW5kcnkgY2hlY2tib3hlcyB3aXRoIHRoZSBnaXZlbiBtb2R1bGUgSURzXHJcbiAgICAgICAgLm1hcChjaGVja2JveCA9PiBjaGVja2JveC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpO1xyXG4gICAgY29uc3QgaW5hY3RpdmVNb2R1bGVJZHMgPSBBcnJheS5mcm9tKG1vZHVsZUNoZWNrYm94ZXMpXHJcbiAgICAgICAgLmZpbHRlcihjaGVja2JveCA9PiAhY2hlY2tib3guY2hlY2tlZClcclxuICAgICAgICAvLyBAdHMtaWdub3JlIC0gJ25hbWUnIGZpZWxkIGV4aXN0cyBvbiBGb3VuZHJ5IGNoZWNrYm94ZXMgd2l0aCB0aGUgZ2l2ZW4gbW9kdWxlIElEc1xyXG4gICAgICAgIC5tYXAoY2hlY2tib3ggPT4gY2hlY2tib3guYXR0cmlidXRlcy5uYW1lLnZhbHVlKTtcclxuICAgIGNvbnN0IG1vZHVsZUxpc3QgPSB7fTtcclxuICAgIGFjdGl2ZU1vZHVsZUlkcy5mb3JFYWNoKG1vZHVsZUlkID0+IG1vZHVsZUxpc3RbbW9kdWxlSWRdID0gdHJ1ZSk7XHJcbiAgICBpbmFjdGl2ZU1vZHVsZUlkcy5mb3JFYWNoKG1vZHVsZUlkID0+IG1vZHVsZUxpc3RbbW9kdWxlSWRdID0gZmFsc2UpO1xyXG4gICAgcmV0dXJuIE1hcHBpbmdVdGlscy5tYXBUb01vZHVsZUluZm9zKG1vZHVsZUxpc3QpO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgU2V0dGluZ3MgZnJvbSAnLi9zZXR0aW5ncyc7XHJcbmltcG9ydCAqIGFzIEFQSSBmcm9tICcuL2FwaSc7XHJcbmltcG9ydCAqIGFzIE1vZHVsZU1hbmFnZW1lbnRTY3JpcHRzIGZyb20gJy4vdWkvbW9kdWxlLW1hbmFnZW1lbnQtc2NyaXB0cyc7XHJcbmltcG9ydCAqIGFzIE1hbmFnZU1vZHVsZVByb2ZpbGVzU2V0dGluZ3NGb3JtRnVuY3Rpb25zIGZyb20gJy4uL2NsYXNzZXMvTWFuYWdlTW9kdWxlUHJvZmlsZXNTZXR0aW5nc0Zvcm0nO1xyXG4vLyBNb2R1bGUgc2V0dXBcclxuSG9va3Mub25jZSgncmVhZHknLCBTZXR0aW5ncy5yZWdpc3Rlck1vZHVsZVNldHRpbmdzKTtcclxuSG9va3Mub25jZSgncmVhZHknLCBBUEkucmVnaXN0ZXJBcGkpO1xyXG4vLyBNb2R1bGUgTWFuYWdlbWVudCB3aW5kb3cgaG9va3NcclxuSG9va3Mub24oJ3JlbmRlck1vZHVsZU1hbmFnZW1lbnQnLCBNb2R1bGVNYW5hZ2VtZW50U2NyaXB0cy5tb2RpZnlNb2R1bGVNYW5hZ2VtZW50UmVuZGVyKTtcclxuSG9va3Mub24oJ2Nsb3NlRGlhbG9nJywgTW9kdWxlTWFuYWdlbWVudFNjcmlwdHMucmVmcmVzaFN0YXR1c0VsZW1lbnRzT25EZXBlbmRlbmNpZXNDbG9zZSk7XHJcbkhvb2tzLm9uKE1hbmFnZU1vZHVsZVByb2ZpbGVzU2V0dGluZ3NGb3JtRnVuY3Rpb25zLk1PRFVMRV9QUk9GSUxFU19VUERBVEVEX0hPT0tfTkFNRSwgTW9kdWxlTWFuYWdlbWVudFNjcmlwdHMuY2hlY2tVcGRhdGVBY3RpdmVQcm9maWxlU3RhdHVzZXMpO1xyXG4vLyBNb2R1bGUgUHJvZmlsZXMgTWFuYWdlbWVudCB3aW5kb3cgaG9va3NcclxuSG9va3Mub24oTWFuYWdlTW9kdWxlUHJvZmlsZXNTZXR0aW5nc0Zvcm1GdW5jdGlvbnMuTU9EVUxFX1BST0ZJTEVTX1VQREFURURfSE9PS19OQU1FLCBNYW5hZ2VNb2R1bGVQcm9maWxlc1NldHRpbmdzRm9ybUZ1bmN0aW9ucy5yZVJlbmRlck1hbmFnZU1vZHVsZVByb2ZpbGVzV2luZG93cyk7XHJcbkhvb2tzLm9uKE1hbmFnZU1vZHVsZVByb2ZpbGVzU2V0dGluZ3NGb3JtRnVuY3Rpb25zLlJFTkRFUl9IT09LX05BTUUsIE1hbmFnZU1vZHVsZVByb2ZpbGVzU2V0dGluZ3NGb3JtRnVuY3Rpb25zLmZvcmNlTWFuYWdlTW9kdWxlUHJvZmlsZXNIZWlnaHRSZXNpemUpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=