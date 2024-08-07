import { TodoModel } from '../models/todo-model';
import { CreateTodo } from '../types/todo-type';

export const createTodoService = async (todo: CreateTodo) => {
	const newTodo = (await TodoModel.create(todo)).toJSON();

	return {
		...newTodo,
		_id: newTodo._id.toString(),
		user_id: newTodo.user_id.toString(),
	};
};
