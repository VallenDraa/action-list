'use client';

import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';
import { useDataQuery } from '@/features/todos/hooks/data-query/use-data-query';
import { TodoList } from './todo-list';
import { TodoSearchBar } from './todo-search-bar';
import { TodoItem } from './todo-item';
import { useUpdateTodo } from '../hooks/use-update-todo';
import { Paginations } from '@/features/shared/components/ui/paginations';
import { useGetPaginatedTodos } from '../hooks/use-get-paginated-todos';
import { CreateTodoButton } from './create-todo-button';
import { useTodoStatusFilter } from '../hooks/use-todo-status-filter';
import { TodoFilter } from '../types/get-todos-type';
import { TodoStatusFilter } from './todo-status-filter';

export type TodosSectionProps = {
	userId: string;
};

export const TodosSection = (props: TodosSectionProps) => {
	const { userId } = props;

	const { dataQuery, setDataQuery } = useDataQuery();
	const handleSearchQueryChange = (newSearch: string) => {
		setDataQuery(prev => ({ ...prev, search: newSearch }));
	};

	const { todoStatus, setTodoStatus } = useTodoStatusFilter();
	const handleTodoStatus = (newStatus: TodoFilter) => {
		setDataQuery(prev => ({ ...prev, page: 1 }));
		setTodoStatus(newStatus);
	};

	const {
		data: todosResponse,
		pages,
		totalPages,
		isLoadingData,
	} = useGetPaginatedTodos(userId, {
		...dataQuery,
		type: todoStatus as TodoFilter,
	});
	const { handleDeleteTodo, handleEditTodo } = useUpdateTodo(userId, dataQuery);

	return (
		<>
			<div className="d-flex justify-content-between gap-2 py-2 mb-3">
				<TodoSearchBar
					search={dataQuery.search}
					onChange={handleSearchQueryChange}
				/>

				<TodoStatusFilter
					activeType={todoStatus as TodoFilter}
					onChange={handleTodoStatus}
				/>
			</div>

			<div className="h-100">
				<TodoList>
					{isLoadingData && (
						<Spinner className="mx-auto" animation="border" variant="primary" />
					)}

					{!isLoadingData &&
						todosResponse?.data?.todos.map(todo => (
							<Col
								key={todo._id}
								sm="6"
								as="li"
								style={{ height: 'fit-content' }}
							>
								<TodoItem
									todo={todo}
									onDelete={handleDeleteTodo}
									onEdit={handleEditTodo}
									onTypeChange={status => handleEditTodo({ ...todo, status })}
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
