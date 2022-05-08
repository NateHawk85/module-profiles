import * as MockedSettings from '../../main/scripts/settings';
import ImportModuleProfileForm from '../../main/classes/ImportModuleProfileForm';
import * as Constants from '../config/constants';
import {DEFAULT_PROFILE, DEFAULT_PROFILE_NAME} from '../config/constants';

jest.mock('../../main/scripts/settings');
const Settings = jest.mocked(MockedSettings, true);

const FORM_ID = 'module-profiles-import-module-profile';
const FORM_TEMPLATE = 'modules/module-profiles/templates/import-module-profile.hbs';
const FORM_TITLE = 'Import Module Profile(s)';
const MODULE_PROFILES_FORM_CLASS = 'module-profiles-form';
const SUBMIT_ELEMENT_ID = 'moduleProfilesImportProfileSubmit';

const CURRENT_MODULE_CONFIGURATION = DEFAULT_PROFILE.modules;

let importModuleProfileForm: ImportModuleProfileForm;
let formApplicationOptions: FormApplicationOptions;

beforeEach(() =>
{
	importModuleProfileForm = new ImportModuleProfileForm(DEFAULT_PROFILE_NAME);
	formApplicationOptions = Constants.buildDefaultFormApplicationOptions();

	Settings.getCurrentModuleConfiguration.mockReturnValue(CURRENT_MODULE_CONFIGURATION);
	jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => formApplicationOptions);
});

describe('defaultOptions', () =>
{
	test('WHEN called THEN returns options', () =>
	{
		formApplicationOptions.classes = ['parent-class'];

		const actual = ImportModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: ['parent-class', MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			height: 800,
			width: 660
		});
	});

	test('WHEN parent classes exist THEN returns options while keeping parent classes', () =>
	{
		const classes = ['a-class', 'another-class', 'a-third-class'];
		formApplicationOptions.classes = classes;

		const actual = ImportModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: [...classes, MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			height: 800,
			width: 660
		});
	});

	test('WHEN no parent classes exist THEN returns options with just default class', () =>
	{
		const actual = ImportModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: [MODULE_PROFILES_FORM_CLASS],
			editable: true,
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			height: 800,
			width: 660
		});
	});
});

describe('_updateObject', () =>
{
	test('WHEN event.submitter is undefined THEN does nothing', async () =>
	{
		await importModuleProfileForm._updateObject({}, {});

		expect(Settings.importProfiles).toHaveBeenCalledTimes(0);
	});

	test.each(['someOtherId', 'anotherRandomId', 'moduleProfilesImportProfileAlmostMatch', undefined])
		('WHEN event.submitter.id is not "moduleProfilesImportProfileSubmit" THEN does nothing: %s', async (value) =>
		{
			const event = {
				submitter: {
					id: value
				}
			};

			await importModuleProfileForm._updateObject(event, {});

			expect(Settings.saveChangesToProfile).toHaveBeenCalledTimes(0);
		});

	test.each(['A Value', 'Another value'])
		('WHEN event.submitter.id is "moduleProfilesImportProfileSubmit" THEN calls Settings.importProfiles with value from formData: %s', async (value) =>
		{
			const event = {
				submitter: {
					id: SUBMIT_ELEMENT_ID
				}
			};

			await importModuleProfileForm._updateObject(event, { 'import-module-profile-text': value });

			expect(Settings.importProfiles).toHaveBeenCalledWith(value);
		});
});