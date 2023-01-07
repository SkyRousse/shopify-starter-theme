# Shopify Theme Development Workflow

- [Shopify Theme Development Workflow](#shopify-theme-development-workflow)
  - [Overview](#overview)
  - [Dev Tools](#dev-tools)
  - [Setup](#setup)
    - [Store Settings](#store-settings)
      - [.env vars](#env-vars)
  - [Connecting to the Stores](#connecting-to-the-stores)
    - [Login to your Shopify account](#login-to-your-shopify-account)
    - [Login to the Store](#login-to-the-store)
    - [Verify you're logged into the correct store](#verify-youre-logged-into-the-correct-store)
  - [Workflows](#workflows)
    - [The Development Store to Production Store Workflow (recommended for any feature development that could break the live site)](#the-development-store-to-production-store-workflow-recommended-for-any-feature-development-that-could-break-the-live-site)
    - [Production Store Workflow](#production-store-workflow)
    - [Content Updates Workflow](#content-updates-workflow)
  - [Workflow Commands](#workflow-commands)
    - [Login](#login)
    - [Dev](#dev)
    - [Pushing and Pulling files from Themes](#pushing-and-pulling-files-from-themes)
      - [github integration](#github-integration)
    - [Syncing Themes with the Shopify CLI](#syncing-themes-with-the-shopify-cli)
      - [Theme Pull](#theme-pull)
      - [Theme Push](#theme-push)
    - [Build](#build)
  - [Contributing](#contributing)
    - [Branches](#branches)
    - [gitflow](#gitflow)
    - [themes](#themes)
      - [Development themes](#development-themes)
    - [Pull Requests](#pull-requests)
  - [Naming Conventions / Styleguide](#naming-conventions--styleguide)
  - [File Organization](#file-organization)
    - [Liquid files](#liquid-files)
    - [Admin Snippets](#admin-snippets)
    - [Source files](#source-files)
      - [JS, CSS, and SVG working files go in the `/source` folder](#js-css-and-svg-working-files-go-in-the-source-folder)
      - [SVGs](#svgs)
    - [Build Config](#build-config)
    - [Entry points](#entry-points)
    - [Linting](#linting)
      - [Linting Tools](#linting-tools)
      - [CLI AutoFormatting](#cli-autoformatting)
        - [Run all linters](#run-all-linters)
        - [eslint](#eslint)
        - [stylelint](#stylelint)
        - [theme check](#theme-check)
    - [Github Actions](#github-actions)
      - [Setting up Shopify Lighthouse CI GitHub Action](#setting-up-shopify-lighthouse-ci-github-action)
      - [Linting Github Action](#linting-github-action)
  - [Resources](#resources)
    - [Shopify Resources](#shopify-resources)
    - [esbuild](#esbuild)
    - [Resources from original theme scaffold](#resources-from-original-theme-scaffold)
    - [postcss](#postcss)

## Overview

This workflow is setup to handle a 2 store setup: a development store for feature development & testing and a production store for staging and production. The workflow is using the [Shopify CLI V3](https://shopify.dev/themes/tools/cli) and [esbuild](https://esbuild.github.io/) is the build tool for code bundling.

## Dev Tools

- Node 16+
- A Package Manager - [NPM](https://www.npmjs.com/) & [NVM](https://github.com/nvm-sh/nvm) recommended

- [Shopify CLI](https://shopify.dev/themes/tools/cli)

  - provides commands for creating, publishing, deleting themes as well as launching a development server for local theme development
  - [installation guide](https://shopify.dev/themes/tools/cli/install)

- [VSCode](https://code.visualstudio.com/) recommended (but not required) editor for working with this project.
  - [recommended VS Code extensions](/.vscode/extensions.json)
  - [settings](.vscode/settings.json)

## Setup

Once you've installed all the needed [dev tools](#dev-tools) follow these steps to get started

```sh
npm install
```

### Store Settings

A post-install script will be automatically run after the install step above. It will create a [.env](./.env) file with variables that are needed to successfully connect to the 2 stores used in this workflow. Once created, open the file and set the the following values.

#### .env vars

```
STORE_NAME=storeName-production.myshopify.com
DEV_STORE_NAME=storeName-development.myshopify.com
NODE_ENV=
```

## Connecting to the Stores

### Login to your Shopify account

**As a first step always make sure you have logged into your [Shopify account](https://accounts.shopify.com/login)** that has the correct permissions granted to access these stores. If you haven't logged in recently make sure to do so as the secure connection required by the CLI does not currently work unless you have an active login session and there's currently no clear error messages indicating such by the CLI.

### Login to the Store

To set the store you want to connect to set the `NODE_ENV` value to either: `development` or `production`

Alternatively you can run the following script to quickly switch between stores:

```sh
npm run set-store
```

This script will prompt you to select the store you want to connect to and then list out the themes connected to that store.

### Verify you're logged into the correct store

to verify that you are logged into the correct store you can run the following command at any time

```sh
shopify theme info
```

## Workflows

Once you've finished [setup](#setup) for the project, you can begin development.

**It is recommended that the following branches be connected to the corresponding themes via the [github integration](#github-integration)**

| Branch  | Theme      |
| ------- | ---------- |
| develop | Staging    |
| main    | Production |

### The Development Store to Production Store Workflow (recommended for any feature development that could break the live site)

**Note, when using this workflow it's important to keep the stores in sync as much as possible -- menus, files, content, code, apps, scripts, discounts, etc.**

1. [Login](#login) to the Development store
2. [Branch off of `develop`](#branches) (following branching strategies)
3. PR into `develop` (needs at least 1 approval from a team lead)
   - Make sure to connect your branch to a theme via the github integration for QA/Review
4. PR from `develop` to `main` (to be performed by team lead)

If the development store is is not well suited to what you're working on or changes are time sensitive an alternative approach is to bypass using the development store and use the [Production Store Workflow](#production-stores-workflow)

### Production Store Workflow

Follow the same workflow as [The Development Store to Production Stores Workflow](#the-development-store-to-production-stores-workflow-recommended) **_except_** in step 1 you login to the production store

### Content Updates Workflow

Ideally all content updates will flow in the same order as outlined in [The Development Store to Production Stores Workflow](#the-development-store-to-production-stores-workflow-recommended) or the [Production Stores Workflow](#production-stores-workflow).

When only updating content i.e. no associated code changes those updates can be made directly to the staging theme and once approved PR'd into production.

**IMPORTANT**, because the staging theme is connected to the develop branch via the github integration, updates will be auto-committed. Thus, it's important that these changes should be only for updates intended to be moved into production. If someone needs a place to test out content updates a new theme should be created for them and connected to a new branch off of the develop branch.

This is not generally recommended but if/when content updates are made directly to the live theme (most likely by non developers using the Shopify store admin) the content should flow back via PRs from `main` to `develop`

## Workflow Commands

To connect to the store & start the local dev server run:

```sh
npm start
```

Alternatively, you can also independently run the following commands:

### Login

Login to the store using the current [`NODE_ENV`](#switching-stores):

```sh
npm run login
```

### Dev

Start local development in watch mode:

```sh
npm run dev
```

### Pushing and Pulling files from Themes

#### github integration

It is strongly recommended that all theme dev use the [github integration](https://shopify.dev/themes/tools/github).

Once the github integration has been successfully setup it will allow you to connect branches to themes and sync changes in both directions. So changes made via the Shopify admin in those themes will be auto-committed by a shopify-bot to your branch and pushes from your local development environment to github will trigger an auto sync of files to that theme in shopify. When using this technique it is best to only make code changes in you local dev environment and to make content changes via the Customizer in the Shopify admin

### Syncing Themes with the Shopify CLI

**IMPORTANT** pulling files using the Shopify CLI is not generally recommended when using the [github integration](#github-integration). However, if you're working from a development theme and want to incorporate the json updates associated with content changes it can be useful to pull down the changes made to those files which are not automatically synced down

Warning, be careful using shopify theme pull without the `--only` and `no-delete` flags as it will delete all local files not matching the [theme architecture](https://shopify.dev/themes/architecture)

#### Theme Pull

Pull changes made in theme editor:

```sh
npm run theme-pull <templates/exampleFile.json>
```

**_Note_** this command is just an alias with set flags for `shopify theme pull` [visit docs](https://shopify.dev/themes/tools/cli/commands#pull) see all the available options.

#### Theme Push

```sh
npm run theme-push <ThemeName>
```

**_Note_** this command is just an alias with set flags for `shopify theme push` [visit docs](https://shopify.dev/themes/tools/cli/commands#push) see all the available options.

### Build

Build files from [source]('./source') to [assets]('./assets'):

```sh
npm run build
```

## Contributing

### Branches

Branches should aim to be specific to a single task and named accordingly. To keep things organized plz try to follow this naming pattern: `<type-of-change>/<task-name>`. For example: `feature/hp-hero`

### gitflow

Read [Branching Strategies](/documentation/branching-strategies.md)

### themes

#### Development themes

Development themes are temporary, themes used for local development (created automatically when running `npm run dev` or `npm start`).

Development themes don't show up in the Shopify admin, are deleted when you log out of a store, and are not tied to the branch you are working on. This is important to remember when it comes time to share preview links ( for example for PR reviews). If you share a link to a development theme and then change branches to work on something else that preview link will now be for the current branch **not** the branch you were working on when you got the preview link.

If you want a preview link that will be tied to a branch you need to either connect the theme via the admin to the branch you're working on or [push](#theme-push) your development theme to an unpublished theme on your store.

### Pull Requests

If your PR is for theme related work remember to connect your branch to a theme **before** sharing the preview links. Links to [Development themes](#development-themes) are problematic and should be avoided.

Please remember to fill out all info as needed found in the [pull_request_template](/.github/pull_request_template.md)

## Naming Conventions / Styleguide

- **Liquid**
  - variables should be named in [snake_case](https://www.chaseadams.io/posts/most-common-programming-case-types/#snake_case)
  - refer to [theme-check](https://shopify.dev/themes/tools/theme-check/checks) for more info about liquid best practices
- **Javascript**

  - variables use [camelCase](https://www.chaseadams.io/posts/most-common-programming-case-types/#camelcase)
  - Follow these [JavaScript Naming Conventions](https://www.robinwieruch.de/javascript-naming-conventions/) _(TODO: add internal js naming conventions file)_

- **HTML / DOM**
  - **Do Not** use `xml` style tags (eg. use `<hr>` not `<hr />`)
- **CSS**
  - use kebab case as default and BEM for added clarity
  - try to avoid nesting selectors more than 2 levels deep

## File Organization

**IMPORTANT The file structure needs to follow [these guidelines](https://shopify.dev/themes/architecture) in order for the shopify/github integration to work File and directories that don't match this structure need to be ignored using [.shopifyignore](./.shopifyignore)**

To keep code better organized and to utilize the best of modern CSS and JS this theme uses transpilation tools for all customized CSS and JS files in the source directory. SVG files in the source directory are also transformed into corresponding liquid snippets for ease of use and auto optimizations.

### Liquid files

- Snippets, Sections, Layout, and Template folders are all at the root level of the project folder.

### Admin Snippets

Use the [admin folder](admin) for:

- Dashboard code snippets
- Shopify Scripts

More information can be found in [./admin/README.md](admin/README.md)

### Source files

#### JS, CSS, and SVG working files go in the `/source` folder

#### SVGs

builds will auto optimize & convert svgs in source to `.liquid` snippet files.

- **Icons** [./source/svg/icons/](source/svg/icons/) will be output as `./snippets/icon-[filename].liquid`, and have two classes added to them: `.svg-icon` and `.svg-icon-[filename]`
- **Graphics** (multi-color, or larger & unique images) should be placed in [./source/svg/graphics/](source/svg/graphics/), and will be output as `./snippets/graphic-[filename].liquid`, and have two classes added to them: `.svg-graphic` and `.svg-graphic--[filename]`

**NOTE watch mode doesn't detect changes in the svg directory in source** so adding files there will not trigger a rebuild

If you have watch mode running and you have added new svgs to source and need new snippets to be created and you don't want to stop and restart the server or if you simply want to only create new snippets and not run a complete build you can run the following command:

```sh
npm run transform-svgs
```

### Build Config

[esbuild](https://esbuild.github.io/) is the build tool used for compiling JS and CSS files. The config file can be found in: [build/build.js](/build/build.js)

### Entry points

Currently there are only 2 entry points in the build workflow. 1 for JS files and 1 for SASS => CSS files. The source files for all entrypoints live in the `Source` directory and have been separated into directories named `legacy`. This decision has been made in order to keep clear what is new to this repo vs what is not and also to allow for diff configuration of linting tools which at this time is important due to the number of errors being reported in the files from the old repo with the current linting configurations.
Entry points for esbuild are imported into this file [build/entryPoints](/build/entryPoints.js) which then gets imported into the build config in[build/build.js](/build/build.js)

### Linting

#### Linting Tools

- [eslint](https://github.com/airbnb/javascript)
  - Config: [.eslintrc.js](/.eslintrc.js)
- [stylelint-config-recommended](https://stylelint.io/user-guide/rules/list)
  - Config:[.stylelintrc.json](/.stylelintrc.json)
- [Theme Check](https://github.com/shopify/theme-check) tool provided by Shopify to validate and lint theme files.
  - Config [.theme-check.yml](/.theme-check.yml)
- [prettier](https://prettier.io/)
  - Config [.prettierrc.json](/.prettierrc.json)

#### CLI AutoFormatting

Use these commands with caution. :warning: **Make sure to review changes before committing them.** :warning: 3rd party scripts should be ignored to prevent breaking changes.

##### Run all linters

```sh
npm run lint
```

```sh
npm run lint-fix
```

##### eslint

```sh
npm run eslint
```

```sh
npm run eslint-fix
```

##### stylelint

```sh
npm run stylelint
```

```sh
npm run stylelint-fix
```

##### theme check

```sh
npm run theme-check
```

```sh
npm run theme-check-fix
```

### Github Actions

#### Setting up Shopify Lighthouse CI GitHub Action

[Shopify/lighthouse-ci-action](https://github.com/Shopify/lighthouse-ci-action) runs a series of [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) audits for the home, product and collections pages. It's important to keep tabs on how scores change with each PR to help mitigate performance degradation over time.

[Shopify official Setup guide](https://shopify.dev/themes/tools/lighthouse-ci)

[Config found here: /.github/workflows/lighthouse.yml](/.github/workflows/lighthouse.yml)

#### Linting Github Action

This action is currently setup to run all [linting tools](#linting-tools) on push

[Config found here: /.github/workflows/linters.yml](/.github/workflows/linters.yml)

## Resources

### Shopify Resources

- [quick start guide for theme developers](https://github.com/Shopify/shopify-cli#quick-start-guide-for-theme-developers)
- [Shopify GitHub Integration](https://shopify.dev/themes/tools/github/getting-started)
- [Theme Check](https://github.com/shopify/theme-check)
- [Shopify/lighthouse-ci-action](https://github.com/Shopify/lighthouse-ci-action)
- [Shopify GitHub Integration](https://shopify.dev/themes/tools/github/getting-started)
- [Shopify Code Samples](https://shopify.github.io/liquid-code-examples/)
- [Dawn](https://shopify.dev/themes/tools/dawn)

### esbuild

- [esbuild Docs](https://esbuild.github.io/)

### Resources from original theme scaffold

- [Cart.js](http://cartjs.org/?utm_source=github&utm_medium=readme&utm_campaign=shopify-theme-scaffold)
- [Bootstrap for Shopify](http://bootstrapforshopify.com/?utm_source=github&utm_medium=readme&utm_campaign=shopify-theme-scaffold)
- [Mastering Shopify Themes](http://gavinballard.com/mastering-shopify-themes/?utm_source=github&utm_medium=readme&utm_campaign=shopify-theme-scaffold)
- [Gavin Ballard](http://gavinballard.com/?utm_source=github&utm_medium=readme&utm_campaign=shopify-theme-scaffold)
- [Disco](http://discolabs.com/?utm_source=github&utm_medium=readme&utm_campaign=shopify-theme-scaffold)

### postcss

Note postcss isn't currently used in this project adding these here for future reference if we decide to use later

- [postcss API](https://postcss.org/api/)
- [Postcss Preset Env features](https://preset-env.cssdb.org/features#stage-0)
