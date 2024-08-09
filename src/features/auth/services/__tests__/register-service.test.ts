import {
	INVALID_CREATE_USER,
	INVALID_PASSWORD_CREATE_USER,
	USERNAME_TOO_LONG_CREATE_USER,
	USERNAME_TOO_SHORT_CREATE_USER,
	VALID_CREATE_USER,
} from '@/testing/tests-constants';
import { registerService } from '../register-service';
import { getTestErrorMessage } from '@/testing/tests-utils';

describe('Register Service', () => {
	describe('Valid', () => {
		it('Should register a new user and return user data with the session cookie', async () => {
			const { user, sessionCookie } = await registerService(VALID_CREATE_USER);

			expect(user.username).toStrictEqual(VALID_CREATE_USER.username);
			expect(sessionCookie).toBeDefined();
		});
	});

	describe('Invalid', () => {
		it('Should throw an error when username is taken', async () => {
			await expect(registerService(VALID_CREATE_USER)).rejects.toThrowError(
				'Username is already used!',
			);
		});

		it('Should throw an error when username is less than 3 characters', async () => {
			try {
				await registerService(USERNAME_TOO_SHORT_CREATE_USER);
			} catch (error) {
				const message = getTestErrorMessage(error);
				expect(message).toStrictEqual(
					'Username must be atleast 3 characters long.',
				);
			}
		});

		it('Should throw an error when username is more than 50 characters', async () => {
			try {
				await registerService(USERNAME_TOO_LONG_CREATE_USER);
			} catch (error) {
				const message = getTestErrorMessage(error);
				expect(message).toStrictEqual(
					'Username cannot be more than 50 characters long.',
				);
			}
		});

		it('Should throw an error when password is less than 8 characters', async () => {
			try {
				await registerService(INVALID_PASSWORD_CREATE_USER);
			} catch (error) {
				const message = getTestErrorMessage(error);

				expect(message).toStrictEqual(
					'Password must be atleast 8 characters long.',
				);
			}
		});

		it('Should throw an error when both username and password is invalid', async () => {
			try {
				await registerService(INVALID_CREATE_USER);
			} catch (error) {
				const message = getTestErrorMessage(error);
				console.log('🚀 ~ it ~ message:', message);

				expect(message).toStrictEqual(
					`Username must be atleast 3 characters long.
Password must be atleast 8 characters long.`,
				);
			}
		});
	});
});
