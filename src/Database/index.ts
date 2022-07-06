import { Database } from 'ark.db'
export class database {
  db: {
    users: Database,
    messages: Database,
    config: Database,
    roles: Database,
  }

  constructor() {

    this.db = {
      users: new Database("./json/Users.json"),
      messages: new Database("./json/Mensagens.json"),
      config: new Database("./json/Config.json"),
      roles: new Database("./json/Roles.json"),
    }
  }
}