// import * as API from '../../scripts/api.js';
// import * as SettingsUtils from '../../scripts/settings-utils.js';
// import * as Settings from '../../scripts/settings.js';
//
//
// jest.mock('../../scripts/settings-utils.js', () => ({
// 	registerAPI: jest.fn()
// }));
//
// beforeEach(() => {
// 	jest.restoreAllMocks(); // TODO - can remove?
// })
//
// describe('registerApi', () =>
// {
// 	test('WHEN called THEN calls SettingsUtils.registerAPI to register the API', () =>
// 	{
// 		API.registerApi();
//
// 		expect(SettingsUtils.registerAPI).toHaveBeenCalledWith({
// 			getActiveProfile: Settings.getActiveProfile,
// 			getAllProfiles: Settings.getAllProfiles,
// 			getProfileByName: Settings.getProfileByName,
// 			updateProfile: Settings.updateProfile,
// 			getCurrentModuleConfiguration: Settings.getCurrentModuleConfiguration,
// 			resetProfiles: Settings.resetProfiles
// 		});
// 	});
// });