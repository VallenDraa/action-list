'use client';

import * as React from 'react';
import debounce from 'just-debounce';
import Form from 'react-bootstrap/Form';

export type TodoSearchBarProps = {
	search: string;
	onChange: (search: string) => void;
};

export const TodoSearchBar = (props: TodoSearchBarProps) => {
	const { search, onChange } = props;

	const [innerSearch, setInnerSearch] = React.useState(search);
	const debouncedSearchChange = React.useMemo(
		() => debounce((newSearch: string) => onChange(newSearch), 300),
		[onChange],
	);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const search = e.target.value;

		setInnerSearch(search);
		debouncedSearchChange(search);
	};

	return (
		<Form.Control
			type="search"
			value={innerSearch}
			onChange={handleSearchChange}
			placeholder="Search your todo"
		/>
	);
};
