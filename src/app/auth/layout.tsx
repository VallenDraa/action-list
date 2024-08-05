import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export type AuthLayoutProps = {
	children: React.ReactNode;
};

export default async function AuthLayout(props: AuthLayoutProps) {
	return (
		<Container fluid>
			<Row className="align-items-center justify-content-center min-vh-100">
				<Col sm={10} md={8} lg={5} xl={4}>
					{props.children}
				</Col>
			</Row>
		</Container>
	);
}
