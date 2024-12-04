import { getPublicLeagues } from '@/index';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const leagues = await getPublicLeagues();
    return {
        leagues
    };
}) satisfies PageServerLoad;