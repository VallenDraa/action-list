import 'server-only';

import { TodoModel } from '../models/todo-model';
import { CreateTodo } from '../types/todo-type';
import { createTodoValidator } from '../validators/todo-validator';

export const createTodoService = async (todo: CreateTodo) => {
	await createTodoValidator.parseAsync(todo);
	const newTodo = (await TodoModel.create(todo)).toObject();

	return {
		...newTodo,
		_id: newTodo._id.toString(),
		user_id: newTodo.user_id.toString(),
	};
};
