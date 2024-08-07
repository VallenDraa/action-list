'use client';

import React from 'react';
import { CreateTodo, Todo } from '../types/todo-type';
import { Button } from '@/features/shared/components/ui/button';
import {
	Check,
	Folder2,
	Folder2Open,
	Pencil,
	Trash,
	X,
} from 'react-bootstrap-icons';
import { TodoForm } from './todo-form';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export type TodoItemProps = {
	todo: Todo;
	onEdit: (todo: Todo) => void;
	onToggleDone: (todo: Todo) => void;
	onToggleArchive: (todo: Todo) => void;
	onDelete: (todoId: string) => void;
};

export const TodoItem = (props: TodoItemProps) => {
	const { todo, onEdit, onToggleArchive, onDelete, onToggleDone } = props;

	const [isEditingTodo, setIsEditingTodo] = React.useState(false);

	const handleEdit = (newTodo: CreateTodo) => {
		onEdit({ ...todo, ...newTodo });
	};

	const handleToggleArchive = () => {
		onToggleArchive({ ...todo, is_archived: !todo.is_archived });
	};

	const handleToggleDone = () => {
		onToggleDone({ ...todo, is_done: !todo.is_done });
	};

	const handleDelete = () => {
		onDelete(todo._id);
	};

	return (
		<Card>
			<Card.Body>
				{todo.is_done && <Badge bg="success">Done</Badge>}
				<Card.Title className="d-flex justify-content-between gap-2">
					<p className="text-break">{todo.title}</p>

					<div className="d-flex flex-column align-items-center gap-1">
						<OverlayTrigger
							overlay={
								<Tooltip>
									{todo.is_done ? 'Mark as incomplete' : 'Mark as complete'}
								</Tooltip>
							}
						>
							<Button
								size="sm"
								variant={todo.is_done ? 'light' : 'success'}
								className="rounded-circle"
								style={{ width: '2rem', height: '2rem' }}
								disabled={isEditingTodo}
								onClick={handleToggleDone}
							>
								<span className="visually-hidden">
									{todo.is_done ? 'Mark as incomplete' : 'Mark as complete'}
								</span>

								{todo.is_done ? <X /> : <Check />}
							</Button>
						</OverlayTrigger>

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
					</div>

					<TodoForm
						show={isEditingTodo}
						defaultValues={todo}
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
					<Button
						className="flex-fill gap-1 d-flex align-items-center justify-content-center"
						size="sm"
						disabled={isEditingTodo}
						onClick={handleToggleArchive}
					>
						{todo.is_archived ? (
							<>
								<Folder2Open />
								Unarchive
							</>
						) : (
							<>
								<Folder2 />
								Archive
							</>
						)}
					</Button>
					<Button
						className="flex-fill gap-1 d-flex align-items-center justify-content-center"
						variant="danger"
						size="sm"
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
