import {DEFAULT_FOUNDRY_10_VERSION} from './constants';

beforeEach(() =>
{
});

afterEach(() =>
{
	document.body.innerHTML = '';
	game.modules = new Map();
	// @ts-ignore - Mocking for Foundry
	game.version = DEFAULT_FOUNDRY_10_VERSION;
	JSON.parse = jest.fn();
});