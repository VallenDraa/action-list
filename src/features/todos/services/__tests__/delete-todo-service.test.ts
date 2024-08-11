import { createTodoService } from '../create-todo-service';
import { VALID_CREATE_TODO } from '@/testing/tests-constants';
import { deleteTodoService } from '../delete-todo-service';
import mongoose from 'mongoose';
import { TodoModel } from '../../models/todo-model';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

describe('Delete Todo Service', () => {
	let todoId: string;

	beforeAll(async () => {
		const newTodo = await createTodoService(VALID_CREATE_TODO);

		todoId = newTodo._id;
	});

	afterAll(async () => {
		await TodoModel.deleteOne({ _id: todoId });
	});

	describe('Valid', () => {
		it('Should not throw error when todo with the given id exists.', async () => {
			await expect(deleteTodoService(todoId)).resolves.not.toThrow();
		});
	});

	describe('Invalid', () => {
		it('Should not throw error when todo with the given id exists.', async () => {
			const nonExistentId = new mongoose.Types.ObjectId();

			await expect(
				deleteTodoService(nonExistentId.toString()),
			).rejects.toThrowError('Todo not found!');
		});
	});
});
