// import { redirect } from '@sveltejs/kit';
import { deleteSessionTokenCookie, invalidateSession } from '@/server/auth';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load = (async (event) => {
    if (!event.locals.user) {
        // return redirect(302, "/login");
        return {
            user: { username: "" }
        }
    }

    return {
        user: event.locals.user
    };
}) satisfies PageServerLoad;

export const actions = {
    logout: async (event) => {
        if (event.locals.session === null) {
            return fail(401);
        }
        await invalidateSession(event.locals.session.id);
        deleteSessionTokenCookie(event);
        return
    }
}