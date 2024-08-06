export type User = {
	_id: string;
	username: string;
	password: string;
};

export type PasswordLessUser = Omit<User, 'password'>;
