'use client';

import { Dropdown } from 'react-bootstrap';
import { TodoStatus } from '../types/todo-type';
import { TODO_STATUS } from '../constants/todo-status';
import { Tag } from 'react-bootstrap-icons';

export type TodoStatusPickerProps = {
	activeType: TodoStatus;
	onChange: (status: TodoStatus) => void;
};

export const TodoStatusPicker = (props: TodoStatusPickerProps) => {
	const { activeType, onChange } = props;

	return (
		<Dropdown align="start">
			<Dropdown.Toggle
				variant="primary"
				className="d-flex align-items-center justify-content-center gap-1"
				style={{ textTransform: 'capitalize' }}
			>
				<Tag />
				{activeType}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{TODO_STATUS.map(status => (
					<Dropdown.Item
						key={status}
						as="button"
						active={activeType === status}
						onClick={() => onChange(status)}
						style={{ textTransform: 'capitalize' }}
					>
						{status}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};
