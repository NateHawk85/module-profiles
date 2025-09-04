export interface FoundryVersionStrategy {
	version: number;

	// Data
	getCurrentModuleConfiguration(): ModuleInfo[];
	findModuleTitleFromModuleId(moduleId: string): string | undefined;

	// Module Management
	getModuleListElements(): NodeListOf<HTMLLIElement>;
	getModuleListContainer(): Element;
	injectManagementFooter(moduleListContainer: Element, footer: Element): void;
}

function getCurrentModuleConfigurationV9(): ModuleInfo[]
{
	return Array.from(game.modules).map(([key, value]) => ({
		id: key,
		title: value.data.title,
		isActive: value.active,
	})).sort((a, b) => a.title.localeCompare(b.title));
}

function getModuleListElementsV9(): NodeListOf<HTMLLIElement>
{
	return document.querySelectorAll('#module-management li[data-module-name]');
}

function findModuleTitleFromModuleIdV9ToV11(moduleId: string): string | undefined
{
	return game.modules.get(moduleId)?.data.title;
}

function getCurrentModuleConfigurationV10Plus(): { id: any; title: any; isActive: any }[]
{
	return Array.from(game.modules).map(module => ({
		// @ts-expect-error - v10+ schema
		id: module.id,
		// @ts-expect-error - v10+ schema
		title: module.title,
		// @ts-expect-error - v10+ schema
		isActive: module.active,
	})).sort((a, b) => a.title.localeCompare(b.title));
}

function getModuleListElementsV10Plus(): NodeListOf<HTMLLIElement>
{
	return document.querySelectorAll('#module-management li[data-module-id]');
}

function findModuleTitleFromModuleIdV12Plus(moduleId: string): string | undefined {
	// @ts-expect-error - Title is inlined in the module object in v12
	return game.modules.get(moduleId)?.title;
}

function getModuleListContainerV9ToV12(): Element {
	return document.getElementById('module-list')!;
}

function getModuleListContainerV13Plus(): Element {
	return document.querySelector('.package-list')!;
}

function injectManagementFooterV9ToV12(moduleListContainer: Element, footer: Element): void {
	moduleListContainer.after(footer);
}

function injectManagementFooterV13Plus(moduleListContainer: Element, footer: Element): void {
	moduleListContainer.before(footer);
}

export const v9: FoundryVersionStrategy = {
	version: 9,
	getCurrentModuleConfiguration: getCurrentModuleConfigurationV9,
	findModuleTitleFromModuleId: findModuleTitleFromModuleIdV9ToV11,
	getModuleListElements: getModuleListElementsV9,
	getModuleListContainer: getModuleListContainerV9ToV12,
	injectManagementFooter: injectManagementFooterV9ToV12,
};

export const v10: FoundryVersionStrategy = {
	version: 10,
	getCurrentModuleConfiguration: getCurrentModuleConfigurationV10Plus,
	findModuleTitleFromModuleId: findModuleTitleFromModuleIdV9ToV11,
	getModuleListElements: getModuleListElementsV10Plus,
	getModuleListContainer: getModuleListContainerV9ToV12,
	injectManagementFooter: injectManagementFooterV9ToV12,
};

export const v11: FoundryVersionStrategy = {
	version: 11,
	getCurrentModuleConfiguration: getCurrentModuleConfigurationV10Plus,
	findModuleTitleFromModuleId: findModuleTitleFromModuleIdV9ToV11,
	getModuleListElements: getModuleListElementsV10Plus,
	getModuleListContainer: getModuleListContainerV9ToV12,
	injectManagementFooter: injectManagementFooterV9ToV12,
};

export const v12: FoundryVersionStrategy = {
	version: 12,
	getCurrentModuleConfiguration: getCurrentModuleConfigurationV10Plus,
	findModuleTitleFromModuleId: findModuleTitleFromModuleIdV12Plus,
	getModuleListElements: getModuleListElementsV10Plus,
	getModuleListContainer: getModuleListContainerV9ToV12,
	injectManagementFooter: injectManagementFooterV9ToV12,
};

export const v13: FoundryVersionStrategy = {
	version: 13,
	getCurrentModuleConfiguration: getCurrentModuleConfigurationV10Plus,
	findModuleTitleFromModuleId: findModuleTitleFromModuleIdV12Plus,
	getModuleListElements: getModuleListElementsV10Plus,
	getModuleListContainer: getModuleListContainerV13Plus,
	injectManagementFooter: injectManagementFooterV13Plus,
};
