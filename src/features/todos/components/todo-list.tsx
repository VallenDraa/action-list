import React from 'react';
import Row from 'react-bootstrap/Row';
import clsx from 'clsx';

export type TodoListProps = {
	children: React.ReactNode;
	className?: string;
};

export const TodoList = (props: TodoListProps) => {
	const { children, className } = props;

	return (
		<Row as="ul" className={clsx('g-2 list-unstyled ', className)}>
			{children}
		</Row>
	);
};
