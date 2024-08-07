import { idValidator } from '@/features/shared/validators/id-validator';
import { TodoModel } from '../models/todo-model';

export const deleteTodoService = async (todoId: string) => {
	await idValidator.parseAsync(todoId);
	await TodoModel.findByIdAndDelete(todoId);
};
