'use server';

import { verify } from 'argon2';
import { User, UserModel } from '../models/user-model';
import { loginValidator } from '../validators/auth-validator';
import { lucia } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { env } from '@/config/env';
import { Response } from '@/features/shared/types/response-type';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';

export async function loginAction(
	_: any,
	formData: FormData,
): Promise<Response<null | User>> {
	try {
		const username = formData.get('username');
		const password = formData.get('password');

		const validatedData = await loginValidator.parseAsync({
			username,
			password,
		});

		const user = await UserModel.findOne({ username: validatedData.username });

		if (user === null) {
			return { ok: false, message: 'Invalid username or password', data: null };
		}

		const passwordMatch = await verify(validatedData.password, user.password, {
			secret: env.PW_SECRET,
		});

		if (!passwordMatch) {
			return { ok: false, message: 'Invalid username or password', data: null };
		}

		const session = await lucia.createSession(user._id.toString(), {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);

		return { ok: true, message: 'Login successfully', data: user };
	} catch (error) {
		console.error('🚀 ~ error:', error);
		return { ok: false, message: getErrorMessage(error), data: null };
	}
}
