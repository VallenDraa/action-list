'use client';

import { useDataQuery } from '@/features/todos/hooks/data-query/use-data-query';
import { useGetTodos } from '../query/get-todos-query';
import { TodoList } from './todo-list';
import { TodoSearchBar } from './todo-search-bar';
import { TodoItem } from './todo-item';
import { TodoTypeFilter } from './todo-type-filter';
import { TodoFilter } from '../types/get-todos-type';
import { Col } from 'react-bootstrap';
import { useUpdateTodo } from '../hooks/use-update-todo';
import { useTodoFilterType } from '../hooks/use-todo-filter-type';

export type TodosSectionProps = {
	userId: string;
};

export const TodosSection = (props: TodosSectionProps) => {
	const { userId } = props;

	const { todoType, setTodoType } = useTodoFilterType();
	const { dataQuery, setDataQuery } = useDataQuery();
	const handleSearchQueryChange = (newSearch: string) => {
		setDataQuery(prev => ({ ...prev, search: newSearch }));
	};

	const { data } = useGetTodos({
		userId,
		todosSearchQuery: { ...dataQuery, type: todoType as TodoFilter },
	});
	const { handleDeleteTodo, handleEditTodo } = useUpdateTodo(userId, dataQuery);

	return (
		<>
			<div className="d-flex justify-content-between gap-2 py-2 mb-3">
				<TodoSearchBar
					search={dataQuery.search}
					onChange={handleSearchQueryChange}
				/>

				<TodoTypeFilter
					activeFilter={todoType as TodoFilter}
					onChange={setTodoType}
				/>
			</div>

			<TodoList>
				{data?.todos.map(todo => (
					<Col key={todo._id} sm="6" as="li" className="">
						<TodoItem
							todo={todo}
							onDelete={handleDeleteTodo}
							onToggleArchive={handleEditTodo}
							onToggleDone={handleEditTodo}
							onEdit={handleEditTodo}
						/>
					</Col>
				))}
			</TodoList>
		</>
	);
};
