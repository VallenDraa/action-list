import { TodoModel } from '../models/todo-model';
import { UpdateTodo } from '../types/todo-type';

export const editTodoService = async (todoId: string, todo: UpdateTodo) => {
	const updatedTodo = await TodoModel.findByIdAndUpdate(todoId, todo, {
		new: true,
	}).lean();

	return updatedTodo;
};
