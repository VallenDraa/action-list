'use client';

import Modal, { ModalProps } from 'react-bootstrap/Modal';
import { CreateTodo, Todo } from '@/features/todos/types/todo-type';
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
	defaultValues?: Todo;
} & ModalProps;

export const TodoForm = (props: TodoFormProps) => {
	const {
		title,
		userId,
		onSubmit,
		onClose,
		onBackdropClick,
		defaultValues,
		...rest
	} = props;

	const form = useForm<CreateTodo>({
		resolver: zodResolver(createTodoValidator),
		defaultValues: defaultValues ?? {
			title: '',
			body: '',
			user_id: userId,
			status: 'upcoming',
		},
	});

	const handleSubmit = async (newTodo: CreateTodo) => {
		await onSubmit(newTodo);
		form.reset();
	};

	return (
		<Modal {...rest}>
			<Modal.Header>
				<Modal.Title>{title || 'Todo Form'}</Modal.Title>
			</Modal.Header>
			<Form onSubmit={form.handleSubmit(handleSubmit)}>
				<Modal.Body className="d-flex flex-column gap-3">
					<Form.Group controlId="Todo title input">
						<Form.Label>Title</Form.Label>
						<Form.Control
							{...form.register('title')}
							placeholder="Enter your title"
						/>

						{form.getFieldState('title').error?.message && (
							<Form.Control.Feedback type="invalid">
								{form.getFieldState('title').error?.message}
							</Form.Control.Feedback>
						)}
					</Form.Group>

					<Form.Group controlId="Todo body input">
						<Form.Label>Body</Form.Label>
						<Form.Control
							{...form.register('body')}
							as="textarea"
							placeholder="Enter your body"
						/>

						{form.getFieldState('body').error?.message && (
							<Form.Control.Feedback type="invalid">
								{form.getFieldState('body').error?.message}
							</Form.Control.Feedback>
						)}
					</Form.Group>

					<Form.Group
						className="d-flex flex-column gap-2"
						controlId="Todo status"
					>
						<Form.Label>Status</Form.Label>
						<Form.Select {...form.register('status')}>
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
						disabled={form.formState.isSubmitting}
						variant="secondary"
						type="button"
						onClick={onClose}
					>
						Close
					</Button>
					<Button
						loading={form.formState.isSubmitting}
						disabled={!form.formState.isValid}
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
