beforeEach(() =>
{
});

afterEach(() =>
{
	document.body.innerHTML = '';
	game.modules = new Map();
	JSON.parse = jest.fn();
});