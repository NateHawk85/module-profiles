import * as Settings from './settings.js';
import * as SettingsUtils from './settings-utils.js';
import * as ModuleManagement from './ui/module-management.js';
import {ViewProfileModules} from '../classes/ViewProfileModules.js';

export function registerApi()
{
	const api = {
		getActiveProfile: Settings.getActiveProfile,
		getAllProfiles: Settings.getAllProfiles,
		getProfileByName: Settings.getProfileByName,
		updateProfile: Settings.updateProfile,
		getCurrentModuleConfiguration: Settings.getCurrentModuleConfiguration,
		setActiveProfileName: Settings.setActiveProfileName,
		resetProfiles: Settings.resetProfiles,
		deleteProfile: Settings.deleteProfile,
		saveProfile: Settings.saveProfile, // TODO?
		activationCallback: activationCallback,
		editCallback: editCallback,
		deleteCallback: deleteCallback,
		test: ModuleManagement.test
	};

	SettingsUtils.registerAPI(api);
}

// TODO - this is a really crappy way of doing this. Find a better way
function activationCallback(name)
{
	ui.notifications.info(`Activation callback called with ${name}`);
	Settings.loadProfile(name);
}

function editCallback()
{
	ui.notifications.info(`Edit callback called`);
	new ViewProfileModules().render(true);
	const modules = Settings.getActiveProfile().modules;
	console.log('Current active profile saved modules: ');
	console.log(modules);
	const profiles = Settings.getAllProfiles();
	console.log('All profiles: ');
	console.log(profiles);
}

function deleteCallback(name)
{
	ui.notifications.info(`Delete callback called with ${name}`);
	Settings.deleteProfile(name);
	console.log('Deleted profile: ');
	console.log(name);
	console.log('Existing profiles: ');
	console.log(Settings.getAllProfiles());
}