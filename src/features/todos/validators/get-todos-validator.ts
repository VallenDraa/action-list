import { z } from 'zod';

export const getTodoValidator = z.object({
	limit: z.number().gte(1, 'Limit must be atleast 1.').optional(),
	page: z.number().gte(1, 'Page must be atleast 1.').optional(),
	search: z.string().optional(),
	type: z.enum(['done', 'archived', 'all', 'upcoming']).optional(),
});
