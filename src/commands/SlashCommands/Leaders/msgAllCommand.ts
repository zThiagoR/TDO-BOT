import { Client, CommandInteraction } from "discord.js";

import BaseCommand from "../../BaseCommands";

export default class MsgAllCommand extends BaseCommand {
  constructor() {
    super();

    this.data = {
      name: "msgall",
      description: "Comando para visualizar as mensagens semanais de todos membros da mov.chat",
    };
    this.defer = true;
  }

  execute(client: Client<true>, int: CommandInteraction) {

    console.log(client.db.messages.get(`567694189970587668`).semanal)
  }
}