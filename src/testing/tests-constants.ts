import { Register } from '@/features/auth/types/auth-type';
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

export const USERNAME_TOO_SHORT_CREATE_USER: Register = {
	username: 'jo',
	password: 'test1234',
};

export const USERNAME_TOO_LONG_CREATE_USER: Register = {
	username: `${crypto.randomUUID()} ${crypto.randomUUID()}`,
	password: 'test1234',
};

export const INVALID_PASSWORD_CREATE_USER: Register = {
	username: 'john',
	password: 'test',
};

export const INVALID_CREATE_USER: Register = {
	username: 'jo',
	password: 'te',
};
