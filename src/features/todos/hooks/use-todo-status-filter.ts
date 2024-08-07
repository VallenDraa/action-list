'use client';

import * as React from 'react';
import { parseAsString, useQueryState } from 'nuqs';
import { TODO_FILTERS } from '../constants/todo-filter';
import { TodoFilter } from '../types/get-todos-type';

export const useTodoStatusFilter = () => {
	const [todoStatus, setTodoStatus] = useQueryState(
		'status',
		parseAsString.withDefault('all'),
	);

	React.useEffect(() => {
		if (!TODO_FILTERS.includes(todoStatus as TodoFilter)) {
			setTodoStatus('all');
		}
	}, [todoStatus, setTodoStatus]);

	return { todoStatus, setTodoStatus };
};
