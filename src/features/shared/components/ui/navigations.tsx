'use client';

import { NAVIGATIONS_LINKS } from '@/features/todos/constants/navigation-links';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';

export const Navigations = () => {
	return (
		<Nav justify variant="tabs" defaultActiveKey={NAVIGATIONS_LINKS[0].label}>
			{NAVIGATIONS_LINKS.map(link => (
				<Nav.Item key={link.label}>
					<Nav.Link as="span">
						<Link href={link.href}>{link.label}</Link>
					</Nav.Link>
				</Nav.Item>
			))}
		</Nav>
	);
};
