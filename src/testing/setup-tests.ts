import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { resetTestDb } from './db';
import { dbConnect } from '@/lib/mongoose';

beforeAll(async () => {
	const mongoConnection = await dbConnect({ uri: process.env.MONGO_URI });
	resetTestDb(mongoConnection);
});

// Runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
	cleanup();
});
