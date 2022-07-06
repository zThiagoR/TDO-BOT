import { Client, CommandInteraction  } from 'discord.js';

import BaseCommand from "../../BaseCommands";

export default class AFKCommand extends BaseCommand {

  constructor() {
    super();

    this.data = {
      name: 'afk',
      description: 'Comando para ver a lista de comandos.',
      options: [{
        name: 'mensagem',
        type: 'STRING',
        description: 'Mensagem que será enviada ao usuário que te mencione',
        required: true
      }]
    }
  }

  execute(client: Client<true>, int: CommandInteraction) {
    const msg = int.options.getString('mensagem') || 'Ele está afk!';

    int.editReply({
      embeds: [{
        title: '💤 AFK',
        description: `Mensagem que será enviado ao usuário que te mencione: \`${msg}\``,
      }]
    })

    client.db.users.set(`${int.user.id}.afk`, msg)
  }
}