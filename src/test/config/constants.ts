// ---------------------------------------- Test Definitions ----------------------------------------
interface TestModuleValues
{
	id: string,
	title: string
}

type CoreModuleConfigurationValues = 'MultipleAllDisabled'
	| 'MultipleAllEnabled'
	| 'MultipleOnlyModuleProfilesEnabled'
	| 'MultipleOnlyModuleProfilesAndTidyUIEnabled'
	| 'OnlyModuleProfiles'
	| 'OnlyModuleProfilesAndTidyUI';

export const FindTheCulpritTestValues: TestModuleValues = {
	id: 'find-the-culprit',
	title: 'Find the culprit'
};
export const ModuleProfilesTestValues: TestModuleValues = {
	id: 'module-profiles',
	title: 'Module Profiles'
};
export const PopoutTestValues: TestModuleValues = {
	id: 'popout',
	title: 'PopOut!'
};
export const TidyUITestValues: TestModuleValues = {
	id: 'tidy-ui_game-settings',
	title: 'Tidy UI - Game Settings'
};

export const TestModuleProfiles: Readonly<Record<CoreModuleConfigurationValues, Readonly<ModuleProfile>>> = {
	MultipleAllDisabled: {
		name: 'Multiple Profiles - All Disabled',
		modules: [
			buildModuleInfo(FindTheCulpritTestValues, false),
			buildModuleInfo(ModuleProfilesTestValues, false),
			buildModuleInfo(PopoutTestValues, false),
			buildModuleInfo(TidyUITestValues, false)
		]
	},
	MultipleAllEnabled: {
		name: 'Multiple Profiles - All Enabled',
		modules: [
			buildModuleInfo(FindTheCulpritTestValues, true),
			buildModuleInfo(ModuleProfilesTestValues, true),
			buildModuleInfo(PopoutTestValues, true),
			buildModuleInfo(TidyUITestValues, true)
		]
	},
	MultipleOnlyModuleProfilesEnabled: {
		name: 'Multiple Profiles - Only Module Profiles Enabled',
		modules: [
			buildModuleInfo(FindTheCulpritTestValues, false),
			buildModuleInfo(ModuleProfilesTestValues, true),
			buildModuleInfo(PopoutTestValues, false),
			buildModuleInfo(TidyUITestValues, false)
		]
	},
	MultipleOnlyModuleProfilesAndTidyUIEnabled: {
		name: 'Multiple Profiles - Module Profiles and Tidy UI Enabled',
		modules: [
			buildModuleInfo(FindTheCulpritTestValues, false),
			buildModuleInfo(ModuleProfilesTestValues, true),
			buildModuleInfo(PopoutTestValues, false),
			buildModuleInfo(TidyUITestValues, true)
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
			buildModuleInfo(ModuleProfilesTestValues, true),
			buildModuleInfo(TidyUITestValues, true)
		]
	}
};

// ---------------------------------------- Test Helper Functions ----------------------------------------

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

export function buildModuleInfo(moduleInfo: { id: string, title?: string }, isActive: boolean): ModuleInfo
{
	return {
		id: moduleInfo.id,
		title: moduleInfo.title,
		isActive: isActive
	};
}

// ---------------------------------------- Test Core Settings Constants ----------------------------------------
export const DEFAULT_FOUNDRY_10_VERSION = '10.285';

export const CoreGameModuleMaps: Record<CoreModuleConfigurationValues, Map<string, StubCoreModuleDataEntry>> = {
	MultipleAllDisabled: buildCoreGameModulesMapWithProfiles(
		[FindTheCulpritTestValues, false],
		[ModuleProfilesTestValues, false],
		[PopoutTestValues, false],
		[TidyUITestValues, false]
	),
	MultipleAllEnabled: buildCoreGameModulesMapWithProfiles(
		[FindTheCulpritTestValues, true],
		[ModuleProfilesTestValues, true],
		[PopoutTestValues, true],
		[TidyUITestValues, true]
	),
	MultipleOnlyModuleProfilesEnabled: buildCoreGameModulesMapWithProfiles(
		[FindTheCulpritTestValues, false],
		[ModuleProfilesTestValues, true],
		[PopoutTestValues, false],
		[TidyUITestValues, false]
	),
	MultipleOnlyModuleProfilesAndTidyUIEnabled: buildCoreGameModulesMapWithProfiles(
		[FindTheCulpritTestValues, false],
		[ModuleProfilesTestValues, true],
		[PopoutTestValues, false],
		[TidyUITestValues, true]
	),
	OnlyModuleProfiles: buildCoreGameModulesMapWithProfiles(
		[ModuleProfilesTestValues, true]
	),
	OnlyModuleProfilesAndTidyUI: buildCoreGameModulesMapWithProfiles(
		[ModuleProfilesTestValues, true],
		[TidyUITestValues, true]
	)
};

export const CoreGameRecords: Record<CoreModuleConfigurationValues, Record<string, boolean>> = {
	MultipleAllDisabled: {
		[FindTheCulpritTestValues.id]: false,
		[ModuleProfilesTestValues.id]: false,
		[PopoutTestValues.id]: false,
		[TidyUITestValues.id]: false
	},
	MultipleAllEnabled: {
		[FindTheCulpritTestValues.id]: true,
		[ModuleProfilesTestValues.id]: true,
		[PopoutTestValues.id]: true,
		[TidyUITestValues.id]: true
	},
	MultipleOnlyModuleProfilesEnabled: {
		[FindTheCulpritTestValues.id]: false,
		[ModuleProfilesTestValues.id]: true,
		[PopoutTestValues.id]: false,
		[TidyUITestValues.id]: false
	},
	MultipleOnlyModuleProfilesAndTidyUIEnabled: {
		[FindTheCulpritTestValues.id]: false,
		[ModuleProfilesTestValues.id]: true,
		[PopoutTestValues.id]: false,
		[TidyUITestValues.id]: true
	},
	OnlyModuleProfiles: {
		[ModuleProfilesTestValues.id]: true
	},
	OnlyModuleProfilesAndTidyUI: {
		[ModuleProfilesTestValues.id]: true,
		[TidyUITestValues.id]: true
	}
};

// ---------------------------------------- Test Module Profile Constants ----------------------------------------

export const DEFAULT_PROFILE_NAME = 'Default Profile';
export const DEFAULT_PROFILE: ModuleProfile = {
	name: DEFAULT_PROFILE_NAME,
	modules: [
		{
			id: ModuleProfilesTestValues.id,
			title: ModuleProfilesTestValues.title,
			isActive: true
		},
		{
			id: TidyUITestValues.id,
			title: TidyUITestValues.title,
			isActive: false
		}
	]
};

export const ModuleProfilesAsArray: ModuleProfile[] = [...Object.values(TestModuleProfiles), DEFAULT_PROFILE];
export const SavedModuleProfilesArrays: ModuleProfile[][][] = [
	[[DEFAULT_PROFILE]],
	[[DEFAULT_PROFILE, TestModuleProfiles.OnlyModuleProfiles]],
	[[DEFAULT_PROFILE, TestModuleProfiles.MultipleOnlyModuleProfilesEnabled, TestModuleProfiles.MultipleAllEnabled]],
	[[DEFAULT_PROFILE, TestModuleProfiles.MultipleOnlyModuleProfilesEnabled, TestModuleProfiles.MultipleAllEnabled, TestModuleProfiles.MultipleAllDisabled]],
	[[TestModuleProfiles.MultipleOnlyModuleProfilesEnabled, TestModuleProfiles.MultipleOnlyModuleProfilesAndTidyUIEnabled]],
	[[TestModuleProfiles.OnlyModuleProfiles, TestModuleProfiles.OnlyModuleProfilesAndTidyUI]]
];
export const SavedModuleInfosFromGameSettings: ModuleInfo[][][] = Object.values(TestModuleProfiles).map(moduleProfile => [moduleProfile.modules]);

export const ModuleProfileNames: string[] = Object.values(TestModuleProfiles).map(moduleProfile => moduleProfile.name);
export const NameModuleProfilePairs: [name: string, profile: ModuleProfile][] = Object.values(TestModuleProfiles).map(profile => [profile.name, profile]);

export const CoreModulesConfigurationToCorrespondingModuleInfosPairs:
	[coreGameModuleMap: Map<string, StubCoreModuleDataEntry>, moduleProfile: ModuleProfile][] = coreModulesConfigurationToCorrespondingModuleInfosPairs();
export const CoreSettingsModuleConfigurations: Record<string, boolean>[] = coreSettingsModuleConfigurations();
export const ModuleInfosToCorrespondingCoreSettingsModuleConfigurationPairs:
	[moduleInfos: ModuleInfo[], coreConfiguration: Record<string, boolean>][] = moduleInfosToCorrespondingCoreSettingsModuleConfigurationPairs();

// ---------------------------------------- Helper Methods ----------------------------------------

export function buildCoreGameModulesMapWithProfiles(...entries: [profile: TestModuleValues, isActive: boolean][]): Map<string, StubCoreModuleDataEntry>
{
	const map = new Map<string, StubCoreModuleDataEntry>();
	entries.forEach(entry => map.set(entry[0].id, buildMockModuleDataEntry(entry[0], entry[1])));

	return map;
}

function buildMockModuleDataEntry(profile: TestModuleValues, isActive: boolean): StubCoreModuleDataEntry
{
	return {
		active: isActive,
		data: {
			name: profile.id,
			title: profile.title
		}
	};
}

function coreModulesConfigurationToCorrespondingModuleInfosPairs(): [coreGameModuleMap: Map<string, StubCoreModuleDataEntry>, moduleProfile: ModuleProfile][]
{
	const moduleProfiles = Object.entries(TestModuleProfiles);

	return Object.entries(CoreGameModuleMaps).map(identifierCoreGameModulePair =>
	{
		const matchingPair = moduleProfiles.find(identifierModuleProfilePair => identifierModuleProfilePair[0] === identifierCoreGameModulePair[0]);

		// @ts-ignore
		return [identifierCoreGameModulePair[1], matchingPair[1]];
	});
}

function coreSettingsModuleConfigurations(): Record<string, boolean>[]
{
	return Object.entries(TestModuleProfiles).map(identifierModuleProfilePair =>
	{
		const coreConfiguration: Record<string, boolean> = {};
		identifierModuleProfilePair[1].modules.forEach(moduleInfo => coreConfiguration[moduleInfo.id] = moduleInfo.isActive);

		return coreConfiguration;
	});
}

function moduleInfosToCorrespondingCoreSettingsModuleConfigurationPairs(): [moduleInfos: ModuleInfo[], coreConfiguration: Record<string, boolean>][]
{
	return Object.entries(TestModuleProfiles).map(identifierModuleProfilePair =>
	{
		const coreConfiguration: Record<string, boolean> = {};
		identifierModuleProfilePair[1].modules.forEach(moduleInfo => coreConfiguration[moduleInfo.id] = moduleInfo.isActive);

		return [identifierModuleProfilePair[1].modules, coreConfiguration];
	});
}