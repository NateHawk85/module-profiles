import * as API from '../../../js/scripts/api.js';
import * as Settings from '../../../js/scripts/settings.js';
import * as SettingsUtils from '../../../js/scripts/settings-utils.js';
import * as ProfileInteractions from '../../../js/scripts/profile-interactions.js';

jest.mock('../../../js/scripts/settings.js');
jest.mock('../../../js/scripts/settings-utils.js');
jest.mock('../../../js/scripts/profile-interactions.js');

describe('registerApi', () =>
{
	test('WHEN called THEN calls SettingsUtils.registerApi with correct values', () =>
	{
		API.registerApi();

		expect(SettingsUtils.registerAPI).toHaveBeenCalledWith({
			getCurrentModuleConfiguration: Settings.getCurrentModuleConfiguration,
			setCoreModuleConfiguration: Settings.setCoreModuleConfiguration,
			createProfile: Settings.createProfile,
			activateProfile: ProfileInteractions.activateProfile,
			saveChangesToProfile: Settings.saveChangesToProfile,
			getAllProfiles: Settings.getAllProfiles,
			getActiveProfile: Settings.getActiveProfile,
			getProfileByName: Settings.getProfileByName,
			exportProfileByName: Settings.exportProfileByName,
			deleteProfile: Settings.deleteProfile,
			resetProfiles: Settings.resetProfiles
		});
	});
});