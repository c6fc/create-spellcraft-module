# create-spellcraft-module

This package is used to bootstrap a new module for @c6fc/spellcraft within a clean directory.

```sh
# Create an empty directory
mkdir my-new-module
cd my-new-module

# Initialize the current directory using the directory name
# as the module name
npm init spellcraft-module
```

```sh
# Create a new directory and initialize with a given module name
npm init spellcraft-module my-new-module
```

## What it creates for you

### /utils

#### - cli-test.js

A wrapper for testing `spellcraft` CLI extensions.
Use with `npm run cli`

#### - jsdoc.json

A default configuration file for documentation with JSDoc.
Use with `npm run doc`

#### - test.js

A pre-written test harness for module functionality.
Use with `npm run test`

### .gitignore

A standard `.gitignore` file configured to ignore directories that Spellcraft will create inside your module, but which shouldn't be committed, such as `docs`, `node_modules`, and `render`.

### module.js

The JavaScript portion of your module. At a minimum, this must contain some portion of the `exports._spellcraft_metadata` object for Spellcraft SpellFrames to link with. The template includes example content and example JSDoc documentation blocks for all the capabilities of the module framework.

### module.jsonnet

The JSonnet portion of your module. This should contain any JSonnet native functions, as well as references to any JavaScript exported functions in your module.js using `std.native(<function_name>)(...args)` syntax. Again, example content and JSDoc documentation blocks are provided.

### package.json

A basic NPM package.json file with a configuration parameter telling Spellcraft to treat this package as a module, and what name to give it by default. Spellcraft will overload modules with identical link names, so use something distinct. If you plan to publish using a prefix, you'll need to update the package name yourself.

### test.jsonnet

A file that shows the proper use of any JavaScript or JSonnet functions that your module exports. You should make this as extensive as possible so that users of your module can see the correct usage (and output) of your module functions using `npm run test`.