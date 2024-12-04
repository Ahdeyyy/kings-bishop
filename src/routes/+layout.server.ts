import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {

    return {
        isAuth: locals.user !== null,
    };
}) satisfies LayoutServerLoad;