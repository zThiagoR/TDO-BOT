import { Client, CommandInteraction  } from 'discord.js';

import BaseCommand from "../../BaseCommands";

export default class NickLOLCommand extends BaseCommand {

  constructor() {
    super();

    this.data = {
      name: 'nicklol',
      description: 'Comando para ver a lista de comandos.',
    }
  }

  execute(client: Client<true>, int: CommandInteraction) {

  }
}