
import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull(),
	lichessId: text('lichess_id').notNull(),
	lichessAccessToken: text('lichess_access_token').notNull()

});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const league = sqliteTable('league', {
	id: text('id').primaryKey(),
	name: text('name'),
	description: text('description'),
	public: integer('public', { mode: 'boolean' }).default(false).notNull(),
	started: integer('started', { mode: 'boolean' }).default(false).notNull(),
	startDate: integer('start_date', { mode: 'timestamp' }),
	variant: text('variant'),
	timeControl: text('time_control'),
	creatorId: text('creator_id').notNull().references(() => user.id),
	canRegister: integer('can_register', { mode: 'boolean' }).notNull().default(false).notNull(),
	fixtureGenerated: integer('fixture_generated', { mode: 'boolean' }).default(false).notNull(),
	// in days, i.e matches are played every 7 days by default
	matchFrequency: integer('match_frequency').default(7).notNull(),
})

export const leaguePlayer = sqliteTable('league_player', {
	id: text('id').primaryKey(),
	leagueId: text('league_id').references(() => league.id).notNull(),
	userId: text('user_id').notNull().references(() => user.id),
	played: integer('played').default(0).notNull(),
	won: integer('won').default(0).notNull(),
	drawn: integer('drawn').default(0).notNull(),
	lost: integer('lost').default(0).notNull(),
	points: integer('points').default(0).notNull(),
	sbPoints: integer('sb_points').default(0).notNull()
})

export const leagueFixture = sqliteTable('league_fixture', {
	id: text('id').primaryKey(),
	leagueId: text('league_id').references(() => league.id).notNull(),
	whiteId: text('white_id').references(() => user.id).notNull(),
	blackId: text('black_id').references(() => user.id).notNull(),
	matchUrl: text('match_url'),
	date: integer('date', { mode: 'timestamp' }).notNull(),
	//** w - white wins, t - tie, b - black wins */
	result: text('result'),
	lichessMatchId: text('lichess_match_id'),
	round: integer('round'),
})

export const leagueFixtureRelations = relations(leagueFixture, ({ one }) => ({
	user: one(user, {
		fields: [leagueFixture.whiteId, leagueFixture.blackId],
		references: [user.id, user.id]
	}),
	league: one(league, {
		fields: [leagueFixture.leagueId],
		references: [league.id]
	})
}))

export const leaguePlayerRelations = relations(leaguePlayer, ({ one }) => ({
	user: one(user, {
		fields: [leaguePlayer.userId],
		references: [user.id]
	})
}))

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type League = typeof league.$inferSelect;
export type LeaguePlayer = typeof leaguePlayer.$inferSelect;
export type LeagueFixture = typeof leagueFixture.$inferSelect;
