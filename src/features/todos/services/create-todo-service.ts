import { TodoModel } from '../models/todo-model';
import { Todo } from '../types/todo-type';

export const createTodoService = async (todo: Todo) => {
	const newTodo = await TodoModel.create(todo);

	return newTodo;
};
