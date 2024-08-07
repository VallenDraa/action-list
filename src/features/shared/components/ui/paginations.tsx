'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Pagination from 'react-bootstrap/Pagination';

export type PaginationsProps = {
	totalPages: number;
	currentPage: number;
	pages: number[];
};

export const Paginations = (props: PaginationsProps) => {
	const { totalPages, currentPage, pages } = props;

	const searchParams = useSearchParams();
	const stringSearchParams = new URLSearchParams(searchParams).toString();

	return (
		<Pagination>
			<Pagination.Prev as={Link} href={`?page=${currentPage - 1 || 1}`} />

			{pages.map(page => (
				<Pagination.Item
					active={page === currentPage}
					as={Link}
					key={page}
					href={`?page=${page}`}
				>
					{page}
				</Pagination.Item>
			))}

			<Pagination.Next
				as={Link}
				href={`?page=${Math.min(currentPage + 1, totalPages)}`}
			/>
		</Pagination>
	);
};
