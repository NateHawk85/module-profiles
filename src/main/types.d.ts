/**
 * A representation of a module profile configuration.
 * @property {string} name
 * @property {ModuleInfo[]} modules - An Array of ModuleInfo objects that are saved to this profile.
 */
interface ModuleProfile
{
	name: string,
	modules: ModuleInfo[]
}

/**
 * A representation of an installed module, and the surrounding information about it.
 * @property {string} id - The ID of the module in Foundry's internals.
 * @property {string | undefined} title - (Optional) The Title of the module, most-often shown in the "Module Management" configuration list.
 * @property {boolean} isActive - Whether the given module is active or not.
 */
interface ModuleInfo
{

	id: string,
	title?: string,
	isActive: boolean
}