'use server';

import { Response } from '@/features/shared/types/response-type';
import { TodoModel } from '../models/todo-model';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { updateTodoValidator } from '../validators/todo-validator';
import { Todo, UpdateTodo } from '../types/todo-type';
import { validateRequest } from '@/lib/lucia';
import { dbConnect } from '@/lib/mongoose';

export async function createTodoAction(
	todoId: string,
	todo: UpdateTodo,
): Promise<Response<{ todo: Todo } | null>> {
	try {
		await dbConnect();

		const { session } = await validateRequest();
		if (!session) {
			return { ok: false, message: 'Unauthorized', data: null };
		}

		const validatedTodoId = await updateTodoValidator.parseAsync(todoId);
		const validatedTodo = await updateTodoValidator.parseAsync(todo);

		const updatedTodo = await TodoModel.findByIdAndUpdate(
			validatedTodoId,
			validatedTodo,
			{ new: true },
		).lean();

		if (!updatedTodo) {
			return { ok: false, message: 'Todo not found.', data: null };
		}

		return { ok: true, message: 'Todo updated.', data: { todo: updatedTodo } };
	} catch (error) {
		return { ok: false, message: getErrorMessage(error), data: null };
	}
}
