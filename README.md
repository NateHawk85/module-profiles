A module for FoundryVTT that allows for swapping between multiple customizable module profiles.

## TODO
- Import/export
- Localization
- Make sure that when a new module is added to the world, make sure that either a) gets added to the list of modules on the profile, or b) represent that it doesn't exist for that profile. Show it on the frontend somehow

# Development
This module implements the hot reload functionality from https://github.com/Blackcloud010/FoundryVTT-Module-Template-Hotswap. To make changes to this module
with hot swap enabled, create a symlink between your `${THIS_PROJECT_INSTALL_LOCATION}/dist` folder and your 
`${FOUNDRY_INSTALL_LOCATION}/data/modules/module-profiles` folder. Then, run `npm run start` to run this project with hot reload functionality.