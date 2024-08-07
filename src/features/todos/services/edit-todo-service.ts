import { idValidator } from '@/features/shared/validators/id-validator';
import { TodoModel } from '../models/todo-model';
import { Todo, UpdateTodo } from '../types/todo-type';
import { todoValidator } from '../validators/todo-validator';

export const editTodoService = async (
	todoId: string,
	todo: UpdateTodo,
): Promise<Todo | null> => {
	await idValidator.parseAsync(todoId);
	await todoValidator.parseAsync(todo);

	const updatedTodo = await TodoModel.findByIdAndUpdate(todoId, todo, {
		new: true,
	}).lean();

	if (!updatedTodo) {
		return null;
	}

	return {
		...updatedTodo,
		_id: updatedTodo._id.toString(),
		user_id: updatedTodo.user_id.toString(),
	};
};
