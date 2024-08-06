'use client';

import { ActiveListTab } from './active-list-tab';
import { TodoSearchBar } from './todo-search-bar';

export const TodoList = () => {
	return (
		<>
			<TodoSearchBar />
			<ActiveListTab />
		</>
	);
};
