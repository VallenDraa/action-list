import { TodoModel } from '../models/todo-model';

export const deleteTodoService = async (todoId: string) => {
	await TodoModel.findByIdAndDelete(todoId);
};
