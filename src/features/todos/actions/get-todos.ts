'use server';

import {
	PaginatedResponse,
	Response,
} from '@/features/shared/types/response-type';
import { TodoModel } from '../models/todo-model';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { idValidator } from '@/features/shared/validators/id-validator';
import { getTodoValidator } from '../validators/get-todos-validator';
import { GetTodosActionQuery } from '../types/get-todos-type';
import { Todo } from '../types/todo-type';
import { validateRequest } from '@/lib/lucia';

export async function getTodosAction(
	userId: string,
	{ limit = 10, page = 1, search = '' }: GetTodosActionQuery,
): Promise<PaginatedResponse<{ todos: Todo[] }> | Response<null>> {
	try {
		const { session } = await validateRequest();
		if (!session) {
			return { ok: false, message: 'Unauthorized', data: null };
		}

		const validatedUserId = await idValidator.parseAsync(userId);
		const validatedQuery = await getTodoValidator.parseAsync({
			limit,
			page,
			search,
		});

		const allUserTodosLength = await TodoModel.countDocuments({
			user_id: validatedUserId,
		});
		const todos = await TodoModel.find({
			user_id: validatedUserId,
			$or: [
				{ title: { $regex: validatedQuery.search, $options: 'i' } },
				{ description: { $regex: validatedQuery.search, $options: 'i' } },
			],
		}).lean();

		return {
			ok: true,
			message: 'Todos fetched successfully.',
			data: { todos },
			pagination: {
				limit,
				page,
				totalData: allUserTodosLength,
				totalPages: Math.ceil(allUserTodosLength / limit),
			},
		};
	} catch (error) {
		return { ok: false, message: getErrorMessage(error), data: null };
	}
}
