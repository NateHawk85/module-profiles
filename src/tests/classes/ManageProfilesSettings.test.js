import {ManageProfilesSettings} from '../../classes/ManageProfilesSettings.js';
import {getSetting} from '../../scripts/settings-utils.js';

jest.mock('../../scripts/settings-utils.js', () => ({
	getSetting: jest.fn()
}));

let manageProfilesSettings;

beforeEach(() =>
{
	manageProfilesSettings = new ManageProfilesSettings();
});

describe('defaultOptions', () =>
{
	test('WHEN called THEN returns options', () =>
	{
		expect(ManageProfilesSettings.defaultOptions).toEqual({
			title: 'Manage Profiles',
			id: 'manage-profiles',
			template: 'modules/module-profiles/templates/manage-profiles.hbs',
			resizable: true,
			width: 660,
		});
	});
});

describe('getData', () =>
{
	test('WHEN called THEN calls SettingsUtils.getSetting', () =>
	{
		manageProfilesSettings.getData();

		expect(getSetting).toHaveBeenCalledWith('someTestKey');
	});
});