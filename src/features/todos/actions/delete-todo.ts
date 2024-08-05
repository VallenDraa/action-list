'use server';

import { Response } from '@/features/shared/types/response-type';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { idValidator } from '@/features/shared/validators/id-validator';
import { TodoModel } from '../models/todo-model';
import { validateRequest } from '@/lib/lucia';

export async function deleteTodoAction(
	todoId: string,
): Promise<Response<null>> {
	try {
		const { session } = await validateRequest();
		if (!session) {
			return { ok: false, message: 'Unauthorized', data: null };
		}

		const validatedTodoId = await idValidator.parseAsync(todoId);
		await TodoModel.findByIdAndDelete(validatedTodoId);

		return { ok: true, message: 'Todo deleted.', data: null };
	} catch (error) {
		return { ok: false, message: getErrorMessage(error), data: null };
	}
}