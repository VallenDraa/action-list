import mongoose from 'mongoose';
import { dbConnect } from '@/lib/mongoose';

await dbConnect();

export type User = {
	username: string;
	password: string;
};

const UserSchema = new mongoose.Schema<User>(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true },
);

export const UserModel = mongoose.model('user', UserSchema);
