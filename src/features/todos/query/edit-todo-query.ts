import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodosQueryOptions } from './get-todos-query';
import { GetTodosActionQuery } from '../types/get-todos-type';
import { editTodoAction } from '../actions/edit-todo-action';
import { MutationConfig } from '@/lib/react-query';

type UseEditTodoOptions = {
	userId: string;
	todosSearchQuery: GetTodosActionQuery;
	mutationConfig?: MutationConfig<typeof editTodoAction>;
};

export const useEditTodo = ({
	userId,
	todosSearchQuery,
	mutationConfig,
}: UseEditTodoOptions) => {
	const { onSuccess, ...restConfig } = mutationConfig || {};

	const queryClient = useQueryClient();

	return useMutation({
		...restConfig,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({
				queryKey: getTodosQueryOptions(userId, todosSearchQuery).queryKey,
			});
			onSuccess?.(...args);
		},
		mutationFn: editTodoAction,
	});
};
