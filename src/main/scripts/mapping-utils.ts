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

function findModuleTitleFromModuleId(moduleId: string): string | undefined {
  const mod = game.modules.get(moduleId);
  if (!mod) return undefined;

  const version = Settings.getFoundryVersion();
  if (version === Settings.FoundryVersion.v12 || version === Settings.FoundryVersion.v13) {
    // @ts-expect-error - Title is an inline property in v12+ 
   return mod.title;
  }

  // v9–v11 retained title under .data
  return mod.data.title;
}