import { TodoFilter } from '../types/get-todos-type';

export const TODO_FILTERS: TodoFilter[] = [
	'all',
	'archived',
	'done',
	'upcoming',
] as const;
