import { mysqlTable, serial, text, timestamp } from 'drizzle-orm/mysql-core';
import { InferModel } from 'drizzle-orm';

const providers = mysqlTable('providers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt'),
});

export type Provider = InferModel<typeof providers>;
export default providers;
