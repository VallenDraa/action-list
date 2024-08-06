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
import { loginService } from '../services/login-service';

export async function loginAction(
	loginData: Login,
): Promise<Response<null | { user: PasswordLessUser }>> {
	try {
		await dbConnect();

		const validatedData = await loginValidator.parseAsync(loginData);

		const data = await loginService(validatedData);
		if (!data) {
			return { ok: false, message: 'Invalid username or password', data: null };
		}

		const session = await lucia.createSession(data.user._id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);

		return {
			ok: true,
			message: 'Login successfully',
			data: { user: { ...data.user, _id: data.user._id.toString() } },
		};
	} catch (error) {
		console.error('🚀 ~ error:', error);
		return { ok: false, message: getErrorMessage(error), data: null };
	}
}
