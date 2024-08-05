import mongoose from 'mongoose';
import { dbConnect } from '@/lib/mongoose';
import { Session } from '../types/session-type';

await dbConnect();

const SessionSchema = new mongoose.Schema<Session>({
	user_id: { type: String, required: true },
	expires_at: { type: Date, required: true },
});

export const SessionModel = mongoose.model('session', SessionSchema);
