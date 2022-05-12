## What technologies/frameworks does this use?

- Javascript
- Typescript
- Webpack
- Jest

## Can I work with this functionality in my own modules?

Of course! [Here's a link to the API docs.](https://github.com/NateHawk85/module-profiles/blob/master/api.md)

## I want to work on this module. What do I need to know?

This project uses Node/npm. Everything else should "just work". To start out, run `npm install` to set up your `node_modules` folder, then run `npm run build`
to tell Webpack to compile your stuff over to the `/dist` folder. From there, copy the contents of the `/dist` folder and place
them in `${FOUNDRY_INSTALL_LOCATION}/data/modules/module-profiles`. If everything's perfect, it should look something like this

![](https://github.com/NateHawk85/module-profiles/blob/master/misc/media/dev-setup.png)

If you want to be cool, there's a faster way to package your stuff up as well. This module implements the hot reload functionality from 
[Blackcloud's Module Template Hotswap](https://github.com/Blackcloud010/FoundryVTT-Module-Template-Hotswap). To make changes to this module with hot swap 
enabled, create a symlink between your `/dist` folder and your `${FOUNDRY_INSTALL_LOCATION}/data/modules/module-profiles` folder. Then, run `npm run start` to 
run this project with hot reload functionality. Every time you save your project while that's running, your `/dist` folder should be automatically updated, and
therefore, your `module-profiles` folder as well.

## I did some stuff! I want to make a pull request!

Nice! Thanks for your hard work. Pull requests are absolutely welcome and encouraged. Make sure your stuff is unit tested ahead of submitting the PR - anything
without corresponding tests will be rejected.