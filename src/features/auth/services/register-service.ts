import { hash } from 'argon2';
import { Register } from '../types/auth-type';
import { isUserExists } from '../utils/is-user-exists';
import { UserModel } from '../models/user-model';
import { lucia } from '@/lib/lucia';

export const registerService = async (registerUserData: Register) => {
	const userExists = await isUserExists(registerUserData.username);
	if (userExists) {
		return null;
	}

	const passwordHash = await hash(registerUserData.password);

	const { password, ...user } = await UserModel.create({
		username: registerUserData.username,
		password: passwordHash,
	}).then(user => user.toObject());

	const session = await lucia.createSession(user._id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	return { sessionCookie, user };
};
