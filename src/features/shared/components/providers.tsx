'use client';

import { SSRProvider } from 'react-bootstrap';

export type ProvidersProps = {
	children: React.ReactNode;
};

export const Providers = (props: ProvidersProps) => {
	return <SSRProvider>{props.children}</SSRProvider>;
};
