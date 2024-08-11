import { screen, render, userEvent } from '@/testing/tests-utils';
import { LoginForm } from '../login-form';
import { loginAction } from '../../actions/login-action';
import { useRouter } from 'next/navigation';
import { beforeEach, describe, it, expect, vi } from 'vitest';

vi.mock('../../actions/login-action', () => ({
	loginAction: vi.fn(),
}));
const mockedLoginAction = vi.mocked(loginAction);

vi.mock('next/navigation', () => {
	return {
		useRouter: vi.fn(),
	};
});
const mockedUseRouter = vi.mocked(useRouter);

describe('<LoginForm /> component', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe('Render', () => {
		describe('Form structure', () => {
			it('Should display the form title "Login Form" and subtitle "Login to continue to TooDoo"', () => {
				render(<LoginForm />);

				const formTitle = screen.getByText('Login Form');
				const formSubtitle = screen.getByText('Login to continue to TooDoo');

				expect(formTitle).toBeInTheDocument();
				expect(formSubtitle).toBeInTheDocument();
			});

			it('Should render the username and password input fields', () => {
				render(<LoginForm />);

				const usernameInput = screen.getByLabelText('Username', {
					selector: 'input',
				});
				const passwordInput = screen.getByLabelText('Password', {
					selector: 'input',
				});

				expect(usernameInput).toBeInTheDocument();
				expect(passwordInput).toBeInTheDocument();
			});

			it('Should render the login button and is disabled by default', () => {
				render(<LoginForm />);

				const loginButton = screen.getByRole('button', {
					name: 'Login',
				});

				expect(loginButton).toBeInTheDocument();
				expect(loginButton).toBeDisabled();
			});

			it('Should render the "Register here" link', () => {
				render(<LoginForm />);

				const registerLink = screen.getByRole('link', {
					name: 'Register here.',
				});

				expect(registerLink).toBeInTheDocument();
			});
		});

		describe('Form validation', () => {
			it('Should show an error toast when the login fails', async () => {
				render(<LoginForm />);

				mockedLoginAction.mockResolvedValue({
					ok: false,
					message: 'Invalid username or password',
					data: null,
				});

				const usernameInput = screen.getByLabelText('Username', {
					selector: 'input',
				});
				const passwordInput = screen.getByLabelText('Password', {
					selector: 'input',
				});
				const loginButton = screen.getByRole('button', { name: 'Login' });

				await userEvent.type(usernameInput, 'test');
				await userEvent.type(passwordInput, '12345678');
				await userEvent.click(loginButton);

				const errorToast = await screen.findByText(
					'Invalid username or password',
				);

				expect(errorToast).toBeInTheDocument();
				expect(mockedLoginAction).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe('Behavior', () => {
		describe('Form submission', () => {
			it('Should show loading state on the "Login" button while the form is submitting', async () => {
				render(<LoginForm />);

				mockedLoginAction.mockImplementationOnce(() => {
					return new Promise(resolve => {
						setTimeout(() => {
							resolve({ ok: true, message: '', data: null });
						}, 1000);
					});
				});

				const usernameInput = screen.getByLabelText('Username', {
					selector: 'input',
				});
				const passwordInput = screen.getByLabelText('Password', {
					selector: 'input',
				});
				const loginButton = screen.getByRole('button', { name: 'Login' });

				await userEvent.type(usernameInput, 'test');
				await userEvent.type(passwordInput, '12345678');
				await userEvent.click(loginButton);

				expect(loginButton).toBeDisabled();
			});

			it('Should redirect to the homepage when login is successful', async () => {
				render(<LoginForm />);

				mockedLoginAction.mockReturnValue(
					new Promise(resolve => {
						resolve({ ok: true, message: '', data: null });
					}),
				);

				mockedUseRouter.mockReturnValue({
					push: vi.fn(),
				} as any);

				const usernameInput = screen.getByLabelText('Username', {
					selector: 'input',
				});
				const passwordInput = screen.getByLabelText('Password', {
					selector: 'input',
				});
				const loginButton = screen.getByRole('button', { name: 'Login' });

				await userEvent.type(usernameInput, 'test');
				await userEvent.type(passwordInput, '12345678');
				await userEvent.click(loginButton);

				expect(mockedUseRouter().push).toHaveBeenCalledWith('/');
			});

			it('Should disable the "Login" button when the form is invalid', async () => {
				render(<LoginForm />);

				mockedLoginAction.mockImplementationOnce(() => {
					return new Promise(resolve => {
						setTimeout(() => {
							resolve({ ok: true, message: '', data: null });
						}, 1000);
					});
				});

				const usernameInput = screen.getByLabelText('Username', {
					selector: 'input',
				});
				const passwordInput = screen.getByLabelText('Password', {
					selector: 'input',
				});
				const loginButton = screen.getByRole('button', { name: 'Login' });

				await userEvent.type(usernameInput, 't');
				await userEvent.type(passwordInput, '<3');

				expect(loginButton).toBeDisabled();
			});
		});
	});
});
