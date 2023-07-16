import {
  mysqlTable,
  serial,
  text,
  varchar,
  timestamp,
} from 'drizzle-orm/mysql-core';
import { InferModel } from 'drizzle-orm';

const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  phoneNumber: varchar('phoneNumber', { length: 256 }),
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 6 }).defaultNow(),
});

export type DbUser = InferModel<typeof users>;
export default users;
