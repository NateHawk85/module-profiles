export function migrateData()
{
	const dataVersion = game.settings.get('module-profiles', 'dataVersion');
	ui.notifications.info('DATA VERSION: ' + dataVersion);
	game.settings.set('module-profiles', 'dataVersion', 1);
	return null;
	// TODO - implement correctly
}