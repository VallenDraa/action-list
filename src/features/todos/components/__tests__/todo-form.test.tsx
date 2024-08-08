import {
	userEvent,
	render,
	screen,
	doNothingForMsFn,
} from '@/testing/tests-utils';
import { TodoForm, TodoFormProps } from '../todo-form';
import {
	EMPTY_TODO,
	INVALID_TODO,
	VALID_TODO,
} from '@/testing/tests-constants';

describe('<TodoForm /> component', () => {
	const defaultTestProps: TodoFormProps = {
		show: true,
		userId: '1',
		onSubmit: () => {},
		onClose: () => {},
	};

	const OpenedTodoForm = (props: Partial<TodoFormProps> = {}) => {
		return <TodoForm {...defaultTestProps} {...props} />;
	};

	describe('Render', () => {
		describe('Form structure', () => {
			it('Should render default todo form title', () => {
				render(<OpenedTodoForm />);

				const formTitle = screen.getByText('Todo Form');

				expect(formTitle).toBeInTheDocument();
			});

			it('Should render todo form title from props', () => {
				const customTitle = 'Hello World';
				render(<OpenedTodoForm title={customTitle} />);

				const formTitle = screen.getByText(customTitle);

				expect(formTitle).toBeInTheDocument();
			});

			it('Should render todo title input and label', () => {
				render(<OpenedTodoForm />);

				const todoTitleWithLabel = screen.getByLabelText('Title', {
					selector: 'input',
				});

				expect(todoTitleWithLabel).toBeInTheDocument();
			});

			it('Should render todo body textarea and label', () => {
				render(<OpenedTodoForm />);

				const bodyTextAreaWithLabel = screen.getByLabelText('Body', {
					selector: 'textarea',
				});

				expect(bodyTextAreaWithLabel).toBeInTheDocument();
			});

			it('Should render todo status select and label', () => {
				render(<OpenedTodoForm />);

				const statusSelectWithLabel = screen.getByLabelText('Status', {
					selector: 'select',
				});

				expect(statusSelectWithLabel).toBeInTheDocument();
			});

			it('Should render submit button', () => {
				render(<OpenedTodoForm />);

				const submitTodoButton = screen.getByRole('button', { name: 'Submit' });

				expect(submitTodoButton).toBeInTheDocument();
				expect(submitTodoButton).toHaveAttribute('type', 'submit');
			});

			it('Should render close button', () => {
				render(<OpenedTodoForm />);

				const closeTodoButton = screen.getByRole('button', { name: 'Close' });

				expect(closeTodoButton).toBeInTheDocument();
				expect(closeTodoButton).toHaveAttribute('type', 'button');
			});
		});

		describe('Form submission', () => {
			it('Should disable submit when data is invalid', () => {
				render(<OpenedTodoForm defaultTodo={INVALID_TODO} />);

				const submitTodoButton = screen.getByRole('button', { name: 'Submit' });

				expect(submitTodoButton).toBeDisabled();
			});

			it('Should allow form submission when data is valid', async () => {
				render(<OpenedTodoForm defaultTodo={VALID_TODO} />);

				const submitTodoButton = await screen.findByRole('button', {
					name: 'Submit',
				});

				expect(submitTodoButton).not.toBeDisabled();
			});

			it('Should disable submit button when submitting', async () => {
				render(
					<OpenedTodoForm
						defaultTodo={VALID_TODO}
						onSubmit={doNothingForMsFn(2000)}
					/>,
				);

				const submitTodoButton = screen.getByRole('button', { name: 'Submit' });

				await userEvent.click(submitTodoButton);

				expect(submitTodoButton).toBeDisabled();
			});
		});

		describe('Form close', () => {
			it('Should disable close button when submitting', async () => {
				render(
					<OpenedTodoForm
						defaultTodo={VALID_TODO}
						onSubmit={doNothingForMsFn(2000)}
					/>,
				);

				const submitFormButton = screen.getByRole('button', { name: 'Submit' });
				const closeFormButton = screen.getByRole('button', { name: 'Close' });

				await userEvent.click(submitFormButton);

				expect(closeFormButton).toBeDisabled();
			});
		});
	});

	describe('Behavior', () => {
		describe('Form submission', () => {
			it('Should call onSubmit when form is submitted', async () => {
				const mockOnSubmit = vi.fn();

				render(
					<OpenedTodoForm defaultTodo={VALID_TODO} onSubmit={mockOnSubmit} />,
				);

				const submitTodoButton = screen.getByRole('button', { name: 'Submit' });

				await userEvent.click(submitTodoButton);

				expect(mockOnSubmit).toHaveBeenCalledOnce();
			});

			it('Should reset fields on submit', async () => {
				render(<OpenedTodoForm defaultTodo={EMPTY_TODO} />);

				const submitTodoButton = screen.getByRole('button', { name: 'Submit' });
				await userEvent.click(submitTodoButton);

				const titleInput = screen.getByLabelText('Title', {
					selector: 'input',
				});
				const bodyTextArea = screen.getByLabelText('Body', {
					selector: 'textarea',
				});
				const statusSelect = screen.getByLabelText('Status', {
					selector: 'select',
				});

				await userEvent.type(titleInput, 'Hello World');
				await userEvent.type(bodyTextArea, 'Hello World');
				await userEvent.selectOptions(statusSelect, 'done');

				await userEvent.click(submitTodoButton);

				expect(titleInput).toHaveValue(EMPTY_TODO.title);
				expect(bodyTextArea).toHaveValue(EMPTY_TODO.body);
				expect(statusSelect).toHaveValue(EMPTY_TODO.status);
			});
		});

		describe('Form close', () => {
			it('Should call onClose when form is close button is pressed', async () => {
				const mockOnClosed = vi.fn();

				render(
					<OpenedTodoForm defaultTodo={VALID_TODO} onClose={mockOnClosed} />,
				);

				const closeButton = screen.getByRole('button', { name: 'Close' });

				await userEvent.click(closeButton);

				expect(mockOnClosed).toHaveBeenCalledOnce();
			});

			it('Should reset fields on form close', async () => {
				render(<OpenedTodoForm defaultTodo={EMPTY_TODO} />);

				const closeButton = screen.getByRole('button', { name: 'Close' });
				await userEvent.click(closeButton);

				const titleInput = screen.getByLabelText('Title', {
					selector: 'input',
				});
				const bodyTextArea = screen.getByLabelText('Body', {
					selector: 'textarea',
				});
				const statusSelect = screen.getByLabelText('Status', {
					selector: 'select',
				});

				await userEvent.type(titleInput, 'Hello World');
				await userEvent.type(bodyTextArea, 'Hello World');
				await userEvent.selectOptions(statusSelect, 'done');

				await userEvent.click(closeButton);

				expect(titleInput).toHaveValue(EMPTY_TODO.title);
				expect(bodyTextArea).toHaveValue(EMPTY_TODO.body);
				expect(statusSelect).toHaveValue(EMPTY_TODO.status);
			});
		});

		describe('defaultTodo prop', () => {
			it('Should change defaultValues on defaultTodo prop change', () => {
				const { rerender } = render(
					<OpenedTodoForm defaultTodo={EMPTY_TODO} />,
				);

				const titleInput = screen.getByLabelText('Title', {
					selector: 'input',
				});
				const bodyTextArea = screen.getByLabelText('Body', {
					selector: 'textarea',
				});
				const statusSelect = screen.getByLabelText('Status', {
					selector: 'select',
				});

				expect(titleInput).toHaveValue(EMPTY_TODO.title);
				expect(bodyTextArea).toHaveValue(EMPTY_TODO.body);
				expect(statusSelect).toHaveValue(EMPTY_TODO.status);

				rerender(<OpenedTodoForm defaultTodo={VALID_TODO} />);

				expect(titleInput).toHaveValue(VALID_TODO.title);
				expect(bodyTextArea).toHaveValue(VALID_TODO.body);
				expect(statusSelect).toHaveValue(VALID_TODO.status);
			});
		});
	});
});
