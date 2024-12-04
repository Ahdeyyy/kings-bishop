
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
	creatorId: text('creator_id').notNull().references(() => user.id)
})

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type League = typeof league.$inferSelect;
