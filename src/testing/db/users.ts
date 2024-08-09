import { Register } from '@/features/auth/types/auth-type';

export const makeValidCreateUser = (username: string): Register => {
	return { username, password: crypto.randomUUID() };
};
