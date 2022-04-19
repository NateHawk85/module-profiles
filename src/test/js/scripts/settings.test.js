import * as Settings from '../../../js/scripts/settings.js';
import {SettingKey} from '../../../js/scripts/settings.js';
import * as SettingsUtils from '../../../js/scripts/settings-utils.js';
import ManageModuleProfilesSettingsForm from '../../../js/classes/ManageModuleProfilesSettingsForm.js';
import {DEFAULT_PROFILE, DEFAULT_PROFILE_NAME} from '../../config/constants.js';
import {when} from 'jest-when';

const MODULE_PROFILES_UPDATED_HOOK_NAME = 'moduleProfilesUpdated';

jest.mock('../../../js/scripts/settings-utils.js');

beforeEach(() =>
{
	when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.ACTIVE_PROFILE_NAME).mockReturnValue(DEFAULT_PROFILE_NAME);
	when(SettingsUtils.setSetting).calledWith(Settings.SettingKey.ACTIVE_PROFILE_NAME, expect.anything())
								  .mockImplementation((arg1, arg2) => Promise.resolve(arg2));
	when(SettingsUtils.setSetting).calledWith(Settings.SettingKey.PROFILES, expect.anything())
								  .mockImplementation((arg1, arg2) => Promise.resolve(arg2));
});

describe('registerSettings', () =>
{
	test('WHEN called THEN the "Manage Profiles" menu is registered', () =>
	{
		Settings.registerSettings();

		expect(SettingsUtils.registerMenu).toHaveBeenCalledWith(Settings.SettingKey.MANAGE_PROFILES, {
			name: undefined,
			label: 'Manage Profiles',
			hint: undefined,
			icon: 'fas fa-cog',
			type: ManageModuleProfilesSettingsForm,
			restricted: false
		});
	});

	test.each([
		{ 'module-id': true },
		{ 'module-id': true, 'another-module-id': false }

	])
		('WHEN called THEN the "Profiles" setting is registered with the "currently-active module configuration" saved by default: %s', (configuration) =>
		{
			jest.spyOn(Settings, 'getCurrentModuleConfiguration').mockImplementation(() => configuration);

			Settings.registerSettings();

			expect(SettingsUtils.registerSetting).toHaveBeenCalledWith(Settings.SettingKey.PROFILES, {
				name: 'Module Profiles Settings',
				hint: 'Settings definitions for the Module Profiles module',
				default: [
					{
						name: DEFAULT_PROFILE_NAME,
						modules: configuration
					}
				],
				type: Array,
				scope: 'world'
			});
		});

	test('WHEN called THEN the "Active Profile Name" setting is registered with the "Default Profile" name saved by default', () =>
	{
		Settings.registerSettings();

		expect(SettingsUtils.registerSetting).toHaveBeenCalledWith(Settings.SettingKey.ACTIVE_PROFILE_NAME, {
			name: 'Active Profile Name',
			default: DEFAULT_PROFILE_NAME,
			type: String,
			scope: 'world'
		});
	});

	test('WHEN getAllProfiles setting does not exist THEN resets to default profile', () =>
	{
		jest.spyOn(Settings, 'getAllProfiles').mockImplementation(() => undefined);
		jest.spyOn(Settings, 'resetProfiles').mockImplementation(() => 'Reset profiles!');

		Settings.registerSettings();

		expect(Settings.resetProfiles).toHaveBeenCalled();
	});

	test('WHEN no profiles exist THEN resets to default profile', () =>
	{
		jest.spyOn(Settings, 'getAllProfiles').mockImplementation(() => []);
		jest.spyOn(Settings, 'resetProfiles').mockImplementation(() => 'Reset profiles!');

		Settings.registerSettings();

		expect(Settings.resetProfiles).toHaveBeenCalled();
	});

	test('WHEN a profile exists THEN does not reset to default profile', () =>
	{
		jest.spyOn(Settings, 'resetProfiles').mockImplementation(() => 'Reset profiles!');
		jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([DEFAULT_PROFILE]);

		Settings.registerSettings();

		expect(Settings.resetProfiles).toBeCalledTimes(0);
	});
});

describe('getCurrentModuleConfiguration', () =>
{
	test.each(['first setting value', 'another setting'])
		('WHEN called THEN returns what the core module configuration returns: %s', (returnValue) =>
		{
			when(game.settings.get).calledWith('core', 'moduleConfiguration').mockReturnValue(returnValue);

			expect(Settings.getCurrentModuleConfiguration()).toStrictEqual(returnValue);
		});
});

describe('getAllProfiles', () =>
{
	test.each([
		[DEFAULT_PROFILE],
		[DEFAULT_PROFILE, { name: 'A Different Profile', modules: { 'module-1': true } }]
	])
		('WHEN called THEN returns what SettingsUtils.getSetting returns: %s', (value) =>
		{
			when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue(value);

			const response = Settings.getAllProfiles();

			expect(response).toStrictEqual(value);
		});
});

describe('getActiveProfile', () =>
{
	test('WHEN called THEN calls SettingsUtils.getSetting for active profile name', () =>
	{
		jest.spyOn(Settings, 'getProfileByName').mockReturnValue(undefined);
		Settings.getActiveProfile();

		expect(SettingsUtils.getSetting).toHaveBeenCalledWith(SettingKey.ACTIVE_PROFILE_NAME);
	});

	test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
		('WHEN called THEN calls Settings.getProfileByName with response from SettingsUtils: %s', (value) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(undefined);
			when(SettingsUtils.getSetting).calledWith(SettingKey.ACTIVE_PROFILE_NAME).mockReturnValue(value);

			Settings.getActiveProfile();

			expect(Settings.getProfileByName).toHaveBeenCalledWith(value);
		});

	test.each([DEFAULT_PROFILE, { name: 'A Different Profile Name', modules: DEFAULT_PROFILE.modules }])
		('WHEN called THEN returns what Settings.getProfileByName returns: %s', (value) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(value);

			const actual = Settings.getActiveProfile();

			expect(actual).toStrictEqual(value);
		});
});

describe('getProfileByName', () =>
{
	test('WHEN Settings.getAllProfiles returns empty array THEN returns undefined', () =>
	{
		jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([]);

		const response = Settings.getProfileByName('a profile name');

		expect(response).toStrictEqual(undefined);
	});

	test.each([DEFAULT_PROFILE, { name: 'A Different Profile', modules: {} }])
		('WHEN Settings.getAllProfiles returns an array with no matching profile names THEN returns undefined: %s', (value) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([value]);

			const response = Settings.getProfileByName('not that profile name');

			expect(response).toStrictEqual(undefined);
		});

	test.each([
		[
			DEFAULT_PROFILE_NAME,
			[DEFAULT_PROFILE],
			DEFAULT_PROFILE
		],
		[
			'A Different Profile Name',
			[{ name: 'A Different Profile Name', modules: { aModule: true } }],
			{ name: 'A Different Profile Name', modules: { aModule: true } }
		]
	])
		('WHEN Settings.getAllProfiles returns one profile and name matches THEN returns the matching profile: %s, %o, %s', (profileName, profiles, expected) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(profiles);

			const response = Settings.getProfileByName(profileName);

			expect(response).toStrictEqual(expected);
		});

	test.each([
		[
			DEFAULT_PROFILE_NAME,
			[{ name: 'A Different Profile', modules: undefined }, DEFAULT_PROFILE],
			DEFAULT_PROFILE
		],
		[
			'A Different Profile',
			[{ name: 'A Different Profile', modules: undefined }, DEFAULT_PROFILE],
			{ name: 'A Different Profile', modules: undefined }
		],
		[
			DEFAULT_PROFILE_NAME,
			[{ name: 'Profile 1', modules: undefined }, DEFAULT_PROFILE, { name: 'Profile 2', modules: undefined }],
			DEFAULT_PROFILE
		]

	])
		('WHEN Settings.getAllProfiles returns multiple profiles and one matches profile name THEN returns the matching profile: %s, %o, %s',
			(profileName, profiles, expected) =>
			{
				jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(profiles);

				const response = Settings.getProfileByName(profileName);

				expect(response).toStrictEqual(expected);
			});
});

describe('exportProfileByName', () =>
{
	test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
		('WHEN called THEN calls Settings.getProfileByName with profile name: %s', (value) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(undefined);

			Settings.exportProfileByName(value);

			expect(Settings.getProfileByName).toHaveBeenCalledWith(value);
		});

	test('WHEN Settings.getProfileByName returns undefined THEN returns undefined', () =>
	{
		jest.spyOn(Settings, 'getProfileByName').mockReturnValue(undefined);

		const response = Settings.exportProfileByName('a profile name');

		expect(response).toStrictEqual(undefined);
	});

	test('WHEN Settings.getProfileByName returns a profile THEN returns what Settings.getProfileByName returns as JSON string', () =>
	{
		const profile = {
			'name': 'A Profile Name',
			'modules': {
				'a-module': true,
				'b-module': false
			}
		};
		jest.spyOn(Settings, 'getProfileByName').mockReturnValue(profile);

		const actual = Settings.exportProfileByName(DEFAULT_PROFILE_NAME);

		expect(actual).toStrictEqual(
			'{\n' +
			'  \"name\": \"A Profile Name\",\n' +
			'  \"modules\": {\n' +
			'    \"a-module\": true,\n' +
			'    \"b-module\": false\n' +
			'  }\n' +
			'}');
	});

	test('WHEN Settings.getProfileByName returns a profile THEN returns what Settings.getProfileByName returns as JSON string with alternate parameters', () =>
	{
		const profile = {
			name: 'A Different Profile Name',
			modules: {
				'a-module': true,
				'b-module': false,
				'c-module': true
			}
		};
		jest.spyOn(Settings, 'getProfileByName').mockReturnValue(profile);

		const actual = Settings.exportProfileByName(DEFAULT_PROFILE_NAME);

		expect(actual).toStrictEqual(
			'{\n' +
			'  \"name\": \"A Different Profile Name\",\n' +
			'  \"modules\": {\n' +
			'    \"a-module\": true,\n' +
			'    \"b-module\": false,\n' +
			'    \"c-module\": true\n' +
			'  }\n' +
			'}');
	});
});

describe('activateProfile', () =>
{
	test.each([DEFAULT_PROFILE_NAME, 'A Profile Name'])
		('WHEN called THEN calls Settings.getProfileByName for profile with the given name: %s', async (value) =>
		{
			const spies = buildSpyFunctionsForActivateProfile(value, DEFAULT_PROFILE);

			await Settings.activateProfile(value);

			expect(spies.getProfileByName).toHaveBeenCalledWith(value);
		});

	test.each([DEFAULT_PROFILE_NAME, 'A Profile Name'])
		('WHEN profile does not exist THEN throws Error and calls ui.notifications.error: %s', async (value) =>
		{
			buildSpyFunctionsForActivateProfile(value, undefined);

			const functionCall = () => Settings.activateProfile(value);

			await expect(functionCall).rejects.toThrow(Error);
			expect(ui.notifications.error).toHaveBeenCalledWith(`Unable to activate module profile. Profile "${value}" does not exist!`);
			await expect(functionCall).rejects.toThrow(`Unable to activate module profile. Profile "${value}" does not exist!`);
		});

	test.each([
		[DEFAULT_PROFILE_NAME, DEFAULT_PROFILE],
		['A Profile Name', { name: 'A Profile Name', modules: undefined }]
	])
		('WHEN profile exists THEN calls SettingsUtils.setSetting to save active profile name: %s, %o', (profileName, profile) =>
		{
			buildSpyFunctionsForActivateProfile(profileName, profile);

			Settings.activateProfile(profileName);

			expect(SettingsUtils.setSetting).toHaveBeenCalledWith(Settings.SettingKey.ACTIVE_PROFILE_NAME, profileName);
		});

	test.each(
		[
			DEFAULT_PROFILE,
			{ name: 'A Different Profile Name', modules: { aModule: true } }
		])
		('WHEN profile exists THEN calls Settings.setCoreModuleConfiguration with returned profile: %s', async (value) =>
		{
			const spies = buildSpyFunctionsForActivateProfile(DEFAULT_PROFILE_NAME, value);

			await Settings.activateProfile(DEFAULT_PROFILE_NAME);

			expect(spies.setCoreModuleConfiguration).toHaveBeenCalledWith(value.modules);
		});

	test('WHEN profile exists THEN calls SettingUtils.reloadWindow to reload window', async () =>
	{
		buildSpyFunctionsForActivateProfile(DEFAULT_PROFILE_NAME, DEFAULT_PROFILE);

		await Settings.activateProfile(DEFAULT_PROFILE_NAME);

		expect(SettingsUtils.reloadWindow).toHaveBeenCalled();
	});

	function buildSpyFunctionsForActivateProfile(profileName, profile)
	{
		const getProfileByNameSpy = jest.spyOn(Settings, 'getProfileByName');
		const setCoreModuleConfigurationSpy = jest.spyOn(Settings, 'setCoreModuleConfiguration');

		when(getProfileByNameSpy).calledWith(profileName)
								 .mockReturnValue(profile);
		when(setCoreModuleConfigurationSpy).calledWith(profile?.modules)
										   .mockReturnValue(Promise.resolve(profile?.modules));

		return {
			getProfileByName: getProfileByNameSpy,
			setCoreModuleConfiguration: setCoreModuleConfigurationSpy
		};
	}
});

describe('createProfile', () =>
{
	test('WHEN profile name is undefined THEN throws Error and calls ui.notifications.error', async () =>
	{
		const functionCall = async () => Settings.createProfile(undefined, undefined);

		await expect(functionCall).rejects.toThrow(Error);
		expect(ui.notifications.error).toHaveBeenCalledWith('Unable to create module profile. Profile name is undefined.');
		await expect(functionCall).rejects.toThrow('Unable to create module profile. Profile name is undefined.');
	});

	test('WHEN profile name is empty string THEN throws Error and calls ui.notifications.error', async () =>
	{
		const functionCall = async () => Settings.createProfile('', undefined);

		await expect(functionCall).rejects.toThrow(Error);
		expect(ui.notifications.error).toHaveBeenCalledWith('Unable to create module profile. Profile name must not be empty.');
		await expect(functionCall).rejects.toThrow('Unable to create module profile. Profile name must not be empty.');
	});

	test('WHEN profile name is defined and modules are undefined THEN throws Error and calls ui.notifications.error', async () =>
	{
		const functionCall = async () => Settings.createProfile(DEFAULT_PROFILE_NAME, undefined);

		await expect(functionCall).rejects.toThrow(Error);
		expect(ui.notifications.error).toHaveBeenCalledWith('Unable to create module profile. Please refresh the page and try again.');
		await expect(functionCall).rejects.toThrow('Unable to create module profile. Please refresh the page and try again.');
	});

	test.each([DEFAULT_PROFILE_NAME, 'Another Profile Name'])
		('WHEN profile already exists THEN throws Error and calls ui.notifications.error: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(DEFAULT_PROFILE);

			const functionCall = async () => Settings.createProfile(value, DEFAULT_PROFILE.modules);

			await expect(functionCall).rejects.toThrow(Error);
			expect(ui.notifications.error).toHaveBeenCalledWith(`Unable to create module profile. Profile "${value}" already exists!`);
			await expect(functionCall).rejects.toThrow(`Unable to create module profile. Profile "${value}" already exists!`);
		});

	test.each([
		[DEFAULT_PROFILE_NAME, DEFAULT_PROFILE.modules],
		['A Profile Name That Does Not Currently Exist', {}]
	])
		('WHEN no profiles exist THEN calls SettingsUtils.setSetting to save profile: %s, %o', async (profileName, modules) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(undefined);
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([]);

			await Settings.createProfile(profileName, modules);

			expect(SettingsUtils.setSetting).toHaveBeenCalledWith(Settings.SettingKey.PROFILES, [{ name: profileName, modules: modules }]);
		});

	test.each([
		['Brand New Profile', DEFAULT_PROFILE.modules],
		['A Profile Name That Does Not Currently Exist', {}]
	])
		('WHEN profile name does not exist THEN calls SettingsUtils.setSetting to save profile: %s, %o', async (profileName, modules) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(undefined);
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([DEFAULT_PROFILE]);

			await Settings.createProfile(profileName, modules);

			const expectedProfilesArray = [DEFAULT_PROFILE, { name: profileName, modules: modules }];
			expect(SettingsUtils.setSetting).toHaveBeenCalledWith(Settings.SettingKey.PROFILES, expectedProfilesArray);
		});

	test.each([
		[
			'Profile 1',
			{ moduleA: true, moduleB: false },
			[DEFAULT_PROFILE],
			[DEFAULT_PROFILE, { name: 'Profile 1', modules: { moduleA: true, moduleB: false } }]
		],
		[
			'Profile 1',
			{ moduleA: false, moduleB: true },
			[DEFAULT_PROFILE],
			[DEFAULT_PROFILE, { name: 'Profile 1', modules: { moduleA: false, moduleB: true } }]
		],
		[
			'Profile 2',
			{ moduleA: false },
			[DEFAULT_PROFILE, { name: 'Profile 1', modules: { moduleA: true, moduleB: false } }],
			[DEFAULT_PROFILE, { name: 'Profile 1', modules: { moduleA: true, moduleB: false } }, { name: 'Profile 2', modules: { moduleA: false } }]
		],
		[
			'Profile 2',
			{ moduleC: true },
			[DEFAULT_PROFILE, { name: 'Profile 1', modules: { moduleA: true, moduleB: false } }],
			[DEFAULT_PROFILE, { name: 'Profile 1', modules: { moduleA: true, moduleB: false } }, { name: 'Profile 2', modules: { moduleC: true } }]
		]
	])
		('WHEN profile name does not exist THEN calls SettingsUtils.setSetting to save without overwriting the current profile array: ' +
			'%s, %o, %o, %s', async (profileName, modules, profiles, expected) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(profiles);

			await Settings.createProfile(profileName, modules);

			expect(SettingsUtils.setSetting).toHaveBeenCalledWith(Settings.SettingKey.PROFILES, expected);
		});

	test('WHEN profile name does not exist THEN fires "moduleProfilesUpdated" hook event', async () =>
	{
		jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([DEFAULT_PROFILE]);

		await Settings.createProfile('A Different Profile Name', {});

		expect(Hooks.callAll).toHaveBeenCalledWith(MODULE_PROFILES_UPDATED_HOOK_NAME);
	});

	test.each(['Some Profile Name', 'A Different Profile Name'])
		('WHEN profile name does not exist THEN calls ui.notifications.info: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([DEFAULT_PROFILE]);

			await Settings.createProfile(value, {});

			expect(ui.notifications.info).toHaveBeenCalledWith(`Profile "${value}" has been created!`);
		});

	test.each([
		[DEFAULT_PROFILE],
		[{ name: 'A Different Profile', modules: {} }]
	])
		('WHEN no matching profile exists THEN returns what SettingsUtils.setSetting returns: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([value]);

			const response = await Settings.createProfile('Brand New Profile', {});

			expect(response).toStrictEqual([value, { name: 'Brand New Profile', modules: {} }]);
		});
});

describe('saveChangesToProfile', () =>
{
	test.each([
		[
			[DEFAULT_PROFILE],
			'Another Profile Name'
		],
		[
			[{ name: 'Another Profile Name', modules: undefined }],
			DEFAULT_PROFILE_NAME
		],
		[
			[DEFAULT_PROFILE, { name: 'Another Profile Name', modules: undefined }],
			'Yet Another Profile Name'
		]
	])
		('WHEN no profiles exist with name THEN throws Error and calls ui.notifications.error: %o, %s', async (profiles, profileName) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(profiles);

			const functionCall = async () => Settings.saveChangesToProfile(profileName, DEFAULT_PROFILE.modules);

			await expect(functionCall).rejects.toThrow(Error);
			expect(ui.notifications.error).toHaveBeenCalledWith(`Unable to save module profile changes. Profile "${profileName}" does not exist!`);
			await expect(functionCall).rejects.toThrow(`Unable to save module profile changes. Profile "${profileName}" does not exist!`);
		});

	test.each([
		[
			DEFAULT_PROFILE_NAME,
			{ moduleA: true, moduleB: false },
			[DEFAULT_PROFILE],
			[{ name: DEFAULT_PROFILE_NAME, modules: { moduleA: true, moduleB: false } }]
		],
		[
			'Profile 1',
			{ moduleA: false, moduleB: true },
			[{ name: 'Profile 1', modules: { moduleA: true, moduleB: false } }],
			[{ name: 'Profile 1', modules: { moduleA: false, moduleB: true } }]
		],
		[
			'Profile 2',
			{ moduleA: false },
			[DEFAULT_PROFILE, { name: 'Profile 2', modules: { moduleA: true, moduleB: false } }],
			[DEFAULT_PROFILE, { name: 'Profile 2', modules: { moduleA: false } }]
		],
		[
			'Profile 2',
			{ moduleC: true },
			[DEFAULT_PROFILE, { name: 'Profile 1', modules: { moduleA: true, moduleB: false } }, { name: 'Profile 2', modules: { moduleC: false } }],
			[DEFAULT_PROFILE, { name: 'Profile 1', modules: { moduleA: true, moduleB: false } }, { name: 'Profile 2', modules: { moduleC: true } }]
		]
	])
		('WHEN profile exists with name THEN calls SettingsUtils.setSetting to save and overwrite the current profile: %s, %o, %o, %o',
			async (profileName, modules, profiles, expected) =>
			{
				jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(profiles);

				await Settings.saveChangesToProfile(profileName, modules);

				expect(SettingsUtils.setSetting).toHaveBeenCalledWith(Settings.SettingKey.PROFILES, expected);
			});

	test('WHEN profile exists with name THEN fires "moduleProfilesUpdated" hook event', async () =>
	{
		jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([DEFAULT_PROFILE]);

		await Settings.saveChangesToProfile(DEFAULT_PROFILE_NAME, {});

		expect(Hooks.callAll).toHaveBeenCalledWith(MODULE_PROFILES_UPDATED_HOOK_NAME);
	});

	test.each(['Some Profile Name', 'A Different Profile Name'])
		('WHEN profile exists with name THEN calls ui.notifications.info: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([{ name: value, modules: {} }]);

			await Settings.saveChangesToProfile(value, {});

			expect(ui.notifications.info).toHaveBeenCalledWith(`Changes to profile "${value}" have been saved!`);
		});

	test.each([
		'a return value', [{ name: 'A profile', modules: undefined }]
	])
		('WHEN profile exists with name THEN returns what SettingsUtils.setSetting returns: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([DEFAULT_PROFILE]);
			when(SettingsUtils.setSetting).calledWith(Settings.SettingKey.PROFILES, expect.anything()).mockReturnValue(Promise.resolve(value));

			const actual = await Settings.saveChangesToProfile(DEFAULT_PROFILE_NAME, undefined);

			expect(actual).toStrictEqual(value);
		});
});

describe('deleteProfile', () =>
{
	test('WHEN no profile exists with name THEN throws Error and calls ui.notifications.error', async () =>
	{
		jest.spyOn(Settings, 'getProfileByName').mockReturnValue(undefined);

		const functionCall = () => Settings.deleteProfile(DEFAULT_PROFILE_NAME);

		await expect(functionCall).rejects.toThrow(Error);
		expect(ui.notifications.error).toHaveBeenCalledWith(`Unable to delete module profile. Profile "${DEFAULT_PROFILE_NAME}" does not exist!`);
		await expect(functionCall).rejects.toThrow(`Unable to delete module profile. Profile "${DEFAULT_PROFILE_NAME}" does not exist!`);
	});

	test.each([DEFAULT_PROFILE, { name: 'A Different Profile', modules: {} }])
		('WHEN only one profile exists THEN calls SettingsUtils.setSetting to set profiles and refreshes window: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(value);
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([value]);

			await Settings.deleteProfile(value.name);

			expect(SettingsUtils.setSetting).toHaveBeenCalledWith(SettingKey.PROFILES, []);
			expect(SettingsUtils.reloadWindow).toHaveBeenCalled();
		});

	test.each([
		[
			DEFAULT_PROFILE_NAME,
			[DEFAULT_PROFILE, { name: 'A Different Profile', modules: {} }],
			[{ name: 'A Different Profile', modules: {} }]
		],
		[
			'A Different Profile',
			[DEFAULT_PROFILE, { name: 'A Different Profile', modules: {} }, { name: 'Brand New Profile', modules: { 'module-1': false } }],
			[DEFAULT_PROFILE, { name: 'Brand New Profile', modules: { 'module-1': false } }]
		],
		[
			'Brand New Profile',
			[DEFAULT_PROFILE, { name: 'A Different Profile', modules: {} }, { name: 'Brand New Profile', modules: { 'module-1': false } }],
			[DEFAULT_PROFILE, { name: 'A Different Profile', modules: {} }]
		]
	])
		('WHEN multiple profiles exist and one matches name THEN calls SettingsUtils.setSetting to set profiles and does not refresh window: %s, %o, %o',
			async (profileName, existingProfiles, expectedSavedProfiles) =>
			{
				jest.spyOn(Settings, 'getProfileByName').mockReturnValue(DEFAULT_PROFILE);
				jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(existingProfiles);

				await Settings.deleteProfile(profileName);

				expect(SettingsUtils.setSetting).toHaveBeenCalledWith(SettingKey.PROFILES, expectedSavedProfiles);
				expect(SettingsUtils.reloadWindow).toHaveBeenCalledTimes(0);
			});

	test('WHEN a profile exists THEN fires "moduleProfilesUpdated" hook event', async () =>
	{
		jest.spyOn(Settings, 'getProfileByName').mockReturnValue(DEFAULT_PROFILE);
		jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([DEFAULT_PROFILE]);

		await Settings.deleteProfile('A Different Profile Name');

		expect(Hooks.callAll).toHaveBeenCalledWith(MODULE_PROFILES_UPDATED_HOOK_NAME);
	});

	test.each(['Some Profile Name', 'A Different Profile Name'])
		('WHEN profile exists with name THEN calls ui.notifications.info: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue({ name: value, modules: {} });
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([{ name: value, modules: {} }]);

			await Settings.deleteProfile(value);

			expect(ui.notifications.info).toHaveBeenCalledWith(`Profile "${value}" has been deleted!`);
		});

	test.each([
		'a return value', [{ name: 'A profile', modules: undefined }]
	])
		('WHEN profile exists with name THEN returns what SettingsUtils.setSetting returns: %s', async (value) =>
		{
			const profile = { name: value, modules: {} };
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(profile);
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([profile]);

			const actual = await Settings.deleteProfile(DEFAULT_PROFILE_NAME);

			expect(actual).toStrictEqual([profile]);
		});
});
