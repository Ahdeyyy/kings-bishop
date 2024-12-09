
import { dev } from "$app/environment";
import { and, eq } from "drizzle-orm";
import { db } from "./server/db";
import { user, league, leaguePlayer } from "./server/db/schema";

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

export const registerToLeague = async (leagueId: string, userId: string) => {

    const isRegistered = await isRegisteredToLeague(leagueId, userId);
    if (isRegistered) return

    const player = await db.insert(leaguePlayer).values({
        id: crypto.randomUUID(),
        leagueId,
        userId
    }).returning()

    return player[0]

}

export const unregisterFromLeague = async (leagueId: string, userId: string) => {
    return await db.delete(leaguePlayer)
        .where(and(eq(leaguePlayer.leagueId, leagueId), eq(leaguePlayer.userId, userId)))
}

export const getRegisteredPlayers = async (leagueId: string) => {
    return await db.query.leaguePlayer.findMany({
        where: eq(leaguePlayer.leagueId, leagueId),
        with: {
            user: true
        }
    })
}

export const isRegisteredToLeague = async (leagueId: string, userId: string): Promise<boolean> => {
    const leagueUser = await db.query.leaguePlayer.findFirst({
        where: and(eq(leaguePlayer.userId, userId), eq(leaguePlayer.leagueId, leagueId)),
    })

    return leagueUser !== undefined
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