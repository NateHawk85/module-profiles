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

describe('_updateObject', () =>
{
	test('WHEN event.submitter is undefined THEN does nothing', async () =>
	{
		await editModuleProfileForm._updateObject({}, {});

		// TODO
		expect(Settings.createProfile).toHaveBeenCalledTimes(0);
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

			// TODO
			expect(Settings.createProfile).toHaveBeenCalledTimes(0);
		});

	// TODO
	test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
		('WHEN event.submitter.id is "moduleProfilesEditProfileSubmit" THEN calls Settings.saveChangesToProfile with values from checkboxes: %s',
			async (value) =>
			{
				const event = {
					submitter: {
						id: SUBMIT_ELEMENT_ID
					}
				};
				const formData = {
					moduleProfilesCreateNewProfileName: value
				};

				await editModuleProfileForm._updateObject(event, formData);

				expect(Settings.createProfile).toHaveBeenCalledWith(value, CURRENT_MODULE_CONFIGURATION);
			});

	test.each([CURRENT_MODULE_CONFIGURATION, { 'first-module': true, 'second-module': false, 'third-module': true }])
		('WHEN event.submitter.id is "moduleProfilesCreateNewProfileSubmit" THEN calls Settings.createProfile with response from ' +
			'Settings.getCurrentModuleConfiguration: %s', async (value) =>
		{
			Settings.getCurrentModuleConfiguration.mockReturnValue(value);
			const event = {
				submitter: {
					id: SUBMIT_ELEMENT_ID
				}
			};
			const formData = {
				moduleProfilesCreateNewProfileName: DEFAULT_PROFILE_NAME
			};

			await editModuleProfileForm._updateObject(event, formData);

			expect(Settings.createProfile).toHaveBeenCalledWith(DEFAULT_PROFILE_NAME, value);
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

		editModuleProfileForm.activateListeners(undefined);

		expect(element.focus).toHaveBeenCalledWith();
	});
});
