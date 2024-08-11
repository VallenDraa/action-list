import { render, screen, userEvent, waitFor } from '@/testing/tests-utils';
import { TodoSearchBar } from '../todo-search-bar';
import { describe, it, expect, vi } from 'vitest';

describe('<TodoSearchBar/> Component', () => {
	describe('Render', () => {
		it('Should render the search bar with a placeholder', () => {
			render(<TodoSearchBar search="" onChange={() => {}} />);

			const searchBar = screen.getByPlaceholderText('Search your todo');

			expect(searchBar).toBeInTheDocument();
		});
	});

	describe('Behavior', () => {
		it('Should type changes immediately and call onChange after 300ms', async () => {
			const mockOnChange = vi.fn();

			render(<TodoSearchBar search="" onChange={mockOnChange} />);

			const searchBar = screen.getByPlaceholderText('Search your todo');

			const newValue = 'Hello World';
			await userEvent.type(searchBar, newValue);
			expect((searchBar as HTMLInputElement).value).toStrictEqual(newValue);

			waitFor(
				() => {
					expect(mockOnChange).toHaveBeenCalledOnce();
					expect(mockOnChange).toHaveBeenCalledWith(newValue);
				},
				{ timeout: 500 },
			);
		});
	});
});
