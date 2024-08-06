import { TodoModel } from '../models/todo-model';
import { GetTodosActionQuery } from '../types/get-todos-type';

export const getTodosService = async (
	userId: string,
	getTodosQuery: GetTodosActionQuery,
) => {
	const allUserTodosLength = await TodoModel.countDocuments({
		user_id: userId,
	});

	let query: any = {
		user_id: userId,
		$and: [
			{
				$or: [
					{ title: { $regex: getTodosQuery.search, $options: 'i' } },
					{ description: { $regex: getTodosQuery.search, $options: 'i' } },
				],
			},
		],
	};

	switch (getTodosQuery.type) {
		case 'done':
			query.$and.push({ is_done: true, is_archived: false });
			break;
		case 'archived':
			query.$and.push({ is_archived: true, is_done: false });
			break;

		case 'all':
		default:
			query.$and.push({ is_done: true, is_archived: true });
			break;
	}

	const todos = await TodoModel.find(query).lean();

	return { todos, totalData: allUserTodosLength };
};
