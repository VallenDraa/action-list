import 'server-only';

import { User } from 'lucia';

export const meService = async (user: User) => {
	if (!user) {
		throw new Error('Unauthorized!');
	}

	const { id, username } = user;

	return { username, _id: id.toString() };
};
