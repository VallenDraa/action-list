'use client';

import { getQueryClient } from '@/lib/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export type ProvidersProps = {
	children: React.ReactNode;
};

export const Providers = (props: ProvidersProps) => {
	// NOTE: Avoid useState when initializing the query client if you don't
	//       have a suspense boundary between this and the code that may
	//       suspend because React will throw away the client on the initial
	//       render if it suspends and there is no boundary
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}

			{props.children}
		</QueryClientProvider>
	);
};
