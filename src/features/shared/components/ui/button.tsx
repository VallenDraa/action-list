'use client';

import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import BsButton, { ButtonProps as BsButtonProps } from 'react-bootstrap/Button';

export type ButtonProps = BsButtonProps & {
	loading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		const { loading, children, disabled, ...rest } = props;

		return (
			<BsButton disabled={disabled || loading} {...rest} ref={ref}>
				{loading && (
					<Spinner size="sm" animation="border" role="status" className="me-2">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				)}
				{children}
			</BsButton>
		);
	},
);

Button.displayName = 'Button';
