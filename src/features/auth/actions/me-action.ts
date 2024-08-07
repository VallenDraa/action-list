'use server';

import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { PasswordLessUser } from '../types/user-type';
import { Response } from '@/features/shared/types/response-type';
import { meService } from '../services/me-service';
import { mustBeAuthenticated, validateRequest } from '@/lib/lucia';

export const meAction = async (): Promise<
	Response<null | { user: PasswordLessUser }>
> => {
	try {
		const { user } = await mustBeAuthenticated();

		const serializedUser = await meService(user);

		return { ok: true, message: 'User found.', data: { user: serializedUser } };
	} catch (error) {
		console.error('🚀 ~ error:', error);
		return { ok: false, message: getErrorMessage(error), data: null };
	}
};
