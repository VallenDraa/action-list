import z from 'zod';

export const registerValidator = z.object({
	username: z
		.string()
		.min(3, 'Username must be atleast 3 characters long.')
		.max(50, 'Username cannot be more than 50 characters long.')
		.trim(),
	password: z
		.string()
		.min(8, 'Password must be atleast 8 characters long.')
		.trim(),
});

export const loginValidator = registerValidator;
