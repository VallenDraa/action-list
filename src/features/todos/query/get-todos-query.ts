import { QueryClient, queryOptions, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { getTodosAction } from '../actions/get-todos-action';
import { GetTodosActionQuery } from '../types/get-todos-type';

export const TODOS_QUERY_KEY = 'todos';

export const getTodosQueryOptions = (
	userId: string,
	todosSearchQuery: GetTodosActionQuery = {},
) => {
	return queryOptions({
		queryKey: [TODOS_QUERY_KEY, todosSearchQuery],
		queryFn: async () => {
			return getTodosAction(userId, todosSearchQuery);
		},
	});
};

export type UseGetTodosOptions = {
	userId: string;
	todosSearchQuery: GetTodosActionQuery;
	queryConfig?: QueryConfig<typeof getTodosQueryOptions>;
};

export const useGetTodos = ({
	userId,
	todosSearchQuery,
	queryConfig,
}: UseGetTodosOptions) => {
	return useQuery({
		...getTodosQueryOptions(userId, todosSearchQuery),
		...queryConfig,
	});
};

export const prefetchGetTodos = async (
	queryClient: QueryClient,
	{ userId, todosSearchQuery, queryConfig }: UseGetTodosOptions,
) => {
	await queryClient.prefetchQuery({
		...getTodosQueryOptions(userId, todosSearchQuery),
		...queryConfig,
	});

	return queryClient;
};
