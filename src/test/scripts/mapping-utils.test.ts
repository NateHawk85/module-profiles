import * as MappingUtils from '../../main/scripts/mapping-utils';
import * as Constants from '../config/constants';

describe('mapToModuleKeyIsActiveRecord', () =>
{
	test.each(Constants.ModuleInfosToCorrespondingCoreSettingsModuleConfigurationPairs)
		('WHEN called THEN converts module infos into correct record values: %o, %o', (moduleInfos, expectedRecord) =>
		{
			const actual = MappingUtils.mapToModuleKeyIsActiveRecord(moduleInfos);

			expect(actual).toStrictEqual(expectedRecord);
		});
});

describe('mapToModuleInfos', () =>
{
	describe('game.modules returns same amount of modules as inputted record', () =>
	{
		test('WHEN no modules exist on record THEN returns empty array', () =>
		{
			const actual = MappingUtils.mapToModuleInfos({});

			expect(actual).toStrictEqual([]);
		});

		test.each([
			[
				Constants.CoreGameModuleMaps.MultipleAllDisabled,
				Constants.CoreGameRecords.MultipleAllDisabled,
				Constants.TestModuleProfiles.MultipleAllDisabled
			],
			[
				Constants.CoreGameModuleMaps.MultipleAllEnabled,
				Constants.CoreGameRecords.MultipleAllEnabled,
				Constants.TestModuleProfiles.MultipleAllEnabled
			],
			[
				Constants.CoreGameModuleMaps.MultipleOnlyModuleProfilesEnabled,
				Constants.CoreGameRecords.MultipleOnlyModuleProfilesEnabled,
				Constants.TestModuleProfiles.MultipleOnlyModuleProfilesEnabled
			],
			[
				Constants.CoreGameModuleMaps.MultipleOnlyModuleProfilesAndTidyUIEnabled,
				Constants.CoreGameRecords.MultipleOnlyModuleProfilesAndTidyUIEnabled,
				Constants.TestModuleProfiles.MultipleOnlyModuleProfilesAndTidyUIEnabled
			],
			[
				Constants.CoreGameModuleMaps.OnlyModuleProfiles,
				Constants.CoreGameRecords.OnlyModuleProfiles,
				Constants.TestModuleProfiles.OnlyModuleProfiles
			],
			[
				Constants.CoreGameModuleMaps.OnlyModuleProfilesAndTidyUI,
				Constants.CoreGameRecords.OnlyModuleProfilesAndTidyUI,
				Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI
			]
		])
			('WHEN modules exist on record THEN converts record into correct array values: %o, %o, %o', (coreGameModuleMap, record, expectedModuleProfile) =>
			{
				// @ts-ignore
				game.modules = coreGameModuleMap;

				const actual = MappingUtils.mapToModuleInfos(record);

				expect(actual).toStrictEqual(expectedModuleProfile.modules);
			});
	});

	describe('game.modules returns more modules than inputted record (new modules added since profile was saved)', () =>
	{
		test.each([
			[
				Constants.CoreGameModuleMaps.MultipleAllDisabled,
				{ [Constants.FindTheCulpritTestValues.id]: false },
				[Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false)]
			],
			[
				Constants.CoreGameModuleMaps.MultipleAllDisabled,
				{
					[Constants.FindTheCulpritTestValues.id]: false,
					[Constants.ModuleProfilesTestValues.id]: true
				},
				[
					Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false),
					Constants.buildModuleInfo(Constants.ModuleProfilesTestValues, true)
				]
			],
			[
				Constants.CoreGameModuleMaps.MultipleOnlyModuleProfilesAndTidyUIEnabled,
				{
					[Constants.FindTheCulpritTestValues.id]: false,
					[Constants.TidyUITestValues.id]: true,
					[Constants.ModuleProfilesTestValues.id]: false
				},
				[
					Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false),
					Constants.buildModuleInfo(Constants.TidyUITestValues, true),
					Constants.buildModuleInfo(Constants.ModuleProfilesTestValues, false)
				]
			]
		])
			('WHEN more modules exist in game.modules than are inputted THEN converts record into correct array values: %o, %o, %o',
				(coreGameModuleMap, record, expectedModuleInfos) =>
				{
					// @ts-ignore
					game.modules = coreGameModuleMap;

					const actual = MappingUtils.mapToModuleInfos(record);

					expect(actual).toStrictEqual(expectedModuleInfos);
				});
	});

	describe('game.modules returns less modules than inputted record (modules deleted since profile was saved)', () =>
	{
		test.each([
			[
				new Map<string, StubCoreModuleDataEntry>(),
				{
					[Constants.FindTheCulpritTestValues.id]: true,
					[Constants.ModuleProfilesTestValues.id]: true
				},
				[
					{ id: Constants.FindTheCulpritTestValues.id, title: undefined, isActive: true },
					{ id: Constants.ModuleProfilesTestValues.id, title: undefined, isActive: true }
				]
			],
			[
				new Map<string, StubCoreModuleDataEntry>(),
				{
					[Constants.FindTheCulpritTestValues.id]: false,
					[Constants.PopoutTestValues.id]: false,
					[Constants.TidyUITestValues.id]: false,
					[Constants.ModuleProfilesTestValues.id]: true
				},
				[
					{ id: Constants.FindTheCulpritTestValues.id, title: undefined, isActive: false },
					{ id: Constants.PopoutTestValues.id, title: undefined, isActive: false },
					{ id: Constants.TidyUITestValues.id, title: undefined, isActive: false },
					{ id: Constants.ModuleProfilesTestValues.id, title: undefined, isActive: true }
				]
			],
			[
				new Map<string, StubCoreModuleDataEntry>([
					['a-random-module', { active: true, data: { name: 'a-random-module', title: 'A Random Module' } }]
				]),
				{
					[Constants.FindTheCulpritTestValues.id]: false,
					[Constants.ModuleProfilesTestValues.id]: false
				},
				[
					{ id: Constants.FindTheCulpritTestValues.id, title: undefined, isActive: false },
					{ id: Constants.ModuleProfilesTestValues.id, title: undefined, isActive: false }
				]
			],
			[
				Constants.buildCoreGameModulesMapWithProfiles(
					[Constants.FindTheCulpritTestValues, true]
				),
				{
					[Constants.FindTheCulpritTestValues.id]: false,
					[Constants.ModuleProfilesTestValues.id]: false
				},
				[
					{ id: Constants.FindTheCulpritTestValues.id, title: Constants.FindTheCulpritTestValues.title, isActive: false },
					{ id: Constants.ModuleProfilesTestValues.id, title: undefined, isActive: false }
				]
			],
			[
				Constants.buildCoreGameModulesMapWithProfiles(
					[Constants.FindTheCulpritTestValues, true],
					[Constants.ModuleProfilesTestValues, true]
				),
				{
					[Constants.FindTheCulpritTestValues.id]: false,
					[Constants.PopoutTestValues.id]: false,
					[Constants.TidyUITestValues.id]: false,
					[Constants.ModuleProfilesTestValues.id]: true
				},
				[
					{ id: Constants.FindTheCulpritTestValues.id, title: Constants.FindTheCulpritTestValues.title, isActive: false },
					{ id: Constants.PopoutTestValues.id, title: undefined, isActive: false },
					{ id: Constants.TidyUITestValues.id, title: undefined, isActive: false },
					{ id: Constants.ModuleProfilesTestValues.id, title: Constants.ModuleProfilesTestValues.title, isActive: true }
				]
			]
		])
			('WHEN less modules exist in game.modules than are inputted THEN sets title as undefined for all missing modules: %o, %o, %o',
				(coreGameModuleMap, record, expectedModuleInfos: ModuleInfo[]) =>
				{
					// @ts-ignore
					game.modules = coreGameModuleMap;

					const actual = MappingUtils.mapToModuleInfos(record);

					expect(actual).toStrictEqual(expectedModuleInfos);
				});
	});
});