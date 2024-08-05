import z from 'zod';
import { Response } from '../types/response-type';

export const UNAUTHED_PAGE_VISIT_MESSAGE =
	'You are not authenticated, please login or register first to access this page!';
export const DEFAULT_ERROR_MESSAGE =
	'Something wrong happened, please try again later!';

export function getErrorMessage(
	err: unknown,
	defaultError = DEFAULT_ERROR_MESSAGE,
) {
	if (isErrorResponse(err)) {
		return err.message;
	}

	if (err instanceof z.ZodError) {
		return flattenZodError(err);
	}

	if (err instanceof Error) {
		return err.message;
	}

	return defaultError;
}

export function isErrorResponse<T>(err: unknown): err is Response<T> {
	if (typeof err !== 'object' || err === null) {
		return false;
	}

	const keysLength = Object.keys(err).length;

	if (keysLength !== 3) {
		return false;
	}

	return 'ok' in err && 'message' in err && 'data' in err;
}

export function flattenZodError(zodError: z.ZodError) {
	return zodError.issues.map(issue => issue.message).join('\n');
}
