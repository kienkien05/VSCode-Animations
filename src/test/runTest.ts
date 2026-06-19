import * as path from 'path';
import * as fs from 'fs';

import { runTests } from '@vscode/test-electron';

function findExtensionDevelopmentPath(startPath: string): string {
	let currentPath = startPath;

	while (currentPath !== path.dirname(currentPath)) {
		if (fs.existsSync(path.join(currentPath, 'package.json'))) {
			return currentPath;
		}

		currentPath = path.dirname(currentPath);
	}

	return path.resolve(__dirname, '../../');
}

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = findExtensionDevelopmentPath(__dirname);

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index');

		// Download VS Code, unzip it and run the integration test
		await runTests({ extensionDevelopmentPath, extensionTestsPath });
	} catch (err) {
		console.error('Failed to run tests', err);
		process.exit(1);
	}
}

main();
