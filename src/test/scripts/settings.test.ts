import * as Settings from '../../main/scripts/settings';
import {FoundryVersion} from '../../main/scripts/settings';
import * as MockedSettingsUtils from '../../main/scripts/settings-utils';
import * as MockedMappingUtils from '../../main/scripts/mapping-utils';
import {when} from 'jest-when';
import * as Constants from '../config/constants';
import {DEFAULT_PROFILE, DEFAULT_PROFILE_NAME} from '../config/constants';

jest.mock('../../main/scripts/settings-utils');
const SettingsUtils = jest.mocked(MockedSettingsUtils, true);
jest.mock('../../main/scripts/mapping-utils');
const MappingUtils = jest.mocked(MockedMappingUtils, true);

const MODULE_PROFILES_UPDATED_HOOK_NAME = 'moduleProfilesUpdated';

beforeEach(() =>
{
	SettingsUtils.getActiveProfileName.mockReturnValue(DEFAULT_PROFILE_NAME);
	SettingsUtils.setActiveProfileName.mockReturnValue(Promise.resolve(DEFAULT_PROFILE_NAME));
	SettingsUtils.setProfiles.mockReturnValue(Promise.resolve([DEFAULT_PROFILE]));
	SettingsUtils.resetProfiles.mockReturnValue(Promise.resolve());
});

describe('registerModuleSettings', () =>
{
	test('WHEN called THEN calls SettingsUtils.registerSettings', () =>
	{
		Settings.registerModuleSettings();

		expect(SettingsUtils.registerSettings).toHaveBeenCalled();
	});

	test('WHEN called THEN calls SettingsUtils.registerMenus', () =>
	{
		Settings.registerModuleSettings();

		expect(SettingsUtils.registerMenus).toHaveBeenCalled();
	});

	test('WHEN Profiles setting returns undefined THEN resets to default profile', () =>
	{
		jest.spyOn(Settings, 'getAllProfiles').mockImplementation(() => <ModuleProfile[]> <unknown> undefined);
		jest.spyOn(Settings, 'resetProfiles').mockReturnValue(Promise.resolve());

		Settings.registerModuleSettings();

		expect(Settings.resetProfiles).toHaveBeenCalled();
	});

	test('WHEN no profiles exist THEN resets to default profile', () =>
	{
		jest.spyOn(Settings, 'getAllProfiles').mockImplementation(() => []);
		jest.spyOn(Settings, 'resetProfiles').mockReturnValue(Promise.resolve());

		Settings.registerModuleSettings();

		expect(Settings.resetProfiles).toHaveBeenCalled();
	});

	test('WHEN a profile exists THEN does not reset to default profile', () =>
	{
		jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([DEFAULT_PROFILE]);
		jest.spyOn(Settings, 'resetProfiles').mockReturnValue(Promise.resolve());

		Settings.registerModuleSettings();

		expect(Settings.resetProfiles).toBeCalledTimes(0);
	});
});

describe('getCurrentModuleConfiguration', () =>
{
	describe('v9', () =>
	{
		beforeEach(() =>
		{
			jest.spyOn(Settings, 'getFoundryVersion').mockReturnValue(FoundryVersion.v9);
		});

		test.each(Constants.CoreModulesConfigurationToCorrespondingModuleInfosPairs)
			('WHEN game.modules returns a map of modules THEN maps them to an array of ModuleInfo objects: %o, %o', (coreConfiguration, expectedProfile) =>
			{
				// @ts-ignore - Mocking for Foundry
				game.modules = coreConfiguration;

				const actual = Settings.getCurrentModuleConfiguration();

				expect(actual).toStrictEqual(expectedProfile.modules);
			});

		test.each([
			[
				Constants.buildCoreGameModulesMapWithProfiles(
					[Constants.TidyUITestValues, false],
					[Constants.FindTheCulpritTestValues, false]
				),
				[
					Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false),
					Constants.buildModuleInfo(Constants.TidyUITestValues, false)
				]
			],
			[
				Constants.buildCoreGameModulesMapWithProfiles(
					[Constants.TidyUITestValues, false],
					[Constants.PopoutTestValues, false],
					[Constants.FindTheCulpritTestValues, false]
				),
				[
					Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false),
					Constants.buildModuleInfo(Constants.PopoutTestValues, false),
					Constants.buildModuleInfo(Constants.TidyUITestValues, false)
				]
			],
			[
				Constants.buildCoreGameModulesMapWithProfiles(
					[Constants.PopoutTestValues, true],
					[Constants.FindTheCulpritTestValues, false],
					[Constants.ModuleProfilesTestValues, false],
					[Constants.TidyUITestValues, false]
				),
				[
					Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false),
					Constants.buildModuleInfo(Constants.ModuleProfilesTestValues, false),
					Constants.buildModuleInfo(Constants.PopoutTestValues, true),
					Constants.buildModuleInfo(Constants.TidyUITestValues, false)
				]
			],
			[
				Constants.buildCoreGameModulesMapWithProfiles(
					[{ id: 'b-module', title: 'B Module' }, false],
					[{ id: 'a-module', title: 'A Module' }, false]
				),
				[
					Constants.buildModuleInfo({ id: 'a-module', title: 'A Module' }, false),
					Constants.buildModuleInfo({ id: 'b-module', title: 'B Module' }, false)
				]
			],
			[
				Constants.buildCoreGameModulesMapWithProfiles(
					[{ id: 'key-does-not-matter', title: 'ZZZZ Module' }, false],
					[{ id: 'zzzzzzzzzzzzzzzz-module', title: 'A Module' }, false],
					[{ id: 'key-does-not-matter2', title: 'Z Module' }, false]
				),
				[
					Constants.buildModuleInfo({ id: 'zzzzzzzzzzzzzzzz-module', title: 'A Module' }, false),
					Constants.buildModuleInfo({ id: 'key-does-not-matter2', title: 'Z Module' }, false),
					Constants.buildModuleInfo({ id: 'key-does-not-matter', title: 'ZZZZ Module' }, false)
				]
			]
		])
			('WHEN game.modules returns a map of modules unsorted by title THEN sorts them by title: %o, %o', (coreConfiguration, expectedModuleInfos) =>
			{
				// @ts-ignore - Mocking for Foundry
				game.modules = coreConfiguration;

				const actual = Settings.getCurrentModuleConfiguration();

				expect(actual).toStrictEqual(expectedModuleInfos);
			});
	});

	// TODO - implement v10 tests
	describe('v10', () =>
	{
		beforeEach(() =>
		{
			jest.spyOn(Settings, 'getFoundryVersion').mockReturnValue(FoundryVersion.v10);
		});
	});
});

describe('setCoreModuleConfiguration', () =>
{
	test.each(Constants.SavedModuleInfosFromGameSettings)
		('WHEN called THEN calls MappingUtils.mapToModuleKeyIsActiveRecord with inputted module infos: %s', (value) =>
		{
			Settings.setCoreModuleConfiguration(value);

			expect(MappingUtils.mapToModuleKeyIsActiveRecord).toHaveBeenCalledWith(value);
		});

	test.each(Constants.CoreSettingsModuleConfigurations)
		('WHEN called with info THEN calls game.settings.set with response from MappingUtils.mapToModuleKeyIsActiveRecord: %o',
			async (expectedConfiguration) =>
			{
				MappingUtils.mapToModuleKeyIsActiveRecord.mockReturnValue(expectedConfiguration);

				await Settings.setCoreModuleConfiguration([]);

				expect(game.settings.set).toHaveBeenCalledWith('core', 'moduleConfiguration', expectedConfiguration);
			});

	test.each(Constants.CoreSettingsModuleConfigurations)
		('WHEN called with info THEN returns what game.settings.set returns: %o', async (expectedConfiguration) =>
		{
			MappingUtils.mapToModuleKeyIsActiveRecord.mockReturnValue(expectedConfiguration);
			when(game.settings.set).calledWith('core', 'moduleConfiguration', expectedConfiguration).mockReturnValue(Promise.resolve(expectedConfiguration));

			const actual = await Settings.setCoreModuleConfiguration([]);

			expect(actual).toStrictEqual(expectedConfiguration);
		});

	test('WHEN core module configuration returns more values than module infos entered THEN calls game.settings.set with merged values from the two', () =>
	{
		const coreModuleConfigurationResponse: Record<string, boolean> = {
			'some-other-module': true,
			[Constants.ModuleProfilesTestValues.id]: true
		};
		when(game.settings.get).calledWith('core', 'moduleConfiguration').mockReturnValue(coreModuleConfigurationResponse);
		MappingUtils.mapToModuleKeyIsActiveRecord.mockReturnValue({ [Constants.ModuleProfilesTestValues.id]: false });

		Settings.setCoreModuleConfiguration([]);

		const expected: Record<string, boolean> = {
			'some-other-module': true,
			[Constants.ModuleProfilesTestValues.id]: false
		};

		expect(game.settings.set).toHaveBeenCalledWith('core', 'moduleConfiguration', expected);
	});

	test('WHEN core module configuration returns less values than module infos entered THEN calls game.settings.set with merged values from the two', () =>
	{
		const coreModuleConfigurationResponse: Record<string, boolean> = {
			'some-other-module': true,
			'yet-another-module': true,
			'theres-another-module': true
		};
		when(game.settings.get).calledWith('core', 'moduleConfiguration').mockReturnValue(coreModuleConfigurationResponse);

		const mappedModuleInfos = {
			'some-other-module': false,
			'yet-another-module': false,
			'theres-another-module': false,
			[Constants.FindTheCulpritTestValues.id]: true,
			[Constants.PopoutTestValues.id]: true,
			[Constants.TidyUITestValues.id]: true,
			[Constants.ModuleProfilesTestValues.id]: true
		};
		MappingUtils.mapToModuleKeyIsActiveRecord.mockReturnValue(mappedModuleInfos);

		Settings.setCoreModuleConfiguration([]);

		const expected: Record<string, boolean> = {
			'some-other-module': false,
			'yet-another-module': false,
			'theres-another-module': false,
			[Constants.FindTheCulpritTestValues.id]: true,
			[Constants.PopoutTestValues.id]: true,
			[Constants.TidyUITestValues.id]: true,
			[Constants.ModuleProfilesTestValues.id]: true
		};

		expect(game.settings.set).toHaveBeenCalledWith('core', 'moduleConfiguration', expected);
	});

	test('WHEN passed modules have different values than core module configuration THEN inputs overwrite core module configuration values', () =>
	{
		const coreModuleConfigurationResponse: Record<string, boolean> = {
			[Constants.FindTheCulpritTestValues.id]: false,
			[Constants.PopoutTestValues.id]: false,
			[Constants.TidyUITestValues.id]: false,
			[Constants.ModuleProfilesTestValues.id]: false
		};
		when(game.settings.get).calledWith('core', 'moduleConfiguration').mockReturnValue(coreModuleConfigurationResponse);
		MappingUtils.mapToModuleKeyIsActiveRecord.mockReturnValue({
			[Constants.FindTheCulpritTestValues.id]: false,
			[Constants.PopoutTestValues.id]: false,
			[Constants.TidyUITestValues.id]: true,
			[Constants.ModuleProfilesTestValues.id]: true
		});

		Settings.setCoreModuleConfiguration([]);

		const expected: Record<string, boolean> = {
			[Constants.FindTheCulpritTestValues.id]: false,
			[Constants.PopoutTestValues.id]: false,
			[Constants.TidyUITestValues.id]: true,
			[Constants.ModuleProfilesTestValues.id]: true
		};

		expect(game.settings.set).toHaveBeenCalledWith('core', 'moduleConfiguration', expected);
	});
});

describe('createProfile', () =>
{
	test('WHEN profile name is undefined THEN throws Error and calls ui.notifications.error', async () =>
	{
		// @ts-ignore
		const functionCall = async () => Settings.createProfile(undefined, undefined);

		await expect(functionCall).rejects.toThrow(Error);
		expect(ui.notifications.error).toHaveBeenCalledWith('Unable to create module profile. Profile name is undefined.');
		await expect(functionCall).rejects.toThrow('Unable to create module profile. Profile name is undefined.');
	});

	test('WHEN profile name is empty string THEN throws Error and calls ui.notifications.error', async () =>
	{
		const functionCall = async () => Settings.createProfile('', DEFAULT_PROFILE.modules);

		await expect(functionCall).rejects.toThrow(Error);
		expect(ui.notifications.error).toHaveBeenCalledWith('Unable to create module profile. Profile name must not be empty.');
		await expect(functionCall).rejects.toThrow('Unable to create module profile. Profile name must not be empty.');
	});

	test('WHEN profile name is defined and modules are undefined THEN throws Error and calls ui.notifications.error', async () =>
	{
		// @ts-ignore
		const functionCall = async () => Settings.createProfile(DEFAULT_PROFILE_NAME, undefined);

		await expect(functionCall).rejects.toThrow(Error);
		expect(ui.notifications.error).toHaveBeenCalledWith('Unable to create module profile. Please refresh the page and try again.');
		await expect(functionCall).rejects.toThrow('Unable to create module profile. Please refresh the page and try again.');
	});

	test.each(Constants.ModuleProfileNames)
		('WHEN profile already exists THEN throws Error and calls ui.notifications.error: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(DEFAULT_PROFILE);

			const functionCall = async () => Settings.createProfile(value, DEFAULT_PROFILE.modules);

			await expect(functionCall).rejects.toThrow(Error);
			expect(ui.notifications.error).toHaveBeenCalledWith(`Unable to create module profile. Profile "${value}" already exists!`);
			await expect(functionCall).rejects.toThrow(`Unable to create module profile. Profile "${value}" already exists!`);
		});

	test.each(Constants.NameModuleProfilePairs)
		('WHEN no profiles exist THEN calls SettingsUtils.setProfiles to save profile: %s, %o', async (profileName, testProfile) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(undefined);
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([]);

			await Settings.createProfile(profileName, testProfile.modules);

			expect(SettingsUtils.setProfiles).toHaveBeenCalledWith([{ name: profileName, modules: testProfile.modules }]);
		});

	test.each(Constants.NameModuleProfilePairs)
		('WHEN profile name does not exist THEN calls SettingsUtils.setProfiles to save profile: %s, %o', async (profileName, testProfile) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(undefined);
			const existingProfile = { name: 'A Unique Profile', modules: [] };
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([existingProfile]);

			await Settings.createProfile(profileName, testProfile.modules);

			const expectedProfilesArray = [existingProfile, { name: profileName, modules: testProfile.modules }];
			expect(SettingsUtils.setProfiles).toHaveBeenCalledWith(expectedProfilesArray);
		});

	test.each([
		[
			[],
			DEFAULT_PROFILE_NAME,
			DEFAULT_PROFILE.modules,
			[DEFAULT_PROFILE]
		],
		[
			[Constants.TestModuleProfiles.OnlyModuleProfiles],
			DEFAULT_PROFILE_NAME,
			DEFAULT_PROFILE.modules,
			[Constants.TestModuleProfiles.OnlyModuleProfiles, DEFAULT_PROFILE]
		],
		[
			[DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles],
			Constants.TestModuleProfiles.MultipleAllEnabled.name,
			Constants.TestModuleProfiles.MultipleAllEnabled.modules,
			[DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles, Constants.TestModuleProfiles.MultipleAllEnabled]
		],
		[
			[DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles, Constants.TestModuleProfiles.MultipleAllDisabled],
			Constants.TestModuleProfiles.MultipleAllEnabled.name,
			Constants.TestModuleProfiles.MultipleAllEnabled.modules,
			[
				DEFAULT_PROFILE,
				Constants.TestModuleProfiles.OnlyModuleProfiles,
				Constants.TestModuleProfiles.MultipleAllDisabled,
				Constants.TestModuleProfiles.MultipleAllEnabled
			]
		]
	])
		('WHEN profile name does not exist THEN calls SettingsUtils.setProfiles to save without overwriting the current profile array: ' +
			'%s, %o, %o, %s', async (existingProfiles, savedProfileName, savedModuleInfos, expected) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(existingProfiles);

			await Settings.createProfile(savedProfileName, savedModuleInfos);

			expect(SettingsUtils.setProfiles).toHaveBeenCalledWith(expected);
		});

	test('WHEN profile name does not exist THEN fires "moduleProfilesUpdated" hook event', async () =>
	{
		jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([DEFAULT_PROFILE]);

		await Settings.createProfile('A Different Profile Name', DEFAULT_PROFILE.modules);

		expect(Hooks.callAll).toHaveBeenCalledWith(MODULE_PROFILES_UPDATED_HOOK_NAME);
	});

	test.each(Constants.ModuleProfileNames)
		('WHEN profile name does not exist THEN calls ui.notifications.info: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([{ name: 'Some random name', modules: [] }]);

			await Settings.createProfile(value, DEFAULT_PROFILE.modules);

			expect(ui.notifications.info).toHaveBeenCalledWith(`Profile "${value}" has been created!`);
		});

	test.each(Constants.SavedModuleProfilesArrays)
		('WHEN no matching profile exists THEN returns what SettingsUtils.setProfiles returns: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(value);
			SettingsUtils.setProfiles.mockReturnValue(Promise.resolve(value));

			const response = await Settings.createProfile('Brand New Profile', []);

			expect(response).toStrictEqual(value);
		});
});

describe('activateProfile', () =>
{
	test.each(Constants.ModuleProfileNames)
		('WHEN called THEN calls Settings.getProfileByName for profile with the given name: %s', async (value) =>
		{
			const spies = buildSpyFunctionsForActivateProfile(value, DEFAULT_PROFILE);

			await Settings.activateProfile(value);

			expect(spies.getProfileByName).toHaveBeenCalledWith(value);
		});

	test.each(Constants.ModuleProfileNames)
		('WHEN profile does not exist THEN throws Error and calls ui.notifications.error: %s', async (value) =>
		{
			buildSpyFunctionsForActivateProfile(value, undefined);

			const functionCall = () => Settings.activateProfile(value);

			await expect(functionCall).rejects.toThrow(Error);
			expect(ui.notifications.error).toHaveBeenCalledWith(`Unable to activate module profile. Profile "${value}" does not exist!`);
			await expect(functionCall).rejects.toThrow(`Unable to activate module profile. Profile "${value}" does not exist!`);
		});

	test.each(Constants.NameModuleProfilePairs)
		('WHEN profile exists THEN calls SettingsUtils.setActiveProfileName to save active profile name: %s, %o', async (profileName, profile) =>
		{
			buildSpyFunctionsForActivateProfile(profileName, profile);

			await Settings.activateProfile(profileName);

			expect(SettingsUtils.setActiveProfileName).toHaveBeenCalledWith(profileName);
		});

	test.each(Constants.ModuleProfilesAsArray)
		('WHEN profile exists THEN calls Settings.setCoreModuleConfiguration with returned profile: %s', async (value) =>
		{
			const spies = buildSpyFunctionsForActivateProfile(DEFAULT_PROFILE_NAME, value);

			await Settings.activateProfile(DEFAULT_PROFILE_NAME);

			expect(spies.setCoreModuleConfiguration).toHaveBeenCalledWith(value.modules);
		});

	function buildSpyFunctionsForActivateProfile(profileName: string, profile: ModuleProfile | undefined)
	{
		const getProfileByNameSpy = jest.spyOn(Settings, 'getProfileByName');
		const setCoreModuleConfigurationSpy = jest.spyOn(Settings, 'setCoreModuleConfiguration');

		when(getProfileByNameSpy).calledWith(profileName).mockReturnValue(profile);
		when(setCoreModuleConfigurationSpy).calledWith(expect.anything()).mockReturnValue(Promise.resolve({}));

		return {
			getProfileByName: getProfileByNameSpy,
			setCoreModuleConfiguration: setCoreModuleConfigurationSpy
		};
	}
});

describe('saveChangesToProfile', () =>
{
	test.each(Constants.SavedModuleProfilesArrays)
		('WHEN no profiles exist with name THEN throws Error and calls ui.notifications.error: %o, %s', async (profiles) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(profiles);

			const functionCall = async () => Settings.saveChangesToProfile('Some Name Does Not Exist', DEFAULT_PROFILE.modules);

			await expect(functionCall).rejects.toThrow(Error);
			expect(ui.notifications.error).toHaveBeenCalledWith(`Unable to save module profile changes. Profile "Some Name Does Not Exist" does not exist!`);
			await expect(functionCall).rejects.toThrow(`Unable to save module profile changes. Profile "Some Name Does Not Exist" does not exist!`);
		});

	test.each([
		[
			[Constants.TestModuleProfiles.OnlyModuleProfiles],
			Constants.TestModuleProfiles.OnlyModuleProfiles.name,
			[Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false)],
			[{ name: Constants.TestModuleProfiles.OnlyModuleProfiles.name, modules: [Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false)] }]
		],
		[
			[Constants.TestModuleProfiles.OnlyModuleProfiles],
			Constants.TestModuleProfiles.OnlyModuleProfiles.name,
			[
				Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false),
				Constants.buildModuleInfo(Constants.PopoutTestValues, true)
			],
			[
				{
					name: Constants.TestModuleProfiles.OnlyModuleProfiles.name,
					modules: [Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false), Constants.buildModuleInfo(Constants.PopoutTestValues, true)]
				}
			]
		],
		[
			[Constants.TestModuleProfiles.OnlyModuleProfiles, Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI],
			Constants.TestModuleProfiles.OnlyModuleProfiles.name,
			[Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false)],
			[
				{ name: Constants.TestModuleProfiles.OnlyModuleProfiles.name, modules: [Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false)] },
				Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI
			]
		],
		[
			[Constants.TestModuleProfiles.MultipleAllDisabled, Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI],
			Constants.TestModuleProfiles.MultipleAllDisabled.name,
			[Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false), Constants.buildModuleInfo(Constants.PopoutTestValues, true)],
			[
				{
					name: Constants.TestModuleProfiles.MultipleAllDisabled.name,
					modules: [Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false), Constants.buildModuleInfo(Constants.PopoutTestValues, true)]
				},
				Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI
			]
		],
		[
			[DEFAULT_PROFILE, Constants.TestModuleProfiles.MultipleAllDisabled, Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI],
			DEFAULT_PROFILE_NAME,
			[],
			[
				{ name: DEFAULT_PROFILE_NAME, modules: [] },
				Constants.TestModuleProfiles.MultipleAllDisabled, Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI
			]
		]
	])
		('WHEN profile exists with name THEN calls SettingsUtils.setProfiles to save and overwrite the current profile: %s, %o, %o, %o',
			async (existingProfiles, updatedProfileName, updatedModuleInfos, expected) =>
			{
				jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(existingProfiles);

				await Settings.saveChangesToProfile(updatedProfileName, updatedModuleInfos);

				expect(SettingsUtils.setProfiles).toHaveBeenCalledWith(expected);
			});

	test('WHEN profile exists with name THEN fires "moduleProfilesUpdated" hook event', async () =>
	{
		jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([DEFAULT_PROFILE]);

		await Settings.saveChangesToProfile(DEFAULT_PROFILE_NAME, DEFAULT_PROFILE.modules);

		expect(Hooks.callAll).toHaveBeenCalledWith(MODULE_PROFILES_UPDATED_HOOK_NAME);
	});

	test.each(Constants.ModuleProfileNames)
		('WHEN profile exists with name THEN calls ui.notifications.info: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(Constants.ModuleProfilesAsArray);

			await Settings.saveChangesToProfile(value, DEFAULT_PROFILE.modules);

			expect(ui.notifications.info).toHaveBeenCalledWith(`Changes to profile "${value}" have been saved!`);
		});

	test.each(Constants.ModuleProfilesAsArray)
		('WHEN profile exists with name THEN returns what SettingsUtils.setProfiles returns: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([DEFAULT_PROFILE]);
			when(SettingsUtils.setProfiles).calledWith(expect.anything()).mockReturnValue(Promise.resolve([value]));

			const actual = await Settings.saveChangesToProfile(DEFAULT_PROFILE_NAME, DEFAULT_PROFILE.modules);

			expect(actual).toStrictEqual([value]);
		});
});

describe('getAllProfiles', () =>
{
	test.each(Constants.SavedModuleProfilesArrays)
		('WHEN called THEN returns what SettingsUtils.getProfiles returns: %o', (value) =>
		{
			SettingsUtils.getProfiles.mockReturnValue(value);

			const response = Settings.getAllProfiles();

			expect(response).toStrictEqual(value);
		});
});

describe('getActiveProfile', () =>
{
	test.each(Constants.ModuleProfileNames)
		('WHEN called THEN calls Settings.getProfileByName with response from SettingsUtils: %s', (value) =>
		{
			SettingsUtils.getActiveProfileName.mockReturnValue(value);
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(DEFAULT_PROFILE);

			Settings.getActiveProfile();

			expect(Settings.getProfileByName).toHaveBeenCalledWith(value);
		});

	test('WHEN no profile exists with active profile name THEN throws Error and calls ui.notifications.error', () =>
	{
		SettingsUtils.getActiveProfileName.mockReturnValue(DEFAULT_PROFILE_NAME);
		jest.spyOn(Settings, 'getProfileByName').mockReturnValue(undefined);

		const functionCall = () => Settings.getActiveProfile();

		expect(functionCall).toThrow(Error);
		expect(ui.notifications.error).toHaveBeenCalledWith('Unable to load active profile. Please refresh the Foundry page.');
		expect(functionCall).toThrow('Unable to load active profile. Please refresh the Foundry page.');
	});

	test.each(Constants.ModuleProfilesAsArray)
		('WHEN called THEN returns what Settings.getProfileByName returns: %s', (value) =>
		{
			SettingsUtils.getActiveProfileName.mockReturnValue(DEFAULT_PROFILE_NAME);
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

		const response = Settings.getProfileByName(DEFAULT_PROFILE_NAME);

		expect(response).toStrictEqual(undefined);
	});

	test.each(Constants.SavedModuleProfilesArrays)
		('WHEN Settings.getAllProfiles returns an array with no matching profile names THEN returns undefined: %s', (value) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(value);

			const response = Settings.getProfileByName('not that profile name');

			expect(response).toStrictEqual(undefined);
		});

	test.each(Constants.NameModuleProfilePairs)
		('WHEN Settings.getAllProfiles returns one profile and name matches THEN returns the matching profile: %s, %o', (profileName, moduleProfile) =>
		{
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([moduleProfile]);

			const response = Settings.getProfileByName(profileName);

			expect(response).toStrictEqual(moduleProfile);
		});

	test.each([
		[DEFAULT_PROFILE_NAME, [DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles], DEFAULT_PROFILE],
		[DEFAULT_PROFILE_NAME, [Constants.TestModuleProfiles.OnlyModuleProfiles, DEFAULT_PROFILE], DEFAULT_PROFILE],
		[DEFAULT_PROFILE_NAME, [Constants.TestModuleProfiles.MultipleAllDisabled, DEFAULT_PROFILE], DEFAULT_PROFILE],
		[Constants.TestModuleProfiles.OnlyModuleProfiles.name, [DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles], Constants.TestModuleProfiles.OnlyModuleProfiles],
		[
			Constants.TestModuleProfiles.MultipleOnlyModuleProfilesAndTidyUIEnabled.name,
			[DEFAULT_PROFILE, Constants.TestModuleProfiles.MultipleAllDisabled, Constants.TestModuleProfiles.MultipleOnlyModuleProfilesAndTidyUIEnabled],
			Constants.TestModuleProfiles.MultipleOnlyModuleProfilesAndTidyUIEnabled
		]
	])
		('WHEN Settings.getAllProfiles returns multiple profiles and one matches profile name THEN returns the matching profile: %s, %o, %o',
			(profileName, existingProfiles, expected) =>
			{
				jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(existingProfiles);

				const response = Settings.getProfileByName(profileName);

				expect(response).toStrictEqual(expected);
			});
});

describe('importProfiles', () =>
{
	beforeEach(() =>
	{
		JSON.parse = jest.fn();
	});

	test.each(['{"Some": "JSON value"}', '{"Another": "JSON value"}'])
		('WHEN called THEN calls JSON.parse with input: %s', async (value) =>
		{
			jest.spyOn(Settings, 'createProfile').mockReturnValue(Promise.resolve([DEFAULT_PROFILE]));
			// @ts-ignore
			JSON.parse.mockReturnValue(DEFAULT_PROFILE);

			await Settings.importProfiles(value);

			expect(JSON.parse).toHaveBeenCalledWith(value);
		});

	describe('Not a module profile', () =>
	{
		test.each([
			'Not a module profile',
			{ name: 'Not a profile', module: [] },
			{ names: 'Also not a profile', modules: [] },
			{ name: 'Almost, but not really', modules: [{ id: 'Profile', title: 'So close', isNotActive: true }] },
			{
				name: 'Super close, but not really', modules:
					[
						{ id: 'Profile', title: 'So close', isActive: false },
						{ id: 'Profile2', title: 'So close', somethingElse: false }
					]
			},
			{
				name: 'This is NOT a profile', modules:
					[
						{ id: 'Profile', title: 'A Profile', isActive: true },
						{ id: 'But this is not', modules: { id: 'Almost' } }
					]
			}
			,
			[
				{
					name: 'This is a profile', modules:
						[
							{ id: 'Profile', title: 'A Profile', isActive: true },
							{ id: 'same', title: 'A Profile2', isActive: false }
						]
				},
				{
					name: 'This is NOT a profile', modules:
						[
							{ id: 'Profile', title: 'A Profile', isActive: true },
							{ name: 'But this is not', modules: { id: 'Almost' } }
						]
				}
			]
		])
			('WHEN JSON.parse does not return a module profile or array of module profiles THEN throws Error and calls ui.notifications.error: %o',
				async (value) =>
				{
					// @ts-ignore
					JSON.parse.mockReturnValue(value);

					const functionCall = async () => Settings.importProfiles('{"json": "jsonValue"}');

					await expect(functionCall).rejects.toThrow(Error);
					expect(ui.notifications.error).toHaveBeenCalledWith('Unable to import profiles. Please re-export and try again.');
					await expect(functionCall).rejects.toThrow('Unable to import profiles. Please re-export and try again.');

				});
	});

	describe('Single profile', () =>
	{
		test.each(Constants.ModuleProfilesAsArray)
			('WHEN JSON.parse returns a single module profile THEN calls Settings.createProfile once for that profile: %s', async (value) =>
			{
				// @ts-ignore
				JSON.parse.mockReturnValue(value);
				jest.spyOn(Settings, 'createProfile').mockReturnValue(Promise.resolve([]));

				await Settings.importProfiles('json');

				expect(Settings.createProfile).toHaveBeenCalledTimes(1);
				expect(Settings.createProfile).toHaveBeenCalledWith(value.name, value.modules);
			});

		test.each(Constants.ModuleProfilesAsArray)
			('WHEN JSON.parse returns a single module profile THEN returns what Settings.getAllProfiles returns: %s', async (value) =>
			{
				// @ts-ignore
				JSON.parse.mockReturnValue(DEFAULT_PROFILE);
				jest.spyOn(Settings, 'createProfile').mockReturnValue(Promise.resolve([value]));
				jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([value]);

				const actual = await Settings.importProfiles('json');

				expect(actual).toStrictEqual([value]);
			});
	});

	describe('Array of profiles', () =>
	{
		test.each(Constants.ModuleProfilesAsArray)
			('WHEN JSON.parse returns a single module profile as array THEN calls Settings.createProfile once for that profile: %s', async (value) =>
			{
				// @ts-ignore
				JSON.parse.mockReturnValue([value]);
				jest.spyOn(Settings, 'createProfile').mockReturnValue(Promise.resolve([]));

				await Settings.importProfiles('json');

				expect(Settings.createProfile).toHaveBeenCalledTimes(1);
				expect(Settings.createProfile).toHaveBeenCalledWith(value.name, value.modules);
			});

		test.each([
			[[DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles]],
			[[DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles, Constants.TestModuleProfiles.MultipleAllEnabled]],
			[[Constants.TestModuleProfiles.MultipleAllEnabled, DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles]],
			[[DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles, DEFAULT_PROFILE]],
			[[DEFAULT_PROFILE, Constants.TestModuleProfiles.MultipleOnlyModuleProfilesAndTidyUIEnabled]],
			[[Constants.TestModuleProfiles.MultipleOnlyModuleProfilesAndTidyUIEnabled, DEFAULT_PROFILE]]
		])
			('WHEN JSON.parse returns multiple module profiles THEN calls Settings.createProfile one per profile: %o', async (value) =>
			{
				// @ts-ignore
				JSON.parse.mockReturnValue(value);
				jest.spyOn(Settings, 'createProfile').mockReturnValue(Promise.resolve([]));

				await Settings.importProfiles('json');

				expect(Settings.createProfile).toHaveBeenCalledTimes(value.length);
				value.forEach(profile => expect(Settings.createProfile).toHaveBeenCalledWith(profile.name, profile.modules));
			});

		test.each([
			[[DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles]],
			[[DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles, Constants.TestModuleProfiles.MultipleAllEnabled]],
			[[Constants.TestModuleProfiles.MultipleAllEnabled, DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles]],
			[[DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles, DEFAULT_PROFILE]],
			[[DEFAULT_PROFILE, Constants.TestModuleProfiles.MultipleOnlyModuleProfilesAndTidyUIEnabled]]
		])
			('WHEN JSON.parse returns multiple module profiles THEN returns what Settings.getAllProfiles returns: %o', async (value) =>
			{
				// @ts-ignore
				JSON.parse.mockReturnValue(DEFAULT_PROFILE);
				jest.spyOn(Settings, 'createProfile').mockReturnValue(Promise.resolve([DEFAULT_PROFILE]));
				jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(value);

				const actual = await Settings.importProfiles('json');

				expect(actual).toStrictEqual(value);
			});
	});
});

describe('exportAllProfiles', () =>
{
	test('WHEN Settings.getAllProfiles returns profiles THEN returns what Settings.getAllProfiles returns as JSON string', () =>
	{
		const profile: ModuleProfile = {
			'name': 'A Profile Name',
			'modules': [
				{
					id: 'a-module',
					title: 'A Module',
					isActive: true
				},
				{
					id: 'b-module',
					title: 'B Module',
					isActive: false
				}
			]
		};
		jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([profile]);

		const actual = Settings.exportAllProfiles();

		const expected = '['
			+ '\n  {'
			+ '\n    "name": "A Profile Name",'
			+ '\n    "modules": ['
			+ '\n      {'
			+ '\n        "id": "a-module",'
			+ '\n        "title": "A Module",'
			+ '\n        "isActive": true'
			+ '\n      },'
			+ '\n      {'
			+ '\n        "id": "b-module",'
			+ '\n        "title": "B Module",'
			+ '\n        "isActive": false'
			+ '\n      }'
			+ '\n    ]'
			+ '\n  }'
			+ '\n]';

		expect(actual).toStrictEqual(expected);
	});

	test('WHEN Settings.getAllProfiles returns profiles THEN returns what Settings.getAllProfiles returns as JSON string with alternate parameters', () =>
	{
		const profile: ModuleProfile = {
			'name': 'A Profile Name',
			'modules': [
				{
					id: 'a-module',
					title: 'A Module',
					isActive: true
				},
				{
					id: 'b-module',
					title: 'B Module',
					isActive: false
				}
			]
		};
		const profile2: ModuleProfile = {
			'name': 'A Different Profile Name',
			'modules': [
				{
					id: 'a-module',
					title: 'A Module',
					isActive: true
				},
				{
					id: 'b-module',
					title: 'B Module',
					isActive: false
				},
				{
					id: 'c-module',
					title: 'C Module',
					isActive: true
				}
			]
		};
		jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([profile, profile2]);

		const actual = Settings.exportAllProfiles();

		const expected = '['
			+ '\n  {'
			+ '\n    "name": "A Profile Name",'
			+ '\n    "modules": ['
			+ '\n      {'
			+ '\n        "id": "a-module",'
			+ '\n        "title": "A Module",'
			+ '\n        "isActive": true'
			+ '\n      },'
			+ '\n      {'
			+ '\n        "id": "b-module",'
			+ '\n        "title": "B Module",'
			+ '\n        "isActive": false'
			+ '\n      }'
			+ '\n    ]'
			+ '\n  },'
			+ '\n  {'
			+ '\n    "name": "A Different Profile Name",'
			+ '\n    "modules": ['
			+ '\n      {'
			+ '\n        "id": "a-module",'
			+ '\n        "title": "A Module",'
			+ '\n        "isActive": true'
			+ '\n      },'
			+ '\n      {'
			+ '\n        "id": "b-module",'
			+ '\n        "title": "B Module",'
			+ '\n        "isActive": false'
			+ '\n      },'
			+ '\n      {'
			+ '\n        "id": "c-module",'
			+ '\n        "title": "C Module",'
			+ '\n        "isActive": true'
			+ '\n      }'
			+ '\n    ]'
			+ '\n  }'
			+ '\n]';

		expect(actual).toStrictEqual(expected);
	});
});

describe('exportProfileByName', () =>
{
	test.each(Constants.ModuleProfileNames)
		('WHEN called THEN calls Settings.getProfileByName with profile name: %s', (value) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(undefined);

			Settings.exportProfileByName(value);

			expect(Settings.getProfileByName).toHaveBeenCalledWith(value);
		});

	test('WHEN Settings.getProfileByName returns undefined THEN returns undefined', () =>
	{
		jest.spyOn(Settings, 'getProfileByName').mockReturnValue(undefined);

		const response = Settings.exportProfileByName(DEFAULT_PROFILE_NAME);

		expect(response).toStrictEqual(undefined);
	});

	test('WHEN Settings.getProfileByName returns a profile THEN returns what Settings.getProfileByName returns as JSON string', () =>
	{
		const profile: ModuleProfile = {
			'name': 'A Profile Name',
			'modules': [
				{
					id: 'a-module',
					title: 'A Module',
					isActive: true
				},
				{
					id: 'b-module',
					title: 'B Module',
					isActive: false
				}
			]
		};
		jest.spyOn(Settings, 'getProfileByName').mockReturnValue(profile);

		const actual = Settings.exportProfileByName(DEFAULT_PROFILE_NAME);

		const expected = '{'
			+ '\n  "name": "A Profile Name",'
			+ '\n  "modules": ['
			+ '\n    {'
			+ '\n      "id": "a-module",'
			+ '\n      "title": "A Module",'
			+ '\n      "isActive": true'
			+ '\n    },'
			+ '\n    {'
			+ '\n      "id": "b-module",'
			+ '\n      "title": "B Module",'
			+ '\n      "isActive": false'
			+ '\n    }'
			+ '\n  ]'
			+ '\n}';

		expect(actual).toStrictEqual(expected);
	});

	test('WHEN Settings.getProfileByName returns a profile THEN returns what Settings.getProfileByName returns as JSON string with alternate parameters', () =>
	{
		const profile: ModuleProfile = {
			'name': 'A Different Profile Name',
			'modules': [
				{
					id: 'a-module',
					title: 'A Module',
					isActive: true
				},
				{
					id: 'b-module',
					title: 'B Module',
					isActive: false
				},
				{
					id: 'c-module',
					title: 'C Module',
					isActive: true
				}
			]
		};
		jest.spyOn(Settings, 'getProfileByName').mockReturnValue(profile);

		const actual = Settings.exportProfileByName(DEFAULT_PROFILE_NAME);

		const expected = '{'
			+ '\n  "name": "A Different Profile Name",'
			+ '\n  "modules": ['
			+ '\n    {'
			+ '\n      "id": "a-module",'
			+ '\n      "title": "A Module",'
			+ '\n      "isActive": true'
			+ '\n    },'
			+ '\n    {'
			+ '\n      "id": "b-module",'
			+ '\n      "title": "B Module",'
			+ '\n      "isActive": false'
			+ '\n    },'
			+ '\n    {'
			+ '\n      "id": "c-module",'
			+ '\n      "title": "C Module",'
			+ '\n      "isActive": true'
			+ '\n    }'
			+ '\n  ]'
			+ '\n}';

		expect(actual).toStrictEqual(expected);
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

	test.each(Constants.ModuleProfilesAsArray)
		('WHEN only one profile exists THEN calls Settings.resetProfiles: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(value);
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([value]);
			jest.spyOn(Settings, 'resetProfiles').mockReturnValue(Promise.resolve());

			await Settings.deleteProfile(value.name);

			expect(Settings.resetProfiles).toHaveBeenCalled();
		});

	test.each([
		[
			DEFAULT_PROFILE_NAME,
			[DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles],
			[Constants.TestModuleProfiles.OnlyModuleProfiles]
		],
		[
			Constants.TestModuleProfiles.OnlyModuleProfiles.name,
			[DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles, Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI, Constants.TestModuleProfiles.MultipleAllDisabled],
			[DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI, Constants.TestModuleProfiles.MultipleAllDisabled]
		],
		[
			Constants.TestModuleProfiles.MultipleAllDisabled.name,
			[DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles, Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI, Constants.TestModuleProfiles.MultipleAllDisabled],
			[DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles, Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI]
		],
		[
			Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI.name,
			[Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI, Constants.TestModuleProfiles.MultipleAllDisabled, Constants.TestModuleProfiles.MultipleAllEnabled],
			[Constants.TestModuleProfiles.MultipleAllDisabled, Constants.TestModuleProfiles.MultipleAllEnabled]
		]
	])
		('WHEN multiple profiles exist and one matches name THEN calls SettingsUtils.setProfiles to set profiles and does not refresh window: %s, %o, %o',
			async (profileName, existingProfiles, expectedSavedProfiles) =>
			{
				jest.spyOn(Settings, 'getProfileByName').mockReturnValue(DEFAULT_PROFILE);
				jest.spyOn(Settings, 'getAllProfiles').mockReturnValue(existingProfiles);

				await Settings.deleteProfile(profileName);

				expect(SettingsUtils.setProfiles).toHaveBeenCalledWith(expectedSavedProfiles);
				expect(SettingsUtils.reloadWindow).toHaveBeenCalledTimes(0);
			});

	test('WHEN deleted profile was not the active profile THEN does not set the active profile name to the first profile available', async () =>
	{
		jest.spyOn(Settings, 'getProfileByName').mockReturnValue(DEFAULT_PROFILE);
		jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles]);
		SettingsUtils.getActiveProfileName.mockReturnValue(Constants.TestModuleProfiles.OnlyModuleProfiles.name);

		await Settings.deleteProfile(DEFAULT_PROFILE_NAME);

		expect(SettingsUtils.setActiveProfileName).toHaveBeenCalledTimes(0);
	});

	test.each(Constants.SavedModuleProfilesArrays)
		('WHEN deleted profile was the active profile THEN sets the active profile name to the first profile available', async (value) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(DEFAULT_PROFILE);
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([{ name: 'A Profile', modules: [] }, ...value]);
			SettingsUtils.getActiveProfileName.mockReturnValue('A Profile');

			await Settings.deleteProfile('A Profile');

			expect(SettingsUtils.setActiveProfileName).toHaveBeenCalledWith(value[0].name);
		});

	test('WHEN a profile exists and is not the only profile THEN fires "moduleProfilesUpdated" hook event', async () =>
	{
		jest.spyOn(Settings, 'getProfileByName').mockReturnValue(DEFAULT_PROFILE);
		jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([DEFAULT_PROFILE, Constants.TestModuleProfiles.OnlyModuleProfiles]);

		await Settings.deleteProfile(DEFAULT_PROFILE_NAME);

		expect(Hooks.callAll).toHaveBeenCalledWith(MODULE_PROFILES_UPDATED_HOOK_NAME);
	});

	test.each(Constants.ModuleProfileNames)
		('WHEN profile exists with name THEN calls ui.notifications.info: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue(DEFAULT_PROFILE);
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([DEFAULT_PROFILE]);

			await Settings.deleteProfile(value);

			expect(ui.notifications.info).toHaveBeenCalledWith(`Profile "${value}" has been deleted!`);
		});

	test.each(Constants.ModuleProfilesAsArray)
		('WHEN profile exists with name THEN returns what SettingsUtils.setProfiles returns: %s', async (value) =>
		{
			jest.spyOn(Settings, 'getProfileByName').mockReturnValue({ name: 'A Profile', modules: [] });
			jest.spyOn(Settings, 'getAllProfiles').mockReturnValue([value, { name: 'A Profile', modules: [] }]);
			SettingsUtils.setProfiles.mockReturnValue(Promise.resolve([value]));

			const actual = await Settings.deleteProfile('A Profile');

			expect(actual).toStrictEqual([value]);
		});
});

describe('resetProfiles', () =>
{
	beforeEach(() =>
	{
		SettingsUtils.resetProfiles.mockReturnValue(Promise.resolve(undefined));
		SettingsUtils.setActiveProfileName.mockReturnValue(Promise.resolve(DEFAULT_PROFILE_NAME));
	});

	test('WHEN called THEN calls SettingsUtils.resetProfiles', async () =>
	{
		await Settings.resetProfiles();

		expect(SettingsUtils.resetProfiles).toHaveBeenCalled();
	});

	test('WHEN called THEN calls SettingsUtils.setActiveProfileName to set profiles to Default Profile', async () =>
	{
		await Settings.resetProfiles();

		expect(SettingsUtils.setActiveProfileName).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME);
	});

	test('WHEN called THEN calls SettingsUtils.reloadWindow', async () =>
	{
		await Settings.resetProfiles();

		expect(SettingsUtils.reloadWindow).toHaveBeenCalled();
	});
});

describe('getFoundryVersion', () =>
{
	test.each(['9.265', '9.280'])
		('WHEN is v9 THEN returns v9', (value) =>
		{
			// @ts-ignore - Mocking for Foundry
			game.version = value;

			const response = Settings.getFoundryVersion();

			expect(response).toStrictEqual(FoundryVersion.v9);
		});

	test.each(['10.282', '10.285'])
		('WHEN is v10 THEN returns v10', (value) =>
		{
			// @ts-ignore - Mocking for Foundry
			game.version = value;

			const response = Settings.getFoundryVersion();

			expect(response).toStrictEqual(FoundryVersion.v10);
		});

	test.each(['11.282', '8.285'])
		('WHEN is unsupported version THEN throws Error and calls ui.notifications.error', (value) =>
		{
			// @ts-ignore - Mocking for Foundry
			game.version = value;

			const functionCall = () => Settings.getFoundryVersion();

			const errorMessage = `Module Profiles: Foundry version '${value}' is not supported. Please disable the Module Profiles module.`;
			expect(functionCall).toThrow(Error);
			expect(ui.notifications.error).toHaveBeenCalledWith(errorMessage);
			expect(functionCall).toThrow(errorMessage);
		});
});
