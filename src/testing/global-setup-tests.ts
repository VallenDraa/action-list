import { resetTestDb } from './db';
import { dbConnect } from '@/lib/mongoose';

export default async function setup() {
	const mongoConnection = await dbConnect({ uri: process.env.MONGO_URI });
	await resetTestDb(mongoConnection, 'all');
}
