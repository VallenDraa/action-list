import { validateRequest } from '@/lib/lucia';
import { redirect } from 'next/navigation';
import React from 'react';

export type ProtectedLayoutProps = {
	children: React.ReactNode;
};

// TODO: validate session via middleware. Lucia docs doesn't show how to do this, so still need more research.
export default async function ProtectedLayout(props: ProtectedLayoutProps) {
	const { user } = await validateRequest();

	return user ? <>{props.children}</> : redirect('/auth/login');
}
