import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { resetTestDb } from './db';
import { dbConnect } from '@/lib/mongoose';

beforeAll(() => {
	// Mocking Next.js and React specific modules and libraries
	vi.mock('server-only', () => {
		return {};
	});
	vi.mock('@t3-oss/env-nextjs', () => {
		return { createEnv: () => process.env };
	});
	vi.mock('react', async original => {
		const actuals = await original();

		return {
			...(actuals as []),
			cache: vi.fn(),
		};
	});

	// * Uncomment the following code block if you want to test server actions
	// vi.mock('next/headers', async original => {
	// 	const actuals = await original();

	// 	return {
	// 		...(actuals as []),
	// 		cookies: () => ({
	// 			get: vi.fn(),
	// 			set: vi.fn(),
	// 		}),
	// 	};
	// });
});

beforeAll(async () => {
	const mongoConnection = await dbConnect({ uri: process.env.MONGO_URI });
	await resetTestDb(mongoConnection, 'all');
});

afterEach(() => {
	cleanup();
});

afterAll(() => {
	vi.restoreAllMocks();
});
