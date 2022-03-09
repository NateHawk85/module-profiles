import * as API from '../../scripts/api.js';
import * as SettingsUtils from '../../scripts/settings-utils.js';
import * as Settings from '../../classes/Settings.js';


jest.mock('../../scripts/settings-utils.js', () => ({
	registerAPI: jest.fn()
}));

describe('registerApi', () =>
{
	test('WHEN called THEN calls SettingsUtils.registerAPI to register the API', () =>
	{
		API.registerApi();

		expect(SettingsUtils.registerAPI).toHaveBeenCalledWith({
			getActiveProfile: Settings.getActiveProfile,
			getAllProfiles: Settings.getAllProfiles,
			getProfileByName: Settings.getProfileByName,
			updateProfile: Settings.updateProfile,
			getCurrentModuleConfiguration: Settings.getCurrentModuleConfiguration,
			setActiveProfileName: Settings.setActiveProfileName,
			resetProfiles: Settings.resetProfiles
		});
	});
});