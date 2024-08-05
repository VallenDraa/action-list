import mongoose from 'mongoose';
import { User } from '../types/user-type';

const UserSchema = new mongoose.Schema<User>(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true },
);

export const UserModel: mongoose.Model<User> =
	mongoose.models.user || mongoose.model('user', UserSchema);
