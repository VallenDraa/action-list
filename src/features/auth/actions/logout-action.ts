'use server';

import { Response } from '@/features/shared/types/response-type';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { mustBeAuthenticated } from '@/lib/lucia';
import { dbConnect } from '@/lib/mongoose';
import { cookies } from 'next/headers';
import { logoutService } from '../services/logout-service';

export async function logoutAction(): Promise<Response<null>> {
	try {
		await dbConnect();
		const { session } = await mustBeAuthenticated();

		const sessionCookie = await logoutService(session);

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
