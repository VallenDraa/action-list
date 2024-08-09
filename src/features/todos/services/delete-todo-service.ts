import 'server-only';

import { idValidator } from '@/features/shared/validators/id-validator';
import { TodoModel } from '../models/todo-model';

export const deleteTodoService = async (todoId: string) => {
	await idValidator.parseAsync(todoId);
	const deletedTodo = await TodoModel.findByIdAndDelete(todoId);

	if (deletedTodo === null) {
		throw new Error('Todo not found!');
	}
};
