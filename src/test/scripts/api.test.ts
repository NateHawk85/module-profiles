import * as API from '../../main/scripts/api';
import * as Settings from '../../main/scripts/settings';
import * as SettingsUtils from '../../main/scripts/settings-utils';
import * as ProfileInteractions from '../../main/scripts/profile-interactions';

jest.mock('../../../js/scripts/settings.ts');
jest.mock('../../../js/scripts/settings-utils.ts');
jest.mock('../../../js/scripts/profile-interactions.ts');

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