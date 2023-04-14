import Database from "better-sqlite3";

let db: InstanceType<typeof Database>;

declare global {
  var __db: any;
}

if (process.env.NODE_ENV === "production") {
  db = new Database(`${process.env.DATABASE_NAME}.db` as string);
} else {
  if (!global.__db) {
    db = new Database(`${process.env.DATABASE_NAME}.db` as string, {
      verbose: console.log,
    });
    db.pragma("journal_mode = WAL");
    global.__db = db;
  }
  db = global.__db;
}

export { db };
