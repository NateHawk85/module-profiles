import * as Settings from './settings';

/**
 * Maps an array of ModuleInfo objects into a Record, identical to how the core module configuration stores which modules are active and which aren't.
 * @param {ModuleInfo[]} moduleInfos
 * @return {Record<string, boolean>} - The corresponding Record representation of the inputted data.
 */
export function mapToModuleKeyIsActiveRecord(moduleInfos: ModuleInfo[]): Record<string, boolean>
{
	const record: Record<string, boolean> = {};
	moduleInfos.forEach(module => record[module.id] = module.isActive);

	return record;
}

/**
 * Maps a Record into an array of matching ModuleInfo objects stored in the game settings.
 * @param {Record<string, boolean>} moduleIDIsActiveRecord
 * @return {ModuleInfo[]} - The corresponding array of ModuleInfo objects based on the inputted data.
 */
export function mapToModuleInfos(moduleIDIsActiveRecord: Record<string, boolean>): ModuleInfo[]
{
	const moduleInfos: ModuleInfo[] = [];

	Object.entries(moduleIDIsActiveRecord).forEach(([ key, value ]) =>
	{
		moduleInfos.push({
			id: key,
			title: findModuleTitleFromModuleId(key),
			isActive: value,
		});
	});

	moduleInfos.sort((a, b) =>
	{
		if (!a.title)
		{
			return 1;
		}
		if (!b.title)
		{
			return -1;
		}
		return a.title.localeCompare(b.title);
	});

	return moduleInfos;
}

function findModuleTitleFromModuleId(moduleId: string): string | undefined
{
	const foundryVersion = Settings.getFoundryVersion();
	if (foundryVersion === Settings.FoundryVersion.v12)
	{
		// @ts-expect-error - Title is inlined in the module object in v12
		return game.modules.get(moduleId)?.title;
	}

	return game.modules.get(moduleId)?.data.title;
}