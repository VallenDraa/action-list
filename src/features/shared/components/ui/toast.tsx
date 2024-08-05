import * as React from 'react';
import { ToastContainer } from 'react-bootstrap';
import { ToastPosition } from 'react-bootstrap/esm/ToastContainer';
import BsToast, { ToastProps as BsToastProps } from 'react-bootstrap/Toast';

export type ToastProps = BsToastProps & {
	title?: string;
	html?: string;
	message?: string;
	position?: ToastPosition;
};

export const Toast = (props: ToastProps) => {
	const { title, message, html, position = 'bottom-center', ...rest } = props;

	return (
		<ToastContainer position={position} className="mb-2">
			<BsToast {...rest}>
				<BsToast.Header>
					<strong className="me-auto">Info</strong>
				</BsToast.Header>
				<BsToast.Body
					dangerouslySetInnerHTML={{ __html: html || message || '' }}
				/>
			</BsToast>
		</ToastContainer>
	);
};
