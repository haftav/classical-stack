import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

import type { UserTable } from "~/models";

interface Database {
  app_user: UserTable;
}

let db: Kysely<Database>;

declare global {
  var __db: any;
}

if (process.env.NODE_ENV === "production") {
  db = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: "localhost",
        database: "kysely_test",
      }),
    }),
    log: ["error"],
  });
} else {
  if (!global.__db) {
    db = new Kysely<Database>({
      dialect: new PostgresDialect({
        pool: new Pool({
          host: "localhost",
          database: process.env.POSTGRES_DB,
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
        }),
      }),
      log: ["query", "error"],
    });
    global.__db = db;
  }
  db = global.__db;
}

export { db };
