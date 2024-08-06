import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { createTodoAction } from '../actions/create-todo-action';
import { getTodosQueryOptions } from './get-todos-query';
import { GetTodosActionQuery } from '../types/get-todos-type';

type UseCreateTodoOptions = {
	userId: string;
	todosSearchQuery: GetTodosActionQuery;
	mutationConfig?: MutationConfig<typeof createTodoAction>;
};

export const useCreateTodo = ({
	userId,
	todosSearchQuery,
	mutationConfig,
}: UseCreateTodoOptions) => {
	const queryClient = useQueryClient();

	const { onSuccess, ...restConfig } = mutationConfig || {};

	return useMutation({
		onSuccess: (...args) => {
			queryClient.invalidateQueries({
				queryKey: getTodosQueryOptions(userId, todosSearchQuery).queryKey,
			});
			onSuccess?.(...args);
		},
		...restConfig,
		mutationFn: createTodoAction,
	});
};
