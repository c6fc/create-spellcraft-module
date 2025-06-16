#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let targetPath = process.cwd();
let name = "my-spellcraft-plugin";

if (process.argv.length > 2) {

	// If argv[1] is a full path, use it. Otherwise treat as relative to cwd()
	if (process.argv[2].split("")[0] == "/") {
		targetPath = process.argv[2];
	} else {
		targetPath = path.join(process.cwd(), process.argv[2]);
	}

	name = path.basename(targetPath);

	console.log(`[*] Creating new Spellcraft module in ${targetPath} named ${name}`);

	if (!fs.existsSync(targetPath)) {
		fs.mkdirSync(targetPath, { recursive: true });
	}
} else {
	console.log(`[*] Creating new Spellcraft module in this directory`);
}

// Create the project directories
["spellcraft_modules"].forEach(e => {
	fs.mkdirSync(path.join(targetPath, e));
});

// Define replace function
function interpolateTemplate(content) {
	return content
		.replaceAll("{{name}}", name);
}

// [template_file]: "path/to/render";
Object.entries({
	".gitignore": ".gitignore",
	"native_module.js": "spellcraft_modules/native_module.js",
	"jsdoc.json": "jsdoc.json",
	"module.js": "module.js",
	"module.libsonnet": "module.libsonnet",
	"package.json": "package.json",
	"README.md": "README.md"
}).forEach(([key, filepath]) => {
	const content = fs.readFileSync(path.join(__dirname, '../templates', key)).toString("ascii");
	fs.writeFileSync(path.join(targetPath, filepath), interpolateTemplate(content));
});

execSync("npm install", { cwd: targetPath, stdio: 'inherit' });

console.log("\n[+] All set. Good hunting.");