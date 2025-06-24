'use strict';

/**
 * @module {{name}}-cli
 * @description This module represents the set of CLI commands provided by the
 * SpellCraft plugin. These commands are added to the main
 * `spellcraft` CLI when the integration module is imported and active.
 */

/**
 * This block documents new CLI functionality. Copy it for each command you add.
 * @name foo
 * @function
 * @memberof module:{{name}}-cli
 * @param {string} filename - The path to the Jsonnet configuration file to consume. (Required)
 * @param {boolean} [bar=false] - If true, outputs `bar` instead.
 *                                         Alias: `-b`.
 *
 * @example
 * # Render config.jsonnet, then run packer init and packer build
 * spellcraft foo ./config.jsonnet
 *
 * @example
 * # Render config.jsonnet, skip packer init, then run packer build
 * spellcraft foo ./config.jsonnet --bar
 * spellcraft foo ./config.jsonnet -b
 */

const foo = "This is a foobarbaz";

exports._spellcraft_metadata = {
	fileTypeHandlers: {
		'.*?\.foo': (content) => JSON.stringify(content, null, 4)
	},
	functionContext: { foo },
	cliExtensions: (yargs, spellframe) => {
		yargs.command("foo <filename>", "Generate files from a configuration, then ignore the result and return 'foo'", (yargs) => {
			return yargs.positional('filename', {
				describe: 'Jsonnet configuration file to consume'
			}).option('bar', {
				alias: 'b',
				type: 'boolean',
				description: 'Output "bar" instead.'
			});
		}, async (argv) => {

			// Initialize all plugins
			await spellframe.init();

			// Render the output
			await spellframe.render(argv.filename);

			// Normally you'd write the content to files next, but this plugin won't.
			// await spellframe.write();

			if (argv['bar']) {
				console.log('bar');
				return true;
			}

			console.log('foo');

		});

		console.log(`[+] Imported SpellFrame CLI extensions for {{name}}`);
	},
	init: async () => {
		// Use this space to handle any logic needed by your plugin,
		// or to influence the current execution context.

		// This step is only run during manifestation.

		process.env.FOO = "bar";
		process.env.BAR = "baz";
		process.env.BAZ = "foo";
	}
}

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