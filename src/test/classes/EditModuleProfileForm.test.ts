import EditModuleProfileForm from '../../main/classes/EditModuleProfileForm';
import * as MockedSettings from '../../main/scripts/settings';
import * as Constants from '../config/constants';
import {DEFAULT_PROFILE, DEFAULT_PROFILE_NAME} from '../config/constants';

jest.mock('../../main/scripts/settings');
const Settings = jest.mocked(MockedSettings, true);

const FORM_ID = 'module-profiles-edit-module-profile';
const FORM_TEMPLATE = 'modules/module-profiles/templates/edit-module-profile.hbs';
const FORM_TITLE = 'Edit Module Profile';
const MODULE_PROFILES_FORM_CLASS = 'module-profiles-form';
const SUBMIT_ELEMENT_ID = 'moduleProfilesEditProfileSubmit';

const CURRENT_MODULE_CONFIGURATION = DEFAULT_PROFILE.modules;

let editModuleProfileForm: EditModuleProfileForm;
let formApplicationOptions: FormApplicationOptions;

beforeEach(() =>
{
	editModuleProfileForm = new EditModuleProfileForm(DEFAULT_PROFILE_NAME);
	formApplicationOptions = Constants.buildDefaultFormApplicationOptions();

	Settings.getCurrentModuleConfiguration.mockReturnValue(CURRENT_MODULE_CONFIGURATION);
	jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => formApplicationOptions);
});

describe('defaultOptions', () =>
{
	test('WHEN called THEN returns options', () =>
	{
		formApplicationOptions.classes = ['parent-class'];

		const actual = EditModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: ['parent-class', MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			resizable: true,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			width: 450
		});
	});

	test('WHEN parent classes exist THEN returns options while keeping parent classes', () =>
	{
		const classes = ['a-class', 'another-class', 'a-third-class'];
		formApplicationOptions.classes = classes;

		const actual = EditModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: [...classes, MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			resizable: true,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			width: 450
		});
	});

	test('WHEN no parent classes exist THEN returns options with just default class', () =>
	{
		const actual = EditModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: [MODULE_PROFILES_FORM_CLASS],
			editable: true,
			id: FORM_ID,
			resizable: true,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
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

	test.each(Constants.AllModuleProfileNamesTestCases)
		('WHEN called THEN calls Settings.getProfileByName with profile name from constructor: %s', (value) =>
		{
			editModuleProfileForm = new EditModuleProfileForm(value);

			editModuleProfileForm.getData();

			expect(Settings.getProfileByName).toHaveBeenCalledWith(value);
		});

	test.each(Constants.ModuleProfilesTestCases)
		('WHEN profile exists with name THEN returns what Settings.getProfileByName returns: %s', (value) =>
		{
			Settings.getProfileByName.mockReturnValue(value);

			editModuleProfileForm = new EditModuleProfileForm(DEFAULT_PROFILE_NAME);

			const response = editModuleProfileForm.getData();

			expect(response).toStrictEqual(value);
		});

	test.each(Constants.AllModuleProfileNamesTestCases)
		('WHEN profile is undefined with name THEN throws Error and calls ui.notifications.error', (value) =>
		{
			Settings.getProfileByName.mockReturnValue(undefined);

			editModuleProfileForm = new EditModuleProfileForm(value);

			const functionCall = () => editModuleProfileForm.getData();

			expect(functionCall).toThrow(Error);
			expect(ui.notifications.error).toHaveBeenCalledWith(`Unable to load profile "${value}". Please close the window and try again.`);
			expect(functionCall).toThrow(`Unable to load profile "${value}". Please close the window and try again.`);
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
		[DEFAULT_PROFILE_NAME, {}],
		['A Different Profile Name', { 'a-module': true, 'b-module': false, 'c-module': true }],
		['A Third Profile Name', { 'first-module-checkbox': false, 'second-module-checkbox': false }]
	])
		('WHEN event.submitter.id is "moduleProfilesEditProfileSubmit" THEN calls Settings.saveChangesToProfile with values from checkboxes: %s',
			async (profileName, modules: Record<string, boolean>) =>
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