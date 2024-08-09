import { VALID_CREATE_TODO } from '@/testing/tests-constants';
import { TODO_STATUS } from '../../constants/todo-status';
import { createTodoService } from '../create-todo-service';
import { getTestErrorMessage } from '@/testing/tests-utils';
import { TodoStatus } from '../../types/todo-type';

describe('Create Todo Service', () => {
	const todos = TODO_STATUS.map(status => ({
		...VALID_CREATE_TODO,
		status,
	}));

	describe('Valid', () => {
		it.each(todos.map(todo => [todo.status, todo]))(
			'Should create a new todo when inputs are valid and status is %s',
			async (_status, todo) => {
				const { body, _id, status, title, user_id } = await createTodoService(
					todo,
				);

				expect(_id).toBeDefined();
				expect(body).toStrictEqual(todo.body);
				expect(title).toStrictEqual(todo.title);
				expect(status).toStrictEqual(todo.status);
				expect(user_id).toStrictEqual(todo.user_id);
			},
		);
	});

	describe('Invalid', () => {
		it('Should throw an error when title is empty', async () => {
			try {
				await createTodoService({ ...VALID_CREATE_TODO, title: '' });
			} catch (error) {
				const message = getTestErrorMessage(error);

				expect(message).toStrictEqual('Title must not be empty.');
			}
		});

		it('Should throw an error when body is empty', async () => {
			try {
				await createTodoService({ ...VALID_CREATE_TODO, body: '' });
			} catch (error) {
				const message = getTestErrorMessage(error);

				expect(message).toStrictEqual('Body must not be empty.');
			}
		});

		it('Should throw an error when userId is empty', async () => {
			try {
				await createTodoService({ ...VALID_CREATE_TODO, user_id: '' });
			} catch (error) {
				const message = getTestErrorMessage(error);

				expect(message).toStrictEqual('Id is invalid.');
			}
		});

		it("Should throw an error when status is neither ['done', 'archived', 'upcoming']", async () => {
			const invalidStatus = 'nonsense' as TodoStatus;
			try {
				await createTodoService({
					...VALID_CREATE_TODO,
					status: invalidStatus,
				});
			} catch (error) {
				const message = getTestErrorMessage(error);

				expect(message).toStrictEqual(
					`Invalid enum value. Expected 'done' | 'archived' | 'upcoming', received '${invalidStatus}'`,
				);
			}
		});
	});
});
