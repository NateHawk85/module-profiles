import ConfirmActivateProfileForm from '../../main/classes/ConfirmActivateProfileForm';
import * as MockedSettings from '../../main/scripts/settings';
import * as MockedProfileInteractions from '../../main/scripts/profile-interactions';
import * as Constants from '../config/constants';
import {DEFAULT_PROFILE, DEFAULT_PROFILE_NAME} from '../config/constants';

jest.mock('../../main/scripts/settings');
const Settings = jest.mocked(MockedSettings, true);
jest.mock('../../main/scripts/profile-interactions');
const ProfileInteractions = jest.mocked(MockedProfileInteractions, true);

const FORM_ID = 'module-profiles-confirm-activate-profile';
const FORM_TEMPLATE = 'modules/module-profiles/templates/confirm-activate-profile.hbs';
const FORM_TITLE = 'Confirm Activate Profile';
const MODULE_PROFILES_FORM_CLASS = 'module-profiles-form';
const SUBMIT_ELEMENT_ID = 'moduleProfilesActivateProfileSubmit';

let confirmActivateProfileForm: ConfirmActivateProfileForm;
let formApplicationOptions: FormApplicationOptions;

beforeEach(() =>
{
	confirmActivateProfileForm = new ConfirmActivateProfileForm(DEFAULT_PROFILE_NAME);
	formApplicationOptions = Constants.buildDefaultFormApplicationOptions();

	Settings.getActiveProfile.mockReturnValue(DEFAULT_PROFILE);
	jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => formApplicationOptions);
});

describe('defaultOptions', () =>
{
	test('WHEN called THEN returns options', () =>
	{
		formApplicationOptions.classes = ['parent-class'];

		const actual = ConfirmActivateProfileForm.defaultOptions;

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

		const actual = ConfirmActivateProfileForm.defaultOptions;

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
		formApplicationOptions.classes = [];

		const actual = ConfirmActivateProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: [MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			width: 660
		});
	});
});

describe('getData', () =>
{
	test.each(Constants.AllModuleProfileNamesTestCases)
		('WHEN called THEN returns data with profile name from constructor: %s', (value) =>
		{
			confirmActivateProfileForm = new ConfirmActivateProfileForm(value);

			expect(confirmActivateProfileForm.getData()).toStrictEqual({
				profileNameToActivate: value,
				activeProfileName: DEFAULT_PROFILE_NAME
			});
		});

	test.each([
		[DEFAULT_PROFILE_NAME, 'A Different Profile'],
		['A New Profile', 'Active Profile Name']
	])
		('WHEN called THEN returns active profile from what Settings.getActiveProfile() returns: %s, %s', (profileNameToActivate, activeProfileName) =>
		{
			Settings.getActiveProfile.mockReturnValue({ name: activeProfileName, modules: [] });

			confirmActivateProfileForm = new ConfirmActivateProfileForm(profileNameToActivate);

			expect(confirmActivateProfileForm.getData()).toStrictEqual({
				profileNameToActivate: profileNameToActivate,
				activeProfileName: activeProfileName
			});
		});
});

describe('_updateObject', () =>
{
	test('WHEN event.submitter is undefined THEN does nothing', async () =>
	{
		await confirmActivateProfileForm._updateObject({});

		expect(ProfileInteractions.activateProfile).toHaveBeenCalledTimes(0);
	});

	test.each(['someOtherId', 'anotherRandomId', 'moduleProfilesActivateProfileAlmostMatch', undefined])
		('WHEN event.submitter.id is not "moduleProfilesActivateProfileSubmit" THEN does nothing: %s', async (value) =>
		{
			const event = {
				submitter: {
					id: value
				}
			};

			await confirmActivateProfileForm._updateObject(event);

			expect(ProfileInteractions.activateProfile).toHaveBeenCalledTimes(0);
		});

	test.each(Constants.AllModuleProfileNamesTestCases)
		('WHEN event.submitter.id is "moduleProfilesActivateProfileSubmit" THEN calls ProfileInteractions.activateProfile with profile name to activate: %s',
			async (value) =>
			{
				const event = {
					submitter: {
						id: SUBMIT_ELEMENT_ID
					}
				};

				await new ConfirmActivateProfileForm(value)._updateObject(event);

				expect(ProfileInteractions.activateProfile).toHaveBeenCalledWith(value, true);
			});

	test.each(['An error occurred', 'Profile does not exist'])
		('WHEN ProfileInteractions.activateProfile() throws Error THEN throws similar Error: %s', async (value) =>
		{
			ProfileInteractions.activateProfile.mockImplementation(() =>
			{
				throw new Error(value);
			});

			const event = {
				submitter: {
					id: SUBMIT_ELEMENT_ID
				}
			};

			const functionCall = () => new ConfirmActivateProfileForm(DEFAULT_PROFILE_NAME)._updateObject(event);

			await expect(functionCall).rejects.toThrow(Error);
			await expect(functionCall).rejects.toThrow(value);
		});
});
