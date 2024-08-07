'use client';

import { Dropdown } from 'react-bootstrap';
import { TODO_FILTERS } from '../constants/todo-filter';
import { TodoFilter } from '../types/get-todos-type';

export type TodoTypeFilterProps = {
	activeFilter: TodoFilter;
	onChange: (filter: TodoFilter) => void;
};

export const TodoTypeFilter = (props: TodoTypeFilterProps) => {
	const { activeFilter, onChange } = props;

	return (
		<Dropdown align="end">
			<Dropdown.Toggle variant="primary">{activeFilter}</Dropdown.Toggle>

			<Dropdown.Menu>
				{TODO_FILTERS.map(filter => (
					<Dropdown.Item
						key={filter}
						as="button"
						active={activeFilter === filter}
						onClick={() => onChange(filter)}
					>
						{filter}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};
