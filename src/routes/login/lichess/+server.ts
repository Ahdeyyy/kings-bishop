import type { RequestHandler } from './$types';
import { generateCodeVerifier } from 'oslo/oauth2';
import { sha256 } from "oslo/crypto";
import { base64url } from "oslo/encoding";
import { redirect } from '@sveltejs/kit';
import { redirect_uri } from '$lib';

const clientId = "kings-bishop.com"

const createChallenge = async (verifier: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hashBuffer = await sha256(data);
    const hashArray = new Uint8Array(hashBuffer);
    return base64url.encode(hashArray, { includePadding: false });
}

export const GET: RequestHandler = async ({ cookies }) => {

    const verifier = generateCodeVerifier()
    const challenge = await createChallenge(verifier)

    cookies.set('verifier', verifier, {
        path: '/',
        maxAge: 60 * 100,
        sameSite: 'lax',
    })


    redirect(302, 'https://lichess.org/oauth?' + new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirect_uri,
        scope: 'preference:read',
        code_challenge_method: 'S256',
        code_challenge: challenge
    }))

};