import * as MockedSettings from '../../main/scripts/settings';
import ExportModuleProfileForm from '../../main/classes/ExportModuleProfileForm';
import * as Constants from '../config/constants';
import {DEFAULT_PROFILE, DEFAULT_PROFILE_NAME} from '../config/constants';

jest.mock('../../main/scripts/settings');
const Settings = jest.mocked(MockedSettings, true);

const FORM_ID = 'module-profiles-export-module-profile';
const FORM_TEMPLATE = 'modules/module-profiles/templates/export-module-profile.hbs';
const FORM_TITLE = 'Export Module Profile';
const MODULE_PROFILES_FORM_CLASS = 'module-profiles-form';

const CURRENT_MODULE_CONFIGURATION = DEFAULT_PROFILE.modules;

let exportModuleProfileForm: ExportModuleProfileForm;
let formApplicationOptions: FormApplicationOptions;

beforeEach(() =>
{
	exportModuleProfileForm = new ExportModuleProfileForm(DEFAULT_PROFILE_NAME);
	formApplicationOptions = Constants.buildDefaultFormApplicationOptions();

	Settings.getCurrentModuleConfiguration.mockReturnValue(CURRENT_MODULE_CONFIGURATION);
	jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => formApplicationOptions);
});

describe('defaultOptions', () =>
{
	test('WHEN called THEN returns options', () =>
	{
		formApplicationOptions.classes = ['parent-class'];

		const actual = ExportModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: ['parent-class', MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			height: 500,
			width: 660
		});
	});

	test('WHEN parent classes exist THEN returns options while keeping parent classes', () =>
	{
		const classes = ['a-class', 'another-class', 'a-third-class'];
		formApplicationOptions.classes = classes;

		const actual = ExportModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: [...classes, MODULE_PROFILES_FORM_CLASS],
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			height: 500,
			width: 660
		});
	});

	test('WHEN no parent classes exist THEN returns options with just default class', () =>
	{
		const actual = ExportModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...formApplicationOptions,
			classes: [MODULE_PROFILES_FORM_CLASS],
			editable: true,
			id: FORM_ID,
			template: FORM_TEMPLATE,
			title: FORM_TITLE,
			height: 500,
			width: 660
		});
	});
});

describe('getData', () =>
{
	test.each([DEFAULT_PROFILE_NAME, 'A Different Profile'])
		('WHEN called THEN calls Settings.exportProfileByName with profile name from constructor: %s', (value) =>
		{
			exportModuleProfileForm = new ExportModuleProfileForm(value);
			exportModuleProfileForm.getData();

			expect(Settings.exportProfileByName).toHaveBeenCalledWith(value);
		});

	test.each([
		[DEFAULT_PROFILE_NAME, '{some json here}'],
		['Another Profile Name', 'another json string']
	])
		('WHEN called THEN returns what Settings.exportProfileByName returns as JSON string', (profileName, json) =>
		{
			Settings.exportProfileByName.mockReturnValue(json);

			exportModuleProfileForm = new ExportModuleProfileForm(profileName);

			expect(exportModuleProfileForm.getData()).toStrictEqual({
				name: profileName,
				data: json
			});
		});
});