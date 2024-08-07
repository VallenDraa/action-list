'use client';

import { Dropdown } from 'react-bootstrap';
import { TODO_FILTERS } from '../constants/todo-filter';
import { TodoFilter } from '../types/get-todos-type';
import { Filter } from 'react-bootstrap-icons';

export type TodoStatusFilterProps = {
	activeType: TodoFilter;
	onChange: (filter: TodoFilter) => void;
};

export const TodoStatusFilter = (props: TodoStatusFilterProps) => {
	const { activeType, onChange } = props;

	return (
		<Dropdown align="end">
			<Dropdown.Toggle
				variant="primary"
				className="d-flex align-items-center justify-content-center gap-1"
				style={{ textTransform: 'capitalize' }}
			>
				<Filter />
				{activeType}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{TODO_FILTERS.map(filter => (
					<Dropdown.Item
						key={filter}
						as="button"
						active={activeType === filter}
						onClick={() => onChange(filter)}
						style={{ textTransform: 'capitalize' }}
					>
						{filter}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};
