'use client';

import * as React from 'react';
import { Button } from '@/features/shared/components/ui/button';
import { Plus } from 'react-bootstrap-icons';
import { TodoForm } from './todo-form';
import { CreateTodo } from '../types/todo-type';
import { useCreateTodo } from '../query/create-todo-query';
import { useDataQuery } from '@/features/todos/hooks/data-query/use-data-query';

export type CreateTodoButtonProps = {
	userId: string;
};

export const CreateTodoButton = (props: CreateTodoButtonProps) => {
	const { userId } = props;
	const [isTodoFormActive, setIsTodoFormActive] = React.useState(false);

	const { dataQuery } = useDataQuery();
	const { mutateAsync: createTodo } = useCreateTodo({
		userId,
		todosSearchQuery: dataQuery,
	});

	const handleCreateTodo = async (newTodo: CreateTodo) => {
		try {
			await createTodo(newTodo);
			setIsTodoFormActive(false);
		} catch (error) {
			// TODO: handle create todo error
			console.error('🚀 ~ handleCreateTodo ~ error:', error);
		}
	};

	return (
		<>
			<div className="position-absolute end-0 bottom-0 me-2 mb-3 z-3">
				<Button
					onClick={() => setIsTodoFormActive(true)}
					className="rounded-circle p-1"
				>
					<span className="visually-hidden">Toggle Create Todo Form</span>
					<Plus className="fs-1" />
				</Button>
			</div>

			<TodoForm
				userId={userId}
				show={isTodoFormActive}
				title="Create Todo Form"
				onSubmit={handleCreateTodo}
				onClose={() => setIsTodoFormActive(false)}
			/>
		</>
	);
};
