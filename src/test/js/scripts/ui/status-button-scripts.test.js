import * as StatusButtonScripts from '../../../../js/scripts/ui/status-button-scripts.js';

describe('refreshStatusIcons', () =>
{
	test('WHEN app template is not "templates/hud/dialog.html" THEN does nothing', () =>
	{
		const app = {
			options: {
				template: 'not-templates/hud/dialog.html'
			}
		};

		StatusButtonScripts.refreshStatusIcons(app);

		// TODO - verify nothing happened
	});

	test('WHEN app template is "templates/hud/dialog.html" THEN refreshes status buttons', () =>
	{
		const app = {
			options: {
				template: 'templates/hud/dialog.html'
			}
		};

		StatusButtonScripts.refreshStatusIcons(app);

		// TODO - verify something happened
	});
});