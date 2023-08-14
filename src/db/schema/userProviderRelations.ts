import { InferModel } from 'drizzle-orm';
import { mysqlTable, serial, int, timestamp } from 'drizzle-orm/mysql-core';

const userProviderRelations = mysqlTable('userProviderRelations', {
  id: serial('id').primaryKey().autoincrement(),
  userId: int('userId').notNull(),
  providerId: int('providerId').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt'),
});

export type UserProviderRelations = InferModel<typeof userProviderRelations>;
export default userProviderRelations;
