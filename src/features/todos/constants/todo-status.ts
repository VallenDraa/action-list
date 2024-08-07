import { TodoStatus } from '../types/todo-type';

export const TODO_STATUS: TodoStatus[] = [
	'archived',
	'done',
	'upcoming',
] as const;
