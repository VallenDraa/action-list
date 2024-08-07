import { TodoModel } from '../models/todo-model';
import { Todo, UpdateTodo } from '../types/todo-type';

export const editTodoService = async (
	todoId: string,
	todo: UpdateTodo,
): Promise<Todo | null> => {
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
