import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Navigations } from '@/features/shared/components/ui/navigations';
import { validateRequestWithRedirect } from '@/lib/lucia';
import { CreateTodoButton } from '@/features/todos/components/create-todo/create-todo-button';

export type ProtectedLayoutProps = {
	children: React.ReactNode;
};

// TODO: validate session via middleware. Lucia docs doesn't show how to do this, so still need more research.
export default async function ProtectedLayout(props: ProtectedLayoutProps) {
	await validateRequestWithRedirect();

	return (
		<Container fluid>
			<Row className="justify-content-center min-vh-100">
				<Col sm={10} md={8} lg={5} xl={4} className="d-flex flex-column">
					<Row className="flex-fill">
						<Col>{props.children}</Col>
					</Row>

					<Row>
						<Col>
							<Navigations />
						</Col>
					</Row>

					<CreateTodoButton />
				</Col>
			</Row>
		</Container>
	);
}
