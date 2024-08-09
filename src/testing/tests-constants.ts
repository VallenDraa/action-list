import { Register } from '@/features/auth/types/auth-type';
import { CreateTodo, Todo } from '@/features/todos/types/todo-type';
import mongoose from 'mongoose';

export const INVALID_TODO: Todo = {
	_id: '1',
	title: '',
	body: '',
	user_id: '',
	status: 'upcoming',
};

export const EMPTY_TODO: Todo = {
	_id: new mongoose.Types.ObjectId().toString(),
	title: '',
	body: '',
	user_id: new mongoose.Types.ObjectId().toString(),
	status: 'upcoming',
};

export const VALID_TODO: Todo = {
	// Simulate mongodb ObjectId
	_id: new mongoose.Types.ObjectId().toString(),
	title: 'Hello',
	body: 'body',
	user_id: new mongoose.Types.ObjectId().toString(),
	status: 'done',
};

export const VALID_CREATE_TODO: CreateTodo = {
	title: 'Hello',
	body: 'body',
	user_id: new mongoose.Types.ObjectId().toString(),
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
