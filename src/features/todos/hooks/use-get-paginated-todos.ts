import * as React from 'react';
import { useGetTodos } from '../query/get-todos-query';
import { GetTodosActionQuery, TodoFilter } from '../types/get-todos-type';

export const useGetPaginatedTodos = (
	userId: string,
	dataQuery: GetTodosActionQuery,
) => {
	const [pages, setPages] = React.useState<number[]>([]);
	const [totalData, setTotalData] = React.useState(0);
	const [totalPages, setTotalPages] = React.useState(0);

	const { data, ...rest } = useGetTodos({
		userId,
		todosSearchQuery: dataQuery,
	});

	React.useEffect(() => {
		if (data?.pagination.pages) {
			setPages(data.pagination.pages);
		}
	}, [data?.pagination.pages]);

	React.useEffect(() => {
		if (data?.pagination.totalData) {
			setTotalData(data.pagination.totalData);
		}
	}, [data?.pagination.totalData]);

	React.useEffect(() => {
		if (data?.pagination.totalPages) {
			setTotalPages(data.pagination.totalPages);
		}
	}, [data?.pagination.totalPages]);

	return { data, pages, totalData, totalPages, ...rest };
};
