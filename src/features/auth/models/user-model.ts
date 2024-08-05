import mongoose from 'mongoose';
import { dbConnect } from '@/lib/mongoose';
import { User } from '../types/user-type';

await dbConnect();

const UserSchema = new mongoose.Schema<User>(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true },
);

export const UserModel = mongoose.model('user', UserSchema);
