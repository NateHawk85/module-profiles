import * as ProfileInteractions from '../../../js/scripts/profile-interactions.js';
import * as Settings from '../../../js/scripts/settings.js';
import * as ModuleManagementScripts from '../../../js/scripts/ui/module-management.js';
import ConfirmActivateProfileForm from '../../../js/classes/ConfirmActivateProfileForm.js';
import {DEFAULT_PROFILE_NAME} from '../../config/constants.js';
import {when} from 'jest-when';

jest.mock('../../../js/scripts/settings.js');
jest.mock('../../../js/scripts/ui/module-management.js');
jest.mock('../../../js/classes/ConfirmActivateProfileForm.js');

describe('activateProfile', () =>
{
	describe('profileName does not exist', () =>
	{
		test('WHEN profileName is undefined on event.currentTarget.dataset THEN throws Error and calls ui.notifications.error', () =>
		{
			const functionCall = () => ProfileInteractions.activateProfile(undefined);

			expect(functionCall).toThrow(Error);
			expect(ui.notifications.error).toHaveBeenCalledWith('Unable to activate profile. Profile name undefined.');
			expect(functionCall).toThrow(`Unable to activate profile. Profile name undefined.`);
		});
	});

	describe('changes detected', () =>
	{
		test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
			('WHEN ModuleManagement is open and changes detected THEN creates new LoadProfileConfirmationForm and calls render on it: %s', (value) =>
			{
				ModuleManagementScripts.isModuleManagementWindowOpen.mockReturnValue(true);
				when(ModuleManagementScripts.unsavedChangesExistOn).calledWith(value).mockReturnValue(true);

				ProfileInteractions.activateProfile(value);

				expect(ConfirmActivateProfileForm).toHaveBeenCalledTimes(1);
				expect(ConfirmActivateProfileForm).toHaveBeenCalledWith(value);

				const instance = ConfirmActivateProfileForm.mock.instances[0];
				expect(instance.render).toHaveBeenCalledWith(true);
			});

		test('WHEN ModuleManagement is open and changes detected THEN does not call Settings.loadProfile', () =>
		{
			ModuleManagementScripts.isModuleManagementWindowOpen.mockReturnValue(true);
			when(ModuleManagementScripts.unsavedChangesExistOn).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(true);

			ProfileInteractions.activateProfile(DEFAULT_PROFILE_NAME);

			expect(Settings.activateProfile).toHaveBeenCalledTimes(0);
		});

		describe('shouldForce', () =>
		{
			test('WHEN shouldForce and ModuleManagement has changes THEN does not create new LoadProfileConfirmationForm', () =>
			{
				ModuleManagementScripts.isModuleManagementWindowOpen.mockReturnValue(true);
				when(ModuleManagementScripts.unsavedChangesExistOn).calledWith(DEFAULT_PROFILE_NAME).mockReturnValue(true);

				ProfileInteractions.activateProfile(DEFAULT_PROFILE_NAME, true);

				expect(ConfirmActivateProfileForm).toHaveBeenCalledTimes(0);
			});

			test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
				('WHEN shouldForce and ModuleManagement has changes THEN calls Settings.loadProfile with profile name: %s', (value) =>
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
		test('WHEN ModuleManagement is not open THEN does not create new LoadProfileConfirmationForm', () =>
		{
			ProfileInteractions.activateProfile(DEFAULT_PROFILE_NAME);

			expect(ConfirmActivateProfileForm).toHaveBeenCalledTimes(0);
		});

		test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
			('WHEN ModuleManagement is not open THEN calls Settings.loadProfile with profile name: %s', (value) =>
			{
				ProfileInteractions.activateProfile(value);

				expect(Settings.activateProfile).toHaveBeenCalledWith(value);
			});

		test('WHEN ModuleManagement is open but no changes detected THEN does not create new LoadProfileConfirmationForm', () =>
		{
			ModuleManagementScripts.isModuleManagementWindowOpen.mockReturnValue(true);

			ProfileInteractions.activateProfile(DEFAULT_PROFILE_NAME);

			expect(ConfirmActivateProfileForm).toHaveBeenCalledTimes(0);
		});

		test.each([DEFAULT_PROFILE_NAME, 'A Different Profile Name'])
			('WHEN ModuleManagement is open but no changes detected THEN calls Settings.loadProfile with profile name: %s', (value) =>
			{
				ModuleManagementScripts.isModuleManagementWindowOpen.mockReturnValue(true);

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