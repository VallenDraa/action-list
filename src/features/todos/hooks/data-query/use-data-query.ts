'use client';

import * as React from 'react';
import { useQueryStates } from 'nuqs';
import { dataQuerySearchParams } from './data-query-params-cache';

export const useDataQuery = () => {
	const [dataQuery, setDataQuery] = useQueryStates(dataQuerySearchParams);

	React.useEffect(() => {
		if (dataQuery.page < 1) {
			setDataQuery(prev => ({ ...prev, page: 1 }));
		}
	}, [dataQuery, setDataQuery]);

	return { dataQuery, setDataQuery };
};
