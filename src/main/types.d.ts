interface ModuleProfile
{
	name: string,
	modules: ModuleInfo[]
}

interface ModuleInfo
{
	id: string,
	title?: string,
	isActive: boolean
}