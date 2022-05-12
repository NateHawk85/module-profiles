import * as API from '../../main/scripts/api';
import * as Settings from '../../main/scripts/settings';
import * as MockSettingsUtils from '../../main/scripts/settings-utils';

jest.mock('../../main/scripts/settings-utils');
const SettingsUtils = jest.mocked(MockSettingsUtils, true);

describe('registerApi', () =>
{
	test('WHEN called THEN calls SettingsUtils.registerApi with correct values', () =>
	{
		API.registerApi();

		expect(SettingsUtils.registerAPI).toHaveBeenCalledWith({
			getCurrentModuleConfiguration: Settings.getCurrentModuleConfiguration,
			getAllProfiles: Settings.getAllProfiles,
			getActiveProfile: Settings.getActiveProfile,
			getProfileByName: Settings.getProfileByName,
			exportAllProfiles: Settings.exportAllProfiles,
			exportProfileByName: Settings.exportProfileByName,
			saveChangesToProfile: Settings.saveChangesToProfile,
			activateProfile: Settings.activateProfile,
			createProfile: Settings.createProfile,
			importProfiles: Settings.importProfiles,
			deleteProfile: Settings.deleteProfile,
			resetProfiles: Settings.resetProfiles
		});
	});
});