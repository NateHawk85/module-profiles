import * as Settings from '../../scripts/settings.js';
import {getProfileByName, SettingKey} from '../../scripts/settings.js';
import * as SettingsUtils from '../../scripts/settings-utils.js';
import {ManageProfilesSettings} from '../../classes/ManageProfilesSettings.js';
import {when} from 'jest-when';

const DEFAULT_PROFILE_NAME = 'Default Profile';
const DEFAULT_PROFILE = {name: DEFAULT_PROFILE_NAME, modules: undefined};

jest.mock('../../scripts/settings-utils.js', () => ({
	registerMenu: jest.fn(),
	registerSetting: jest.fn(),
	getSetting: jest.fn(),
	setSetting: jest.fn()
}));

beforeEach(() =>
{
	jest.clearAllMocks();

	when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue([DEFAULT_PROFILE]);
	when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.ACTIVE_PROFILE_NAME).mockReturnValue(DEFAULT_PROFILE_NAME);
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
			type: ManageProfilesSettings,
			restricted: false,
		});
	});

	test.each([
		{'module-id': true},
		{'module-id': true, 'another-module-id': false}

	])
		('WHEN called THEN the "profiles" setting is registered with the "currently-active module configuration" saved by default: %s', (configuration) =>
		{
			when(game.settings.get).calledWith('core', 'moduleConfiguration').mockReturnValue(configuration);

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

	test('WHEN called THEN the "active profile name" setting is registered with the "Default Profile" name saved by default', () =>
	{
		Settings.registerSettings();

		expect(SettingsUtils.registerSetting).toHaveBeenCalledWith(Settings.SettingKey.ACTIVE_PROFILE_NAME, {
			name: 'Active Profile Name',
			default: DEFAULT_PROFILE_NAME,
			type: String,
			scope: 'world'
		});
	});

	test('WHEN called THEN the "Register API" setting is registered', () =>
	{
		Settings.registerSettings();

		expect(SettingsUtils.registerSetting).toHaveBeenCalledWith(Settings.SettingKey.REGISTER_API, {
			name: 'Register API',
			hint: 'Make this module\'s API ("ModuleProfiles.api.*function()*") available. If you don\'t write code, you probably don\'t need this.',
			scope: 'world',
			config: true,
			type: Boolean,
			default: false
		});
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

describe('getActiveProfile', () =>
{
	test('WHEN no profiles exist in the game settings THEN returns undefined', () =>
	{
		when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue([]);

		const response = Settings.getActiveProfile();

		expect(response).toStrictEqual(undefined);
	});

	test('WHEN no profile exists with the active profile name THEN returns undefined', () =>
	{
		when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue([DEFAULT_PROFILE]);
		when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.ACTIVE_PROFILE_NAME).mockReturnValue('A Different Profile Name Than Default Profile');

		const response = Settings.getActiveProfile();

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
				when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue(profiles);
				when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.ACTIVE_PROFILE_NAME).mockReturnValue(activeProfileName);

				const response = Settings.getActiveProfile();

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
				when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue(profiles);
				when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.ACTIVE_PROFILE_NAME).mockReturnValue(activeProfileName);

				const response = Settings.getActiveProfile();

				expect(response).toStrictEqual(expected);
			});
});

describe('getProfileByName', () =>
{
	test('WHEN no profiles exist in the game settings THEN returns undefined', () =>
	{
		when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue([]);

		const response = Settings.getProfileByName('a profile name');

		expect(response).toStrictEqual(undefined);
	});

	test('WHEN called with a profile name that does not exist THEN returns undefined', () =>
	{
		when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue([DEFAULT_PROFILE]);

		const response = Settings.getProfileByName('not the default profile name');

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
			when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue(profiles);

			const response = Settings.getProfileByName(profileName);

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
			when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue(profiles);

			const response = Settings.getProfileByName(profileName);

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
			when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue(value);

			const response = Settings.getAllProfiles();

			expect(response).toStrictEqual(value);
		});
});

describe('loadProfile', () =>
{
	// TODO - continue testing
	test.each([DEFAULT_PROFILE_NAME, 'A Profile Name'])
		('WHEN called THEN calls Settings.getProfileByName for profile with the given name: %s', (value) =>
		{
			// TODO - still in progress
			const getProfileByNameSpy = jest.spyOn(require('../../scripts/settings.js'), 'getProfileByName');

			when(SettingsUtils.setSetting).calledWith(SettingKey.ACTIVE_PROFILE_NAME, value).mockReturnValue(Promise.resolve(value));
			when(game.settings.set).calledWith('core', 'moduleConfiguration', expect.any(Object)).mockReturnValue(Promise.resolve(DEFAULT_PROFILE));

			Settings.loadProfile(value);

			expect(getProfileByNameSpy).toHaveBeenCalledWith(value);

			getProfileByNameSpy.mockRestore();
		});
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
			when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue(profiles);

			const functionCall = () => Settings.saveProfile(profileName, DEFAULT_PROFILE.modules);

			expect(functionCall).toThrow(Error);
			expect(functionCall).toThrow(`Profile "${profileName}" already exists!`);
		});

	test.each([
		[DEFAULT_PROFILE_NAME, DEFAULT_PROFILE.modules],
		['A Profile Name That Does Not Currently Exist', undefined]
	])
		('WHEN called and no profiles exist THEN calls SettingsUtils.setSetting to save profile: %s, %o', (profileName, modules) =>
		{
			when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue([]);

			Settings.saveProfile(profileName, modules);

			expect(SettingsUtils.setSetting).toHaveBeenCalledWith(Settings.SettingKey.PROFILES, [{name: profileName, modules: modules}])
		});

	test.each([
		['Brand New Profile', DEFAULT_PROFILE.modules],
		['A Profile Name That Does Not Currently Exist', undefined]
	])
		('WHEN called with a profile name that does not exist THEN calls SettingsUtils.setSetting to save profile: %s, %o', (profileName, modules) =>
		{
			Settings.saveProfile(profileName, modules);

			const expectedProfilesArray = [DEFAULT_PROFILE, {name: profileName, modules: modules}]
			expect(SettingsUtils.setSetting).toHaveBeenCalledWith(Settings.SettingKey.PROFILES, expectedProfilesArray);
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
			when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue(profiles);

			Settings.saveProfile(profileName, modules);

			expect(SettingsUtils.setSetting).toHaveBeenCalledWith(Settings.SettingKey.PROFILES, expected);
		});

	test.each([
		[DEFAULT_PROFILE],
		[{name: 'A Different Profile', modules: undefined}]
	])
		('WHEN called and no matching profile exists THEN returns what SettingsUtils.setSetting returns: %s', (value) =>
		{
			when(SettingsUtils.setSetting).calledWith(Settings.SettingKey.PROFILES, expect.any(Object)).mockReturnValue(value);

			const response = Settings.saveProfile('Brand New Profile', undefined);

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
			when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue(profiles);

			const functionCall = () => Settings.updateProfile(profileName, DEFAULT_PROFILE.modules);

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
				when(SettingsUtils.getSetting).calledWith(Settings.SettingKey.PROFILES).mockReturnValue(profiles);

				Settings.updateProfile(profileName, modules);

				expect(SettingsUtils.setSetting).toHaveBeenCalledWith(Settings.SettingKey.PROFILES, expected);
			});

	test.each([
		'a return value', [{name: 'A profile', modules: undefined}]
	])
		('WHEN called and profile exists with name THEN returns what SettingsUtils.setSetting returns: %s', (value) =>
		{
			when(SettingsUtils.setSetting).calledWith(Settings.SettingKey.PROFILES, expect.any(Object)).mockReturnValue(value);

			const actual = Settings.updateProfile(DEFAULT_PROFILE_NAME, undefined);

			expect(actual).toStrictEqual(value);
		});
});