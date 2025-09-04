import * as SettingsUtils from './settings-utils';

type MigrationScriptWithVersionInfo = {
	version: SettingsUtils.SettingsDataVersion;
	migrate: () => Promise<void>;
	rollback: () => Promise<void>;
}

type StructuredDataVersion = { major: number; minor: number; patch: number };

export async function migrate(): Promise<void>
{
	const savedDataVersion = SettingsUtils.getSettingsDataVersion();
	// @ts-expect-error - Correct way to grab version info in v13+
	const currentDataVersion = game.modules.get(SettingsUtils.MODULE_ID)?.version;

	if (
		!isSettingsDataVersion(savedDataVersion) ||
		!isSettingsDataVersion(currentDataVersion) ||
		savedDataVersion === currentDataVersion
	)
	{
		console.debug(`Module Profiles: No migration necessary`, savedDataVersion, currentDataVersion);
		return;
	}

	if (savedDataVersion === '0.0.0')
	{
		const message = `Module Profiles: Migrating to newest data format...`;
		console.log(message);
		ui.notifications.info(message);
	} else
	{
		const message = `Module Profiles: Migrating v${savedDataVersion} -> v${currentDataVersion}`;
		console.log(message);
		ui.notifications.info(message);
	}

	const structuredSavedVersion = toStructuredVersion(savedDataVersion);
	const structuredCurrentVersion = toStructuredVersion(currentDataVersion);

	const migrationScripts = getApplicableMigrationScripts(structuredSavedVersion, structuredCurrentVersion);
	console.log(
		`Module Profiles: Migrating ${migrationScripts.length} script(s):`,
		migrationScripts.map(script => script.version).join(', '),
	);

	const isRollbackScenario = isFirstGreaterThan(structuredSavedVersion, structuredCurrentVersion);

	const errors = [];
	for (const script of migrationScripts)
	{
		if (errors.length > 0)
		{
			continue;
		}

		if (isRollbackScenario)
		{
			try
			{
				await script.rollback();
				console.log(`Module Profiles: Migration ${script.version} was successful`);
			} catch (e)
			{
				console.error(`Module Profiles: Migration ${script.version} failed:`, e);
				errors.push(e);
			}
		} else
		{
			try
			{
				await script.migrate();
				console.log(`Module Profiles: Migration ${script.version} was successful`);
			} catch (e)
			{
				console.error(`Module Profiles: Migration ${script.version} failed:`, e);
				errors.push(e);
			}
		}

		if (errors.length === 0)
		{
			await SettingsUtils.setSettingsDataVersion(script.version);
		}
	}

	if (errors.length === 0)
	{
		await SettingsUtils.setSettingsDataVersion(currentDataVersion);
		ui.notifications.info(`Module Profiles: Migration to v${currentDataVersion} was successful`);
	} else
	{
		ui.notifications.error(`Module Profiles: Migration to v${currentDataVersion} failed, check console for details`);
	}

}

function toStructuredVersion(version: SettingsUtils.SettingsDataVersion): StructuredDataVersion
{
	const [major, minor, patch] = version.split('.');

	return {
		major: Number(major.replace(/\D/g, '')),
		minor: Number(minor.replace(/\D/g, '')),
		patch: Number(patch.replace(/\D/g, '')),
	};
}

/**
 * Migration scripts processed in-order (or reverse-order for rollbacks).
 */
const MIGRATIONS: MigrationScriptWithVersionInfo[] = [
	{
		version: '1.1.0',
		migrate: async () =>
		{
			const profiles = SettingsUtils.getProfiles();

			const newProfiles = profiles.map(profile => ({
				// @ts-expect-error - If `description` already exists, retain it
				description: '',
				...profile,
			}));

			await SettingsUtils.setProfiles(newProfiles);
		},
		rollback: async () =>
		{
			// An extra "description" field doesn't hurt anything
		},
	},
];

function getApplicableMigrationScripts(
	fromVersion: StructuredDataVersion,
	toVersion: StructuredDataVersion,
): MigrationScriptWithVersionInfo[]
{
	const isRollbackScenario = isFirstGreaterThan(fromVersion, toVersion);
	if (isRollbackScenario)
	{
		return [...MIGRATIONS].reverse().filter(migration =>
		{
			const migrationVersion = toStructuredVersion(migration.version);

			const isGreaterThanOrEqualToLowerBound = !isFirstGreaterThan(toVersion, migrationVersion);
			const isLessThanUpperBound = isFirstGreaterThan(fromVersion, migrationVersion);

			return isGreaterThanOrEqualToLowerBound && isLessThanUpperBound;
		});
	}

	return MIGRATIONS.filter(migration =>
	{
		const migrationVersion = toStructuredVersion(migration.version);

		const isGreaterThanLowerBound = isFirstGreaterThan(migrationVersion, fromVersion);
		const isLessThanOrEqualToUpperBound = !isFirstGreaterThan(migrationVersion, toVersion);

		return isGreaterThanLowerBound && isLessThanOrEqualToUpperBound;
	});
}

/**
 * Returns `true` when the first version is higher than the second version, `false` when less than or equal to.
 */
function isFirstGreaterThan(firstVersion: StructuredDataVersion, secondVersion: StructuredDataVersion): boolean
{
	if (firstVersion.major > secondVersion.major)
	{
		return true;
	}
	if (firstVersion.major < secondVersion.major)
	{
		return false;
	}

	if (firstVersion.minor > secondVersion.minor)
	{
		return true;
	}
	if (firstVersion.minor < secondVersion.minor)
	{
		return false;
	}

	return firstVersion.patch > secondVersion.patch;
}

function isSettingsDataVersion(val: unknown): val is SettingsUtils.SettingsDataVersion
{
	if (val == null || typeof val !== 'string')
	{
		return false;
	}

	const subVersions = val.split('.');

	return subVersions.length === 3;
}
