# SpellCraft Packer Integration

[![NPM version](https://img.shields.io/npm/v/{{name}}.svg?style=flat)](https://www.npmjs.com/package/{{name}})
[![License](https://img.shields.io/npm/l/{{name}}.svg?style=flat)](https://opensource.org/licenses/MIT)

Seamlessly integrate [HashiCorp Packer](https://www.packer.io/) into your [SpellCraft](https://github.com/@c6fc/spellcraft) SpellFrames. This plugin allows you to define Packer configurations using Jsonnet, render them with SpellCraft, and then use Packer to build your machine images or other artifacts.

## Features

Adds some `foo` to your SpellCraft. Pretty basic.

## CLI Commands

This plugin returns the following functions
*	**spellcraft foo:** Returns 'bar'.

## SpellFrame 'init()' features

Extends the SpellFrame's `init()` to include a `foo` primitive, and sets the following environment variables for the local context:

1. `FOO`
2. `BAR`
3. `BAZ`

## JavaScript context features

Exposes `this.foo` for all native function executions.

## Exposed module functions

Exposes the following functions to JSonnet through the import module:

### foo.bar()

A simple method with no arguments, executed via JavaScript

#### Returns:

`baz`

### foo.baz(name, siblings)

A simple method with two arguments, executed via JavaScript

#### Returns:

An object structured as follows:

```json
{ "name": {
	"siblings": ["sibling_1", "sibling_n"]
} }
```

### foo.beefcakecafe(say)

A simple method with one argument, manifested directly within JSonnet

#### Returns:

`moo (${say})`


## Installation

Install the plugin as a dev dependency in your SpellCraft project:

```bash
# Create a SpellCraft project if you haven't already
npm install --save @c6fc/spellcraft

# Install and expose this module with name 'foo'
npx spellcraft importModule {{name}} foo
```

Once installed, you can load the module into your JSonnet files by the name you specified with `importModule`, in this case 'foo':

```jsonnet
local foo = import "foo";

'test.json': {
	foo: foo.bar()
}
```

## Documentation

You can generate JSDoc documentation for this plugin using `npm run doc`. Documentation will be generated in the `doc` folder.