import { generatePages } from '@/features/shared/utils/generate-pages';
import { TodoModel } from '../models/todo-model';
import { GetTodosActionQuery } from '../types/get-todos-type';

export const getTodosService = async (
	userId: string,
	{ limit = 8, page = 1, search = '', type = 'all' }: GetTodosActionQuery,
) => {
	const allUserTodosLength = await TodoModel.countDocuments({
		user_id: userId,
	});

	const todoTypeQuery =
		type === 'all'
			? {}
			: { is_archived: type === 'archived', is_done: type === 'done' };

	const todos = await TodoModel.find({
		user_id: userId,
		$and: [
			{
				$or: [
					{ title: { $regex: search, $options: 'i' } },
					{ description: { $regex: search, $options: 'i' } },
				],
			},
			todoTypeQuery,
		],
	})
		.limit(limit ?? 8)
		.skip((page - 1) * limit)
		.lean();

	return {
		todos: todos.map(todo => {
			todo._id = todo._id.toString();
			todo.user_id = todo.user_id.toString();

			return todo;
		}),
		totalData: allUserTodosLength,
		pages: generatePages({
			visiblePages: 5,
			currentLimit: limit,
			currentPage: page,
			totalPages: Math.ceil(allUserTodosLength / limit),
		}),
	};
};
