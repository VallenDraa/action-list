import mongoose from 'mongoose';
import { dbConnect } from '@/lib/mongoose';

await dbConnect();

export type Session = {
	user_id: string;
	expires_at: Date;
};

const SessionSchema = new mongoose.Schema<Session>({
	user_id: { type: String, required: true },
	expires_at: { type: Date, required: true },
});

export const SessionModel = mongoose.model('session', SessionSchema);
