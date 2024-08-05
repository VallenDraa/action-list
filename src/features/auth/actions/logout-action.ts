'use server';

import { Response } from '@/features/shared/types/response-types';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { lucia, validateRequest } from '@/lib/lucia';
import { cookies } from 'next/headers';

export async function logout(): Promise<Response<null>> {
	try {
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
