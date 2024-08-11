import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { config } from 'dotenv';

config({ path: '.env.test.local' });

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	test: {
		env: process.env,
		environment: 'jsdom',
		globalSetup: './src/testing/global-setup-tests.ts',
		setupFiles: './src/testing/setup-tests.ts',
	},
});
