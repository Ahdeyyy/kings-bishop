import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { createLeague } from '@/index';


export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, locals }) => {
        if (locals.user === null) {
            return {
                success: false,
                message: 'Login to create a league'
            }
        }
        const form = await request.formData();
        const name = form.get('name')?.toString() || '';
        const isPublic = form.get('public') === 'on';
        const timeControl = form.get('time-control')?.toString() || '';
        const description = form.get('description')?.toString() || '';

        if (name === '' || timeControl === '') {
            // toast.error('Name and time control are required');
            return {
                success: false,
                message: 'Name and time control are required'
            }
        }

        const league = await createLeague(name, timeControl, isPublic, description, locals.user.id)

        return redirect(302, `/league/${league[0].id}`);
    }
}