import 'server-only';

import { verify } from 'argon2';
import { UserModel } from '../models/user-model';
import { Login } from '../types/auth-type';
import { lucia } from '@/lib/lucia';
import { loginValidator } from '../validators/auth-validator';

export const loginService = async (loginUserData: Login) => {
	try {
		await loginValidator.parseAsync(loginUserData);
	} catch (error) {
		throw new Error('Invalid username or password!');
	}

	const userResult = await UserModel.findOne({
		username: loginUserData.username,
	}).lean();

	if (userResult === null) {
		throw new Error('Invalid username or password!');
	}

	const passwordMatch = await verify(
		userResult.password,
		loginUserData.password,
	);

	if (!passwordMatch) {
		throw new Error('Invalid username or password!');
	}

	const { password, ...user } = userResult;

	const session = await lucia.createSession(user._id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	return { sessionCookie, user: { ...user, _id: user._id.toString() } };
};
