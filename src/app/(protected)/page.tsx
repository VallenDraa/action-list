import { TodosSection } from '@/features/todos/components/todos-section';
import { dataQueryParamsCache } from '@/features/todos/hooks/data-query/data-query-params-cache';
import { prefetchGetTodos } from '@/features/todos/query/get-todos-query';
import { validateRequestWithRedirect } from '@/lib/lucia';
import { getQueryClient } from '@/lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function ActiveTodosPage({
	searchParams,
}: {
	searchParams: Record<string, string | string[] | undefined>;
}) {
	const { limit, page, search } = dataQueryParamsCache.parse(searchParams);
	const { user } = await validateRequestWithRedirect();

	const queryClient = getQueryClient();
	await prefetchGetTodos(queryClient, {
		userId: user.id.toString(),
		todosSearchQuery: { limit, page, search, type: 'all' },
	});

	const stringUserId = user.id.toString();

	return (
		<>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<TodosSection userId={stringUserId} />
			</HydrationBoundary>
		</>
	);
}
