import { z } from 'zod';

export const getTodoValidator = z.object({
	limit: z
		.number({ message: 'Limit must be a number.' })
		.gte(1, 'Limit must be atleast 1.')
		.optional(),
	page: z
		.number({ message: 'Page must be a number.' })
		.gte(1, 'Page must be atleast 1.')
		.optional(),
	search: z.string().optional(),
	type: z.enum(['done', 'archived', 'all', 'upcoming']).optional(),
});
