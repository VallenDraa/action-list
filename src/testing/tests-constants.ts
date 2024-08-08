import { Todo } from '@/features/todos/types/todo-type';

export const INVALID_TODO: Todo = {
	_id: '1',
	title: '',
	body: '',
	user_id: '',
	status: 'upcoming',
};

export const EMPTY_TODO: Todo = {
	_id: crypto.randomUUID(),
	title: '',
	body: '',
	user_id: crypto.randomUUID(),
	status: 'upcoming',
};

export const VALID_TODO: Todo = {
	// Simulate mongodb ObjectId
	_id: crypto.randomUUID(),
	title: 'Hello',
	body: 'body',
	user_id: crypto.randomUUID(),
	status: 'done',
};
