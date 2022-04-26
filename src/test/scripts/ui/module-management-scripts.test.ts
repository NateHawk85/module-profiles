import * as ModuleManagementScripts from '../../../main/scripts/ui/module-management-scripts';
import * as MockedSettings from '../../../main/scripts/settings';
import * as Constants from '../../config/constants';

jest.mock('../../../main/scripts/settings');
const Settings = jest.mocked(MockedSettings, true);

// TODO - implement snapshot testing for all FormApplications, not just ModuleManagement
// TODO - fix tests due to Settings refactoring

beforeEach(() =>
{
	// @ts-ignore - Needed for Foundry testing
	game.user.isGM = true;
	Settings.getActiveProfile.mockReturnValue(Constants.TestModuleProfiles.MultipleOnlyModuleProfilesEnabled);
});

// TODO - rewrite
// describe('unsavedChangesExistOn', () =>
// {
// 	let moduleList: HTMLUListElement;
//
// 	beforeEach(() =>
// 	{
// 		moduleList = buildModuleListElement();
//
// 		document.body.appendChild(moduleList);
// 	});
//
// 	describe('equal module lists', () =>
// 	{
// 		test('WHEN saved module list matches current module list with one module THEN returns false', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.OnlyModuleProfilesEnabled);
// 			addCheckboxToModuleList('module-profiles', true);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(false);
// 		});
//
// 		test('WHEN saved module list matches current module list with multiple modules - all enabled THEN returns false', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.MultipleAllEnabled);
// 			addCheckboxToModuleList('popout', true);
// 			addCheckboxToModuleList('find-the-culprit', true);
// 			addCheckboxToModuleList('tidy-ui_game-settings', true);
// 			addCheckboxToModuleList('module-profiles', true);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(false);
// 		});
//
// 		test('WHEN saved module list matches current module list with multiple modules - all disabled THEN returns false', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.MultipleAllDisabled);
// 			addCheckboxToModuleList('popout', false);
// 			addCheckboxToModuleList('find-the-culprit', false);
// 			addCheckboxToModuleList('tidy-ui_game-settings', false);
// 			addCheckboxToModuleList('module-profiles', false);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(false);
// 		});
//
// 		test('WHEN saved module list is opposite of current module list with one module THEN returns true', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.OnlyModuleProfilesEnabled);
// 			addCheckboxToModuleList('module-profiles', false);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(true);
// 		});
//
// 		test('WHEN saved module list is opposite of current module list with multiple modules - all enabled THEN returns true', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.MultipleAllEnabled);
// 			addCheckboxToModuleList('popout', false);
// 			addCheckboxToModuleList('find-the-culprit', false);
// 			addCheckboxToModuleList('tidy-ui_game-settings', false);
// 			addCheckboxToModuleList('module-profiles', false);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(true);
// 		});
//
// 		test('WHEN saved module list is opposite of current module list with multiple modules - all disabled THEN returns true', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.MultipleAllDisabled);
// 			addCheckboxToModuleList('popout', true);
// 			addCheckboxToModuleList('find-the-culprit', true);
// 			addCheckboxToModuleList('tidy-ui_game-settings', true);
// 			addCheckboxToModuleList('module-profiles', true);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(true);
// 		});
//
// 		test('WHEN saved module list mostly matches current module list except for one module THEN returns true', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.MultipleOnlyModuleProfilesAndTidyUIEnabled);
// 			addCheckboxToModuleList('popout', false);
// 			addCheckboxToModuleList('find-the-culprit', false);
// 			addCheckboxToModuleList('tidy-ui_game-settings', false);
// 			addCheckboxToModuleList('module-profiles', true);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(true);
// 		});
//
// 		test('WHEN saved module list mostly does not match current module list except for one module THEN returns true', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.MultipleOnlyModuleProfilesAndTidyUIEnabled);
// 			addCheckboxToModuleList('popout', true);
// 			addCheckboxToModuleList('find-the-culprit', false);
// 			addCheckboxToModuleList('tidy-ui_game-settings', false);
// 			addCheckboxToModuleList('module-profiles', false);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(true);
// 		});
// 	});
//
// 	describe('unequal module lists', () =>
// 	{
// 		test('WHEN saved module list has more than current module list and all in current module list match THEN returns false', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.MultipleOnlyModuleProfilesEnabled);
// 			addCheckboxToModuleList('module-profiles', true);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(false);
// 		});
//
// 		test('WHEN saved module list has more than current module list but one in current module list does not match THEN returns true', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.MultipleOnlyModuleProfilesAndTidyUIEnabled);
// 			addCheckboxToModuleList('module-profiles', true);
// 			addCheckboxToModuleList('tidy-ui_game-settings', false);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(true);
// 		});
//
// 		test('WHEN saved module list has more than current module list but one in current module list does not exist in saved THEN returns true', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.MultipleOnlyModuleProfilesAndTidyUIEnabled);
// 			addCheckboxToModuleList('module-profiles', true);
// 			addCheckboxToModuleList('some-other-module', false);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(true);
// 		});
//
// 		test('WHEN current module list has more than saved module list and all in saved module list match THEN returns true', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.OnlyModuleProfilesEnabled);
// 			addCheckboxToModuleList('module-profiles', true);
// 			addCheckboxToModuleList('tidy-ui_game-settings', false);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(true);
// 		});
//
// 		test('WHEN current module list has more than saved module list and one in saved module list does not match THEN returns true', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.OnlyModuleProfilesAndTidyUIEnabled);
// 			addCheckboxToModuleList('module-profiles', true);
// 			addCheckboxToModuleList('tidy-ui_game-settings', false);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(true);
// 		});
//
// 		test('WHEN current module list has more than saved module list and one in saved module list does not exist in current THEN returns true', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.OnlyModuleProfilesAndTidyUIEnabled);
// 			addCheckboxToModuleList('module-profiles', true);
// 			addCheckboxToModuleList('some-other-module', false);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(true);
// 		});
//
// 		test('WHEN current module list has same size but different modules than saved module list THEN returns true', () =>
// 		{
// 			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(Profiles.OnlyModuleProfilesAndTidyUIEnabled);
// 			addCheckboxToModuleList('module-profiles', true);
// 			addCheckboxToModuleList('some-other-module', true);
//
// 			const actual = ModuleManagementScripts.unsavedChangesExistOn(DEFAULT_PROFILE_NAME);
//
// 			expect(actual).toStrictEqual(true);
// 		});
// 	});
//
// 	function buildModuleListElement()
// 	{
// 		const moduleList = document.createElement('ul');
// 		moduleList.id = 'module-list';
//
// 		return moduleList;
// 	}
//
// 	function addCheckboxToModuleList(moduleName, isChecked)
// 	{
// 		const moduleCheckboxElement = document.createElement('input');
// 		moduleCheckboxElement.type = 'checkbox';
// 		moduleCheckboxElement.checked = isChecked;
// 		moduleCheckboxElement.attributes.name = {
// 			value: moduleName
// 		};
//
// 		moduleList.appendChild(moduleCheckboxElement);
//
// 		return moduleCheckboxElement;
// 	}
// });

describe('isModuleManagementWindowOpen', () =>
{
	test('WHEN module management window does not exist THEN returns false', () =>
	{
		document.body.innerHTML = '<div id="some-other-div"></div>';

		expect(ModuleManagementScripts.isModuleManagementWindowOpen()).toStrictEqual(false);
	});

	test('WHEN module management window exists THEN returns true', () =>
	{
		document.body.innerHTML = '<div id="module-management"></div>';

		expect(ModuleManagementScripts.isModuleManagementWindowOpen()).toStrictEqual(true);
	});

	test('WHEN module management window exists with other elements in document body THEN returns true', () =>
	{
		document.body.innerHTML = '<div id="some-other-div"><div id="module-management"></div></div>';

		expect(ModuleManagementScripts.isModuleManagementWindowOpen()).toStrictEqual(true);
	});
});


//
// // TODO - test better
// describe('modifyModuleManagementRender', () =>
// {
// 	const moduleManagementWindowHtml = fs.readFileSync(path.resolve(__dirname, '../../mocks/ui/moduleManagement.html'));
//
// 	beforeEach(() =>
// 	{
// 		document.body.innerHTML = moduleManagementWindowHtml.toString();
// 	});
//
// 	test('WHEN user is not GM THEN does nothing', () =>
// 	{
// 		game.user.isGM = false;
//
// 		ModuleManagement.modifyModuleManagementRender();
//
// 		expect(document.body.innerHTML).toMatchSnapshot();
// 	});
//
// 	test.each(Object.entries(Profiles))
// 		('WHEN user is GM THEN adds UI elements and matches snapshot for profile: %s', (profileName, profile) =>
// 		{
// 			Settings.getActiveProfile.mockReturnValue(profile);
//
// 			ModuleManagement.modifyModuleManagementRender();
//
// 			expect(document.body.innerHTML).toMatchSnapshot();
// 		});
// });
//
// // TODO - for 'isModuleManagementWindowOpen'
// // ui.windows = {
// // 				aWindow: new ModuleManagement()
// // 			};