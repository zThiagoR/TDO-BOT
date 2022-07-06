import { Client, CommandInteraction } from "discord.js";

import BaseCommand from "../../BaseCommands";

export default class MsgCommand extends BaseCommand {
  constructor() {
    super();

    this.data = {
      name: "perfil",
      description: "Visualizar o perfil de um membro da STAFF",
      options: [
        {
          name: "user",
          type: 'USER',
          description: "Mencione usuário pra visualizar o perfil!",
        },
        {
          name: "id",
          type: "STRING",
          description: "insira o ID do usuário pra visualizar o perfil!"
        },
      ],
    };
  }

  execute(client: Client<true>, int: CommandInteraction) {

  }
}