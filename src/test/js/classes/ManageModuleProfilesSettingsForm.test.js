import * as Settings from '../../../js/scripts/settings.js';
import * as ProfileInteractions from '../../../js/scripts/profile-interactions.js';
import ManageModuleProfilesSettingsForm, * as ManageModuleProfilesSettingsFormFunctions from '../../../js/classes/ManageModuleProfilesSettingsForm.js';
import {DEFAULT_PROFILE, DEFAULT_PROFILE_NAME} from '../../config/constants.js';
import CreateModuleProfileForm from '../../../js/classes/CreateModuleProfileForm.js';
import ConfirmDeleteProfileForm from '../../../js/classes/ConfirmDeleteProfileForm.js';
import EditModuleProfileForm from '../../../js/classes/EditModuleProfileForm.js';

const FORM_ID = 'module-profiles-manage-profiles';
const FORM_TEMPLATE = 'modules/module-profiles/templates/manage-profiles.hbs';
const FORM_TITLE = 'Manage Module Profiles';
const MODULE_PROFILES_FORM_CLASS = 'module-profiles-form';
const CREATE_PROFILE_ID = 'module-profiles-manage-profiles-create-new';
const ACTIVATE_PROFILE_CLASS = 'module-profiles-activate-profile';
const EDIT_PROFILE_CLASS = 'module-profiles-edit-profile';
const DELETE_PROFILE_CLASS = 'module-profiles-delete-profile';

const FORM_APPLICATION_DEFAULT_OPTIONS = {
	classes: [],
	editable: true
};

jest.mock('../../../js/scripts/settings.js');
jest.mock('../../../js/scripts/profile-interactions.js');
jest.mock('../../../js/classes/CreateModuleProfileForm.js');
jest.mock('../../../js/classes/ConfirmDeleteProfileForm.js');
jest.mock('../../../js/classes/EditModuleProfileForm.js');

let manageModuleProfilesSettingsForm;

beforeEach(() =>
{
	manageModuleProfilesSettingsForm = new ManageModuleProfilesSettingsForm();

	jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => FORM_APPLICATION_DEFAULT_OPTIONS);
});

afterAll(() =>
{
	ui.windows = jest.fn();
});

describe('defaultOptions', () =>
{
	test('WHEN called THEN returns options', () =>
	{
		const actual = ManageModuleProfilesSettingsForm.defaultOptions;

		expect(actual).toStrictEqual({
			...FORM_APPLICATION_DEFAULT_OPTIONS,
			classes: [MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			width: 660
		});
	});

	test('WHEN parent classes exist THEN returns options while keeping parent classes', () =>
	{
		const classes = ['a-class', 'another-class', 'a-third-class'];

		jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => ({
			classes: classes
		}));

		const actual = ManageModuleProfilesSettingsForm.defaultOptions;

		expect(actual).toStrictEqual({
			classes: [...classes, MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			width: 660
		});
	});

	test('WHEN no parent classes exist THEN returns options with just default class', () =>
	{
		jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => ({
			editable: true
		}));

		const actual = ManageModuleProfilesSettingsForm.defaultOptions;

		expect(actual).toStrictEqual({
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
	test.each([
		[DEFAULT_PROFILE],
		[DEFAULT_PROFILE, { name: 'A New Profile', modules: undefined }]
	])
		('WHEN called THEN returns profiles with what Settings.getAllProfiles() returns: %s', (value) =>
		{
			Settings.getAllProfiles.mockReturnValue(value);

			const actual = manageModuleProfilesSettingsForm.getData();

			expect(actual).toStrictEqual({
				profiles: value
			});
		});
});

describe('activateListeners', () =>
{
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
			('WHEN element has "module-profiles-activate-profile" class THEN adds activateProfile click event for one element with class', (value) =>
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
			('WHEN element has "module-profiles-edit-profile" class THEN adds editProfile click event for one element with class', (value) =>
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
			('WHEN element has "module-profiles-delete-profile" class THEN adds deleteProfile click event for one element with class', (value) =>
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

	function addElementWith(profileName, classes)
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
				options: {
					id: ManageModuleProfilesSettingsForm.FORM_ID
				},
				render: jest.fn()
			},
			55: {
				options: {
					id: ManageModuleProfilesSettingsForm.FORM_ID
				},
				render: jest.fn()
			},
			56: {
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
					options: {
						id: ManageModuleProfilesSettingsForm.FORM_ID
					},
					render: jest.fn()
				},
				52: {
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
