import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import { Lucia, TimeSpan } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const luciaAdapter = new MongodbAdapter(
	mongoose.connection.collection('sessions'),
	mongoose.connection.collection('users'),
);

export const lucia = new Lucia(luciaAdapter, {
	sessionExpiresIn: new TimeSpan(2, 'w'), // 2 weeks
	sessionCookie: {
		expires: true,
		attributes: { secure: process.env.NODE_ENV === 'production' },
	},
	getUserAttributes: (attributes: any) => {
		return {
			username: attributes.username,
		};
	},
});

export const validateRequest = cache(async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return {
			user: null,
			session: null,
		};
	}

	const result = await lucia.validateSession(sessionId);

	try {
		if (result.session && result.session.fresh) {
			const sessionCookie = lucia.createSessionCookie(result.session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
		if (!result.session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
	} catch {
		// TODO: handle auth request validation error
	}

	return result;
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
	}
}
