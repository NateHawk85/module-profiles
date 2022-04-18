import * as Settings from '../../../js/scripts/settings.js';
import ExportModuleProfileForm from '../../../js/classes/ExportModuleProfileForm.js';
import {DEFAULT_PROFILE, DEFAULT_PROFILE_NAME} from '../../config/constants.js';
import {when} from 'jest-when';

const FORM_ID = 'module-profiles-export-module-profile';
const FORM_TEMPLATE = 'modules/module-profiles/templates/export-module-profile.hbs';
const FORM_TITLE = 'Export Module Profile';
const MODULE_PROFILES_FORM_CLASS = 'module-profiles-form';

const FORM_APPLICATION_DEFAULT_OPTIONS = {
	classes: [],
	editable: true
};
const CURRENT_MODULE_CONFIGURATION = DEFAULT_PROFILE.modules;

jest.mock('../../../js/scripts/settings.js');

let exportModuleProfileForm;

beforeEach(() =>
{
	exportModuleProfileForm = new ExportModuleProfileForm();

	Settings.getCurrentModuleConfiguration.mockReturnValue(CURRENT_MODULE_CONFIGURATION);
	jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => FORM_APPLICATION_DEFAULT_OPTIONS);
});

describe('constructor', () =>
{
	test.each([DEFAULT_PROFILE_NAME, 'A Different Profile'])
		('WHEN called THEN creates form with correct profile name: %s', (value) =>
		{
			exportModuleProfileForm = new ExportModuleProfileForm(value);

			expect(exportModuleProfileForm.profileName).toStrictEqual(value);
		});
});

describe('defaultOptions', () =>
{
	test('WHEN called THEN returns options', () =>
	{
		const actual = ExportModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
			...FORM_APPLICATION_DEFAULT_OPTIONS,
			classes: [MODULE_PROFILES_FORM_CLASS],
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

		jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => ({
			classes: classes
		}));

		const actual = ExportModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
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
		jest.spyOn(FormApplication, 'defaultOptions', 'get').mockImplementation(() => ({
			editable: true
		}));

		const actual = ExportModuleProfileForm.defaultOptions;

		expect(actual).toStrictEqual({
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
		('WHEN called THEN calls Settings.getProfileByName with profile name from constructor: %s', (value) =>
		{
			exportModuleProfileForm = new ExportModuleProfileForm(value);
			exportModuleProfileForm.getData();

			expect(Settings.getProfileByName).toHaveBeenCalledWith(value);
		});

	test('WHEN called THEN returns what Settings.getProfileByName returns as JSON string', () =>
	{
		const profile = {
			'name': 'A Profile Name',
			'modules': {
				'a-module': true,
				'b-module': false
			}
		};
		when(Settings.getProfileByName).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(profile);

		exportModuleProfileForm = new ExportModuleProfileForm(DEFAULT_PROFILE_NAME);

		expect(exportModuleProfileForm.getData()).toStrictEqual({
			name: DEFAULT_PROFILE_NAME,
			data: '{\n' +
				'  \"name\": \"A Profile Name\",\n' +
				'  \"modules\": {\n' +
				'    \"a-module\": true,\n' +
				'    \"b-module\": false\n' +
				'  }\n' +
				'}'
		});
	});

	test('WHEN called THEN returns what Settings.getProfileByName returns as JSON string with alternate parameters', () =>
	{
		const profile = {
			name: 'A Different Profile Name',
			modules: {
				'a-module': true,
				'b-module': false,
				'c-module': true
			}
		};
		when(Settings.getProfileByName).calledWith('Some Random Profile Name').mockReturnValue(profile);

		exportModuleProfileForm = new ExportModuleProfileForm('Some Random Profile Name');

		expect(exportModuleProfileForm.getData()).toStrictEqual({
			name: 'Some Random Profile Name',
			data: '{\n' +
				'  \"name\": \"A Different Profile Name\",\n' +
				'  \"modules\": {\n' +
				'    \"a-module\": true,\n' +
				'    \"b-module\": false,\n' +
				'    \"c-module\": true\n' +
				'  }\n' +
				'}'
		});
	});
});