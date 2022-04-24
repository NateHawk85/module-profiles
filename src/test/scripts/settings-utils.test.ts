import * as SettingsUtils from '../../main/scripts/settings-utils';
import * as MockedSettings from '../../main/scripts/settings';
import {when} from 'jest-when';
import {DEFAULT_PROFILE, DEFAULT_PROFILE_NAME, TestModuleProfiles} from '../config/constants';
import ManageModuleProfilesSettingsForm from '../../main/classes/ManageModuleProfilesSettingsForm';

jest.mock('../../main/scripts/settings');
const Settings = jest.mocked(MockedSettings, true);

const MODULE_NAME = 'module-profiles';
const PROFILES_SETTING = 'profiles';
const ACTIVE_PROFILE_NAME_SETTING = 'activeProfileName';
const MANAGE_PROFILES_MENU = 'manageProfiles';

describe('registerSettings', () =>
{
	test.each([[DEFAULT_PROFILE.modules], [TestModuleProfiles.MultipleAllDisabled.modules]])
		('WHEN called THEN the "Profiles" setting is registered with the currently-active module configuration saved by default: %s', (configuration) =>
		{
			Settings.getCurrentModuleConfiguration.mockReturnValue(configuration);

			SettingsUtils.registerSettings();

			expect(game.settings.register).toHaveBeenCalledWith(MODULE_NAME, PROFILES_SETTING, {
				name: 'Profiles',
				hint: 'Existing module profiles',
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
		SettingsUtils.registerSettings();

		expect(game.settings.register).toHaveBeenCalledWith(MODULE_NAME, ACTIVE_PROFILE_NAME_SETTING, {
			name: 'Active Profile Name',
			default: DEFAULT_PROFILE_NAME,
			type: String,
			scope: 'world'
		});
	});

	test('WHEN called THEN only calls as many times as there are settings', () =>
	{
		SettingsUtils.registerSettings();

		expect(game.settings.register).toHaveBeenCalledTimes(2);
	});
});

describe('registerMenus', () =>
{
	test('WHEN called THEN the "Manage Profiles" menu is registered', () =>
	{
		SettingsUtils.registerMenus();

		expect(game.settings.registerMenu).toHaveBeenCalledWith(MODULE_NAME, MANAGE_PROFILES_MENU, {
			name: 'Manage Profiles',
			label: 'Manage Profiles',
			icon: 'fas fa-cog',
			type: ManageModuleProfilesSettingsForm,
			restricted: false
		});
	});

	test('WHEN called THEN only calls as many times as there are menus', () =>
	{
		SettingsUtils.registerMenus();

		expect(game.settings.registerMenu).toHaveBeenCalledTimes(1);
	});
});

describe('registerAPI', () =>
{
	test.each([
		[{ name: () => console.log('Something'), exampleCall: () => console.log('Hello!') }],
		[{ someFunctionA: () => [], someFunctionB: () => {} }]
	])
		('WHEN called THEN registers the API under the module\'s ID: %s', (value) =>
		{
			const mockAPI = {};
			// @ts-ignore
			when(game.modules.get).calledWith(MODULE_NAME).mockReturnValue(mockAPI);

			SettingsUtils.registerAPI(value);

			// @ts-ignore
			expect(game.modules.get(MODULE_NAME)!.api).toStrictEqual(value);
		});
});

describe('reloadWindow', () =>
{
	test('WHEN called THEN calls window.location.reload', () =>
	{
		SettingsUtils.reloadWindow();

		expect(window.location.reload).toHaveBeenCalled();
	});
});

describe('Settings', () =>
{
	describe('Profiles', () =>
	{
		describe('getProfiles', () =>
		{
			test('WHEN called THEN calls game.settings.get with setting name', () =>
			{
				SettingsUtils.getProfiles();

				expect(game.settings.get).toHaveBeenCalledWith(MODULE_NAME, PROFILES_SETTING);
			});

			test.each([
				[[DEFAULT_PROFILE]],
				[[TestModuleProfiles.OnlyModuleProfilesAndTidyUI, TestModuleProfiles.MultipleAllDisabled]]
			])
				('WHEN called THEN returns what game.settings.get returns: %s', (value) =>
				{
					when(game.settings.get).calledWith(MODULE_NAME, PROFILES_SETTING).mockReturnValue(value);

					const profiles = SettingsUtils.getProfiles();

					expect(profiles).toStrictEqual(value);
				});
		});

		describe('setProfiles', () =>
		{
			test.each([
				[[DEFAULT_PROFILE]],
				[[TestModuleProfiles.MultipleAllDisabled, TestModuleProfiles.OnlyModuleProfilesAndTidyUI]]
			])
				('WHEN called THEN calls game.settings.set with setting name: %s', (value) =>
				{
					SettingsUtils.setProfiles(value);

					expect(game.settings.set).toHaveBeenCalledWith(MODULE_NAME, PROFILES_SETTING, value);
				});

			test.each([
				[[DEFAULT_PROFILE]],
				[[DEFAULT_PROFILE, TestModuleProfiles.MultipleAllDisabled]]
			])
				('WHEN called THEN returns what game.settings.set returns: %s', (value) =>
				{
					when(game.settings.set).calledWith(MODULE_NAME, PROFILES_SETTING, value).mockReturnValue(Promise.resolve(value));

					const actual = SettingsUtils.setProfiles(value);

					expect(actual).toStrictEqual(Promise.resolve(value));
				});
		});
	});

	describe('Active Profile Name', () =>
	{
		describe('getActiveProfileName', () =>
		{
			test('WHEN called THEN calls game.settings.get with setting name', () =>
			{
				SettingsUtils.getActiveProfileName();

				expect(game.settings.get).toHaveBeenCalledWith(MODULE_NAME, ACTIVE_PROFILE_NAME_SETTING);
			});

			test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
				('WHEN called THEN returns what game.settings.get returns: %s', (value) =>
				{
					when(game.settings.get).calledWith(MODULE_NAME, ACTIVE_PROFILE_NAME_SETTING).mockReturnValue(value);

					const profiles = SettingsUtils.getActiveProfileName();

					expect(profiles).toStrictEqual(value);
				});
		});

		describe('setActiveProfileName', () =>
		{
			test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
				('WHEN called THEN calls game.settings.set with setting name: %s', (value) =>
				{
					SettingsUtils.setActiveProfileName(value);

					expect(game.settings.set).toHaveBeenCalledWith(MODULE_NAME, ACTIVE_PROFILE_NAME_SETTING, value);
				});

			test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
				('WHEN called THEN returns what game.settings.set returns: %s', (value) =>
				{
					when(game.settings.set).calledWith(MODULE_NAME, ACTIVE_PROFILE_NAME_SETTING, value).mockReturnValue(Promise.resolve(value));

					const actual = SettingsUtils.setActiveProfileName(value);

					expect(actual).toStrictEqual(Promise.resolve(value));
				});
		});
	});
});