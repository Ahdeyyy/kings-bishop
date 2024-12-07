import { getLeagueById, isRegisteredToLeague, registerToLeague } from '@/index';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ params, locals }) => {
    const { id } = params;
    const league = await getLeagueById(id) // await the promise in the ui
    const isRegistered = await isRegisteredToLeague(id, locals.user?.id || "")

    return {
        id,
        league,
        isRegistered
    };
}) satisfies PageServerLoad;

export const actions = {
    register: async ({ params, locals }) => {
        console.log('registering player')
        const leagueId = params.id;
        const userId = locals.user?.id;
        if (!userId) return
        const register = await registerToLeague(leagueId, userId)
        if (register === undefined) {
            console.error('player has already registered')
            return
        }

        console.log('registered ' + register.userId)

    }
} satisfies Actions