import * as DataMigration from '../../main/scripts/data-migration';
import * as MockedSettingsUtils from '../../main/scripts/settings-utils';
import {when} from 'jest-when';
import {DEFAULT_DATA_VERSION} from '../config/constants';

const LATEST_DATA_VERSION = 1;
const MIGRATING_KEY = 'MODULE_PROFILES.DATA_MIGRATION.migrating';
const MIGRATING_MESSAGE = 'Migrating...';
const MIGRATION_SUCCESSFUL_KEY = 'MODULE_PROFILES.DATA_MIGRATION.migrationSuccessful';
const MIGRATION_SUCCESSFUL_MESSAGE = 'Migration successful!';

jest.mock('../../main/scripts/settings-utils');
const SettingsUtils = jest.mocked(MockedSettingsUtils, true);

describe('checkToMigrateData', () =>
{
	test.each(Array.from(Array(LATEST_DATA_VERSION).keys()))
		('WHEN the data version is not the latest version THEN calls DataMigration.migrateData with saved data version: %s', (value) =>
		{
			SettingsUtils.getDataVersion.mockReturnValue(value);
			const migrateDataSpy = jest.spyOn(DataMigration, 'migrateData');

			DataMigration.checkToMigrateData();

			expect(migrateDataSpy).toHaveBeenCalledWith(value);
		});

	test('WHEN the data version is the latest version THEN does not call DataMigration.migrateData', () =>
	{
		SettingsUtils.getDataVersion.mockReturnValue(LATEST_DATA_VERSION);
		const migrateDataSpy = jest.spyOn(DataMigration, 'migrateData');

		DataMigration.checkToMigrateData();

		expect(migrateDataSpy).toHaveBeenCalledTimes(0);
	});
});

describe('migrateData', () =>
{
	beforeEach(() =>
	{
		when(game.i18n.localize).calledWith(MIGRATING_KEY).mockReturnValue(MIGRATING_MESSAGE);
		when(game.i18n.localize).calledWith(MIGRATION_SUCCESSFUL_KEY).mockReturnValue(MIGRATION_SUCCESSFUL_MESSAGE);
	});

	test.each([MIGRATING_MESSAGE, 'Another migration message'])
		('WHEN called THEN calls ui.notifications.info with data migration message: %s', (value) =>
		{
			when(game.i18n.localize).calledWith(MIGRATING_KEY).mockReturnValue(value);

			DataMigration.migrateData(DEFAULT_DATA_VERSION);

			expect(ui.notifications.info).toHaveBeenCalledWith(value);
		});

	test.each([MIGRATION_SUCCESSFUL_MESSAGE, 'Another successful migration message'])
		('WHEN called THEN calls ui.notifications.info with data migration successful message: %s', (value) =>
		{
			when(game.i18n.localize).calledWith(MIGRATION_SUCCESSFUL_KEY).mockReturnValue(value);

			DataMigration.migrateData(DEFAULT_DATA_VERSION);

			expect(ui.notifications.info).toHaveBeenCalledWith(value);
		});

	test('WHEN game.settings.get returns a data version of 0 THEN calls DataMigration.migrate0To1', () =>
	{
		const migrate0To1Spy = jest.spyOn(DataMigration, 'migrate0To1');

		DataMigration.migrateData(0);

		expect(migrate0To1Spy).toHaveBeenCalled();
	});

	test.each(Array.from(Array(LATEST_DATA_VERSION + 1).keys()).filter(number => number !== 0))
		('WHEN game.settings.get does not return a data version of 0 THEN DataMigration.migrate0To1 does not get called: %s', (value) =>
		{
			const migrate0To1Spy = jest.spyOn(DataMigration, 'migrate0To1');

			DataMigration.migrateData(value);

			expect(migrate0To1Spy).toHaveBeenCalledTimes(0);
		});
});

describe('migrate0To1', () =>
{
	// TODO
});