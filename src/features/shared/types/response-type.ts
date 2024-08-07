export type Response<T> = { ok: boolean; message: string; data: T };

export type Pagination = {
	limit: number;
	page: number;
	totalData: number;
	totalPages: number;
	pages: number[];
};

export type PaginatedResponse<T> = Response<T> & {
	pagination: Pagination;
};
