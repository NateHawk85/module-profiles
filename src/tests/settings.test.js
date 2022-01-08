import * as Settings from '../scripts/settings.js';
import * as SettingsUtils from '../scripts/settings-utils.js';
import {ManageProfilesSettings} from '../classes/ManageProfilesSettings.js';
import {when} from 'jest-when';

const DEFAULT_PROFILE_NAME = 'Default Profile';
const DEFAULT_PROFILE = {name: DEFAULT_PROFILE_NAME, modules: undefined}

jest.mock('../scripts/settings-utils.js', () => ({
	registerMenu: jest.fn(),
	registerSetting: jest.fn(),
	getSetting: jest.fn()
}));

beforeEach(() =>
{
	when(SettingsUtils.getSetting).calledWith('activeProfileName').mockReturnValue(DEFAULT_PROFILE_NAME);
	when(SettingsUtils.getSetting).calledWith('profiles').mockReturnValue([DEFAULT_PROFILE]);
});

describe('registerSettings', () =>
{
	test('WHEN called THEN registerMenu is called with the manage profiles settings', () =>
	{
		Settings.registerSettings();

		expect(SettingsUtils.registerMenu).toHaveBeenCalledWith('manageProfiles', {
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
		('WHEN called THEN registerSetting is called with the profile settings: %s', (configuration) =>
		{
			game.settings.get.mockReturnValue(configuration);

			Settings.registerSettings();

			expect(SettingsUtils.registerSetting).toHaveBeenCalledWith('profiles', {
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

	test('WHEN called THEN registerSetting is called with the active profile name settings', () =>
	{
		Settings.registerSettings();

		expect(SettingsUtils.registerSetting).toHaveBeenCalledWith('activeProfileName', {
			name: 'Active Profile Name',
			default: DEFAULT_PROFILE_NAME,
			type: String,
			scope: 'world'
		});
	});
});

describe('retrieveCurrentModuleConfiguration', () =>
{
	test('WHEN called THEN calls game.settings.get for core module configuration', () =>
	{
		Settings.retrieveCurrentModuleConfiguration();

		expect(game.settings.get).toHaveBeenCalledWith('core', 'moduleConfiguration');
	});

	test.each(['first setting value', 'another setting'])
		('WHEN called THEN returns what game.settings.get returns: %s', (returnValue) =>
		{
			game.settings.get.mockReturnValue(returnValue);

			expect(Settings.retrieveCurrentModuleConfiguration()).toEqual(returnValue);
		});
});

describe('retrieveActiveProfile', () =>
{
	test('WHEN called THEN calls SettingUtils.getSetting for active profile name', () =>
	{
		Settings.retrieveActiveProfile();

		expect(SettingsUtils.getSetting).toHaveBeenCalledWith('activeProfileName');
	});

	test('WHEN called THEN calls SettingUtils.getSetting for profiles name', () =>
	{
		Settings.retrieveActiveProfile();

		expect(SettingsUtils.getSetting).toHaveBeenCalledWith('profiles');
	});

	test('WHEN no profiles exist THEN returns undefined', () =>
	{
		when(SettingsUtils.getSetting).calledWith('profiles').mockReturnValue([]);

		const response = Settings.retrieveActiveProfile();

		expect(response).toBe(undefined);
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
		('WHEN only one profile with matching name exists THEN returns profile with the same name as the active profile\'s: %s, %o, %s',
			(activeProfileName, profiles, expected) =>
			{
				when(SettingsUtils.getSetting).calledWith('activeProfileName').mockReturnValue(activeProfileName);
				when(SettingsUtils.getSetting).calledWith('profiles').mockReturnValue(profiles);

				const response = Settings.retrieveActiveProfile();

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
			[{name: 'A New Profile', modules: undefined}, {name: 'A Different Profile Name', modules: undefined}, DEFAULT_PROFILE],
			DEFAULT_PROFILE
		]
	])
		('WHEN multiple profiles exist with only one matching THEN returns profile with the same name as the active profile\'s: %s, %o, %s',
			(activeProfileName, profiles, expected) =>
			{
				when(SettingsUtils.getSetting).calledWith('activeProfileName').mockReturnValue(activeProfileName);
				when(SettingsUtils.getSetting).calledWith('profiles').mockReturnValue(profiles);

				const response = Settings.retrieveActiveProfile();

				expect(response).toStrictEqual(expected);
			});
});

// TODO ?
describe('convertToCamelCase', () =>
{
	test('WHEN called with no spaces THEN returns everything in lowercase', () =>
	{
		expect(Settings.convertToCamelCase('thisIsMyName')).toBe('thisismyname');
		expect(Settings.convertToCamelCase('THiSismyNAME')).toBe('thisismyname');
	});

	test('WHEN called with spaces THEN returns camelCase response', () =>
	{
		expect(Settings.convertToCamelCase('this is my name')).toBe('thisIsMyName');
		expect(Settings.convertToCamelCase('THIS IS MY NAME')).toBe('thisIsMyName');
		expect(Settings.convertToCamelCase('This is my name')).toBe('thisIsMyName');
		expect(Settings.convertToCamelCase('this iS my nAMe')).toBe('thisIsMyName');
		expect(Settings.convertToCamelCase('This Is My Name')).toBe('thisIsMyName');
	});

	test('WHEN called with special characters THEN removes special characters', () =>
	{
		expect(Settings.convertToCamelCase('this -is-my-name')).toBe('thisIsMyName');
		expect(Settings.convertToCamelCase('this is my\' name')).toBe('thisIsMyName');
		expect(Settings.convertToCamelCase('this is my[] name')).toBe('thisIsMyName');
		expect(Settings.convertToCamelCase('this is my{ name')).toBe('thisIsMyName');
		expect(Settings.convertToCamelCase('this is my} name')).toBe('thisIsMyName');
		expect(Settings.convertToCamelCase('thisismy}name')).toBe('thisismyName');
	});
});