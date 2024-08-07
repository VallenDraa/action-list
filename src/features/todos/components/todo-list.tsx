import Row from 'react-bootstrap/Row';
import React from 'react';

export type TodoListProps = {
	children: React.ReactNode;
};

export const TodoList = (props: TodoListProps) => {
	const { children } = props;

	return (
		<Row as="ul" className="g-2 list-unstyled">
			{children}
		</Row>
	);
};
