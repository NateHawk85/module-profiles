import ManageModuleProfilesSettingsForm, * as ManageModuleProfilesSettingsFormFunctions from '../../main/classes/ManageModuleProfilesSettingsForm';
import {forceManageModuleProfilesHeightResize} from '../../main/classes/ManageModuleProfilesSettingsForm';
import * as MockedSettings from '../../main/scripts/settings';
import * as MockedProfileInteractions from '../../main/scripts/profile-interactions';
import MockedImportModuleProfileForm from '../../main/classes/ImportModuleProfileForm';
import MockedCreateModuleProfileForm from '../../main/classes/CreateModuleProfileForm';
import MockedConfirmDeleteProfileForm from '../../main/classes/ConfirmDeleteProfileForm';
import MockedEditModuleProfileForm from '../../main/classes/EditModuleProfileForm';
import * as Constants from '../config/constants';
import {DEFAULT_PROFILE, DEFAULT_PROFILE_NAME} from '../config/constants';
import {when} from 'jest-when';

jest.mock('../../main/scripts/settings');
const Settings = jest.mocked(MockedSettings, true);
jest.mock('../../main/scripts/profile-interactions');
const ProfileInteractions = jest.mocked(MockedProfileInteractions, true);
jest.mock('../../main/classes/ImportModuleProfileForm');
const ImportModuleProfileForm = jest.mocked(MockedImportModuleProfileForm, true);
jest.mock('../../main/classes/CreateModuleProfileForm');
const CreateModuleProfileForm = jest.mocked(MockedCreateModuleProfileForm, true);
jest.mock('../../main/classes/ConfirmDeleteProfileForm');
const ConfirmDeleteProfileForm = jest.mocked(MockedConfirmDeleteProfileForm, true);
jest.mock('../../main/classes/EditModuleProfileForm');
const EditModuleProfileForm = jest.mocked(MockedEditModuleProfileForm, true);

const FORM_ID = 'module-profiles-manage-profiles';
const FORM_TEMPLATE = 'modules/module-profiles/templates/manage-profiles.hbs';
const FORM_TITLE = 'Manage Module Profiles';
const MODULE_PROFILES_FORM_CLASS = 'module-profiles-form';
const IMPORT_PROFILE_ID = 'module-profiles-manage-profiles-import';
const EXPORT_PROFILE_ID = 'module-profiles-manage-profiles-export-all';
const CREATE_PROFILE_ID = 'module-profiles-manage-profiles-create-new';
const ACTIVATE_PROFILE_CLASS = 'module-profiles-activate-profile';
const EDIT_PROFILE_CLASS = 'module-profiles-edit-profile';
const DUPLICATE_PROFILE_CLASS = 'module-profiles-duplicate-profile';
const EXPORT_PROFILE_CLASS = 'module-profiles-export-profile';
const DELETE_PROFILE_CLASS = 'module-profiles-delete-profile';

let manageModuleProfilesSettingsForm: ManageModuleProfilesSettingsForm;
let formApplicationOptions: FormApplicationOptions;

beforeEach(() =>
{
	manageModuleProfilesSettingsForm = new ManageModuleProfilesSettingsForm();
	formApplicationOptions = Constants.buildDefaultFormApplicationOptions();

	jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => formApplicationOptions);
});

afterAll(() =>
{
	// @ts-ignore - Mocking for Foundry
	ui.windows = jest.fn();
});

describe('defaultOptions', () =>
{
	test('WHEN called THEN returns options', () =>
	{
		formApplicationOptions.classes = ['parent-class'];

		const actual = ManageModuleProfilesSettingsForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: ['parent-class', MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			width: 660
		});
	});

	test('WHEN parent classes exist THEN returns options while keeping parent classes', () =>
	{
		const classes = ['a-class', 'another-class', 'a-third-class'];
		formApplicationOptions.classes = classes;

		const actual = ManageModuleProfilesSettingsForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: [...classes, MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			width: 660
		});
	});

	test('WHEN no parent classes exist THEN returns options with just default class', () =>
	{
		const actual = ManageModuleProfilesSettingsForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: [MODULE_PROFILES_FORM_CLASS],
			editable: true,
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			width: 660
		});
	});
});

describe('getData', () =>
{
	test.each(Constants.ModuleProfilesAsArray)
		('WHEN Settings.getActiveProfile matches profile THEN returns highlighted profile with what Settings.getAllProfiles returns: %s', (value) =>
		{
			Settings.getActiveProfile.mockReturnValue(value);
			Settings.getAllProfiles.mockReturnValue([value]);

			const actual = manageModuleProfilesSettingsForm.getData();

			const expected = {
				profiles: [
					{
						...value,
						isProfileActive: true
					}
				]
			};
			expect(actual).toStrictEqual(expected);
		});

	test.each(Constants.ModuleProfilesAsArray)
		('WHEN Settings.getActiveProfile does not match profile THEN returns unhighlighted profiles with what Settings.getAllProfiles returns: %s', (value) =>
		{
			Settings.getActiveProfile.mockReturnValue({ name: 'A Different Profile Name', modules: [] });
			Settings.getAllProfiles.mockReturnValue([value]);

			const actual = manageModuleProfilesSettingsForm.getData();

			const expected = {
				profiles: [
					{
						...value,
						isProfileActive: false
					}
				]
			};
			expect(actual).toStrictEqual(expected);
		});

	test.each([
		[
			[
				Constants.TestModuleProfiles.OnlyModuleProfiles,
				Constants.TestModuleProfiles.MultipleAllDisabled
			],
			Constants.TestModuleProfiles.OnlyModuleProfiles,
			[
				{ ...Constants.TestModuleProfiles.OnlyModuleProfiles, isProfileActive: true },
				{ ...Constants.TestModuleProfiles.MultipleAllDisabled, isProfileActive: false }
			]
		],
		[
			[
				Constants.TestModuleProfiles.OnlyModuleProfiles,
				Constants.TestModuleProfiles.MultipleAllDisabled
			],
			Constants.TestModuleProfiles.MultipleAllDisabled,
			[
				{ ...Constants.TestModuleProfiles.OnlyModuleProfiles, isProfileActive: false },
				{ ...Constants.TestModuleProfiles.MultipleAllDisabled, isProfileActive: true }
			]
		],
		[
			[
				Constants.TestModuleProfiles.OnlyModuleProfiles,
				Constants.TestModuleProfiles.MultipleAllEnabled,
				Constants.TestModuleProfiles.MultipleAllDisabled,
				DEFAULT_PROFILE
			],
			DEFAULT_PROFILE,
			[
				{ ...Constants.TestModuleProfiles.OnlyModuleProfiles, isProfileActive: false },
				{ ...Constants.TestModuleProfiles.MultipleAllEnabled, isProfileActive: false },
				{ ...Constants.TestModuleProfiles.MultipleAllDisabled, isProfileActive: false },
				{ ...DEFAULT_PROFILE, isProfileActive: true }
			]
		],
		[
			[
				Constants.TestModuleProfiles.OnlyModuleProfiles,
				Constants.TestModuleProfiles.MultipleAllEnabled,
				Constants.TestModuleProfiles.MultipleAllDisabled,
				Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI,
				DEFAULT_PROFILE
			],
			Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI,
			[
				{ ...Constants.TestModuleProfiles.OnlyModuleProfiles, isProfileActive: false },
				{ ...Constants.TestModuleProfiles.MultipleAllEnabled, isProfileActive: false },
				{ ...Constants.TestModuleProfiles.MultipleAllDisabled, isProfileActive: false },
				{ ...Constants.TestModuleProfiles.OnlyModuleProfilesAndTidyUI, isProfileActive: true },
				{ ...DEFAULT_PROFILE, isProfileActive: false }
			]
		]
	])
		('WHEN Settings.getActiveProfile matches one of multiple THEN returns profiles with what Settings.getAllProfiles returns: %s, %o, %o',
			(existingProfiles, activeProfile, expected) =>
			{
				Settings.getActiveProfile.mockReturnValue(activeProfile);
				Settings.getAllProfiles.mockReturnValue(existingProfiles);

				const actual = manageModuleProfilesSettingsForm.getData();

				expect(actual).toStrictEqual({ profiles: expected });
			});
});

describe('activateListeners', () =>
{
	describe('module-profiles-manage-profiles-import', () =>
	{
		test('WHEN element with "module-profiles-manage-profiles-import" id exists THEN adds importProfile click event to element', () =>
		{
			const element = document.createElement('a');
			element.id = IMPORT_PROFILE_ID;
			document.body.append(element);

			manageModuleProfilesSettingsForm.activateListeners();
			element.click();

			expect(ImportModuleProfileForm).toHaveBeenCalledTimes(1);
			const instance = ImportModuleProfileForm.mock.instances[0];
			expect(instance.render).toHaveBeenCalledWith(true);
		});
	});

	describe('module-profiles-manage-profiles-export', () =>
	{
		beforeEach(() =>
		{
			// @ts-ignore - navigator only exists in browser, not test
			// noinspection JSConstantReassignment
			navigator.clipboard = {
				writeText: jest.fn()
			};
		});

		test.each(['Value', 'Another Value'])
			('WHEN element with "module-profiles-manage-profiles-export-all" id exists THEN adds exportProfile click event to element: %s', async (value) =>
		{
			Settings.exportAllProfiles.mockReturnValue(value);
			const element = document.createElement('a');
			element.id = EXPORT_PROFILE_ID;
			document.body.append(element);

			manageModuleProfilesSettingsForm.activateListeners();
			await element.click();

			expect(Settings.exportAllProfiles).toHaveBeenCalledTimes(1);
			expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
			expect(navigator.clipboard.writeText).toHaveBeenCalledWith(value);
			expect(ui.notifications.info).toHaveBeenCalledTimes(1);
			expect(ui.notifications.info).toHaveBeenCalledWith(`All profiles have been copied to clipboard!`);
		});
	});

	describe('module-profiles-manage-profiles-create-new', () =>
	{
		test('WHEN element with "module-profiles-manage-profiles-create-new" id exists THEN adds createProfile click event to element', () =>
		{
			const element = document.createElement('a');
			element.id = CREATE_PROFILE_ID;
			document.body.append(element);

			manageModuleProfilesSettingsForm.activateListeners();
			element.click();

			expect(CreateModuleProfileForm).toHaveBeenCalledTimes(1);
			const instance = CreateModuleProfileForm.mock.instances[0];
			expect(instance.render).toHaveBeenCalledWith(true);
		});
	});

	describe('module-profiles-activate-profile', () =>
	{
		test('WHEN element does not have "module-profiles-activate-profile" class THEN does not add activateProfile click event to element', () =>
		{
			const element = addElementWith(DEFAULT_PROFILE_NAME, ['not-activate-profile']);

			manageModuleProfilesSettingsForm.activateListeners();
			element.click();
			expect(ProfileInteractions.activateProfile).toHaveBeenCalledTimes(0);
		});

		test('WHEN multiple elements do not have "module-profiles-activate-profile" class THEN does not add activateProfile click event to elements', () =>
		{
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, ['not-activate-profile']);
			const element2 = addElementWith(DEFAULT_PROFILE_NAME, ['another-not-activate-profile']);

			manageModuleProfilesSettingsForm.activateListeners();
			element1.click();
			element2.click();
			expect(ProfileInteractions.activateProfile).toHaveBeenCalledTimes(0);
		});

		test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
			('WHEN element has "module-profiles-activate-profile" class THEN adds activateProfile click event for one element with class: %s', (value) =>
			{
				const element = addElementWith(value, [ACTIVATE_PROFILE_CLASS]);

				manageModuleProfilesSettingsForm.activateListeners();
				element.click();
				expect(ProfileInteractions.activateProfile).toHaveBeenCalledWith(value);
			});

		test('WHEN elements have "module-profiles-activate-profile" class THEN adds activateProfile click event for many elements with class', () =>
		{
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [ACTIVATE_PROFILE_CLASS]);
			const element2 = addElementWith('A Different Profile Name', [ACTIVATE_PROFILE_CLASS]);

			manageModuleProfilesSettingsForm.activateListeners();

			element1.click();
			expect(ProfileInteractions.activateProfile).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME);

			element2.click();
			expect(ProfileInteractions.activateProfile).toHaveBeenCalledWith('A Different Profile Name');
		});

		test('WHEN some elements have "module-profiles-activate-profile" class THEN only adds activateProfile click event to elements with class', () =>
		{
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [ACTIVATE_PROFILE_CLASS]);
			const element2 = addElementWith('A Different Profile Name', [ACTIVATE_PROFILE_CLASS]);
			const element3 = addElementWith('A Third Profile Name', ['some-other-class-name']);

			manageModuleProfilesSettingsForm.activateListeners();

			element1.click();
			expect(ProfileInteractions.activateProfile).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME);

			element2.click();
			expect(ProfileInteractions.activateProfile).toHaveBeenCalledWith('A Different Profile Name');

			element3.click();
			expect(ProfileInteractions.activateProfile).toHaveBeenCalledTimes(2);
		});

		test('WHEN elements have other classes than "module-profiles-activate-profile" THEN adds activateProfile click event for elements with class', () =>
		{
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [ACTIVATE_PROFILE_CLASS, 'some-other-class']);
			const element2 = addElementWith('A Different Profile Name', [ACTIVATE_PROFILE_CLASS, 'fa-power-off']);

			manageModuleProfilesSettingsForm.activateListeners();

			element1.click();
			expect(ProfileInteractions.activateProfile).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME);

			element2.click();
			expect(ProfileInteractions.activateProfile).toHaveBeenCalledWith('A Different Profile Name');
		});
	});

	describe('module-profiles-edit-profile', () =>
	{
		test('WHEN element does not have "module-profiles-edit-profile" class THEN does not add editProfile click event to element', () =>
		{
			const element = addElementWith(DEFAULT_PROFILE_NAME, ['not-edit-profile']);

			manageModuleProfilesSettingsForm.activateListeners();
			element.click();
			expect(EditModuleProfileForm).toHaveBeenCalledTimes(0);
		});

		test('WHEN multiple elements do not have "module-profiles-edit-profile" class THEN does not add editProfile click event to elements', () =>
		{
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, ['not-edit-profile']);
			const element2 = addElementWith(DEFAULT_PROFILE_NAME, ['another-not-edit-profile']);

			manageModuleProfilesSettingsForm.activateListeners();
			element1.click();
			element2.click();
			expect(EditModuleProfileForm).toHaveBeenCalledTimes(0);
		});

		test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
			('WHEN element has "module-profiles-edit-profile" class THEN adds editProfile click event for one element with class: %s', (value) =>
			{
				const element = addElementWith(value, [EDIT_PROFILE_CLASS]);

				manageModuleProfilesSettingsForm.activateListeners();
				element.click();
				expect(EditModuleProfileForm).toHaveBeenCalledTimes(1);
				expect(EditModuleProfileForm).toHaveBeenCalledWith(value);
				const instance = EditModuleProfileForm.mock.instances[0];
				expect(instance.render).toHaveBeenCalledWith(true);
			});

		test('WHEN elements have "module-profiles-edit-profile" class THEN adds editProfile click event for many elements with class', () =>
		{
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [EDIT_PROFILE_CLASS]);
			const element2 = addElementWith('A Different Profile Name', [EDIT_PROFILE_CLASS]);

			manageModuleProfilesSettingsForm.activateListeners();

			element1.click();
			expect(EditModuleProfileForm).toHaveBeenCalledTimes(1);
			expect(EditModuleProfileForm).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME);
			const instance1 = EditModuleProfileForm.mock.instances[0];
			expect(instance1.render).toHaveBeenCalledWith(true);

			element2.click();
			expect(EditModuleProfileForm).toHaveBeenCalledTimes(2);
			expect(EditModuleProfileForm).toHaveBeenCalledWith('A Different Profile Name');
			const instance2 = EditModuleProfileForm.mock.instances[1];
			expect(instance2.render).toHaveBeenCalledWith(true);
		});

		test('WHEN some elements have "module-profiles-edit-profile" class THEN only adds editProfile click event to elements with class', () =>
		{
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [EDIT_PROFILE_CLASS]);
			const element2 = addElementWith('A Different Profile Name', [EDIT_PROFILE_CLASS]);
			const element3 = addElementWith('A Third Profile Name', ['some-other-class-name']);

			manageModuleProfilesSettingsForm.activateListeners();

			element1.click();
			expect(EditModuleProfileForm).toHaveBeenCalledTimes(1);
			expect(EditModuleProfileForm).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME);
			const instance1 = EditModuleProfileForm.mock.instances[0];
			expect(instance1.render).toHaveBeenCalledWith(true);

			element2.click();
			expect(EditModuleProfileForm).toHaveBeenCalledTimes(2);
			expect(EditModuleProfileForm).toHaveBeenCalledWith('A Different Profile Name');
			const instance2 = EditModuleProfileForm.mock.instances[1];
			expect(instance2.render).toHaveBeenCalledWith(true);

			element3.click();
			expect(EditModuleProfileForm).toHaveBeenCalledTimes(2);
		});

		test('WHEN elements have other classes than "module-profiles-edit-profile" THEN adds editProfile click event for elements with class', () =>
		{
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [EDIT_PROFILE_CLASS, 'some-other-class']);
			const element2 = addElementWith('A Different Profile Name', [EDIT_PROFILE_CLASS, 'fa-power-off']);

			manageModuleProfilesSettingsForm.activateListeners();

			element1.click();
			expect(EditModuleProfileForm).toHaveBeenCalledTimes(1);
			expect(EditModuleProfileForm).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME);
			const instance1 = EditModuleProfileForm.mock.instances[0];
			expect(instance1.render).toHaveBeenCalledWith(true);

			element2.click();
			expect(EditModuleProfileForm).toHaveBeenCalledTimes(2);
			expect(EditModuleProfileForm).toHaveBeenCalledWith('A Different Profile Name');
			const instance2 = EditModuleProfileForm.mock.instances[1];
			expect(instance2.render).toHaveBeenCalledWith(true);
		});
	});

	describe('module-profiles-duplicate-profile', () =>
	{
		test('WHEN element does not have "module-profiles-duplicate-profile" class THEN does not add duplicateProfile click event to element', () =>
		{
			const element = addElementWith(DEFAULT_PROFILE_NAME, ['not-duplicate-profile']);

			manageModuleProfilesSettingsForm.activateListeners();
			element.click();
			expect(Settings.createProfile).toHaveBeenCalledTimes(0);
		});

		test('WHEN multiple elements do not have "module-profiles-duplicate-profile" class THEN does not add duplicateProfile click event to elements', () =>
		{
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, ['not-duplicate-profile']);
			const element2 = addElementWith(DEFAULT_PROFILE_NAME, ['another-not-duplicate-profile']);

			manageModuleProfilesSettingsForm.activateListeners();
			element1.click();
			element2.click();
			expect(Settings.createProfile).toHaveBeenCalledTimes(0);
		});

		test.each([
			[DEFAULT_PROFILE_NAME, DEFAULT_PROFILE],
			['A Different Profile Name', Constants.TestModuleProfiles.MultipleOnlyModuleProfilesEnabled],
			['A Third Profile Name', Constants.TestModuleProfiles.MultipleOnlyModuleProfilesAndTidyUIEnabled]
		])
			('WHEN element has "module-profiles-duplicate-profile" class THEN calls Settings.createProfile with Settings.getProfileByName values: %s, %o',
				(profileName, profile) =>
				{
					when(Settings.getProfileByName).calledWith(profileName).mockReturnValue(profile);
					const element = addElementWith(profileName, [DUPLICATE_PROFILE_CLASS]);

					manageModuleProfilesSettingsForm.activateListeners();
					element.click();
					expect(Settings.createProfile).toHaveBeenCalledTimes(1);
					expect(Settings.createProfile).toHaveBeenCalledWith(profile.name + ' (Copy)', profile.modules);
				});

		test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
			('WHEN element has "module-profiles-duplicate-profile" class THEN adds duplicateProfile click event for one element with class: %s', (value) =>
			{
				when(Settings.getProfileByName).calledWith(value).mockReturnValue(DEFAULT_PROFILE);
				const element = addElementWith(value, [DUPLICATE_PROFILE_CLASS]);

				manageModuleProfilesSettingsForm.activateListeners();
				element.click();
				expect(Settings.createProfile).toHaveBeenCalledTimes(1);
				expect(Settings.createProfile).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME + ' (Copy)', DEFAULT_PROFILE.modules);
			});

		test('WHEN elements have "module-profiles-duplicate-profile" class THEN adds duplicateProfile click event for many elements with class', () =>
		{
			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(DEFAULT_PROFILE);
			when(Settings.getProfileByName).calledWith('A Different Profile Name').mockReturnValue(Constants.TestModuleProfiles.OnlyModuleProfiles);
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [DUPLICATE_PROFILE_CLASS]);
			const element2 = addElementWith('A Different Profile Name', [DUPLICATE_PROFILE_CLASS]);

			manageModuleProfilesSettingsForm.activateListeners();

			element1.click();
			expect(Settings.createProfile).toHaveBeenCalledTimes(1);
			expect(Settings.createProfile).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME + ' (Copy)', DEFAULT_PROFILE.modules);

			element2.click();
			expect(Settings.createProfile).toHaveBeenCalledTimes(2);
			expect(Settings.createProfile).toHaveBeenCalledWith(Constants.TestModuleProfiles.OnlyModuleProfiles.name + ' (Copy)',
				Constants.TestModuleProfiles.OnlyModuleProfiles.modules);
		});

		test('WHEN some elements have "module-profiles-duplicate-profile" class THEN only adds duplicateProfile click event to elements with class', () =>
		{
			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(DEFAULT_PROFILE);
			const differentProfileNameProfile = {
				name: 'A Different Profile Name (Copy)',
				modules: DEFAULT_PROFILE.modules
			};
			when(Settings.getProfileByName).calledWith('A Different Profile Name').mockReturnValue(differentProfileNameProfile);
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [DUPLICATE_PROFILE_CLASS]);
			const element2 = addElementWith('A Different Profile Name', [DUPLICATE_PROFILE_CLASS]);
			const element3 = addElementWith('A Third Profile Name', ['some-other-class-name']);

			manageModuleProfilesSettingsForm.activateListeners();

			element1.click();
			expect(Settings.createProfile).toHaveBeenCalledTimes(1);
			expect(Settings.createProfile).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME + ' (Copy)', DEFAULT_PROFILE.modules);

			element2.click();
			expect(Settings.createProfile).toHaveBeenCalledTimes(2);
			expect(Settings.createProfile).toHaveBeenCalledWith('A Different Profile Name (Copy) (Copy)', differentProfileNameProfile.modules);

			element3.click();
			expect(Settings.createProfile).toHaveBeenCalledTimes(2);
		});

		test('WHEN elements have other classes than "module-profiles-duplicate-profile" THEN adds duplicateProfile click event for elements with class', () =>
		{
			when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(DEFAULT_PROFILE);
			const differentProfileNameProfile = {
				name: 'A Different Profile Name',
				modules: DEFAULT_PROFILE.modules
			};
			when(Settings.getProfileByName).calledWith('A Different Profile Name').mockReturnValue(differentProfileNameProfile);
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [DUPLICATE_PROFILE_CLASS, 'some-other-class']);
			const element2 = addElementWith('A Different Profile Name', [DUPLICATE_PROFILE_CLASS, 'fa-power-off']);

			manageModuleProfilesSettingsForm.activateListeners();

			element1.click();
			expect(Settings.createProfile).toHaveBeenCalledTimes(1);
			expect(Settings.createProfile).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME + ' (Copy)', DEFAULT_PROFILE.modules);

			element2.click();
			expect(Settings.createProfile).toHaveBeenCalledTimes(2);
			expect(Settings.createProfile).toHaveBeenCalledWith('A Different Profile Name (Copy)', differentProfileNameProfile.modules);
		});
	});

	describe('module-profiles-export-profile', () =>
	{
		beforeEach(() =>
		{
			// @ts-ignore - navigator only exists in browser, not test
			// noinspection JSConstantReassignment
			navigator.clipboard = {
				writeText: jest.fn()
			};
		});

		test('WHEN element does not have "module-profiles-export-profile" class THEN does not add exportProfile click event to element', async () =>
		{
			const element = addElementWith(DEFAULT_PROFILE_NAME, ['not-export-profile']);

			manageModuleProfilesSettingsForm.activateListeners();
			await element.click();
			expect(Settings.exportProfileByName).toHaveBeenCalledTimes(0);
			expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(0);
			expect(ui.notifications.info).toHaveBeenCalledTimes(0);
		});

		test('WHEN multiple elements do not have "module-profiles-export-profile" class THEN does not add exportProfile click event to elements', async () =>
		{
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, ['not-export-profile']);
			const element2 = addElementWith(DEFAULT_PROFILE_NAME, ['another-not-export-profile']);

			manageModuleProfilesSettingsForm.activateListeners();
			await element1.click();
			await element2.click();
			expect(Settings.exportProfileByName).toHaveBeenCalledTimes(0);
			expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(0);
			expect(ui.notifications.info).toHaveBeenCalledTimes(0);
		});

		test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
			('WHEN element has "module-profiles-export-profile" class THEN adds exportProfile click event for one element with class: %s', async (value) =>
			{
				when(Settings.exportProfileByName).calledWith(value).mockReturnValue('A Value');
				const element = addElementWith(value, [EXPORT_PROFILE_CLASS]);

				manageModuleProfilesSettingsForm.activateListeners();
				await element.click();
				expect(Settings.exportProfileByName).toHaveBeenCalledTimes(1);
				expect(Settings.exportProfileByName).toHaveBeenCalledWith(value);
				expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
				expect(navigator.clipboard.writeText).toHaveBeenCalledWith('A Value');
				expect(ui.notifications.info).toHaveBeenCalledTimes(1);
				expect(ui.notifications.info).toHaveBeenCalledWith(`Profile "${value}" copied to clipboard!`);
			});

		test('WHEN elements have "module-profiles-export-profile" class THEN adds exportProfile click event for many elements with class', async () =>
		{
			Settings.exportProfileByName.mockReturnValue('A Different Value');
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [EXPORT_PROFILE_CLASS]);
			const element2 = addElementWith('A Different Profile Name', [EXPORT_PROFILE_CLASS]);

			manageModuleProfilesSettingsForm.activateListeners();

			await element1.click();
			expect(Settings.exportProfileByName).toHaveBeenCalledTimes(1);
			expect(Settings.exportProfileByName).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME);
			expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
			expect(navigator.clipboard.writeText).toHaveBeenCalledWith('A Different Value');
			expect(ui.notifications.info).toHaveBeenCalledTimes(1);
			expect(ui.notifications.info).toHaveBeenCalledWith(`Profile "${DEFAULT_PROFILE_NAME}" copied to clipboard!`);

			await element2.click();
			expect(Settings.exportProfileByName).toHaveBeenCalledTimes(2);
			expect(Settings.exportProfileByName).toHaveBeenCalledWith('A Different Profile Name');
			expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(2);
			expect(navigator.clipboard.writeText).toHaveBeenCalledWith('A Different Value');
			expect(ui.notifications.info).toHaveBeenCalledTimes(2);
			expect(ui.notifications.info).toHaveBeenCalledWith(`Profile "A Different Profile Name" copied to clipboard!`);
		});

		test('WHEN some elements have "module-profiles-export-profile" class THEN only adds exportProfile click event to elements with class', async () =>
		{
			Settings.exportProfileByName.mockReturnValue('Yet Another Value');
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [EXPORT_PROFILE_CLASS]);
			const element2 = addElementWith('A Different Profile Name', [EXPORT_PROFILE_CLASS]);
			const element3 = addElementWith('A Third Profile Name', ['some-other-class-name']);

			manageModuleProfilesSettingsForm.activateListeners();

			await element1.click();
			expect(Settings.exportProfileByName).toHaveBeenCalledTimes(1);
			expect(Settings.exportProfileByName).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME);
			expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
			expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Yet Another Value');
			expect(ui.notifications.info).toHaveBeenCalledTimes(1);
			expect(ui.notifications.info).toHaveBeenCalledWith(`Profile "${DEFAULT_PROFILE_NAME}" copied to clipboard!`);

			await element2.click();
			expect(Settings.exportProfileByName).toHaveBeenCalledTimes(2);
			expect(Settings.exportProfileByName).toHaveBeenCalledWith('A Different Profile Name');
			expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(2);
			expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Yet Another Value');
			expect(ui.notifications.info).toHaveBeenCalledTimes(2);
			expect(ui.notifications.info).toHaveBeenCalledWith(`Profile "A Different Profile Name" copied to clipboard!`);

			await element3.click();
			expect(Settings.exportProfileByName).toHaveBeenCalledTimes(2);
			expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(2);
			expect(ui.notifications.info).toHaveBeenCalledTimes(2);
		});

		test('WHEN elements have other classes than "module-profiles-export-profile" THEN adds exportProfile click event for elements with class', async () =>
		{
			Settings.exportProfileByName.mockReturnValue('Value');
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [EXPORT_PROFILE_CLASS, 'some-other-class']);
			const element2 = addElementWith('A Different Profile Name', [EXPORT_PROFILE_CLASS, 'fa-power-off']);

			manageModuleProfilesSettingsForm.activateListeners();

			await element1.click();
			expect(Settings.exportProfileByName).toHaveBeenCalledTimes(1);
			expect(Settings.exportProfileByName).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME);
			expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
			expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Value');
			expect(ui.notifications.info).toHaveBeenCalledTimes(1);
			expect(ui.notifications.info).toHaveBeenCalledWith(`Profile "${DEFAULT_PROFILE_NAME}" copied to clipboard!`);

			await element2.click();
			expect(Settings.exportProfileByName).toHaveBeenCalledTimes(2);
			expect(Settings.exportProfileByName).toHaveBeenCalledWith('A Different Profile Name');
			expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(2);
			expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Value');
			expect(ui.notifications.info).toHaveBeenCalledTimes(2);
			expect(ui.notifications.info).toHaveBeenCalledWith(`Profile "A Different Profile Name" copied to clipboard!`);
		});
	});

	describe('module-profiles-delete-profile', () =>
	{
		test('WHEN element does not have "module-profiles-delete-profile" class THEN does not add deleteProfile click event to element', () =>
		{
			const element = addElementWith(DEFAULT_PROFILE_NAME, ['not-delete-profile']);

			manageModuleProfilesSettingsForm.activateListeners();
			element.click();
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledTimes(0);
		});

		test('WHEN multiple elements do not have "module-profiles-delete-profile" class THEN does not add deleteProfile click event to elements', () =>
		{
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, ['not-delete-profile']);
			const element2 = addElementWith(DEFAULT_PROFILE_NAME, ['another-not-delete-profile']);

			manageModuleProfilesSettingsForm.activateListeners();
			element1.click();
			element2.click();
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledTimes(0);
		});

		test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
			('WHEN element has "module-profiles-delete-profile" class THEN adds deleteProfile click event for one element with class: %s', (value) =>
			{
				const element = addElementWith(value, [DELETE_PROFILE_CLASS]);

				manageModuleProfilesSettingsForm.activateListeners();
				element.click();
				expect(ConfirmDeleteProfileForm).toHaveBeenCalledTimes(1);
				expect(ConfirmDeleteProfileForm).toHaveBeenCalledWith(value);
				const instance = ConfirmDeleteProfileForm.mock.instances[0];
				expect(instance.render).toHaveBeenCalledWith(true);
			});

		test('WHEN elements have "module-profiles-delete-profile" class THEN adds deleteProfile click event for many elements with class', () =>
		{
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [DELETE_PROFILE_CLASS]);
			const element2 = addElementWith('A Different Profile Name', [DELETE_PROFILE_CLASS]);

			manageModuleProfilesSettingsForm.activateListeners();

			element1.click();
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledTimes(1);
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME);
			const instance1 = ConfirmDeleteProfileForm.mock.instances[0];
			expect(instance1.render).toHaveBeenCalledWith(true);

			element2.click();
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledTimes(2);
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledWith('A Different Profile Name');
			const instance2 = ConfirmDeleteProfileForm.mock.instances[1];
			expect(instance2.render).toHaveBeenCalledWith(true);
		});

		test('WHEN some elements have "module-profiles-delete-profile" class THEN only adds deleteProfile click event to elements with class', () =>
		{
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [DELETE_PROFILE_CLASS]);
			const element2 = addElementWith('A Different Profile Name', [DELETE_PROFILE_CLASS]);
			const element3 = addElementWith('A Third Profile Name', ['some-other-class-name']);

			manageModuleProfilesSettingsForm.activateListeners();

			element1.click();
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledTimes(1);
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME);
			const instance1 = ConfirmDeleteProfileForm.mock.instances[0];
			expect(instance1.render).toHaveBeenCalledWith(true);

			element2.click();
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledTimes(2);
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledWith('A Different Profile Name');
			const instance2 = ConfirmDeleteProfileForm.mock.instances[1];
			expect(instance2.render).toHaveBeenCalledWith(true);

			element3.click();
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledTimes(2);
		});

		test('WHEN elements have other classes than "module-profiles-delete-profile" THEN adds deleteProfile click event for elements with class', () =>
		{
			const element1 = addElementWith(DEFAULT_PROFILE_NAME, [DELETE_PROFILE_CLASS, 'some-other-class']);
			const element2 = addElementWith('A Different Profile Name', [DELETE_PROFILE_CLASS, 'fa-power-off']);

			manageModuleProfilesSettingsForm.activateListeners();

			element1.click();
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledTimes(1);
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME);
			const instance1 = ConfirmDeleteProfileForm.mock.instances[0];
			expect(instance1.render).toHaveBeenCalledWith(true);

			element2.click();
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledTimes(2);
			expect(ConfirmDeleteProfileForm).toHaveBeenCalledWith('A Different Profile Name');
			const instance2 = ConfirmDeleteProfileForm.mock.instances[1];
			expect(instance2.render).toHaveBeenCalledWith(true);
		});
	});

	function addElementWith(profileName: string, classes: string[])
	{
		const element = document.createElement('a');
		element.classList.add(...classes);
		element.dataset.profileName = profileName;

		document.body.append(element);

		return element;
	}
});

describe('reRenderManageModuleProfilesWindows', () =>
{
	test('WHEN one ManageModuleProfilesSettingsForm exists on ui.windows THEN re-renders single window', () =>
	{
		ui.windows = {
			51: {
				// @ts-ignore - Mocking for Foundry
				options: {
					id: ManageModuleProfilesSettingsForm.FORM_ID
				},
				render: jest.fn()
			}
		};

		ManageModuleProfilesSettingsFormFunctions.reRenderManageModuleProfilesWindows();

		expect(ui.windows[51].render).toHaveBeenCalledWith();
	});

	test('WHEN multiple ManageModuleProfilesSettingsForm exists on ui.windows THEN re-renders multiple windows', () =>
	{
		ui.windows = {
			51: {
				// @ts-ignore - Mocking for Foundry
				options: {
					id: ManageModuleProfilesSettingsForm.FORM_ID
				},
				render: jest.fn()
			},
			55: {
				// @ts-ignore - Mocking for Foundry
				options: {
					id: ManageModuleProfilesSettingsForm.FORM_ID
				},
				render: jest.fn()
			},
			56: {
				// @ts-ignore - Mocking for Foundry
				options: {
					id: ManageModuleProfilesSettingsForm.FORM_ID
				},
				render: jest.fn()
			}
		};

		ManageModuleProfilesSettingsFormFunctions.reRenderManageModuleProfilesWindows();

		expect(ui.windows[51].render).toHaveBeenCalledWith();
		expect(ui.windows[55].render).toHaveBeenCalledWith();
		expect(ui.windows[56].render).toHaveBeenCalledWith();
	});

	test('WHEN one ManageModuleProfilesSettingsForm exists on ui.windows and other forms exist THEN only re-renders on ManageModuleProfilesSettingsForm window',
		() =>
		{
			ui.windows = {
				51: {
					// @ts-ignore - Mocking for Foundry
					options: {
						id: ManageModuleProfilesSettingsForm.FORM_ID
					},
					render: jest.fn()
				},
				52: {
					// @ts-ignore - Mocking for Foundry
					options: {
						id: 'some-other-form-id'
					},
					render: jest.fn()
				}
			};

			ManageModuleProfilesSettingsFormFunctions.reRenderManageModuleProfilesWindows();

			expect(ui.windows[51].render).toHaveBeenCalledWith();
			expect(ui.windows[52].render).toHaveBeenCalledTimes(0);
		});
});

describe('forceManageModuleProfilesHeightResize', () =>
{

	test('WHEN app.element is empty THEN does not throw error', () =>
	{
		const app = {
			element: []
		};

		// @ts-ignore - Mocking for Foundry
		forceManageModuleProfilesHeightResize(app);
	});

	test('WHEN called with correct parameters THEN adjust height of first element to auto', () =>
	{
		const element = document.createElement('div');
		element.style.height = '1px';
		const app = {
			element: [element]
		};

		// @ts-ignore - Mocking for Foundry
		forceManageModuleProfilesHeightResize(app);

		expect(element.style.height).toStrictEqual('auto');
	});
});
