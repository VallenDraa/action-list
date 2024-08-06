import { z } from 'zod';
import { idValidator } from '@/features/shared/validators/id-validator';
import { toZod } from 'tozod';
import { Todo } from '../types/todo-type';

export const todoValidator: toZod<Todo> = z.object({
	_id: idValidator,
	title: z.string().min(1, 'Title must not be empty.'),
	body: z.string().min(1, 'Body must not be empty.'),
	user_id: idValidator,
	is_done: z.boolean(),
	is_archived: z.boolean(),
});

export const createTodoValidator = todoValidator.omit({ _id: true });
export const updateTodoValidator = todoValidator.omit({ _id: true });
