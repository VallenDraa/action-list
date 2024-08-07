'use client';

import { Dropdown } from 'react-bootstrap';
import { TODO_FILTERS } from '../constants/todo-filter';
import { TodoFilter } from '../types/get-todos-type';

export type TodoStatusFilterProps = {
	activeType: TodoFilter;
	onChange: (filter: TodoFilter) => void;
};

export const TodoStatusFilter = (props: TodoStatusFilterProps) => {
	const { activeType, onChange } = props;

	return (
		<Dropdown align="end">
			<Dropdown.Toggle variant="primary">{activeType}</Dropdown.Toggle>

			<Dropdown.Menu>
				{TODO_FILTERS.map(filter => (
					<Dropdown.Item
						key={filter}
						as="button"
						active={activeType === filter}
						onClick={() => onChange(filter)}
					>
						{filter}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};
