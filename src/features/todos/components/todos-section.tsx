'use client';

import { useDataQuery } from '@/features/todos/hooks/data-query/use-data-query';
import { TodoList } from './todo-list';
import { TodoSearchBar } from './todo-search-bar';
import { TodoItem } from './todo-item';
import { TodoTypeFilter } from './todo-type-filter';
import { TodoFilter } from '../types/get-todos-type';
import { Col } from 'react-bootstrap';
import { useUpdateTodo } from '../hooks/use-update-todo';
import { useTodoFilterType } from '../hooks/use-todo-filter-type';
import { Paginations } from '@/features/shared/components/ui/paginations';
import { useGetPaginatedTodos } from '../hooks/use-get-paginated-todos';
import { CreateTodoButton } from './create-todo-button';
import React from 'react';

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

	const {
		data: todosReponse,
		pages,
		totalPages,
	} = useGetPaginatedTodos(userId, {
		...dataQuery,
		type: todoType as TodoFilter,
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

			<div className="h-100">
				<TodoList>
					{todosReponse?.data?.todos.map(todo => (
						<Col
							key={todo._id}
							sm="6"
							as="li"
							style={{ height: 'fit-content' }}
						>
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
			</div>

			<div className="d-flex gap-2 justify-content-between">
				<Paginations
					currentPage={dataQuery.page}
					pages={pages}
					totalPages={totalPages}
				/>

				<CreateTodoButton userId={userId} />
			</div>
		</>
	);
};
