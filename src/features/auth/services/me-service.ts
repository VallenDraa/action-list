import 'server-only';

import { validateRequest } from '@/lib/lucia';

export const meService = async () => {
	const { user } = await validateRequest();

	if (!user) {
		throw new Error('Unauthorized!');
	}

	const { id, username } = user;

	return { username, _id: id.toString() };
};
