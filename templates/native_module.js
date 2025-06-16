/**
 * @file foo.js
 * @fileOverview Core utility functions and constants for SpellCraft Packer integration.
 * This libsonnet file provides helper functions commonly used when defining
 * Packer configurations with SpellCraft and Jsonnet.
 *
 * It makes native SpellCraft functions like `envvar` and `path` directly
 * available within this libsonnet context.
 *
 * @description
 * **Module:** `spellcraft-packer_libsonnet` (This line is for human readers; JSDoc uses @name below)
 * 
 * @module foo
 * @description Provides core utility functions and constants for SpellCraft Packer integration.
 */

// -- End JSDoc file header


// Example of a simple return function.

/**
 * Returns the string literal 'baz'.
 *
 * @function bar
 * @memberof module:foo
 * @returns {string} `baz`
 * @example
 * local foo = import "foo";
 * { bar: foo.bar() }
 */

exports.bar = [() => 'baz'];



// Example of a complex object interpolation.

/**
 * Returns the string literal 'baz'.
 *
 * @function baz
 * @param {string} name - The name of the object to return
 * @param {number} siblings - How many sibling objects to create
 * @memberof module:foo
 * @example
 * local foo = import "foo";
 * { baz: foo.baz("Earl", 3) }
 * 
 * // Returns:
 * { "Earl": {
 * 	siblings: ["sibling_1", "sibling_2", "sibling_3"]
 * }}
 */

exports.baz = [(name, siblings) => {
	return obj = {
		[name]: {
			siblings: Array.from(Array(siblings), (_, i) => `sibling_${i}`)
		}
	};
}, "name", "siblings"];