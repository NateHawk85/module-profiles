import {Settings} from '../classes/Settings.js';
import * as SettingsUtils from './settings-utils.js';
import * as ModuleManagement from './ui/module-management.js';
import {ViewProfileModules} from '../classes/ViewProfileModules.js';

// TODO - you can probably turn this whole API into a class

// TODO - make better
const settings = new Settings();

// TODO - call via game.modules.get('module-profiles').api.*
export function registerApi()
{

	const api = {
		getActiveProfile: settings.getActiveProfile,
		getAllProfiles: settings.getAllProfiles,
		getProfileByName: settings.getProfileByName,
		updateProfile: settings.updateProfile,
		getCurrentModuleConfiguration: settings.getCurrentModuleConfiguration,
		resetProfiles: settings.resetProfiles,
		deleteProfile: settings.deleteProfile,
		saveProfile: settings.saveProfile, // TODO?
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
	settings.loadProfile(name);
}

function editCallback()
{
	ui.notifications.info(`Edit callback called`);
	new ViewProfileModules().render(true);
	const modules = settings.getActiveProfile().modules;
	console.log('Current active profile saved modules: ');
	console.log(modules);
	const profiles = settings.getAllProfiles();
	console.log('All profiles: ');
	console.log(profiles);
}

function deleteCallback(name)
{
	ui.notifications.info(`Delete callback called with ${name}`);
	settings.deleteProfile(name);
	console.log('Deleted profile: ');
	console.log(name);
	console.log('Existing profiles: ');
	console.log(settings.getAllProfiles());
}