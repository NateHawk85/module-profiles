import fs from 'fs';
import path from 'path';
import * as Settings from '../../../scripts/settings.js';
import * as ModuleManagement from '../../../scripts/ui/module-management.js';
import {Profiles} from '../../mocks/profiles/profiles.js';

jest.mock('../../../scripts/settings.js', () => ({
	getActiveProfile: jest.fn()
}));

beforeEach(() =>
{
	game.user.isGM = true;
	Settings.getActiveProfile.mockReturnValue(Profiles.OnlyModuleProfilesEnabled);
});

// TODO - test better
describe('modifyModuleManagementRender', () =>
{
	const moduleManagementWindowHtml = fs.readFileSync(path.resolve(__dirname, '../../mocks/ui/moduleManagement.html'));

	beforeEach(() =>
	{
		document.body.innerHTML = moduleManagementWindowHtml.toString();
	});

	test('WHEN user is not GM THEN does nothing', () =>
	{
		game.user.isGM = false;

		ModuleManagement.modifyModuleManagementRender();

		expect(document.body.innerHTML).toMatchSnapshot();
	});

	test.each(Object.entries(Profiles))
		('WHEN user is GM THEN adds UI elements and matches snapshot for profile: %s', (profileName, profile) =>
		{
			Settings.getActiveProfile.mockReturnValue(profile);

			ModuleManagement.modifyModuleManagementRender();

			expect(document.body.innerHTML).toMatchSnapshot();
		});
});