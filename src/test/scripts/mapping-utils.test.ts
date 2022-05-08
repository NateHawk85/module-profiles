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

		test.each([
			[
				{
					[Constants.TidyUITestValues.id]: false,
					[Constants.FindTheCulpritTestValues.id]: false
				},
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
				{
					[Constants.TidyUITestValues.id]: false,
					[Constants.PopoutTestValues.id]: false,
					[Constants.FindTheCulpritTestValues.id]: false
				},
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
				{
					[Constants.PopoutTestValues.id]: false,
					[Constants.FindTheCulpritTestValues.id]: false,
					[Constants.ModuleProfilesTestValues.id]: false,
					[Constants.TidyUITestValues.id]: false
				},
				Constants.buildCoreGameModulesMapWithProfiles(
					[Constants.PopoutTestValues, false],
					[Constants.FindTheCulpritTestValues, false],
					[Constants.ModuleProfilesTestValues, false],
					[Constants.TidyUITestValues, false]
				),
				[
					Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false),
					Constants.buildModuleInfo(Constants.ModuleProfilesTestValues, false),
					Constants.buildModuleInfo(Constants.PopoutTestValues, false),
					Constants.buildModuleInfo(Constants.TidyUITestValues, false)
				]
			],
			[
				{
					'b-module': false,
					'a-module': false
				},
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
				{
					'key-does-not-matter': false,
					'zzzzzzzzzzzzzzzz-module': false,
					'key-does-not-matter2': false
				},
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
			],
			[
				{
					'key-does-not-matter': false,
					'zzzzzzzzzzzzzzzz-module': false,
					'key-does-not-matter1': false,
					'key-does-not-matter2': false
				},
				Constants.buildCoreGameModulesMapWithProfiles(
					[{ id: 'key-does-not-matter', title: 'ZZZZ Module' }, false],
					[{ id: 'zzzzzzzzzzzzzzzz-module', title: 'A Module' }, false],
					[{ id: 'key-does-not-matter2', title: 'Z Module' }, false]
				),
				[
					Constants.buildModuleInfo({ id: 'zzzzzzzzzzzzzzzz-module', title: 'A Module' }, false),
					Constants.buildModuleInfo({ id: 'key-does-not-matter2', title: 'Z Module' }, false),
					Constants.buildModuleInfo({ id: 'key-does-not-matter', title: 'ZZZZ Module' }, false),
					Constants.buildModuleInfo({ id: 'key-does-not-matter1', title: undefined }, false)
				]
			]
		])
			('WHEN modules exist on record that are not in alphabetical order THEN sorts them with undefined titles at bottom: %o, %o, %o',
				(inputtedModulesRecord, coreGameModuleMap, expectedModuleInfos) =>
				{
					// @ts-ignore
					game.modules = coreGameModuleMap;

					const actual = MappingUtils.mapToModuleInfos(inputtedModulesRecord);

					expect(actual).toStrictEqual(expectedModuleInfos);
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
					[Constants.ModuleProfilesTestValues.id]: false,
					[Constants.TidyUITestValues.id]: true
				},
				[
					Constants.buildModuleInfo(Constants.FindTheCulpritTestValues, false),
					Constants.buildModuleInfo(Constants.ModuleProfilesTestValues, false),
					Constants.buildModuleInfo(Constants.TidyUITestValues, true)
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
					[Constants.ModuleProfilesTestValues.id]: true,
					[Constants.PopoutTestValues.id]: false,
					[Constants.TidyUITestValues.id]: false
				},
				[
					{ id: Constants.FindTheCulpritTestValues.id, title: undefined, isActive: false },
					{ id: Constants.ModuleProfilesTestValues.id, title: undefined, isActive: true },
					{ id: Constants.PopoutTestValues.id, title: undefined, isActive: false },
					{ id: Constants.TidyUITestValues.id, title: undefined, isActive: false }
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
					{ id: Constants.ModuleProfilesTestValues.id, title: Constants.ModuleProfilesTestValues.title, isActive: true },
					{ id: Constants.PopoutTestValues.id, title: undefined, isActive: false },
					{ id: Constants.TidyUITestValues.id, title: undefined, isActive: false }
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