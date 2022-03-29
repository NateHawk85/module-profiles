import * as Settings from './settings.js';
import * as SettingsUtils from './settings-utils.js';
import * as ProfileInteractions from './profile-interactions.js';
import * as ModuleManagementScripts from './ui/module-management.js'; // TODO - rename?
import {ViewProfileModules} from '../classes/ViewProfileModules.js';

// TODO - you can probably turn this whole API into a class

// TODO - make better

// TODO - call via game.modules.get('module-profiles').api.*
export function registerApi()
{

	const api = {
		getActiveProfile: Settings.getActiveProfile,
		getAllProfiles: Settings.getAllProfiles,
		getProfileByName: Settings.getProfileByName,
		saveChangesToProfile: Settings.saveChangesToProfile,
		getCurrentModuleConfiguration: Settings.getCurrentModuleConfiguration,
		resetProfiles: Settings.resetProfiles,
		deleteProfile: Settings.deleteProfile,
		createProfile: Settings.createProfile,
		activateProfile: ProfileInteractions.activateProfile,
		editCallback: editCallback,
		test: ModuleManagementScripts.test
	};

	SettingsUtils.registerAPI(api);
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