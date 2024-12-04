import type { RequestHandler } from './$types';
import { createUser, getUserByLichessId, redirect_uri } from '$lib';
import { createSession, generateSessionToken, setSessionTokenCookie } from '@/server/auth';

const clientId = "kings-bishop.com"

interface LichessUser {
    username: string;
    id: string;

}

const getLichessToken = async (authCode: string, verifier: string) => await fetch('https://lichess.org/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        grant_type: 'authorization_code',
        redirect_uri: redirect_uri,
        client_id: clientId,
        code: authCode,
        code_verifier: verifier,
    })
}).then(res => res.json());

const getLichessUser = async (accessToken: string): Promise<LichessUser> => await fetch('https://lichess.org/api/account', {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
}).then(res => res.json());



export const GET: RequestHandler = async (event) => {
    const code = new URL(event.url).searchParams.get('code') || ''
    const verifier = event.cookies.get('verifier') || '';

    const lichessToken = await getLichessToken(code, verifier)

    if (!lichessToken.access_token) {
        return new Response('failed to get token', {
            status: 400
        });
    }

    const lichessUser = await getLichessUser(lichessToken.access_token)
    const existingUser = await getUserByLichessId(lichessUser.id)

    if (existingUser) {
        const sessionToken = generateSessionToken()
        const session = await createSession(sessionToken, existingUser.id);
        setSessionTokenCookie(event, sessionToken, session.expiresAt);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    } else {
        const user = await createUser(lichessUser.username, lichessUser.id, lichessToken.access_token);

        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, user[0].id);
        setSessionTokenCookie(event, sessionToken, session.expiresAt);

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    }
    return new Response();
};

