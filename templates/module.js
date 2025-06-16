'use strict';

/**
 * @fileOverview Placeholder for documenting CLI commands added by SpellCraft Packer integration.
 * This file (or these JSDoc blocks if placed elsewhere) describes the CLI commands
 * that become available when the SpellCraft Packer Integration module is active.
 */

// It's good practice to define the module itself if it's purely conceptual
// and doesn't correspond to a direct JavaScript file module export.

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