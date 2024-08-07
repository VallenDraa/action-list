import {
	createSearchParamsCache,
	parseAsInteger,
	parseAsString,
} from 'nuqs/server';

export const dataQuerySearchParams = {
	search: parseAsString.withDefault(''),
	page: parseAsInteger.withDefault(1),
};

export const dataQueryParamsCache = createSearchParamsCache(
	dataQuerySearchParams,
);
