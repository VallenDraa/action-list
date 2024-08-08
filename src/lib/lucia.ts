import mongoose from 'mongoose';
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import { Lucia, Session, TimeSpan, User as LuciaUser } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { dbConnect } from './mongoose';
import { redirect } from 'next/navigation';
import { User } from '@/features/auth/types/user-type';

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
	getUserAttributes: attributes => {
		const user = attributes as User;

		return {
			username: user.username,
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

	return { user: { ...user, id: user?.id.toString() }, session };
});

export const validateRequestWithRedirect = async (path = '/auth/login') => {
	const req = await validateRequest();

	if (!req.user || !req.session) {
		return redirect(path);
	}

	return req as { user: LuciaUser; session: Session };
};

/**
 * Would throw an error if the user is not authenticated.
 */
export const mustBeAuthenticated = async () => {
	const { session, user } = await validateRequest();

	if (!session || !user) {
		throw new Error('Unauthorized!');
	}

	return { session, user };
};

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
	}
}
