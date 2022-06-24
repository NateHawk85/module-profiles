import * as DataMigration from './data-migration';
import * as SettingsUtils from '../../main/scripts/settings-utils';

const MIGRATING_KEY = 'MODULE_PROFILES.DATA_MIGRATION.migrating';
const MIGRATION_SUCCESSFUL_KEY = 'MODULE_PROFILES.DATA_MIGRATION.migrationSuccessful';
const LATEST_DATA_VERSION = 1;

export function checkToMigrateData()
{
	let dataVersion = SettingsUtils.getDataVersion();
	if (dataVersion !== LATEST_DATA_VERSION)
	{
		DataMigration.migrateData(dataVersion);
	}

	ui.notifications.info('DATA VERSION: ' + dataVersion);
	game.settings.set('module-profiles', 'dataVersion', 1);
	return null;
	// TODO - implement correctly from 0 - 1
}

export function migrateData(dataVersion: number)
{
	const dataMigrationMessage = game.i18n.localize(MIGRATING_KEY);
	ui.notifications.info(dataMigrationMessage);

	if (dataVersion === 0)
	{
		DataMigration.migrate0To1();
	}

	const dataMigrationSuccessfulMessage = game.i18n.localize(MIGRATION_SUCCESSFUL_KEY);
	ui.notifications.info(dataMigrationSuccessfulMessage);
}

/*
 Old data schema:

 interface ModuleProfile
 name: string,
 modules: ModuleInfo[]

 interface ModuleInfo
 id: string,
 title: string,
 isActive: boolean

 -------------------------

 New data schema:

 interface ModuleProfile
 name: string,
 modules: ModuleInfo[]

 interface ModuleInfo
 id: string,
 title: string,
 isActive: boolean,
 settings: Setting[]
 */
export function migrate0To1()
{
	// TODO - write migration
}