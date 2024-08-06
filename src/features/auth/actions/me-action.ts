'use server';

import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { PasswordLessUser } from '../types/user-type';
import { Response } from '@/features/shared/types/response-type';
import { validateRequest } from '@/lib/lucia';

export const meAction = async (): Promise<
	Response<null | { user: PasswordLessUser }>
> => {
	try {
		const { user } = await validateRequest();

		if (!user) {
			return { ok: false, message: 'Unauthorized', data: null };
		}

		const { id, username } = user;

		return {
			ok: true,
			message: 'User found',
			data: { user: { username, _id: id.toString() } },
		};
	} catch (error) {
		console.error('🚀 ~ error:', error);
		return { ok: false, message: getErrorMessage(error), data: null };
	}
};
