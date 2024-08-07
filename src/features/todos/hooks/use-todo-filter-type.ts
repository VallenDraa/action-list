'use client';

import * as React from 'react';
import { parseAsString, useQueryState } from 'nuqs';
import { TODO_FILTERS } from '../constants/todo-filter';
import { TodoFilter } from '../types/get-todos-type';

export const useTodoFilterType = () => {
	const [todoType, setTodoType] = useQueryState(
		'type',
		parseAsString.withDefault('all'),
	);

	React.useEffect(() => {
		if (!TODO_FILTERS.includes(todoType as TodoFilter)) {
			setTodoType('all');
		}
	}, [todoType, setTodoType]);

	return { todoType, setTodoType };
};
