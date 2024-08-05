import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export type AuthLayoutProps = {
	children: React.ReactNode;
};

export default function AuthLayout(props: AuthLayoutProps) {
	return (
		<Container fluid>
			<Row>
				<Col>{props.children}</Col>
			</Row>
		</Container>
	);
}
