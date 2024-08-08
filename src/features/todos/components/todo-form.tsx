'use client';

import * as React from 'react';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import { CreateTodo, Todo, TodoStatus } from '@/features/todos/types/todo-type';
import { Button } from '@/features/shared/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTodoValidator } from '@/features/todos/validators/todo-validator';
import { Form } from 'react-bootstrap';
import { TODO_STATUS } from '../constants/todo-status';

export type TodoFormProps = {
	title?: string;
	userId: string;
	onSubmit: (newTodo: CreateTodo) => void | Promise<void>;
	onClose: () => void;
	defaultTodo?: Todo;
} & ModalProps;

export const TodoForm = (props: TodoFormProps) => {
	const {
		title,
		userId,
		onSubmit,
		onClose,
		onBackdropClick,
		defaultTodo,
		...rest
	} = props;

	const defaultValues = React.useMemo(
		() =>
			defaultTodo ?? {
				title: '',
				body: '',
				user_id: userId,
				status: 'upcoming' as TodoStatus,
			},
		[defaultTodo, userId],
	);

	const {
		reset,
		formState,
		handleSubmit: formSubmit,
		register,
		getFieldState,
	} = useForm<CreateTodo>({
		resolver: zodResolver(createTodoValidator),
		defaultValues,
	});

	const handleClose = () => {
		reset(defaultValues);
		onClose();
	};

	const handleSubmit = async (newTodo: CreateTodo) => {
		await onSubmit(newTodo);

		// Make sure is the form is always resetted no matter what
		reset(defaultValues);
	};

	// Update default value
	React.useEffect(() => reset(defaultValues), [defaultValues, reset]);

	// Make sure is the form is always resetted no matter what
	React.useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset(defaultValues);
		}
	}, [formState.isSubmitSuccessful, reset, defaultValues]);

	return (
		<Modal {...rest}>
			<Modal.Header>
				<Modal.Title>{title || 'Todo Form'}</Modal.Title>
			</Modal.Header>
			<Form onSubmit={formSubmit(handleSubmit)}>
				<Modal.Body className="d-flex flex-column gap-3">
					<Form.Group controlId="Todo title input">
						<Form.Label>Title</Form.Label>
						<Form.Control
							{...register('title')}
							placeholder="Enter your title"
						/>

						{getFieldState('title').error?.message && (
							<Form.Control.Feedback type="invalid">
								{getFieldState('title').error?.message}
							</Form.Control.Feedback>
						)}
					</Form.Group>

					<Form.Group controlId="Todo body input">
						<Form.Label>Body</Form.Label>
						<Form.Control
							{...register('body')}
							as="textarea"
							placeholder="Enter your body"
						/>

						{getFieldState('body').error?.message && (
							<Form.Control.Feedback type="invalid">
								{getFieldState('body').error?.message}
							</Form.Control.Feedback>
						)}
					</Form.Group>

					<Form.Group
						className="d-flex flex-column gap-2"
						controlId="Todo status"
					>
						<Form.Label>Status</Form.Label>
						<Form.Select {...register('status')}>
							{TODO_STATUS.map(filter => (
								<option value={filter} key={filter}>
									{filter}
								</option>
							))}
						</Form.Select>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button
						disabled={formState.isSubmitting}
						variant="secondary"
						type="button"
						onClick={handleClose}
					>
						Close
					</Button>
					<Button
						loading={formState.isSubmitting}
						disabled={!formState.isValid}
						variant="primary"
						type="submit"
					>
						Submit
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};
