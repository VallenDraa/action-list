import { dbConnect } from '@/lib/mongoose';
import { resetTestDb } from '@/testing/db';
import { createTodoService } from '../create-todo-service';
import { VALID_CREATE_TODO } from '@/testing/tests-constants';
import { deleteTodoService } from '../delete-todo-service';
import mongoose from 'mongoose';

describe('Delete Todo Service', () => {
	let todoId: string;

	beforeAll(async () => {
		await resetTestDb(await dbConnect({ uri: process.env.MONGO_URI! }));
		const newTodo = await createTodoService(VALID_CREATE_TODO);

		todoId = newTodo._id;
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
