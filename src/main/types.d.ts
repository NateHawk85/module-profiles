interface ModuleProfile
{
	name: string,
	description: string,
	modules: ModuleInfo[]
}

interface ModuleInfo
{

	id: string,
	title?: string,
	isActive: boolean
}
