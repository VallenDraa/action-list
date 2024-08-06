import { verify } from 'argon2';
import { UserModel } from '../models/user-model';
import { Login } from '../types/auth-type';
import { lucia } from '@/lib/lucia';

export const loginService = async (loginUserData: Login) => {
	const userResult = await UserModel.findOne({
		username: loginUserData.username,
	}).lean();

	if (userResult === null) {
		return null;
	}

	const passwordMatch = await verify(
		userResult.password,
		loginUserData.password,
	);

	if (!passwordMatch) {
		return null;
	}

	const { password, ...user } = userResult;

	const session = await lucia.createSession(user._id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	return { sessionCookie, user };
};
