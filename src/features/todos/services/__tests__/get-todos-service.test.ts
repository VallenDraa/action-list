import { createTodoService } from '../create-todo-service';
import { getTodosService } from '../get-todos-service';
import { makeValidCreateUser } from '@/testing/db/users';
import { Todo, TodoStatus } from '../../types/todo-type';
import { registerService } from '@/features/auth/services/register-service';
import { makeValidTodos } from '@/testing/db/todos';
import { PasswordLessUser } from '@/features/auth/types/user-type';
import { UserModel } from '@/features/auth/models/user-model';
import { TodoModel } from '../../models/todo-model';
import { TODO_STATUS } from '../../constants/todo-status';
import { createObjectId } from '@/testing/db';
import { getTestErrorMessage } from '@/testing/tests-utils';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('getTodosService', () => {
	const user = makeValidCreateUser('get-todos-service-user');
	let userWithId: PasswordLessUser;
	const todos: Todo[] = [];

	const totalSearchableTodos = 10;
	const searchKeyword = `Search me please`;

	beforeAll(async () => {
		const { user: registeredUser } = await registerService(user);

		userWithId = registeredUser;
		todos.push(
			...makeValidTodos({
				amount: 50,
				dataPerIndex: Array.from({ length: 50 }, (_, i) => {
					const baseTodo = {
						user_id: registeredUser._id,
						status: TODO_STATUS[Math.floor(Math.random() * TODO_STATUS.length)],
					};

					// Create 10 todos for the search todo query test
					if (i < totalSearchableTodos) {
						return {
							...baseTodo,
							title: searchKeyword,
							description: `Description of todo ${i + 1}`,
						};
					} else {
						return baseTodo;
					}
				}),
			}),
		);

		await Promise.allSettled(todos.map(todo => createTodoService(todo)));
	});

	afterAll(async () => {
		await Promise.allSettled([
			UserModel.deleteOne({ username: userWithId.username }),
			TodoModel.deleteMany({ user_id: userWithId._id }),
		]);
	});

	describe('Valid', () => {
		it('Should return todos with pagination when inputs are valid', async () => {
			const { todos, totalData, totalPages } = await getTodosService(
				userWithId._id,
				{},
			);

			expect(todos.length).toBe(8);
			expect(totalData).toBe(50);
			expect(totalPages).toBe(Math.ceil(50 / 8));
		});

		it('Should handle empty todos when there are no matching results', async () => {
			const { todos, totalData, totalPages } = await getTodosService(
				userWithId._id,
				{
					search: 'nonexistent todos',
				},
			);

			expect(todos.length).toBe(0);
			expect(totalData).toBe(0);
			expect(totalPages).toBe(1);
		});

		it.each([1, 2, 3, 4, 5, 6, 7])(
			'Should return page %i and return correct data with the correct amount',
			async page => {
				const { todos, totalData, totalPages } = await getTodosService(
					userWithId._id,
					{ page },
				);

				expect(todos.length).toBe(page === 7 ? 2 : 8);
				expect(totalData).toBe(50);
				expect(totalPages).toBe(7);
			},
		);

		it.each(TODO_STATUS)(
			'Should only return todos with %s status',
			async status => {
				const { totalData: totalTodosWithStatus } = await getTodosService(
					userWithId._id,
					{ type: status },
				);

				const todoMockDataWithStatus = todos.filter(
					todo => todo.status === status,
				);

				expect(totalTodosWithStatus).toBe(todoMockDataWithStatus.length);
			},
		);

		it('Should filter todos by search query when specified', async () => {
			const { totalData } = await getTodosService(userWithId._id, {
				search: searchKeyword,
			});

			expect(totalData).toBe(totalSearchableTodos);
		});
	});

	describe('Invalid', () => {
		it('Should throw an error if the user does not exist', async () => {
			const nonexistentUserId = createObjectId().toString();

			await expect(getTodosService(nonexistentUserId, {})).rejects.toThrowError(
				'User not found',
			);
		});

		it('Should throw an error if the page query parameter is invalid', async () => {
			try {
				await getTodosService(userWithId._id, {
					page: '3232' as unknown as number,
				});
			} catch (error) {
				const message = getTestErrorMessage(error);

				expect(message).toStrictEqual('Page must be a number.');
			}
		});

		it('Should throw an error if the limit query parameter is invalid', async () => {
			try {
				await getTodosService(userWithId._id, {
					limit: '3232' as unknown as number,
				});
			} catch (error) {
				const message = getTestErrorMessage(error);

				expect(message).toStrictEqual('Limit must be a number.');
			}
		});

		it('Should throw an error if the type query parameter is invalid', async () => {
			const invalidStatus = 'nonexistent-status' as unknown as TodoStatus;

			try {
				await getTodosService(userWithId._id, { type: invalidStatus });
			} catch (error) {
				const message = getTestErrorMessage(error);

				expect(message).toStrictEqual(
					`Invalid enum value. Expected 'done' | 'archived' | 'all' | 'upcoming', received '${invalidStatus}'`,
				);
			}
		});
	});
});
