'use server';

import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { PasswordLessUser } from '../types/user-type';
import { Response } from '@/features/shared/types/response-type';
import { meService } from '../services/me-service';

export const meAction = async (): Promise<
	Response<null | { user: PasswordLessUser }>
> => {
	try {
		const user = await meService();
		return { ok: true, message: 'User found.', data: { user } };
	} catch (error) {
		console.error('🚀 ~ error:', error);
		return { ok: false, message: getErrorMessage(error), data: null };
	}
};
