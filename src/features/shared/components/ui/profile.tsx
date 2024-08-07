'use client';

import { logoutAction } from '@/features/auth/actions/logout-action';
import Dropdown from 'react-bootstrap/Dropdown';

// TODO: Correct the type for user in lucia.ts, so that the object property are typed properly
export type ProfileProps = {
	user: { username: string };
};

export const Profile = (props: ProfileProps) => {
	const { user } = props;

	const handleLogout = async () => {
		try {
			await logoutAction();
		} catch (error) {
			// TODO: Add error handling for logout handler
			console.error('🚀 ~ handleLogout ~ error:', error);
		}
	};

	return (
		<Dropdown align="end">
			<Dropdown.Toggle
				variant="light"
				size="sm"
				className="d-flex align-items-center gap-2"
			>
				<p className="m-0 text-muted">{user.username}</p>
				<div
					className="rounded-circle border-1 border-secondary bg-secondary-subtle d-flex justify-content-center align-items-center"
					style={{ width: '2rem', height: '2rem' }}
				>
					{user.username.slice(0, 2)}
				</div>
			</Dropdown.Toggle>
			<Dropdown.Menu>
				<Dropdown.Item as="button" onClick={handleLogout}>
					Logout
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};
