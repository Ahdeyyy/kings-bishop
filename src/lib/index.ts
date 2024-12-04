
import { dev } from "$app/environment";
import { eq } from "drizzle-orm";
import { db } from "./server/db";
import { user, league } from "./server/db/schema";

export const createUser = async (username: string, lichessId: string, lichessAccessToken: string) => {
    return await db.insert(user).values({
        id: crypto.randomUUID(),
        username,
        lichessId,
        lichessAccessToken
    }).returning()
}

export const getUserByLichessId = async (lichessId: string) => {
    return await db.query.user.findFirst({
        where: eq(user.lichessId, lichessId)
    })
}

export const createLeague = async (name: string, timeControl: string, isPublic: boolean, description: string, creatorId: string) => {
    return await db.insert(league).values({
        id: crypto.randomUUID(),
        name,
        timeControl,
        public: isPublic,
        creatorId,
        description
    }).returning()
}

export const getLeagueById = async (id: string) => {
    return await db.query.league.findFirst({
        where: eq(league.id, id)
    })
}

export const getLeaguesByCreatorId = async (creatorId: string) => {
    return await db.query.league.findMany({
        where: eq(league.creatorId, creatorId)
    })
}

export const getLeagues = async () => {
    return await db.query.league.findMany()
}

export const getPublicLeagues = async () => {
    return await db.query.league.findMany({
        where: eq(league.public, true)
    })
}


export const redirect_uri = dev ? 'http://localhost:5173/login/lichess/callback' : ''