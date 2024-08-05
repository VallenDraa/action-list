'use client';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { loginAction } from '../actions/login-action';
import React from 'react';
import { Toast } from '@/features/shared/components/ui/toast';
import { useForm } from 'react-hook-form';
import { Login } from '../types/auth-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginValidator } from '../validators/auth-validator';
import { getErrorMessage } from '@/features/shared/utils/get-error-message';
import { Button } from '@/features/shared/components/ui/button';
import Link from 'next/link';

export const LoginForm = () => {
	const [toastMessage, setToastMessage] = React.useState<string | null>(null);
	const [toastType, setToastType] = React.useState<string>('light');

	const form = useForm<Login>({
		defaultValues: { username: '', password: '' },
		resolver: zodResolver(loginValidator),
	});

	const onSubmit = async (data: Login) => {
		try {
			const response = await loginAction(data);

			setToastType(!response.ok ? 'danger' : 'light');
			setToastMessage(response.message);
		} catch (error) {
			setToastType('danger');
			setToastMessage(getErrorMessage(error));
		}
	};

	return (
		<>
			<Toast
				bg={toastType}
				animation={false}
				show={toastMessage !== null}
				onClose={() => setToastMessage(null)}
				html={`<pre>${toastMessage}</pre>`}
			/>

			<Card>
				<Card.Body>
					<div className="text-center">
						<Card.Title className="fs-4 fw-bold mb-3">Login Form</Card.Title>
						<Card.Subtitle className="text-muted">
							Login to continue to TooDoo
						</Card.Subtitle>
					</div>

					<Form onSubmit={form.handleSubmit(onSubmit)} className="my-4">
						<Form.Group className="mb-3" controlId="formBasicUsername">
							<Form.Label>Username</Form.Label>
							<Form.Control
								{...form.register('username')}
								name="username"
								type="username"
								placeholder="Enter email"
							/>

							{form.getFieldState('username').error?.message && (
								<Form.Text className="text-danger">
									{form.getFieldState('username').error?.message}
								</Form.Text>
							)}
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								{...form.register('password')}
								name="password"
								type="password"
								placeholder="Password"
							/>

							{form.getFieldState('password').error?.message && (
								<Form.Text className="text-danger">
									{form.getFieldState('password').error?.message}
								</Form.Text>
							)}
						</Form.Group>

						<Button
							disabled={!form.formState.isValid}
							loading={form.formState.isSubmitting}
							className="d-block w-100"
							variant="primary"
							type="submit"
						>
							Login
						</Button>
					</Form>

					<div className="d-flex align-align-items-center justify-content-center gap-1">
						<p>Don&apos;t have an account? </p>
						<Link href="/auth/register" className="w-auto p-0 btn btn-link">
							Register here.
						</Link>
					</div>
				</Card.Body>
			</Card>
		</>
	);
};
