import { getLeagueById } from '@/index';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const { id } = params;
    const league = await getLeagueById(id) // await the promise in the ui
    return {
        id,
        league
    };
}) satisfies PageServerLoad;