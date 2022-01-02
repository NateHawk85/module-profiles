import Settings from "./Settings.js";

Hooks.once('init', () => {
    new Settings().registerSettings();
});