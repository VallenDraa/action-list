import { z } from 'zod';
import { idValidator } from '@/features/shared/validators/id-validator';
import { CreateTodo, Todo } from '../types/todo-type';

export const todoValidator: z.ZodType<Todo> = z.object({
	_id: idValidator,
	title: z.string().min(1, 'Title must not be empty.'),
	body: z.string().min(1, 'Body must not be empty.'),
	user_id: idValidator,
	status: z.enum(['done', 'archived', 'upcoming']),
});

export const createTodoValidator: z.ZodType<CreateTodo> = z.object({
	title: z.string().min(1, 'Title must not be empty.'),
	body: z.string().min(1, 'Body must not be empty.'),
	user_id: idValidator,
	status: z.enum(['done', 'archived', 'upcoming']),
});
