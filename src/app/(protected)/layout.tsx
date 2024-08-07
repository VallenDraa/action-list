import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { validateRequestWithRedirect } from '@/lib/lucia';
import { CreateTodoButton } from '@/features/todos/components/create-todo-button';

export type ProtectedLayoutProps = {
	children: React.ReactNode;
};

// TODO: validate session via middleware. Lucia docs doesn't show how to do this, so still need more research.
export default async function ProtectedLayout(props: ProtectedLayoutProps) {
	const { user } = await validateRequestWithRedirect();
	const stringUserId = user.id.toString();

	return (
		<Container fluid>
			<Row className="justify-content-center min-vh-100">
				<Col
					sm={11}
					md={8}
					lg={6}
					xl={5}
					className="d-flex flex-column position-relative"
				>
					<Row className="flex-fill">
						<Col>{props.children}</Col>
					</Row>

					<CreateTodoButton userId={stringUserId} />
				</Col>
			</Row>
		</Container>
	);
}
