'use client';

import { Dropdown } from 'react-bootstrap';
import { TodoStatus } from '../types/todo-type';
import { TODO_STATUS } from '../constants/todo-status';

export type TodoStatusPickerProps = {
	activeType: TodoStatus;
	onChange: (status: TodoStatus) => void;
};

export const TodoStatusPicker = (props: TodoStatusPickerProps) => {
	const { activeType, onChange } = props;

	return (
		<Dropdown align="end">
			<Dropdown.Toggle variant="primary">{activeType}</Dropdown.Toggle>

			<Dropdown.Menu>
				{TODO_STATUS.map(status => (
					<Dropdown.Item
						key={status}
						as="button"
						active={activeType === status}
						onClick={() => onChange(status)}
					>
						{status}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};
