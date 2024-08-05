import { env } from '@/config/env';
import mongoose from 'mongoose';

declare global {
	var mongoose: any; // This must be a `var` and not a `let / const`
}

if (!env.MONGO_URI) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local',
	);
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached.promise = mongoose.connect(env.MONGO_URI, opts).then(mongoose => {
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
