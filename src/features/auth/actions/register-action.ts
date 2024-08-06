'use server';

import { UserModel } from '../models/user-model';
import { hash } from 'argon2';
import { registerValidator } from '../validators/auth-validator';
import { isUserExists } from '../utils/is-user-exists';
import { lucia } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { Response } from '@/features/shared/types/response-type';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { PasswordLessUser } from '../types/user-type';
import { dbConnect } from '@/lib/mongoose';
import { Register } from '../types/auth-type';
import { registerService } from '../services/register-service';

export async function registerAction(
	registerData: Register,
): Promise<Response<null | { user: PasswordLessUser }>> {
	try {
		await dbConnect();

		const validatedData = await registerValidator.parseAsync(registerData);

		const data = await registerService(validatedData);
		if (!data) {
			return { ok: false, message: 'Username is already used.', data: null };
		}

		cookies().set(
			data.sessionCookie.name,
			data.sessionCookie.value,
			data.sessionCookie.attributes,
		);

		return {
			ok: true,
			message: 'Registration successful.',
			data: { user: { ...data.user, _id: data.user._id.toString() } },
		};
	} catch (error) {
		console.error('🚀 ~ error:', error);
		return { ok: false, message: getErrorMessage(error), data: null };
	}
}
