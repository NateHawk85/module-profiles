interface ModuleProfile
{
	name: string,
	modules: ModuleInfo[]
}

interface ModuleInfo
{
	key: string,
	title: string,
	isActive: boolean
}