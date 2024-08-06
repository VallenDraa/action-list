import mongoose from 'mongoose';
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import { Lucia, TimeSpan } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { dbConnect } from './mongoose';

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
	await dbConnect();

	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return { user: null, session: null };
	}

	const { user, session } = await lucia.validateSession(sessionId);

	try {
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
	} catch {
		// Next.js throws error when attempting to set cookies when rendering page
	}

	return { user, session };
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
	}
}
