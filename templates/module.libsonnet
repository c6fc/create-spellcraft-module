/**
 * @module {{name}}
 * @description This module represents the JSonnet and JavaScript native
 * functions exposed by this plugin.
 */

// Don't try to 'import' your spellcraft native functions here.
// Use std.native(function)(..args) instead

{
  // JS Native functions are already documented in spellcraft_modules/foo.js
  bar():: std.native("bar")(),
  baz(name, siblings):: std.native("baz")(name, siblings),

  /**
   * Returns 'moo'
   * This is a libsonnet module rather than a JavaScript native function.
   *
   * @function beefcakecafe
   * @param {string} say
   * @memberof module:{{name}}
   * @returns {string} `moo (${say})`
   * @example
   * local foo = import "foo";
   * { cow: foo.beefcakecafe("hello") }
   * 
   * // Returns:
   * { "cow": "moo (hello)" }
   */

  beefcakecafe(say):: "moo (%s)" % say
}