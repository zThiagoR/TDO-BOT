import { Database } from 'ark.db'

export type DatabaseType = {
  users: Database,
  messages: Database,
  config: Database,
  roles: Database,
}
