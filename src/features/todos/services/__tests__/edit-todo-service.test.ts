import { VALID_TODO } from '@/testing/tests-constants';
import { TODO_STATUS } from '../../constants/todo-status';
import { createTodoService } from '../create-todo-service';
import { getTestErrorMessage } from '@/testing/tests-utils';
import { TodoStatus } from '../../types/todo-type';
import { editTodoService } from '../edit-todo-service';
import { describe, it, expect, beforeAll } from 'vitest';

describe('Edit Todo Service', () => {
	const todos = TODO_STATUS.map(status => ({ ...VALID_TODO, status }));

	beforeAll(async () => {
		await createTodoService(VALID_TODO);
	});

	describe('Valid', () => {
		it.each(todos.map(todo => [todo.status, todo]))(
			'Should edit todo when inputs are valid and status is %s',
			async (_status, todo) => {
				const editedTodo = {
					...todo,
					title: 'edit service title',
					body: 'edit service body',
				};

				const { body, _id, status, title, user_id } = await editTodoService(
					editedTodo._id,
					editedTodo,
				);

				expect(_id).toStrictEqual(editedTodo._id);
				expect(body).toStrictEqual(editedTodo.body);
				expect(title).toStrictEqual(editedTodo.title);
				expect(status).toStrictEqual(editedTodo.status);
				expect(user_id).toStrictEqual(editedTodo.user_id);
			},
		);
	});

	describe('Invalid', () => {
		it('Should throw an error when title is empty', async () => {
			try {
				await editTodoService(VALID_TODO._id, { ...VALID_TODO, title: '' });
			} catch (error) {
				const message = getTestErrorMessage(error);

				expect(message).toStrictEqual('Title must not be empty.');
			}
		});

		it('Should throw an error when body is empty', async () => {
			try {
				await editTodoService(VALID_TODO._id, { ...VALID_TODO, body: '' });
			} catch (error) {
				const message = getTestErrorMessage(error);

				expect(message).toStrictEqual('Body must not be empty.');
			}
		});

		it('Should throw an error when userId is empty', async () => {
			try {
				await editTodoService(VALID_TODO._id, { ...VALID_TODO, user_id: '' });
			} catch (error) {
				const message = getTestErrorMessage(error);

				expect(message).toStrictEqual('Id is invalid.');
			}
		});

		it("Should throw an error when status is neither ['done', 'archived', 'upcoming']", async () => {
			const invalidStatus = 'nonsense' as TodoStatus;
			try {
				await editTodoService(VALID_TODO._id, {
					...VALID_TODO,
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
