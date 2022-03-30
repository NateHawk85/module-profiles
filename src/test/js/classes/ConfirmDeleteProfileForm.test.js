import * as Settings from '../../../js/scripts/settings.js';
import ConfirmDeleteProfileForm from '../../../js/classes/ConfirmDeleteProfileForm.js';
import {DEFAULT_PROFILE, DEFAULT_PROFILE_NAME} from '../../config/constants.js';

const FORM_ID = 'module-profiles-confirm-delete-profile';
const FORM_TEMPLATE = 'modules/module-profiles/templates/confirm-delete-profile.hbs';
const FORM_TITLE = 'Confirm Delete Profile';
const MODULE_PROFILES_FORM_CLASS = 'module-profiles-form';
const SUBMIT_ELEMENT_ID = 'moduleProfilesDeleteProfileSubmit';

const FORM_APPLICATION_DEFAULT_OPTIONS = {
	classes: [],
	editable: true
};

jest.mock('../../../js/scripts/settings.js');

let confirmDeleteProfileForm;

beforeEach(() =>
{
	confirmDeleteProfileForm = new ConfirmDeleteProfileForm(DEFAULT_PROFILE_NAME);

	jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => FORM_APPLICATION_DEFAULT_OPTIONS);
});

describe('constructor', () =>
{
	test.each([DEFAULT_PROFILE_NAME, 'A Different Profile'])
		('WHEN called THEN creates form with correct profile name: %s', (value) =>
		{
			confirmDeleteProfileForm = new ConfirmDeleteProfileForm(value);

			expect(confirmDeleteProfileForm.profileNameToDelete).toStrictEqual(value);
		});
});

describe('defaultOptions', () =>
{
	test('WHEN called THEN returns options', () =>
	{
		const actual = ConfirmDeleteProfileForm.defaultOptions;

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

		const actual = ConfirmDeleteProfileForm.defaultOptions;

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

		const actual = ConfirmDeleteProfileForm.defaultOptions;

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
	test.each([DEFAULT_PROFILE_NAME, 'A Different Profile'])
		('WHEN called THEN returns data with profile name from constructor: %s', (value) =>
		{
			confirmDeleteProfileForm = new ConfirmDeleteProfileForm(value);

			expect(confirmDeleteProfileForm.getData()).toStrictEqual({
				profileNameToDelete: value
			});
		});
});

describe('_updateObject', () =>
{
	test('WHEN event.submitter is undefined THEN does nothing', async () =>
	{
		await confirmDeleteProfileForm._updateObject({}, {});

		expect(Settings.deleteProfile).toHaveBeenCalledTimes(0);
	});

	test.each(['someOtherId', 'anotherRandomId', 'moduleProfilesDeleteProfileAlmostMatch', undefined])
		('WHEN event.submitter.id is not "moduleProfilesDeleteProfileSubmit" THEN does nothing: %s', async (value) =>
		{
			const event = {
				submitter: {
					id: value
				}
			};

			await confirmDeleteProfileForm._updateObject(event, {});

			expect(Settings.deleteProfile).toHaveBeenCalledTimes(0);
		});

	test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
		('WHEN event.submitter.id is "moduleProfilesDeleteProfileSubmit" THEN calls Settings.deleteProfile with profile name to delete: %s',
			async (value) =>
			{
				const event = {
					submitter: {
						id: SUBMIT_ELEMENT_ID
					}
				};

				await new ConfirmDeleteProfileForm(value)._updateObject(event, {});

				expect(Settings.deleteProfile).toHaveBeenCalledWith(value);
			});

	test.each([DEFAULT_PROFILE, { name: 'A Different Profile Name', modules: {} }])
		('WHEN event.submitter.id is "moduleProfilesDeleteProfileSubmit" THEN returns what Settings.deleteProfile returns: %s', async (value) =>
		{
			Settings.deleteProfile.mockReturnValue(value);

			const event = {
				submitter: {
					id: SUBMIT_ELEMENT_ID
				}
			};

			const actual = await new ConfirmDeleteProfileForm(value)._updateObject(event, {});

			expect(actual).toStrictEqual(value);
		});

	test.each(['An error occurred', 'Profile does not exist'])
		('WHEN Settings.deleteProfile throws Error THEN throws similar Error: %s', async (value) =>
		{
			Settings.deleteProfile.mockImplementation(() =>
			{
				throw new Error(value);
			});

			const event = {
				submitter: {
					id: SUBMIT_ELEMENT_ID
				}
			};

			const functionCall = () => new ConfirmDeleteProfileForm(DEFAULT_PROFILE_NAME)._updateObject(event, {});

			await expect(functionCall).rejects.toThrow(Error);
			await expect(functionCall).rejects.toThrow(value);
		});
});
