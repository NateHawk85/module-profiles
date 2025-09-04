import CreateModuleProfileForm from '../../main/classes/CreateModuleProfileForm';
import * as MockedSettings from '../../main/scripts/settings';
import * as Constants from '../config/constants';
import { DEFAULT_PROFILE, DEFAULT_PROFILE_NAME } from '../config/constants';

const FORM_ID = 'module-profiles-create-module-profile';
const FORM_TEMPLATE = 'modules/module-profiles/templates/create-module-profile.hbs';
const FORM_TITLE = 'Create New Module Profile';
const MODULE_PROFILES_FORM_CLASS = 'module-profiles-form';
const SUBMIT_ELEMENT_ID = 'moduleProfilesCreateNewProfileSubmit';

const CURRENT_MODULE_CONFIGURATION = DEFAULT_PROFILE.modules;

jest.mock('../../main/scripts/settings');
const Settings = jest.mocked(MockedSettings, true);

let createModuleProfileForm: CreateModuleProfileForm;
let formApplicationOptions: FormApplicationOptions;

beforeEach(() =>
{
	createModuleProfileForm = new CreateModuleProfileForm();
	formApplicationOptions = Constants.buildDefaultFormApplicationOptions();

	Settings.getCurrentModuleConfiguration.mockReturnValue(CURRENT_MODULE_CONFIGURATION);
	jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => formApplicationOptions);
});

describe('defaultOptions', () =>
{
	test('WHEN called THEN returns options', () =>
	{
		formApplicationOptions.classes = ['parent-class'];

		const actual = CreateModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: ['parent-class', MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			width: 660,
		});
	});

	test('WHEN parent classes exist THEN returns options while keeping parent classes', () =>
	{
		const classes = ['a-class', 'another-class', 'a-third-class'];
		formApplicationOptions.classes = classes;

		const actual = CreateModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: [...classes, MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			width: 660,
		});
	});

	test('WHEN no parent classes exist THEN returns options with just default class', () =>
	{
		const actual = CreateModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: [MODULE_PROFILES_FORM_CLASS],
			editable: true,
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			width: 660,
		});
	});
});

describe('_updateObject', () =>
{
	test('WHEN event.submitter is undefined THEN does nothing', async () =>
	{
		await createModuleProfileForm._updateObject(
			{},
			{ moduleProfilesCreateNewProfileName: DEFAULT_PROFILE_NAME, moduleProfilesCreateNewProfileDescription: '' },
		);

		expect(Settings.createProfile).toHaveBeenCalledTimes(0);
	});

	test.each(['someOtherId', 'anotherRandomId', 'moduleProfilesCreateNewProfileAlmostMatch', undefined])
		('WHEN event.submitter.id is not "moduleProfilesCreateNewProfileSubmit" THEN does nothing: %s', async (value) =>
		{
			const event = {
				submitter: {
					id: value,
				},
			};

			await createModuleProfileForm._updateObject(
				event,
				{ moduleProfilesCreateNewProfileName: DEFAULT_PROFILE_NAME, moduleProfilesCreateNewProfileDescription: '' },
			);

			expect(Settings.createProfile).toHaveBeenCalledTimes(0);
		});

	test.each(Constants.ModuleProfileNames)
		(
			'WHEN event.submitter.id is "moduleProfilesCreateNewProfileSubmit" THEN calls Settings.createProfile with value from ' +
			'"moduleProfilesCreateNewProfileName" key: %s',
			async (value) =>
			{
				const event = {
					submitter: {
						id: SUBMIT_ELEMENT_ID,
					},
				};
				const formData = {
					moduleProfilesCreateNewProfileName: value,
					moduleProfilesCreateNewProfileDescription: ''
				};

				await createModuleProfileForm._updateObject(event, formData);

				expect(Settings.createProfile).toHaveBeenCalledWith({
					name: value,
					description: '',
					modules: CURRENT_MODULE_CONFIGURATION,
				});
			});

	test.each(Constants.SavedModuleInfosFromGameSettings)
		(
			'WHEN event.submitter.id is "moduleProfilesCreateNewProfileSubmit" THEN calls Settings.createProfile with response from ' +
			'Settings.getCurrentModuleConfiguration: %s', async (value) =>
		{
			Settings.getCurrentModuleConfiguration.mockReturnValue(value);
			const event = {
				submitter: {
					id: SUBMIT_ELEMENT_ID,
				},
			};
			const formData = {
				moduleProfilesCreateNewProfileName: DEFAULT_PROFILE_NAME,
				moduleProfilesCreateNewProfileDescription: ''
			};

			await createModuleProfileForm._updateObject(event, formData);

			expect(Settings.createProfile).toHaveBeenCalledWith({
				name: DEFAULT_PROFILE_NAME,
				description: '',
				modules: value,
			});
		});
});

describe('activateListeners', () =>
{
	test('WHEN called THEN calls focus on element with "moduleProfilesCreateNewProfileName" id', () =>
	{
		const element = document.createElement('input');
		element.id = 'moduleProfilesCreateNewProfileName';
		element.focus = jest.fn();
		document.body.append(element);

		createModuleProfileForm.activateListeners(undefined);

		expect(element.focus).toHaveBeenCalledWith();
	});
});
