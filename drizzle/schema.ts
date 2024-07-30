import { snowflake } from '@packages/utils/snowflake'

import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from '@packages/complied'

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => snowflake.nextId().toString()),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
})

export const accounts = pgTable('account', {
  userId: text('userId').notNull().primaryKey(),
  type: text('type').$type<AdapterAccountType>().notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
})

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId').notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable('verificationToken', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  id: text('id')
    .primaryKey()
    .$defaultFn(() => snowflake.nextId().toString()),
})

export const authenticators = pgTable('authenticator', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => snowflake.nextId().toString()),
  credentialID: text('credentialID').notNull(),
  userId: text('userId').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  credentialPublicKey: text('credentialPublicKey').notNull(),
  counter: integer('counter').notNull(),
  credentialDeviceType: text('credentialDeviceType').notNull(),
  credentialBackedUp: boolean('credentialBackedUp').notNull(),
  transports: text('transports'),
})

export const posts = pgTable('post', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => snowflake.nextId().toString()),
  userId: text('userId').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull(),
})
