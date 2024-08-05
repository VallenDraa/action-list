import mongoose from 'mongoose';
import { Session } from '../types/session-type';

const SessionSchema = new mongoose.Schema<Session>({
	user_id: { type: String, required: true },
	expires_at: { type: Date, required: true },
});

export const SessionModel: mongoose.Model<Session> =
	mongoose.models.session || mongoose.model('session', SessionSchema);
