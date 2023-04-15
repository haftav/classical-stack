import type { Generated } from "kysely";

export interface UserTable {
  id: Generated<number>;
  email: string;
}

export interface User {
  id: number;
  email: string;
}
