'use client';

import { useEditTodo } from '../query/edit-todo-query';
import * as React from 'react';
import { useDeleteTodo } from '../query/delete-todo-query';
import { GetTodosActionQuery } from '../types/get-todos-type';
import { Todo } from '../types/todo-type';

export const useUpdateTodo = (
	userId: string,
	todosSearchQuery: GetTodosActionQuery,
) => {
	const { mutateAsync: editTodo } = useEditTodo({
		userId,
		todosSearchQuery,
	});
	const { mutateAsync: deleteTodo } = useDeleteTodo({
		userId,
		todosSearchQuery,
	});

	const handleEditTodo = React.useCallback(
		async (editedTodo: Todo) => {
			try {
				await editTodo({ todoId: editedTodo._id, todo: editedTodo });
			} catch (error) {
				// TODO: handle error on ArchiveTodo handler
				console.error('🚀 ~ handleToggleArchiveTodo ~ error:', error);
			}
		},
		[editTodo],
	);

	const handleDeleteTodo = React.useCallback(
		async (todoId: string) => {
			try {
				await deleteTodo(todoId);
			} catch (error) {
				// TODO: handle error on DeleteTodo handler
				console.error('🚀 ~ handleDeleteTodo ~ error:', error);
			}
		},
		[deleteTodo],
	);

	return { handleEditTodo, handleDeleteTodo };
};
