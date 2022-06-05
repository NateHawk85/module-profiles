import * as SettingsUtils from '../../main/scripts/settings-utils';
import {MODULE_ID} from '../../main/scripts/settings-utils';
import * as MockedSettings from '../../main/scripts/settings';
import * as MockedDataMigration from '../../main/scripts/data-migration';
import {when} from 'jest-when';
import * as Constants from '../config/constants';
import {DATA_VERSION, DEFAULT_PROFILE, DEFAULT_PROFILE_NAME} from '../config/constants';
import ManageModuleProfilesSettingsForm from '../../main/classes/ManageModuleProfilesSettingsForm';

jest.mock('../../main/scripts/settings');
const Settings = jest.mocked(MockedSettings, true);
jest.mock('../../main/scripts/data-migration');
const DataMigration = jest.mocked(MockedDataMigration, true);

const MODULE_NAME = 'module-profiles';
const PROFILES_SETTING = 'profiles';
const ACTIVE_PROFILE_NAME_SETTING = 'activeProfileName';
const DATA_VERSION_SETTING = 'dataVersion';
const MANAGE_PROFILES_MENU = 'manageProfiles';

describe('registerSettings', () =>
{
	test.each([[DEFAULT_PROFILE.modules], [Constants.TestModuleProfiles.MultipleAllDisabled.modules]])
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

	test('WHEN the data version is up to date THEN registers the data version setting', () =>
	{
		SettingsUtils.registerSettings();

		expect(game.settings.register).toHaveBeenCalledWith(MODULE_NAME, DATA_VERSION_SETTING, {
			name: 'Data Version',
			default: DATA_VERSION,
			type: Number,
			scope: 'world'
		});
	});

	test.each([0])
		('WHEN the data version is not the latest version THEN calls DataMigration.migrateData', (value) =>
		{
			when(game.settings.get).calledWith(MODULE_ID, DATA_VERSION_SETTING).mockReturnValue(value);

			SettingsUtils.registerSettings();

			expect(DataMigration.migrateData).toHaveBeenCalled();
		});

	test('WHEN the data version is the latest version THEN does not call DataMigration.migrateData', () =>
	{
		when(game.settings.get).calledWith(MODULE_ID, DATA_VERSION_SETTING).mockReturnValue(1);

		SettingsUtils.registerSettings();

		expect(DataMigration.migrateData).toHaveBeenCalledTimes(0);
	});

	test('WHEN called THEN only calls as many times as there are settings', () =>
	{
		SettingsUtils.registerSettings();

		expect(game.settings.register).toHaveBeenCalledTimes(3);
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
			restricted: true
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
			game.modules.set(MODULE_NAME, mockAPI);

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
				[[Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI, Constants.TestModuleProfiles.MultipleAllDisabled]]
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
				[[Constants.TestModuleProfiles.MultipleAllDisabled, Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI]]
			])
				('WHEN called THEN calls game.settings.set with setting name: %s', (value) =>
				{
					SettingsUtils.setProfiles(value);

					expect(game.settings.set).toHaveBeenCalledWith(MODULE_NAME, PROFILES_SETTING, value);
				});

			test.each([
				[[DEFAULT_PROFILE]],
				[[DEFAULT_PROFILE, Constants.TestModuleProfiles.MultipleAllDisabled]]
			])
				('WHEN called THEN returns what game.settings.set returns: %s', (value) =>
				{
					when(game.settings.set).calledWith(MODULE_NAME, PROFILES_SETTING, value).mockReturnValue(Promise.resolve(value));

					const actual = SettingsUtils.setProfiles(value);

					expect(actual).toStrictEqual(Promise.resolve(value));
				});

			test.each([
				[
					[Constants.TestModuleProfiles.OnlyModuleProfiles, Constants.TestModuleProfiles.MultipleAllDisabled],
					[Constants.TestModuleProfiles.MultipleAllDisabled, Constants.TestModuleProfiles.OnlyModuleProfiles]
				],
				[
					[Constants.TestModuleProfiles.MultipleAllEnabled, Constants.TestModuleProfiles.MultipleAllDisabled],
					[Constants.TestModuleProfiles.MultipleAllDisabled, Constants.TestModuleProfiles.MultipleAllEnabled]
				],
				[
					[{ name: 'Some Module Profile', modules: [] }, { name: 'A Module Profile', modules: [] }],
					[{ name: 'A Module Profile', modules: [] }, { name: 'Some Module Profile', modules: [] }]
				],
				[
					[{ name: 'Some Module Profile', modules: [] }, { name: 'AAAAAA Module Profile', modules: [] }, { name: 'A Module Profile', modules: [] }],
					[{ name: 'A Module Profile', modules: [] }, { name: 'AAAAAA Module Profile', modules: [] }, { name: 'Some Module Profile', modules: [] }]
				]
			])
				('WHEN profiles are not in alphabetical order by profile name THEN sorts them before calling game.settings.set: %o, %o',
					(inputtedModuleProfiles, expectedModuleProfiles) =>
					{
						SettingsUtils.setProfiles(inputtedModuleProfiles);

						expect(game.settings.set).toHaveBeenCalledWith(MODULE_NAME, PROFILES_SETTING, expectedModuleProfiles);
					});

			test.each([
				[
					[
						Constants.buildModuleInfo(Constants.TidyUITestValues, false),
						Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false)
					],
					[
						Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false),
						Constants.buildModuleInfo(Constants.TidyUITestValues, false)
					]
				],
				[
					[
						Constants.buildModuleInfo(Constants.TidyUITestValues, false),
						Constants.buildModuleInfo(Constants.PopoutTestValues, false),
						Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false)
					],
					[
						Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false),
						Constants.buildModuleInfo(Constants.PopoutTestValues, false),
						Constants.buildModuleInfo(Constants.TidyUITestValues, false)
					]
				],
				[
					[
						Constants.buildModuleInfo(Constants.PopoutTestValues, true),
						Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false),
						Constants.buildModuleInfo(Constants.ModuleProfilesTestValues, false),
						Constants.buildModuleInfo(Constants.TidyUITestValues, false)
					],
					[
						Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false),
						Constants.buildModuleInfo(Constants.ModuleProfilesTestValues, false),
						Constants.buildModuleInfo(Constants.PopoutTestValues, true),
						Constants.buildModuleInfo(Constants.TidyUITestValues, false)
					]
				],
				[
					[
						Constants.buildModuleInfo({ id: 'b-module', title: 'B Module' }, false),
						Constants.buildModuleInfo({ id: 'a-module', title: 'A Module' }, false)
					],
					[
						Constants.buildModuleInfo({ id: 'a-module', title: 'A Module' }, false),
						Constants.buildModuleInfo({ id: 'b-module', title: 'B Module' }, false)
					]
				],
				[
					[
						Constants.buildModuleInfo({ id: 'key-does-not-matter', title: 'ZZZZ Module' }, false),
						Constants.buildModuleInfo({ id: 'zzzzzz-module', title: 'A Module' }, false),
						Constants.buildModuleInfo({ id: 'key-does-not-matter2', title: 'Z Module' }, false)
					],
					[
						Constants.buildModuleInfo({ id: 'zzzzzz-module', title: 'A Module' }, false),
						Constants.buildModuleInfo({ id: 'key-does-not-matter2', title: 'Z Module' }, false),
						Constants.buildModuleInfo({ id: 'key-does-not-matter', title: 'ZZZZ Module' }, false)
					]
				],
				[
					[
						Constants.buildModuleInfo({ id: 'a-key', title: 'ZZZZ Module' }, false),
						Constants.buildModuleInfo({ id: 'b-key', title: 'A Module' }, false),
						Constants.buildModuleInfo({ id: 'c-key', title: 'C Module' }, false)
					],
					[
						Constants.buildModuleInfo({ id: 'b-key', title: 'A Module' }, false),
						Constants.buildModuleInfo({ id: 'c-key', title: 'C Module' }, false),
						Constants.buildModuleInfo({ id: 'a-key', title: 'ZZZZ Module' }, false)
					]
				]
			])
				('WHEN modules are not in alphabetical order by title THEN sorts them before calling game.settings.set: %o, %o',
					(inputtedModuleInfos, expectedModuleInfos) =>
					{
						const moduleProfile = {
							name: DEFAULT_PROFILE_NAME,
							modules: inputtedModuleInfos
						};

						SettingsUtils.setProfiles([moduleProfile]);

						expect(game.settings.set).toHaveBeenCalledWith(MODULE_NAME, PROFILES_SETTING, [
							{
								name: DEFAULT_PROFILE_NAME,
								modules: expectedModuleInfos
							}
						]);
					});

			test.each([
				[
					[
						Constants.buildModuleInfo({ id: 'some-key', title: undefined }, false),
						Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false)
					],
					[
						Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false)
					]
				],
				[
					[
						Constants.buildModuleInfo({ id: 'some-key', title: undefined }, false),
						Constants.buildModuleInfo({ id: 'more-modules', title: undefined }, false),
						Constants.buildModuleInfo({ id: 'another!', title: undefined }, false),
						Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false)
					],
					[
						Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false)
					]
				],
				[
					[
						Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false),
						Constants.buildModuleInfo({ id: 'some-key', title: undefined }, false),
						Constants.buildModuleInfo(Constants.PopoutTestValues, false)
					],
					[
						Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false),
						Constants.buildModuleInfo(Constants.PopoutTestValues, false)
					]
				]
			])
				('WHEN module profile has module info with undefined title THEN filters out undefined module infos: %s',
					(inputtedModuleInfos, expectedModuleInfos) =>
					{
						const moduleProfile = {
							name: DEFAULT_PROFILE_NAME,
							modules: inputtedModuleInfos
						};

						SettingsUtils.setProfiles([moduleProfile]);

						expect(game.settings.set).toHaveBeenCalledWith(MODULE_NAME, PROFILES_SETTING, [
							{
								name: DEFAULT_PROFILE_NAME,
								modules: expectedModuleInfos
							}
						]);
					});
		});

		describe('resetProfiles', () =>
		{
			test('WHEN called THEN calls game.settings.set with "undefined"', () =>
			{
				SettingsUtils.resetProfiles();

				expect(game.settings.set).toHaveBeenCalledWith(MODULE_NAME, PROFILES_SETTING, undefined);
			});

			test.each([undefined, 'some value'])
				('WHEN called THEN returns what game.settings.set returns: %s', (value) =>
				{
					when(game.settings.set).calledWith(MODULE_NAME, PROFILES_SETTING, undefined).mockReturnValue(Promise.resolve(value));

					const actual = SettingsUtils.resetProfiles();

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