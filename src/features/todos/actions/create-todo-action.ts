'use server';

import { Response } from '@/features/shared/types/response-type';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { createTodoValidator } from '../validators/todo-validator';
import { CreateTodo, Todo } from '../types/todo-type';
import { validateRequest } from '@/lib/lucia';
import { dbConnect } from '@/lib/mongoose';
import { createTodoService } from '../services/create-todo-service';

export async function createTodoAction(
	todo: CreateTodo,
): Promise<Response<{ todo: Todo } | null>> {
	try {
		await dbConnect();

		const { session } = await validateRequest();
		if (!session) {
			return { ok: false, message: 'Unauthorized', data: null };
		}

		const validatedTodo = await createTodoValidator.parseAsync(todo);
		const newTodo = await createTodoService(validatedTodo);

		return {
			ok: true,
			message: 'Todo created.',
			data: { todo: newTodo },
		};
	} catch (error) {
		return { ok: false, message: getErrorMessage(error), data: null };
	}
}
