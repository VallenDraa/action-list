'use server';

import { Response } from '@/features/shared/types/response-type';
import { TodoModel } from '../models/todo-model';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { todoValidator } from '../validators/todo-validator';
import { Todo } from '../types/todo-type';
import { validateRequest } from '@/lib/lucia';
import { dbConnect } from '@/lib/mongoose';

export async function createTodoAction(
	todo: Todo,
): Promise<Response<{ todo: Todo } | null>> {
	try {
		await dbConnect();

		const { session } = await validateRequest();
		if (!session) {
			return { ok: false, message: 'Unauthorized', data: null };
		}

		const validatedTodo = await todoValidator.parseAsync(todo);
		const newTodo = await TodoModel.create(validatedTodo);

		return { ok: true, message: 'Todo created.', data: { todo: newTodo } };
	} catch (error) {
		return { ok: false, message: getErrorMessage(error), data: null };
	}
}
