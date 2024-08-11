import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { dbConnect } from '@/lib/mongoose';
import { beforeAll, afterAll, afterEach, vi } from 'vitest';

beforeAll(async () => {
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

	await dbConnect({ uri: process.env.MONGO_URI });
});

afterEach(() => {
	cleanup();
});

afterAll(() => {
	vi.restoreAllMocks();
});
