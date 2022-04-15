import * as Settings from '../../../js/scripts/settings.js';
import EditModuleProfileForm from '../../../js/classes/EditModuleProfileForm.js';
import {DEFAULT_PROFILE, DEFAULT_PROFILE_NAME} from '../../config/constants.js';

const FORM_ID = 'module-profiles-edit-module-profile';
const FORM_TEMPLATE = 'modules/module-profiles/templates/edit-module-profile.hbs';
const FORM_TITLE = 'Edit Module Profile';
const MODULE_PROFILES_FORM_CLASS = 'module-profiles-form';
const SUBMIT_ELEMENT_ID = 'moduleProfilesEditProfileSubmit';

const FORM_APPLICATION_DEFAULT_OPTIONS = {
	classes: [],
	editable: true
};
const CURRENT_MODULE_CONFIGURATION = DEFAULT_PROFILE.modules;

jest.mock('../../../js/scripts/settings.js');

let editModuleProfileForm;

beforeEach(() =>
{
	editModuleProfileForm = new EditModuleProfileForm();

	Settings.getCurrentModuleConfiguration.mockReturnValue(CURRENT_MODULE_CONFIGURATION);
	jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => FORM_APPLICATION_DEFAULT_OPTIONS);
});


describe('constructor', () =>
{
	test.each([DEFAULT_PROFILE_NAME, 'A Different Profile'])
		('WHEN called THEN creates form with correct profile name: %s', (value) =>
		{
			editModuleProfileForm = new EditModuleProfileForm(value);

			expect(editModuleProfileForm.profileName).toStrictEqual(value);
		});
});

describe('defaultOptions', () =>
{
	test('WHEN called THEN returns options', () =>
	{
		const actual = EditModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...FORM_APPLICATION_DEFAULT_OPTIONS,
			classes: [MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			resizable: true,
			width: 450
		});
	});

	test('WHEN parent classes exist THEN returns options while keeping parent classes', () =>
	{
		const classes = ['a-class', 'another-class', 'a-third-class'];

		jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => ({
			classes: classes
		}));

		const actual = EditModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			classes: [...classes, MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			resizable: true,
			width: 450
		});
	});

	test('WHEN no parent classes exist THEN returns options with just default class', () =>
	{
		jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => ({
			editable: true
		}));

		const actual = EditModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			classes: [MODULE_PROFILES_FORM_CLASS],
			editable: true,
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			resizable: true,
			width: 450
		});
	});
});

describe('getData', () =>
{
	beforeEach(() =>
	{
		Settings.getProfileByName.mockReturnValue(DEFAULT_PROFILE);
	});

	test.each([DEFAULT_PROFILE_NAME, 'A Different Profile'])
		('WHEN called THEN calls Settings.getProfileByName with profile name: %s', (value) =>
		{
			editModuleProfileForm = new EditModuleProfileForm(value);

			editModuleProfileForm.getData();

			expect(Settings.getProfileByName).toHaveBeenCalledWith(value);
		});

	test('WHEN called THEN returns object based on what Settings.getProfileByName returns', () =>
	{
		editModuleProfileForm = new EditModuleProfileForm(DEFAULT_PROFILE_NAME);

		const response = editModuleProfileForm.getData();

		expect(response).toStrictEqual({
			name: DEFAULT_PROFILE_NAME,
			modules: [
				{ moduleName: 'module-profiles', isActive: true },
				{ moduleName: 'tidy-ui', isActive: false }
			]
		});
	});

	test('WHEN called THEN returns object based on what Settings.getProfileByName returns with alternate values', () =>
	{
		Settings.getProfileByName.mockReturnValue({
			name: 'A Different Profile Name',
			modules: {
				'module-1': true,
				'module-2': false,
				'module-3': true
			}
		});

		editModuleProfileForm = new EditModuleProfileForm(DEFAULT_PROFILE_NAME);

		const response = editModuleProfileForm.getData();

		expect(response).toStrictEqual({
			name: 'A Different Profile Name',
			modules: [
				{ moduleName: 'module-1', isActive: true },
				{ moduleName: 'module-2', isActive: false },
				{ moduleName: 'module-3', isActive: true }
			]
		});
	});

	test('WHEN modules are not in alphabetical order THEN returns object with modules in alphabetical order', () =>
	{
		Settings.getProfileByName.mockReturnValue({
			name: DEFAULT_PROFILE_NAME,
			modules: {
				'c-module': false,
				'a-module': true,
				'b-module': true
			}
		});

		editModuleProfileForm = new EditModuleProfileForm(DEFAULT_PROFILE_NAME);

		const response = editModuleProfileForm.getData();

		expect(response).toStrictEqual({
			name: DEFAULT_PROFILE_NAME,
			modules: [
				{ moduleName: 'a-module', isActive: true },
				{ moduleName: 'b-module', isActive: true },
				{ moduleName: 'c-module', isActive: false }
			]
		});
	});

	test('WHEN modules are not in alphabetical order THEN returns object with modules in alphabetical order with alternate values', () =>
	{
		Settings.getProfileByName.mockReturnValue({
			name: 'A Different Profile Name',
			modules: {
				'5e-module': false,
				'a-module': true,
				'c-module': true,
				'f-module': true,
				'd-module': true,
				'b-module': true
			}
		});

		editModuleProfileForm = new EditModuleProfileForm(DEFAULT_PROFILE_NAME);

		const response = editModuleProfileForm.getData();

		expect(response).toStrictEqual({
			name: 'A Different Profile Name',
			modules: [
				{ moduleName: '5e-module', isActive: false },
				{ moduleName: 'a-module', isActive: true },
				{ moduleName: 'b-module', isActive: true },
				{ moduleName: 'c-module', isActive: true },
				{ moduleName: 'd-module', isActive: true },
				{ moduleName: 'f-module', isActive: true }
			]
		});
	});
});

describe('_updateObject', () =>
{
	test('WHEN event.submitter is undefined THEN does nothing', async () =>
	{
		await editModuleProfileForm._updateObject({}, {});

		expect(Settings.saveChangesToProfile).toHaveBeenCalledTimes(0);
	});

	test.each(['someOtherId', 'anotherRandomId', 'moduleProfilesEditProfileAlmostMatch', undefined])
		('WHEN event.submitter.id is not "moduleProfilesEditProfileSubmit" THEN does nothing: %s', async (value) =>
		{
			const event = {
				submitter: {
					id: value
				}
			};

			await editModuleProfileForm._updateObject(event, {});

			expect(Settings.saveChangesToProfile).toHaveBeenCalledTimes(0);
		});

	test.each([
		[DEFAULT_PROFILE_NAME, DEFAULT_PROFILE.modules],
		['A Different Profile Name', { 'a-module': true, 'b-module': false, 'c-module': true }],
		['A Third Profile Name', { 'first-module-checkbox': false, 'second-module-checkbox': false }]
	])
		('WHEN event.submitter.id is "moduleProfilesEditProfileSubmit" THEN calls Settings.saveChangesToProfile with values from checkboxes: %s',
			async (profileName, modules) =>
			{
				editModuleProfileForm = new EditModuleProfileForm(profileName);

				const event = {
					submitter: {
						id: SUBMIT_ELEMENT_ID
					}
				};

				await editModuleProfileForm._updateObject(event, modules);

				expect(Settings.saveChangesToProfile).toHaveBeenCalledWith(profileName, modules);
			});
});