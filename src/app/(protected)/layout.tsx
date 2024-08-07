import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { validateRequestWithRedirect } from '@/lib/lucia';

export type ProtectedLayoutProps = {
	children: React.ReactNode;
};

// TODO: validate session via middleware. Lucia docs doesn't show how to do this, so still need more research.
export default async function ProtectedLayout(props: ProtectedLayoutProps) {
	await validateRequestWithRedirect();

	return (
		<Container fluid>
			<Row className="justify-content-center min-vh-100">
				<Col sm={11} md={8} lg={6} xl={5} className="d-flex flex-column">
					<Row className="flex-fill">
						<Col className="d-flex flex-column">{props.children}</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}
