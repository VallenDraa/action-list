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

export async function registerAction(
	registerData: Register,
): Promise<Response<null | { user: PasswordLessUser }>> {
	try {
		await dbConnect();

		const validatedData = await registerValidator.parseAsync(registerData);

		const userExists = await isUserExists(validatedData.username);
		if (userExists) {
			return { ok: false, message: 'Username is already used.', data: null };
		}

		const passwordHash = await hash(validatedData.password);

		const { password, ...user } = await UserModel.create({
			username: validatedData.username,
			password: passwordHash,
		}).then(user => user.toObject());

		const session = await lucia.createSession(user._id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);

		return {
			ok: true,
			message: 'Registration successful.',
			data: { user: { ...user, _id: user._id.toString() } },
		};
	} catch (error) {
		console.error('🚀 ~ error:', error);
		return { ok: false, message: getErrorMessage(error), data: null };
	}
}
