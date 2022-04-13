import * as Settings from './settings.js';
import * as SettingsUtils from './settings-utils.js';
import * as ProfileInteractions from './profile-interactions.js';
import * as ModuleManagementScripts from './ui/module-management-scripts.js';
import EditModuleProfileForm from '../classes/EditModuleProfileForm.js';

// TODO - make better
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

// TODO - copy this functionality over to the edit button, then delete
function editCallback()
{
	ui.notifications.info(`Edit callback called`);
	new EditModuleProfileForm().render(true);
	const modules = Settings.getActiveProfile().modules;
	console.log('Current active profile saved modules: ');
	console.log(modules);
	const profiles = Settings.getAllProfiles();
	console.log('All profiles: ');
	console.log(profiles);
}