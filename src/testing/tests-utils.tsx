import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { RenderOptions, render as rtlRender } from '@testing-library/react';
import { Providers } from '@/features/shared/components/providers';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';

const render = (ui: React.ReactNode, options: RenderOptions = {}) => {
	return rtlRender(ui, {
		wrapper: Providers,
		...options,
	});
};

export function doNothingForMsFn<T>(ms: number) {
	return (..._args: T[]) => new Promise<void>(res => setTimeout(res, ms));
}

export const getTestErrorMessage = getErrorMessage;

export * from '@testing-library/react';
// override React Testing Library's render with our own
export { render, userEvent };
