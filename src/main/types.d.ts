import Setting from './classes/Setting';

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
	settings?: Setting[] // TODO - will not be optional
}