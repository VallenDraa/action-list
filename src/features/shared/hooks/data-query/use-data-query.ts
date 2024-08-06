'use client';

import { useQueryStates } from 'nuqs';
import { dataQuerySearchParams } from './data-query-params-cache';

export const useDataQuery = () => {
	const [dataQuery, setDataQuery] = useQueryStates(dataQuerySearchParams);

	return { dataQuery, setDataQuery };
};
