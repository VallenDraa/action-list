'use server';

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

		const { sessionCookie, user } = await loginService(loginData);

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);

		return { ok: true, message: 'Login successfully', data: { user } };
	} catch (error) {
		console.error('🚀 ~ error:', error);
		return { ok: false, message: getErrorMessage(error), data: null };
	}
}
