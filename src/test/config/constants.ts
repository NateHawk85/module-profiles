// ---------------------------------------- Test Definitions ----------------------------------------
interface TestModuleValues
{
	key: string,
	title: string
}

type CoreModuleConfigurationValues = 'MultipleAllDisabled'
	| 'MultipleAllEnabled'
	| 'MultipleOnlyModuleProfilesEnabled'
	| 'MultipleOnlyModuleProfilesAndTidyUIEnabled'
	| 'OnlyModuleProfiles'
	| 'OnlyModuleProfilesAndTidyUI';

export const FindTheCulpritTestValues: TestModuleValues = {
	key: 'find-the-culprit',
	title: 'Find the culprit'
};
export const PopoutTestValues: TestModuleValues = {
	key: 'popout',
	title: 'PopOut!'
};
export const TidyUITestValues: TestModuleValues = {
	key: 'tidy-ui_game-settings',
	title: 'Tidy UI - Game Settings'
};
export const ModuleProfilesTestValues: TestModuleValues = {
	key: 'module-profiles',
	title: 'Module Profiles'
};

// ---------------------------------------- Test Constants ----------------------------------------

export const DEFAULT_PROFILE_NAME = 'Default Profile';
export const DEFAULT_PROFILE: ModuleProfile = {
	name: DEFAULT_PROFILE_NAME,
	modules: [
		{
			key: ModuleProfilesTestValues.key,
			title: ModuleProfilesTestValues.title,
			isActive: true
		},
		{
			key: TidyUITestValues.key,
			title: TidyUITestValues.title,
			isActive: false
		}
	]
};

export function buildDefaultFormApplicationOptions(): FormApplicationOptions
{
	return {
		classes: [],
		editable: true,
		closeOnSubmit: false,
		submitOnChange: false,
		submitOnClose: false,
		sheetConfig: false,
		baseApplication: null,
		width: null,
		height: null,
		top: null,
		left: null,
		scale: null,
		popOut: false,
		minimizable: false,
		resizable: false,
		id: '',
		title: '',
		template: null,
		scrollY: [],
		tabs: [],
		dragDrop: [],
		filters: []
	};
}

export const TestModuleProfiles: Readonly<Record<CoreModuleConfigurationValues, Readonly<ModuleProfile>>> = {
	MultipleAllDisabled: {
		name: 'Multiple Profiles - All Disabled',
		modules: [
			buildModuleInfo(FindTheCulpritTestValues, false),
			buildModuleInfo(PopoutTestValues, false),
			buildModuleInfo(TidyUITestValues, false),
			buildModuleInfo(ModuleProfilesTestValues, false)
		]
	},
	MultipleAllEnabled: {
		name: 'Multiple Profiles - All Enabled',
		modules: [
			buildModuleInfo(FindTheCulpritTestValues, true),
			buildModuleInfo(PopoutTestValues, true),
			buildModuleInfo(TidyUITestValues, true),
			buildModuleInfo(ModuleProfilesTestValues, true)
		]
	},
	MultipleOnlyModuleProfilesEnabled: {
		name: 'Multiple Profiles - Only Module Profiles Enabled',
		modules: [
			buildModuleInfo(FindTheCulpritTestValues, false),
			buildModuleInfo(PopoutTestValues, false),
			buildModuleInfo(TidyUITestValues, false),
			buildModuleInfo(ModuleProfilesTestValues, true)
		]
	},
	MultipleOnlyModuleProfilesAndTidyUIEnabled: {
		name: 'Multiple Profiles - Module Profiles and Tidy UI Enabled',
		modules: [
			buildModuleInfo(FindTheCulpritTestValues, false),
			buildModuleInfo(PopoutTestValues, false),
			buildModuleInfo(TidyUITestValues, true),
			buildModuleInfo(ModuleProfilesTestValues, true)
		]
	},
	OnlyModuleProfiles: {
		name: 'Only Module Profiles',
		modules: [
			buildModuleInfo(ModuleProfilesTestValues, true)
		]
	},
	OnlyModuleProfilesAndTidyUI: {
		name: 'Only Module Profiles And Tidy UI',
		modules: [
			buildModuleInfo(TidyUITestValues, true),
			buildModuleInfo(ModuleProfilesTestValues, true)
		]
	}
};
export const AllTestModuleProfiles = [...Object.values(TestModuleProfiles), DEFAULT_PROFILE];
export const CoreGameModuleMaps: Readonly<Record<CoreModuleConfigurationValues, ReadonlyMap<string, StubCoreModuleDataEntry>>> = {
	MultipleAllDisabled: buildCoreGameModulesMapWithProfiles(
		{ profile: FindTheCulpritTestValues, isActive: false },
		{ profile: PopoutTestValues, isActive: false },
		{ profile: TidyUITestValues, isActive: false },
		{ profile: ModuleProfilesTestValues, isActive: false }
	),
	MultipleAllEnabled: buildCoreGameModulesMapWithProfiles(
		{ profile: FindTheCulpritTestValues, isActive: true },
		{ profile: PopoutTestValues, isActive: true },
		{ profile: TidyUITestValues, isActive: true },
		{ profile: ModuleProfilesTestValues, isActive: true }
	),
	MultipleOnlyModuleProfilesEnabled: buildCoreGameModulesMapWithProfiles(
		{ profile: FindTheCulpritTestValues, isActive: false },
		{ profile: PopoutTestValues, isActive: false },
		{ profile: TidyUITestValues, isActive: false },
		{ profile: ModuleProfilesTestValues, isActive: true }
	),
	MultipleOnlyModuleProfilesAndTidyUIEnabled: buildCoreGameModulesMapWithProfiles(
		{ profile: FindTheCulpritTestValues, isActive: false },
		{ profile: PopoutTestValues, isActive: false },
		{ profile: TidyUITestValues, isActive: true },
		{ profile: ModuleProfilesTestValues, isActive: true }
	),
	OnlyModuleProfiles: buildCoreGameModulesMapWithProfiles(
		{ profile: ModuleProfilesTestValues, isActive: true }
	),
	OnlyModuleProfilesAndTidyUI: buildCoreGameModulesMapWithProfiles(
		{ profile: TidyUITestValues, isActive: true },
		{ profile: ModuleProfilesTestValues, isActive: true }
	)
};

function buildCoreGameModulesMapWithProfiles(...entries: { profile: TestModuleValues, isActive: boolean }[]): ReadonlyMap<string, StubCoreModuleDataEntry>
{
	const map = new Map<string, StubCoreModuleDataEntry>();
	entries.forEach(entry => map.set(entry.profile.key, buildMockModuleDataEntry(entry.profile, entry.isActive)));

	return map;
}

export function buildModuleInfo(dataForModuleProfile: TestModuleValues, isActive: boolean): ModuleInfo
{
	return {
		key: dataForModuleProfile.key,
		title: dataForModuleProfile.title,
		isActive: isActive
	};
}

function buildMockModuleDataEntry(profile: TestModuleValues, isActive: boolean): StubCoreModuleDataEntry
{
	return {
		active: isActive,
		data: {
			name: profile.key,
			title: profile.title
		}
	};
}

// ---------------------------------------- Test Example Suites for use in jest.each ----------------------------------------
export const ModuleInfosTestCases: ModuleInfo[][] = Object.values(TestModuleProfiles).map(moduleProfile => moduleProfile.modules);
export const ModuleProfilesTestCases = Object.values(TestModuleProfiles);
export const AllModuleProfilesAsArrayTestCases = [
	[[DEFAULT_PROFILE]],
	[[DEFAULT_PROFILE, TestModuleProfiles.OnlyModuleProfiles]],
	[[DEFAULT_PROFILE, TestModuleProfiles.MultipleOnlyModuleProfilesEnabled, TestModuleProfiles.MultipleAllEnabled]],
	[[DEFAULT_PROFILE, TestModuleProfiles.MultipleOnlyModuleProfilesEnabled, TestModuleProfiles.MultipleAllEnabled, TestModuleProfiles.MultipleAllDisabled]],
	[[TestModuleProfiles.MultipleOnlyModuleProfilesEnabled, TestModuleProfiles.MultipleOnlyModuleProfilesAndTidyUIEnabled]],
	[[TestModuleProfiles.OnlyModuleProfiles, TestModuleProfiles.OnlyModuleProfilesAndTidyUI]]
];
export const AllModuleProfileNamesTestCases = Object.values(TestModuleProfiles).map(moduleProfile => moduleProfile.name);
export const NameModuleProfilesTestCases: [name: string, profile: ModuleProfile][] = Object.values(TestModuleProfiles).map(profile => [profile.name, profile]);
export const CoreGameModulesMapTestCases = Object.values(CoreGameModuleMaps);
export const ModulesCoreGameModulesMapCombinedTestCases = allModulesCoreGameModulesMapTestCases();
export const ModuleInfosCoreSettingsConfigurationTestCases = moduleInfosCoreSettingsConfigurationTestCases();

function allModulesCoreGameModulesMapTestCases(): [coreGameModuleMap: ReadonlyMap<string, StubCoreModuleDataEntry>, moduleProfile: Readonly<ModuleProfile>][]
{
	const moduleProfiles = Object.entries(TestModuleProfiles);

	return Object.entries(CoreGameModuleMaps).map(identifierCoreGameModulePair =>
	{
		const matchingPair = moduleProfiles.find(identifierModuleProfilePair => identifierModuleProfilePair[0] === identifierCoreGameModulePair[0]);

		// @ts-ignore
		return [identifierCoreGameModulePair[1], matchingPair[1]];
	});
}

function moduleInfosCoreSettingsConfigurationTestCases(): [moduleInfos: ModuleInfo[], coreConfiguration: Record<string, boolean>][]
{
	return Object.entries(TestModuleProfiles).map(identifierModuleProfilePair =>
	{
		const coreConfiguration: Record<string, boolean> = {};
		identifierModuleProfilePair[1].modules.forEach(moduleInfo => coreConfiguration[moduleInfo.key] = moduleInfo.isActive);

		return [identifierModuleProfilePair[1].modules, coreConfiguration];
	});
}