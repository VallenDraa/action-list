import { defineConfig } from 'cypress';
import { config } from 'dotenv';

config({ path: '.env.test.local' });

export default defineConfig({
	projectId: 'r45kax',
	env: { ...process.env },
	component: {
		devServer: {
			framework: 'next',
			bundler: 'webpack',
		},
	},
	e2e: {
		setupNodeEvents(on, config) {
			on('before:run', async details => {
				console.log(process.env);
			});
		},
	},
});
