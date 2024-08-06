'use client';

import * as React from 'react';
import { Button } from '@/features/shared/components/ui/button';
import { Plus } from 'react-bootstrap-icons';
import { CreateTodoForm } from './create-todo-form';
import { CreateTodo } from '../../types/todo-type';

export const CreateTodoButton = () => {
	const [isTodoFormActive, setIsTodoFormActive] = React.useState(false);

	const handleCreateTodo = (newTodo: CreateTodo) => {
		console.log(newTodo);
		setIsTodoFormActive(false);
	};

	return (
		<>
			<div className="position-fixed translate-middle-x start-50 bottom-0 mb-3 z-3">
				<Button
					onClick={() => setIsTodoFormActive(true)}
					className="rounded-circle p-1"
				>
					<span className="visually-hidden">Toggle Create Todo Form</span>
					<Plus className="fs-1" />
				</Button>
			</div>

			<CreateTodoForm
				userId="TODO"
				show={isTodoFormActive}
				onClose={() => setIsTodoFormActive(false)}
				onSubmit={handleCreateTodo}
			/>
		</>
	);
};
