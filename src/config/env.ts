// src/env.mjs
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	/*
	 * Serverside Environment variables, not available on the client.
	 * Will throw if you access these variables on the client.
	 */
	server: {
		NODE_ENV: z.enum(['development', 'production', 'test']),
		MONGO_URI: z.string().url(),
		PW_SALT: z.string().min(1),
		PW_SECRET: z.string().min(1),
	},
	/*
	 * Environment variables available on the client (and server).
	 *
	 * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
	 */
	client: {},
	/*
	 * Due to how Next.js bundles environment variables on Edge and Client,
	 * we need to manually destructure them to make sure all are included in bundle.
	 *
	 * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
	 */
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		MONGO_URI: process.env.MONGO_URI,
		PW_SALT: process.env.PW_SALT,
		PW_SECRET: process.env.PW_SECRET,
	},
});
