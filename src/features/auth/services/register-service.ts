import 'server-only';

import { hash } from 'argon2';
import { Register } from '../types/auth-type';
import { isUserExists } from '../utils/is-user-exists';
import { UserModel } from '../models/user-model';
import { lucia } from '@/lib/lucia';
import { registerValidator } from '../validators/auth-validator';

export const registerService = async (registerUserData: Register) => {
	await registerValidator.parseAsync(registerUserData);

	const userExists = await isUserExists(registerUserData.username);
	if (userExists) {
		throw new Error('Username is already used!');
	}

	const passwordHash = await hash(registerUserData.password);

	const { password, ...user } = await UserModel.create({
		username: registerUserData.username,
		password: passwordHash,
	}).then(user => user.toObject());

	const session = await lucia.createSession(user._id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	return {
		sessionCookie,
		user: { ...user, _id: user._id.toString() },
	};
};
