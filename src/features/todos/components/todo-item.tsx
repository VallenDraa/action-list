'use client';

import React from 'react';
import { CreateTodo, Todo, TodoStatus } from '../types/todo-type';
import { Button } from '@/features/shared/components/ui/button';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { TodoForm } from './todo-form';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { TodoStatusPicker } from './todo-status-picker';

export type TodoItemProps = {
	todo: Todo;
	onEdit: (todo: Todo) => void;
	onTypeChange: (type: TodoStatus) => void;
	onDelete: (todoId: string) => void;
};

export const TodoItem = (props: TodoItemProps) => {
	const { todo, onEdit, onTypeChange, onDelete } = props;

	const [isEditingTodo, setIsEditingTodo] = React.useState(false);

	const handleEdit = (newTodo: CreateTodo) => {
		onEdit({ ...todo, ...newTodo });
		setIsEditingTodo(false);
	};

	const handleDelete = () => onDelete(todo._id);

	return (
		<Card>
			<Card.Body>
				<Card.Title className="d-flex justify-content-between gap-2">
					<p className="text-break">{todo.title}</p>

					<OverlayTrigger overlay={<Tooltip>Edit Todo</Tooltip>}>
						<Button
							size="sm"
							variant="light"
							className="rounded-circle"
							style={{ width: '2rem', height: '2rem' }}
							onClick={() => setIsEditingTodo(true)}
						>
							<span className="visually-hidden">Edit Todo</span>
							<Pencil />
						</Button>
					</OverlayTrigger>

					<TodoForm
						show={isEditingTodo}
						defaultTodo={todo}
						userId={todo.user_id}
						onSubmit={handleEdit}
						title="Edit Todo Form"
						onClose={() => setIsEditingTodo(false)}
					/>
				</Card.Title>
				<Card.Text className="text-black-50">{todo.body}</Card.Text>
			</Card.Body>
			<Card.Footer>
				<div className="mt-1 d-flex gap-2 align-items-center">
					<TodoStatusPicker
						activeType={todo.status as TodoStatus}
						onChange={onTypeChange}
					/>

					<Button
						className="flex-fill gap-1 d-flex align-items-center justify-content-center"
						variant="danger"
						disabled={isEditingTodo}
						onClick={handleDelete}
					>
						<Trash />
						Delete
					</Button>
				</div>
			</Card.Footer>
		</Card>
	);
};
