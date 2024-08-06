'use server';

import { verify } from 'argon2';
import { UserModel } from '../models/user-model';
import { loginValidator } from '../validators/auth-validator';
import { lucia } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { Response } from '@/features/shared/types/response-type';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { PasswordLessUser } from '../types/user-type';
import { dbConnect } from '@/lib/mongoose';
import { Login } from '../types/auth-type';

export async function loginAction(
	loginData: Login,
): Promise<Response<null | { user: PasswordLessUser }>> {
	try {
		await dbConnect();

		const validatedData = await loginValidator.parseAsync(loginData);

		const userResult = await UserModel.findOne({
			username: validatedData.username,
		}).lean();

		if (userResult === null) {
			return { ok: false, message: 'Invalid username or password', data: null };
		}

		const passwordMatch = await verify(
			userResult.password,
			validatedData.password,
		);

		if (!passwordMatch) {
			return { ok: false, message: 'Invalid username or password', data: null };
		}

		const { password, ...user } = userResult;

		const session = await lucia.createSession(user._id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);

		return {
			ok: true,
			message: 'Login successfully',
			data: { user: { ...user, _id: user._id.toString() } },
		};
	} catch (error) {
		console.error('🚀 ~ error:', error);
		return { ok: false, message: getErrorMessage(error), data: null };
	}
}
