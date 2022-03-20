import {SettingKey, Settings} from '../../js/classes/settings.js';
import * as SettingsUtils from '../../js/scripts/settings-utils.js';
import {ManageProfilesSettings} from '../../js/classes/ManageProfilessettings.js';
import {when} from 'jest-when';

const DEFAULT_PROFILE_NAME = 'Default Profile';
const DEFAULT_PROFILE = {name: DEFAULT_PROFILE_NAME, modules: undefined};

let settings;

jest.mock('../../js/scripts/settings-utils.js', () => ({
	registerMenu: jest.fn(),
	registerSetting: jest.fn(),
	getSetting: jest.fn(),
	setSetting: jest.fn(),
	reloadWindow: jest.fn()
}));

beforeEach(() =>
{
	jest.restoreAllMocks();

	settings = new Settings();

	when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue([DEFAULT_PROFILE]);
	when(SettingsUtils.getSetting).calledWith(SettingKey.ACTIVE_PROFILE_NAME).mockReturnValue(DEFAULT_PROFILE_NAME);
	when(SettingsUtils.setSetting).calledWith(SettingKey.ACTIVE_PROFILE_NAME, expect.any(String)).mockImplementation((arg1, arg2) => Promise.resolve(arg2));
});

describe('registerSettings', () =>
{
	test('WHEN called THEN the "Manage Profiles" menu is registered', () =>
	{
		settings.registerSettings();

		expect(SettingsUtils.registerMenu).toHaveBeenCalledWith(SettingKey.MANAGE_PROFILES, {
			name: undefined,
			label: 'Manage Profiles',
			hint: undefined,
			icon: 'fas fa-cog',
			type: ManageProfilesSettings,
			restricted: false,
		});
	});

	test.each([
		{'module-id': true},
		{'module-id': true, 'another-module-id': false}

	])
		('WHEN called THEN the "Profiles" setting is registered with the "currently-active module configuration" saved by default: %s', (configuration) =>
		{
			jest.spyOn(settings, 'getCurrentModuleConfiguration').mockImplementation(() => configuration);

			settings.registerSettings();

			expect(SettingsUtils.registerSetting).toHaveBeenCalledWith(SettingKey.PROFILES, {
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
		settings.registerSettings();

		expect(SettingsUtils.registerSetting).toHaveBeenCalledWith(SettingKey.ACTIVE_PROFILE_NAME, {
			name: 'Active Profile Name',
			default: DEFAULT_PROFILE_NAME,
			type: String,
			scope: 'world'
		});
	});

	test('WHEN called THEN the "Register API" setting is registered', () =>
	{
		settings.registerSettings();

		expect(SettingsUtils.registerSetting).toHaveBeenCalledWith(SettingKey.REGISTER_API, {
			name: 'Register API',
			hint: 'Make this module\'s API (ModuleProfiles.api.*function()*) available. If you don\'t write code, you probably don\'t need this.',
			scope: 'world',
			config: true,
			type: Boolean,
			default: false
		});
	});

	test('WHEN no profiles exist THEN resets to default profile', () =>
	{
		jest.spyOn(settings, 'getAllProfiles').mockImplementation(() => []);
		jest.spyOn(settings, 'resetProfiles').mockImplementation(() => 'Reset profiles!');

		settings.registerSettings();

		expect(settings.resetProfiles).toHaveBeenCalled();
	});

	test('WHEN a profile exists THEN does not reset to default profile', () =>
	{
		jest.spyOn(settings, 'resetProfiles').mockImplementation(() => 'Reset profiles!');

		settings.registerSettings();

		expect(settings.resetProfiles).toBeCalledTimes(0);
	});
});

describe('getCurrentModuleConfiguration', () =>
{
	test.each(['first setting value', 'another setting'])
		('WHEN called THEN returns what the core module configuration returns: %s', (returnValue) =>
		{
			when(game.settings.get).calledWith('core', 'moduleConfiguration').mockReturnValue(returnValue);

			expect(settings.getCurrentModuleConfiguration()).toStrictEqual(returnValue);
		});
});

describe('getActiveProfile', () =>
{
	test('WHEN no profiles exist in the game settings THEN returns undefined', () =>
	{
		when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue([]);

		const response = settings.getActiveProfile();

		expect(response).toStrictEqual(undefined);
	});

	test('WHEN no profile exists with the active profile name THEN returns undefined', () =>
	{
		when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue([DEFAULT_PROFILE]);
		when(SettingsUtils.getSetting).calledWith(SettingKey.ACTIVE_PROFILE_NAME).mockReturnValue('A Different Profile Name Than Default Profile');

		const response = settings.getActiveProfile();

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
			[{name: 'A Different Profile Name', modules: {aModule: true}}],
			{name: 'A Different Profile Name', modules: {aModule: true}}
		]
	])
		('WHEN only one profile exists and name matches active profile name THEN returns profile with the same name as the active profile\'s: %s, %o, %s',
			(activeProfileName, profiles, expected) =>
			{
				when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue(profiles);
				when(SettingsUtils.getSetting).calledWith(SettingKey.ACTIVE_PROFILE_NAME).mockReturnValue(activeProfileName);

				const response = settings.getActiveProfile();

				expect(response).toStrictEqual(expected);
			});

	test.each([
		[
			DEFAULT_PROFILE_NAME,
			[DEFAULT_PROFILE, {name: 'A Different Profile Name', modules: undefined}],
			DEFAULT_PROFILE
		],
		[
			'A Different Profile Name',
			[DEFAULT_PROFILE, {name: 'A Different Profile Name', modules: {aModule: true}}],
			{name: 'A Different Profile Name', modules: {aModule: true}}
		],
		[
			DEFAULT_PROFILE_NAME,
			[{name: 'A New Profile', modules: undefined}, DEFAULT_PROFILE, {name: 'A Different Profile Name', modules: undefined}],
			DEFAULT_PROFILE
		]
	])
		('WHEN multiple profiles exist with only one matching THEN returns profile with the same name as the active profile\'s: %s, %o, %s',
			(activeProfileName, profiles, expected) =>
			{
				when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue(profiles);
				when(SettingsUtils.getSetting).calledWith(SettingKey.ACTIVE_PROFILE_NAME).mockReturnValue(activeProfileName);

				const response = settings.getActiveProfile();

				expect(response).toStrictEqual(expected);
			});
});

describe('getProfileByName', () =>
{
	test('WHEN no profiles exist in the game settings THEN returns undefined', () =>
	{
		when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue([]);

		const response = settings.getProfileByName('a profile name');

		expect(response).toStrictEqual(undefined);
	});

	test('WHEN called with a profile name that does not exist THEN returns undefined', () =>
	{
		when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue([DEFAULT_PROFILE]);

		const response = settings.getProfileByName('not the default profile name');

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
			[{name: 'A Different Profile Name', modules: {aModule: true}}],
			{name: 'A Different Profile Name', modules: {aModule: true}}
		]
	])
		('WHEN only one profile exists and name matches THEN returns the matching profile: %s, %o, %s', (profileName, profiles, expected) =>
		{
			when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue(profiles);

			const response = settings.getProfileByName(profileName);

			expect(response).toStrictEqual(expected);
		});

	test.each([
		[
			DEFAULT_PROFILE_NAME,
			[{name: 'A Different Profile', modules: undefined}, DEFAULT_PROFILE],
			DEFAULT_PROFILE
		],
		[
			'A Different Profile',
			[{name: 'A Different Profile', modules: undefined}, DEFAULT_PROFILE],
			{name: 'A Different Profile', modules: undefined}
		],
		[
			DEFAULT_PROFILE_NAME,
			[{name: 'Profile 1', modules: undefined}, DEFAULT_PROFILE, {name: 'Profile 2', modules: undefined}],
			DEFAULT_PROFILE
		]

	])
		('WHEN multiple profiles exist and one matches profile name THEN returns the matching profile: %s, %o, %s', (profileName, profiles, expected) =>
		{
			when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue(profiles);

			const response = settings.getProfileByName(profileName);

			expect(response).toStrictEqual(expected);
		});
});

describe('getAllProfiles', () =>
{
	test.each([
		[DEFAULT_PROFILE],
		[DEFAULT_PROFILE, {name: 'A Different Profile', modules: {'module-1': true}}]
	])
		('WHEN called THEN returns what SettingsUtils.getSetting returns: %s', (value) =>
		{
			when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue(value);

			const response = settings.getAllProfiles();

			expect(response).toStrictEqual(value);
		});
});

describe('loadProfile', () =>
{
	test.each([DEFAULT_PROFILE_NAME, 'A Profile Name'])
		('WHEN called THEN calls Settings.getProfileByName for profile with the given name: %s', async (value) =>
		{
			const spies = buildSpyFunctionsForLoadProfile(value, DEFAULT_PROFILE);

			await settings.loadProfile(value);

			expect(spies.getProfileByName).toHaveBeenCalledWith(value);
		});

	test.each([DEFAULT_PROFILE_NAME, 'A Profile Name'])
		('WHEN profile does not exist THEN throws error: %s', async (value) =>
		{
			buildSpyFunctionsForLoadProfile(value, undefined);

			const functionCall = () => settings.loadProfile(value);

			await expect(functionCall).rejects.toThrow(Error);
			await expect(functionCall).rejects.toThrow(`Profile "${value}" does not exist!`);
		});

	test.each([
		[DEFAULT_PROFILE_NAME, DEFAULT_PROFILE],
		['A Profile Name', {name: 'A Profile Name', modules: undefined}]
	])
		('WHEN profile exists THEN calls SettingsUtils.setSetting to save active profile name: %s, %o', (profileName, profile) =>
		{
			buildSpyFunctionsForLoadProfile(profileName, profile);

			settings.loadProfile(profileName);

			expect(SettingsUtils.setSetting).toHaveBeenCalledWith(SettingKey.ACTIVE_PROFILE_NAME, profileName);
		});

	test.each(
		[
			DEFAULT_PROFILE,
			{name: 'A Different Profile Name', modules: {aModule: true}}
		])
		('WHEN profile exists THEN calls Settings.setCoreModuleConfiguration with returned profile: %s', async (value) =>
		{
			const spies = buildSpyFunctionsForLoadProfile(DEFAULT_PROFILE_NAME, value);

			await settings.loadProfile(DEFAULT_PROFILE_NAME);

			expect(spies.setCoreModuleConfiguration).toHaveBeenCalledWith(value.modules);
		});

	test('WHEN profile exists THEN reloads window', async () =>
	{
		buildSpyFunctionsForLoadProfile(DEFAULT_PROFILE_NAME, DEFAULT_PROFILE);

		await settings.loadProfile(DEFAULT_PROFILE_NAME);

		expect(SettingsUtils.reloadWindow).toHaveBeenCalled();
	});

	function buildSpyFunctionsForLoadProfile(profileName, profile)
	{
		const getProfileByNameSpy = jest.spyOn(settings, 'getProfileByName');
		const setCoreModuleConfigurationSpy = jest.spyOn(settings, 'setCoreModuleConfiguration');

		when(getProfileByNameSpy).calledWith(profileName).mockReturnValue(profile);
		when(setCoreModuleConfigurationSpy).calledWith(profile?.modules).mockReturnValue(Promise.resolve(profile?.modules));

		return {
			getProfileByName: getProfileByNameSpy,
			setCoreModuleConfiguration: setCoreModuleConfigurationSpy
		};
	}
});

describe('saveProfile', () =>
{
	test.each([
		[
			[DEFAULT_PROFILE],
			DEFAULT_PROFILE_NAME
		],
		[
			[{name: 'Another Profile Name', modules: undefined}],
			'Another Profile Name'
		],
		[
			[DEFAULT_PROFILE, {name: 'Another Profile Name', modules: undefined}],
			DEFAULT_PROFILE_NAME
		],

	])
		('WHEN called and profile already exists THEN throws error: %o, %s', (profiles, profileName) =>
		{
			when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue(profiles);

			const functionCall = () => settings.saveProfile(profileName, DEFAULT_PROFILE.modules);

			expect(functionCall).toThrow(Error);
			expect(functionCall).toThrow(`Profile "${profileName}" already exists!`);
		});

	test.each([
		[DEFAULT_PROFILE_NAME, DEFAULT_PROFILE.modules],
		['A Profile Name That Does Not Currently Exist', undefined]
	])
		('WHEN called and no profiles exist THEN calls SettingsUtils.setSetting to save profile: %s, %o', (profileName, modules) =>
		{
			when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue([]);

			settings.saveProfile(profileName, modules);

			expect(SettingsUtils.setSetting).toHaveBeenCalledWith(SettingKey.PROFILES, [{name: profileName, modules: modules}])
		});

	test.each([
		['Brand New Profile', DEFAULT_PROFILE.modules],
		['A Profile Name That Does Not Currently Exist', undefined]
	])
		('WHEN called with a profile name that does not exist THEN calls SettingsUtils.setSetting to save profile: %s, %o', (profileName, modules) =>
		{
			settings.saveProfile(profileName, modules);

			const expectedProfilesArray = [DEFAULT_PROFILE, {name: profileName, modules: modules}]
			expect(SettingsUtils.setSetting).toHaveBeenCalledWith(SettingKey.PROFILES, expectedProfilesArray);
		});

	test.each([
		[
			'Profile 1',
			{moduleA: true, moduleB: false},
			[DEFAULT_PROFILE],
			[DEFAULT_PROFILE, {name: 'Profile 1', modules: {moduleA: true, moduleB: false}}]
		],
		[
			'Profile 1',
			{moduleA: false, moduleB: true},
			[DEFAULT_PROFILE],
			[DEFAULT_PROFILE, {name: 'Profile 1', modules: {moduleA: false, moduleB: true}}]
		],
		[
			'Profile 2',
			{moduleA: false},
			[DEFAULT_PROFILE, {name: 'Profile 1', modules: {moduleA: true, moduleB: false}}],
			[DEFAULT_PROFILE, {name: 'Profile 1', modules: {moduleA: true, moduleB: false}}, {name: 'Profile 2', modules: {moduleA: false}}]
		],
		[
			'Profile 2',
			{moduleC: true},
			[DEFAULT_PROFILE, {name: 'Profile 1', modules: {moduleA: true, moduleB: false}}],
			[DEFAULT_PROFILE, {name: 'Profile 1', modules: {moduleA: true, moduleB: false}}, {name: 'Profile 2', modules: {moduleC: true}}]
		]
	])
		('WHEN called with a profile name that does not exist THEN calls SettingsUtils.setSetting to save without overwriting the current profile array: ' +
			'%s, %o, %o, %s', (profileName, modules, profiles, expected) =>
		{
			when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue(profiles);

			settings.saveProfile(profileName, modules);

			expect(SettingsUtils.setSetting).toHaveBeenCalledWith(SettingKey.PROFILES, expected);
		});

	test.each([
		[DEFAULT_PROFILE],
		[{name: 'A Different Profile', modules: undefined}]
	])
		('WHEN called and no matching profile exists THEN returns what SettingsUtils.setSetting returns: %s', (value) =>
		{
			when(SettingsUtils.setSetting).calledWith(SettingKey.PROFILES, expect.any(Object)).mockReturnValue(value);

			const response = settings.saveProfile('Brand New Profile', undefined);

			expect(response).toStrictEqual(value);
		});
});

describe('updateProfile', () =>
{
	test.each([
		[
			[DEFAULT_PROFILE],
			'Another Profile Name'
		],
		[
			[{name: 'Another Profile Name', modules: undefined}],
			DEFAULT_PROFILE_NAME
		],
		[
			[DEFAULT_PROFILE, {name: 'Another Profile Name', modules: undefined}],
			'Yet Another Profile Name'
		],
	])
		('WHEN called and no profiles exist with name THEN throws error: %o, %s', (profiles, profileName) =>
		{
			when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue(profiles);

			const functionCall = () => settings.updateProfile(profileName, DEFAULT_PROFILE.modules);

			expect(functionCall).toThrow(Error);
			expect(functionCall).toThrow(`Profile "${profileName}" does not exist!`);
		});

	test.each([
		[
			DEFAULT_PROFILE_NAME,
			{moduleA: true, moduleB: false},
			[DEFAULT_PROFILE],
			[{name: DEFAULT_PROFILE_NAME, modules: {moduleA: true, moduleB: false}}]
		],
		[
			'Profile 1',
			{moduleA: false, moduleB: true},
			[{name: 'Profile 1', modules: {moduleA: true, moduleB: false}}],
			[{name: 'Profile 1', modules: {moduleA: false, moduleB: true}}]
		],
		[
			'Profile 2',
			{moduleA: false},
			[DEFAULT_PROFILE, {name: 'Profile 2', modules: {moduleA: true, moduleB: false}}],
			[DEFAULT_PROFILE, {name: 'Profile 2', modules: {moduleA: false}}]
		],
		[
			'Profile 2',
			{moduleC: true},
			[DEFAULT_PROFILE, {name: 'Profile 1', modules: {moduleA: true, moduleB: false}}, {name: 'Profile 2', modules: {moduleC: false}}],
			[DEFAULT_PROFILE, {name: 'Profile 1', modules: {moduleA: true, moduleB: false}}, {name: 'Profile 2', modules: {moduleC: true}}]
		]
	])
		('WHEN called and profile exists with name THEN calls SettingsUtils.setSetting to save and overwrite the current profile: %s, %o, %o, %o',
			(profileName, modules, profiles, expected) =>
			{
				when(SettingsUtils.getSetting).calledWith(SettingKey.PROFILES).mockReturnValue(profiles);

				settings.updateProfile(profileName, modules);

				expect(SettingsUtils.setSetting).toHaveBeenCalledWith(SettingKey.PROFILES, expected);
			});

	test.each([
		'a return value', [{name: 'A profile', modules: undefined}]
	])
		('WHEN called and profile exists with name THEN returns what SettingsUtils.setSetting returns: %s', (value) =>
		{
			when(SettingsUtils.setSetting).calledWith(SettingKey.PROFILES, expect.any(Object)).mockReturnValue(value);

			const actual = settings.updateProfile(DEFAULT_PROFILE_NAME, undefined);

			expect(actual).toStrictEqual(value);
		});
});