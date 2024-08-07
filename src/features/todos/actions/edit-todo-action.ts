'use server';

import { Response } from '@/features/shared/types/response-type';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { Todo, UpdateTodo } from '../types/todo-type';
import { validateRequest } from '@/lib/lucia';
import { dbConnect } from '@/lib/mongoose';
import { editTodoService } from '../services/edit-todo-service';

export async function editTodoAction({
	todo,
	todoId,
}: {
	todoId: string;
	todo: UpdateTodo;
}): Promise<Response<{ todo: Todo } | null>> {
	try {
		await dbConnect();

		const { session } = await validateRequest();
		if (!session) {
			throw new Error('Unauthorized!');
		}

		const updatedTodo = await editTodoService(todoId, todo);

		return { ok: true, message: 'Todo updated.', data: { todo: updatedTodo } };
	} catch (error) {
		return { ok: false, message: getErrorMessage(error), data: null };
	}
}
