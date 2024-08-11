describe('Login Page E2E', () => {
	it('Should visit the login page and render properly', () => {
		cy.visit('http://localhost:3000/auth/login');

		cy.url().should('include', '/auth/login');

		cy.contains('Login Form').should('be.visible');
		cy.contains('Login to continue to TooDoo').should('be.visible');

		cy.get('label').contains('Username').should('be.visible');
		cy.get('label').contains('Password').should('be.visible');

		cy.get("input[placeholder='Enter your username']").should('be.visible');
		cy.get("input[placeholder='Enter your password']").should('be.visible');

		cy.get('button').contains('Login').should('be.visible');
		cy.get('a[href="/auth/register"]')
			.contains('Register here.')
			.should('be.visible');
	});

	it('Should fill out the login form', () => {
		cy.visit('http://localhost:3000/auth/login');

		cy.get("input[placeholder='Enter your username']")
			.should('be.visible')
			.type('user123');
		cy.get("input[placeholder='Enter your password']")
			.should('be.visible')
			.type('password123');

		cy.get("input[placeholder='Enter your username']").should(
			'have.value',
			'user123',
		);
		cy.get("input[placeholder='Enter your password']").should(
			'have.value',
			'password123',
		);
	});

	it('Should redirect to register page on clicking register link', () => {
		cy.visit('http://localhost:3000/auth/login');

		cy.get('a[href="/auth/register"]')
			.contains('Register here.')
			.should('be.visible')
			.click();

		cy.url().should('include', '/auth/register');
	});

	it.skip('Should submit the form and handles success', () => {
		cy.visit('http://localhost:3000/auth/login');

		cy.get("input[placeholder='Enter your username']").type('user123');
		cy.get("input[placeholder='Enter your password']").type('password123');

		cy.get('button').contains('Login').click();

		cy.url().should('include', '/');
	});

	it.skip('Should handle form validation errors', () => {});

	it.skip('Should display toast messages on error', () => {});
});
