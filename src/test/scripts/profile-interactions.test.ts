import * as ProfileInteractions from '../../main/scripts/profile-interactions';
import * as MockedSettings from '../../main/scripts/settings';
import * as MockedModuleManagementScripts from '../../main/scripts/ui/module-management-scripts';
import MockedConfirmActivateProfileForm from '../../main/classes/ConfirmActivateProfileForm';
import * as Constants from '../config/constants';
import {DEFAULT_PROFILE, DEFAULT_PROFILE_NAME} from '../config/constants';
import {when} from 'jest-when';

jest.mock('../../main/scripts/settings');
const Settings = jest.mocked(MockedSettings, true);
jest.mock('../../main/scripts/ui/module-management-scripts');
const ModuleManagementScripts = jest.mocked(MockedModuleManagementScripts, true);
jest.mock('../../main/classes/ConfirmActivateProfileForm');
const ConfirmActivateProfileForm = jest.mocked(MockedConfirmActivateProfileForm);

describe('activateProfile', () =>
{
	describe('profileName does not exist', () =>
	{
		test('WHEN profileName is undefined THEN throws Error and calls ui.notifications.error', () =>
		{
			// @ts-ignore
			const functionCall = () => ProfileInteractions.activateProfile(undefined);

			expect(functionCall).toThrow(Error);
			expect(ui.notifications.error).toHaveBeenCalledWith('Unable to activate profile. Profile name undefined.');
			expect(functionCall).toThrow(`Unable to activate profile. Profile name undefined.`);
		});
	});

	test.each(Constants.ModuleProfilesTestCases)
		('WHEN should not force and ModuleManagement is open THEN ModuleManagementScripts.unsavedChangesExistOn is called with the active profile name: %s',
			(value) =>
			{
				ModuleManagementScripts.isModuleManagementWindowOpen.mockReturnValue(true);
				Settings.getActiveProfile.mockReturnValue(value);

				ProfileInteractions.activateProfile(DEFAULT_PROFILE_NAME);

				expect(ModuleManagementScripts.unsavedChangesExistOn).toHaveBeenCalledWith(value.name);
			});

	describe('changes detected', () =>
	{
		test.each(Constants.AllModuleProfileNamesTestCases)
			('WHEN ModuleManagement is open and changes detected THEN creates new ConfirmActivateProfileForm and calls render on it: %s',
				(profileName) =>
				{
					ModuleManagementScripts.isModuleManagementWindowOpen.mockReturnValue(true);
					Settings.getActiveProfile.mockReturnValue(DEFAULT_PROFILE);
					when(ModuleManagementScripts.unsavedChangesExistOn).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(true);

					ProfileInteractions.activateProfile(profileName);

					expect(ConfirmActivateProfileForm).toHaveBeenCalledTimes(1);
					expect(ConfirmActivateProfileForm).toHaveBeenCalledWith(profileName);
					const instance = ConfirmActivateProfileForm.mock.instances[0];
					expect(instance.render).toHaveBeenCalledWith(true);
				});

		test('WHEN ModuleManagement is open and changes detected THEN does not call Settings.activateProfile', () =>
		{
			ModuleManagementScripts.isModuleManagementWindowOpen.mockReturnValue(true);
			Settings.getActiveProfile.mockReturnValue(DEFAULT_PROFILE);
			when(ModuleManagementScripts.unsavedChangesExistOn).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(true);

			ProfileInteractions.activateProfile(DEFAULT_PROFILE_NAME);

			expect(Settings.activateProfile).toHaveBeenCalledTimes(0);
		});

		describe('shouldForce', () =>
		{
			test('WHEN shouldForce and ModuleManagement has changes THEN does not create new ConfirmActivateProfileForm', () =>
			{
				ModuleManagementScripts.isModuleManagementWindowOpen.mockReturnValue(true);
				when(ModuleManagementScripts.unsavedChangesExistOn).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(true);

				ProfileInteractions.activateProfile(DEFAULT_PROFILE_NAME, true);

				expect(ConfirmActivateProfileForm).toHaveBeenCalledTimes(0);
			});

			test.each(Constants.AllModuleProfileNamesTestCases)
				('WHEN shouldForce and ModuleManagement has changes THEN calls Settings.activateProfile with profile name: %s', (value) =>
				{
					ModuleManagementScripts.isModuleManagementWindowOpen.mockReturnValue(true);
					when(ModuleManagementScripts.unsavedChangesExistOn).calledWith(value).mockReturnValue(true);

					ProfileInteractions.activateProfile(value, true);

					expect(Settings.activateProfile).toHaveBeenCalledWith(value);
				});
		});
	});

	describe('no changes detected', () =>
	{
		test('WHEN ModuleManagement is not open THEN does not create new ConfirmActivateProfileForm', () =>
		{
			ProfileInteractions.activateProfile(DEFAULT_PROFILE_NAME);

			expect(ConfirmActivateProfileForm).toHaveBeenCalledTimes(0);
		});

		test.each(Constants.AllModuleProfileNamesTestCases)
			('WHEN ModuleManagement is not open THEN calls Settings.activateProfile with profile name: %s', (value) =>
			{
				ProfileInteractions.activateProfile(value);

				expect(Settings.activateProfile).toHaveBeenCalledWith(value);
			});

		test('WHEN ModuleManagement is open but no changes detected THEN does not create new ConfirmActivateProfileForm', () =>
		{
			ModuleManagementScripts.isModuleManagementWindowOpen.mockReturnValue(true);
			Settings.getActiveProfile.mockReturnValue(DEFAULT_PROFILE);

			ProfileInteractions.activateProfile(DEFAULT_PROFILE_NAME);

			expect(ConfirmActivateProfileForm).toHaveBeenCalledTimes(0);
		});

		test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
			('WHEN ModuleManagement is open but no changes detected THEN calls Settings.activateProfile with profile name: %s', (value) =>
			{
				ModuleManagementScripts.isModuleManagementWindowOpen.mockReturnValue(true);
				Settings.getActiveProfile.mockReturnValue(DEFAULT_PROFILE);

				ProfileInteractions.activateProfile(value);

				expect(Settings.activateProfile).toHaveBeenCalledWith(value);
			});
	});
});

describe('createProfile', () =>
{
	// TODO - implement this somehow?
	// test('WHEN element does not exist with id "moduleProfilesCreateNewProfileSubmit" THEN throws Error and calls ui.notifications.error', () =>
	// {
	// 	addElementWith('input', 'moduleProfilesCreateNewProfileName');
	//
	// 	createModuleProfileForm.activateListeners();
	//
	// 	const functionCall = () => createModuleProfileForm.activateListeners();
	//
	// 	expect(functionCall).toThrow(Error);
	// 	expect(ui.notifications.error).toHaveBeenCalledWith('Unable to create module profile. Please close the window and try again.');
	// 	expect(functionCall).toThrow(`Unable to create module profile. Please close the window and try again.`);
	// });
	//
	// test('WHEN element does not exist with id "moduleProfilesCreateNewProfileName" THEN throws Error and calls ui.notifications.error', () =>
	// {
	// 	addElementWith('button', 'moduleProfilesCreateNewProfileSubmit');
	//
	// 	createModuleProfileForm.activateListeners();
	//
	// 	const functionCall = () => createModuleProfileForm.activateListeners();
	//
	// 	expect(functionCall).toThrow(Error);
	// 	expect(ui.notifications.error).toHaveBeenCalledWith('Unable to create module profile. Please close the window and try again.');
	// 	expect(functionCall).toThrow(`Unable to create module profile. Please close the window and try again.`);
	// });
	//
	// function addElementWith(tagName, id)
	// {
	// 	const element = document.createElement(tagName);
	// 	element.id = id;
	// 	document.body.append(element);
	//
	// 	return element;
	// }
});