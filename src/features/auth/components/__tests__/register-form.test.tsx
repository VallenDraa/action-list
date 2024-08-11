import { screen, render, userEvent } from '@/testing/tests-utils';
import { RegisterForm } from '../register-form';
import { registerAction } from '../../actions/register-action';
import { useRouter } from 'next/navigation';
import { beforeEach, describe, it, expect, vi } from 'vitest';

vi.mock('../../actions/register-action', () => ({
	registerAction: vi.fn(),
}));
const mockedRegisterAction = vi.mocked(registerAction);

vi.mock('next/navigation', () => {
	return {
		useRouter: vi.fn(),
	};
});
const mockedUseRouter = vi.mocked(useRouter);

describe('<RegisterForm /> component', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe('Render', () => {
		describe('Form structure', () => {
			it('Should display the form title "Register Form" and subtitle "Register to continue to TooDoo"', () => {
				render(<RegisterForm />);

				const formTitle = screen.getByText('Register Form');
				const formSubtitle = screen.getByText('Register to continue to TooDoo');

				expect(formTitle).toBeInTheDocument();
				expect(formSubtitle).toBeInTheDocument();
			});

			it('Should render the username and password input fields', () => {
				render(<RegisterForm />);

				const usernameInput = screen.getByLabelText('Username', {
					selector: 'input',
				});
				const passwordInput = screen.getByLabelText('Password', {
					selector: 'input',
				});

				expect(usernameInput).toBeInTheDocument();
				expect(passwordInput).toBeInTheDocument();
			});

			it('Should render the register button and is disabled by default', () => {
				render(<RegisterForm />);

				const registerButton = screen.getByRole('button', {
					name: 'Register',
				});

				expect(registerButton).toBeInTheDocument();
				expect(registerButton).toBeDisabled();
			});

			it('Should render the "Register here" link', () => {
				render(<RegisterForm />);

				const registerLink = screen.getByRole('link', {
					name: 'Login here.',
				});

				expect(registerLink).toBeInTheDocument();
			});
		});

		describe('Form validation', () => {
			it('Should show an error toast when the register fails', async () => {
				render(<RegisterForm />);

				mockedRegisterAction.mockResolvedValue({
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
				const registerButton = screen.getByRole('button', { name: 'Register' });

				await userEvent.type(usernameInput, 'test');
				await userEvent.type(passwordInput, '12345678');
				await userEvent.click(registerButton);

				const errorToast = await screen.findByText(
					'Invalid username or password',
				);

				expect(errorToast).toBeInTheDocument();
				expect(mockedRegisterAction).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe('Behavior', () => {
		describe('Form submission', () => {
			it('Should show loading state on the "Register" button while the form is submitting', async () => {
				render(<RegisterForm />);

				mockedRegisterAction.mockImplementationOnce(() => {
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
				const registerButton = screen.getByRole('button', { name: 'Register' });

				await userEvent.type(usernameInput, 'test');
				await userEvent.type(passwordInput, '12345678');
				await userEvent.click(registerButton);

				expect(registerButton).toBeDisabled();
			});

			it('Should redirect to the homepage when register is successful', async () => {
				render(<RegisterForm />);

				mockedRegisterAction.mockReturnValue(
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
				const registerButton = screen.getByRole('button', { name: 'Register' });

				await userEvent.type(usernameInput, 'test');
				await userEvent.type(passwordInput, '12345678');
				await userEvent.click(registerButton);

				expect(mockedUseRouter().push).toHaveBeenCalledWith('/');
			});

			it('Should disable the "Register" button when the form is invalid', async () => {
				render(<RegisterForm />);

				mockedRegisterAction.mockImplementationOnce(() => {
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
				const registerButton = screen.getByRole('button', { name: 'Register' });

				await userEvent.type(usernameInput, 't');
				await userEvent.type(passwordInput, '<3');

				expect(registerButton).toBeDisabled();
			});
		});
	});
});
