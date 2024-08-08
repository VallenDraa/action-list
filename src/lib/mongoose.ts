import { env } from '@/config/env';
import mongoose from 'mongoose';

declare global {
	var mongoose: {
		conn: mongoose.Mongoose | null;
		promise: Promise<mongoose.Mongoose> | null;
	}; // This must be a `var` and not a `let / const`
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect({
	uri = env.MONGO_URI,
	...otherOptions
}: Partial<mongoose.ConnectOptions & { uri: string }> = {}) {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
			...otherOptions,
		};

		cached.promise = mongoose.connect(uri, opts).then(mongoose => {
			return mongoose;
		});
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}
