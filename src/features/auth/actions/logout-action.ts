'use server';

import { Response } from '@/features/shared/types/response-type';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { lucia, validateRequest } from '@/lib/lucia';
import { dbConnect } from '@/lib/mongoose';
import { cookies } from 'next/headers';

export async function logoutAction(): Promise<Response<null>> {
	try {
		await dbConnect();

		const { session } = await validateRequest();
		if (!session) {
			return { ok: false, message: 'Unauthorized', data: null };
		}

		await lucia.invalidateSession(session.id);

		const sessionCookie = lucia.createBlankSessionCookie();

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);

		return { ok: true, message: 'Logout successful.', data: null };
	} catch (error) {
		console.error('🚀 ~ error:', error);
		return { ok: false, message: getErrorMessage(error), data: null };
	}
}
