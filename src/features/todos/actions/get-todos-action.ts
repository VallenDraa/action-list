'use server';

import { PaginatedResponse } from '@/features/shared/types/response-type';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { GetTodosActionQuery } from '../types/get-todos-type';
import { Todo } from '../types/todo-type';
import { validateRequest } from '@/lib/lucia';
import { dbConnect } from '@/lib/mongoose';
import { getTodosService } from '../services/get-todos-service';

export async function getTodosAction(
	userId: string,
	{ limit = 8, page = 1, search = '', type = 'all' }: GetTodosActionQuery,
): Promise<PaginatedResponse<{ todos: Todo[] } | null>> {
	try {
		await dbConnect();

		const { session } = await validateRequest();
		if (!session) {
			throw new Error('Unauthorized!');
		}

		const { todos, totalData, totalPages, pages } = await getTodosService(
			userId,
			{ limit, page, search, type },
		);

		return {
			ok: true,
			message: 'Todos fetched successfully.',
			data: { todos },
			pagination: { pages, limit, page, totalData, totalPages },
		};
	} catch (error) {
		return {
			ok: false,
			message: getErrorMessage(error),
			data: null,
			pagination: { limit, page, totalData: 0, totalPages: 0, pages: [] },
		};
	}
}
