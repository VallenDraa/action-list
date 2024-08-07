import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodosQueryOptions } from './get-todos-query';
import { GetTodosActionQuery } from '../types/get-todos-type';
import { MutationConfig } from '@/lib/react-query';
import { deleteTodoAction } from '../actions/delete-todo-action';

type UseDeleteTodoOptions = {
	userId: string;
	todosSearchQuery: GetTodosActionQuery;
	mutationConfig?: MutationConfig<typeof deleteTodoAction>;
};

export const useDeleteTodo = ({
	userId,
	todosSearchQuery,
	mutationConfig,
}: UseDeleteTodoOptions) => {
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
		mutationFn: deleteTodoAction,
	});
};
