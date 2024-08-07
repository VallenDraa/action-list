import 'server-only';

import { lucia } from '@/lib/lucia';
import { Session } from 'lucia';

export const logoutService = async (session: Session) => {
	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();

	return sessionCookie;
};
