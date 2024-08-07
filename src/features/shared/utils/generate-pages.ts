export const generatePages = ({
	currentPage,
	totalPages,
	visiblePages = 5,
}: {
	currentLimit: number;
	currentPage: number;
	totalPages: number;
	visiblePages: number;
}) => {
	let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
	let endPage = Math.min(
		currentPage + Math.floor(visiblePages / 2),
		totalPages,
	);

	if (endPage - startPage + 1 < visiblePages) {
		if (startPage === 1) {
			endPage = Math.min(startPage + visiblePages - 1, totalPages);
		} else if (endPage === totalPages) {
			startPage = Math.max(endPage - visiblePages + 1, 1);
		}
	}

	return Array.from(
		{ length: endPage - startPage + 1 },
		(_, i) => startPage + i,
	);
};
