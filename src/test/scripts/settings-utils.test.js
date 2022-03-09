import * as SettingsUtils from '../../scripts/settings-utils.js';
import {when} from 'jest-when';

const MODULE_NAME = 'module-profiles';

describe('getSetting', () =>
{
	test.each(['key', 'a different key'])
		('WHEN called THEN calls game.settings.get: %s', (value) =>
		{
			SettingsUtils.getSetting(value);

			expect(game.settings.get).toHaveBeenCalledWith(MODULE_NAME, value);
		});

	test.each(['a setting value', {hey: 'another object setting value'}])
		('WHEN called THEN returns what game.settings.get returns: %s', (value) =>
		{
			when(game.settings.get).calledWith(MODULE_NAME, 'key').mockReturnValue(value);

			expect(SettingsUtils.getSetting('key')).toStrictEqual(value);
		});
});

describe('setSetting', () =>
{
	test.each([
		['aKey', 'a value'],
		['aDifferentKey', 99]
	])
		('WHEN called THEN calls game.settings.set: %s', (key, value) =>
		{
			SettingsUtils.setSetting(key, value);

			expect(game.settings.set).toHaveBeenCalledWith(MODULE_NAME, key, value);
		});

	test.each(['a value', 'another value'])
		('WHEN called THEN returns what game.settings.set returns: %s', (value) =>
		{
			when(game.settings.set).calledWith(MODULE_NAME, 'key', 'value').mockReturnValue(value);

			expect(SettingsUtils.setSetting('key', 'value')).toStrictEqual(value);
		});
});

describe('registerSetting', () =>
{
	test.each([
		[
			'aKey',
			{
				name: 'Register a Module Setting with a Range slider',
				hint: 'A description of the registered setting and its behavior.',
				scope: 'world',
				config: true,
				type: Number,
				range: {
					min: 0,
					max: 100,
					step: 10
				},
				default: 50,
				onChange: value =>
				{
					console.log(value)
				}
			}
		],
		[
			'aDifferentKey',
			{
				name: 'Name',
				default: 'Name',
				type: String,
				scope: 'client'
			}
		]
	])
		('WHEN called THEN calls game.settings.register: %s', (key, configuration) =>
		{
			SettingsUtils.registerSetting(key, configuration);

			expect(game.settings.register).toHaveBeenCalledWith(MODULE_NAME, key, configuration);
		});
});

describe('registerMenu', () =>
{
	test.each([
		[
			'aKey',
			{
				name: 'name',
				label: 'label',
				hint: 'hint',
				icon: 'icon',
				type: undefined,
				restricted: false
			}
		],
		[
			'aDifferentKey',
			{
				name: 'a different name',
				label: 'a different label',
				hint: 'a different hint',
				icon: 'a different icon',
				type: null,
				restricted: true
			}
		]
	])
		('WHEN called THEN calls game.settings.registerMenu: %s', (key, configuration) =>
		{
			SettingsUtils.registerMenu(key, configuration);

			expect(game.settings.registerMenu).toHaveBeenCalledWith(MODULE_NAME, key, configuration);
		});
});

describe('registerAPI', () =>
{
	test.each([
		{name: undefined, exampleCall: () => console.log('Hello!')},
		{exampleCall: () => {}, name: () => console.log('Another function!')},
	])
		('WHEN called THEN registers the API under the module\'s ID: %s', (value) =>
		{
			const mockAPI = {
				api: jest.fn()
			};
			when(game.modules.get).calledWith(MODULE_NAME).mockReturnValue(mockAPI);

			SettingsUtils.registerAPI(value);

			expect(game.modules.get(MODULE_NAME).api).toStrictEqual(value);
		});
});