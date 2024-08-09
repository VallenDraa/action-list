import mongoose from 'mongoose';
import { Todo } from '@/features/todos/types/todo-type';
import { VALID_TODO } from '../tests-constants';

export const makeValidTodo = (todo: Partial<Todo>): Todo => {
	return {
		...VALID_TODO,
		_id: new mongoose.Types.ObjectId().toString(),
		...todo,
	};
};

export const makeValidTodos = ({
	dataPerIndex = [],
	amount = 10,
}: {
	dataPerIndex?: Partial<Todo>[];
	amount?: number;
}): Todo[] => {
	return Array.from({ length: amount }, (_, index) =>
		makeValidTodo(dataPerIndex[index] || {}),
	);
};
