# ✨ create-spellcraft-module ✨

**Scaffold Your SpellCraft Modules with Ease!**

`create-spellcraft-module` is a zero-configuration command-line tool designed to quickly bootstrap the creation of new modules for the powerful SpellCraft configuration management framework. Forget about tedious setup – get straight to building innovative extensions that enhance SpellCraft's capabilities.

[![NPM Version](https://img.shields.io/npm/v/create-spellcraft-module.svg)](https://www.npmjs.com/package/create-spellcraft-module)
[![License](https://img.shields.io/npm/l/create-spellcraft-module.svg)](https://github.com/c6fc/create-spellcraft-module/blob/main/LICENSE)

---

## Installation & Usage

`create-spellcraft-module` is designed to be used directly with `npm init`. Simply navigate to an empty directory where you want to create your new module and run: `npm init spellcraft-module <your-module-name>`

Replace `<your-module-name>` with the desired name for your module (e.g., `@my-org/spellcraft-custom-logic`). This name will be used as the package name in your `package.json`.

### Usage

Navigate to an empty directory:

    mkdir my-new-module
    cd my-new-module

Initialize your new SpellCraft module:

    npm init spellcraft-module @me/my-new-module

This command will generate a pre-configured file structure and essential files within the `my-new-module` directory, ready for you to start building your SpellCraft extension.

## What's Inside Your New Module

`create-spellcraft-module` sets you up with a sensible default structure and helpful utilities:

```
.
├── utils/
    ├── cli-test.json
    ├── jsdoc.json
    └── test.js
├── .gitignore
├── module.js
├── module.jsonnet
├── package.json
├── README.md
└── test.jsonnet
```

### `/utils`

This directory contains development and testing tools to streamline your module creation process.

**`cli-test.js`**: A convenient wrapper for testing your module's SpellCraft CLI extensions. Use it with the `npm run cli` script defined in your `package.json`. This allows you to simulate `spellcraft` commands and verify your custom CLI functionality.

**`jsdoc.json`**: A pre-configured JSDoc configuration file. Use it with the `npm run doc` script to automatically generate documentation for your module's JavaScript code.

**`test.js`**: A pre-created SpellFrame for manifesting your `test.jsonnet` file using the capabilities of your module. You can edit this as needed to manually include module dependencies as needed. Run your tests with the `npm run test` script.

### `.gitignore`

A standard `.gitignore` file tailored for SpellCraft modules. It automatically ignores common build artifacts and directories that SpellCraft will manage within user projects, such as `docs/`, `node_modules/`, and `render/`. This ensures a clean and focused repository.

### `module.js`

This is the heart of your module's JavaScript logic. It's where you define native functions that can be called from your Jsonnet configurations and where you register your module's metadata, including CLI extensions and initialization routines.

**Important Considerations for `module.js`:**

*   **Native Functions:** Export JavaScript functions to make them available as native functions within Jsonnet using `std.native('<function_name>')`. The name of your exported function will automatically be used as the native function name in Jsonnet.
*   **Function Context (`this`):** When defining functions intended to interact with other SpellCraft modules or access contextual information (like an initialized AWS SDK), **use traditional `function` declarations instead of arrow functions**. Traditional functions allow SpellCraft to inject a `functionContext` as `this`, providing access to shared resources and utilities from the SpellFrame. For example, the `@c6fc/spellcraft-aws-auth` module makes an authenticated AWS SDK v2 instance available as `this.aws` within these functions. Arrow functions do not bind their own `this`, and therefore will not have access to this context.
*   **Module Metadata (`exports._spellcraft_metadata`):** This crucial object configures how your module integrates with SpellCraft. It can contain:
	*   **`fileTypeHandlers`:** A key/value object of `<regex_pattern>: <function>(content) => { return manifest-logic };`. This is used for converting JavaScript objects into the content that will be written to files whose names match the regex pattern. e.g.: `'.*?\.foo': (content) => { return content.toString().toLowerCase() }` will write the lowercase version of `content` to any file with the `.foo` file extension.
    *   **`functionContext`:** An object whose properties will be available as `this` within your exported functions (when using traditional function declarations).
    *   **`cliExtensions`:** **A function that accepts two arguments: `(yargs, spellframe)`**.
        *   `yargs`: A reference to the [Yargs](https://yargs.org/) command-line argument parsing library instance used by SpellCraft. You can use this to define new commands, options, and configure the CLI behavior.
        *   `spellframe`: An instance of the core SpellFrame class. This provides access to information about other loaded SpellCraft modules, their registered functions, and the overall SpellCraft environment.
    *   **`init`:** An optional asynchronous function that SpellCraft will execute during its initialization phase. This is useful for setting up resources, authenticating with external services, or performing other setup tasks.

The template `module.js` provides examples and JSDoc documentation blocks to guide you in defining your module's capabilities.

### `module.libsonnet`

This file contains the Jsonnet portion of your module. While you can define standard Jsonnet functions and objects here, **it's primarily intended for creating declarative wrappers around the native JavaScript functions you've exposed in `module.js`**.

**Key Point:** SpellCraft automatically links the JavaScript functions you export in `module.js` as native functions with the same name. You do not need to manually declare them using `std.native()` within this file for basic invocation. Instead, `module.libsonnet` should focus on building higher-level, declarative abstractions that utilize these native functions for a more user-friendly experience in Jsonnet configurations.

The template `module.libsonnet` includes examples and JSDoc documentation blocks to demonstrate how to create these wrapper functions.

### `package.json`

A standard NPM `package.json` file with some SpellCraft-specific configurations:

*   **`name`:** The name of your module (as provided during `npm init`). Follow NPM package naming conventions. Consider using a scope (e.g., `@your-org/`).
*   **`main`:** Typically set to `module.js`, indicating the entry point of your module's JavaScript code.
*   **`config.spellcraft_module_default_name`:** **Crucially, this configuration tells SpellCraft that this package is a module and specifies the default name under which it should be linked when a user runs `spellcraft importModule <your-package-name>`**. Choose a distinct and intuitive name to avoid conflicts with other modules. If you intend to publish with a scope, ensure the name here is the unscoped version you want users to refer to (e.g., if your package is `@my-org/spellcraft-utils`, you might set this to `utils`).
*   **`scripts`:** Includes pre-configured scripts for common development tasks:
    *   `test`: Runs your module's tests.
    *   `doc`: Generates documentation using JSDoc.
    *   `cli`: Executes the `utils/cli-test.js` script for testing CLI extensions.

### `test.jsonnet`

This file serves as an example of how to use the functions and features provided by your module within a SpellCraft Jsonnet configuration. It's highly recommended to make this file as comprehensive as possible, showcasing the correct usage and expected output of all your module's capabilities. This acts as both a test case and a clear usage example for users of your module.

## Default `npm run` actions

There are three scripts created in `package.json` that are available by default within your project:

### `npm run cli`

This imports your project as a module into the SpellCraft engine to let you test integration with the `spellcraft` CLI. You can invoke your extended CLI commands using `npm run cli -- <your-command> [your params]`. To merely ensure that commands are included among the available options, use `npm run cli -- -h`.

### `npm run doc`

This generates JSDoc documentation for both Node.js and Jsonnet module components if you use the template JSDoc blocks in your code. The resulting files will be created in the `docs/` directory.

### `npm run test`

This will attempt to manifest `test.jsonnet` in-memory and display the results. You should populate `test.jsonnet` with examples of all your exported JavaScript functions and JSonnet methods to let users see how they are used, and the results they create.

By default, it will only load the current module into SpellCraft, but you can manually include additional modules by importing them first with `npx spellcraft importModule <module-name>`, then adding a line to `utils/test.js` to import the module by name.