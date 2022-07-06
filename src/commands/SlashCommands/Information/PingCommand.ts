import { Client, CommandInteraction } from 'discord.js';
import moment from 'moment';
import("moment-duration-format");

import BaseCommand from "../../BaseCommands";

export default class PingCommand extends BaseCommand {

  constructor() {
    super();

    this.data = {
      name: 'ping',
      description: 'Comando para ver a latência do bot.',
    }
  }

  execute(client: Client<true>, int: CommandInteraction) {
    moment.locale('pt-BR');

    const embeds = [{
      description: `__**Latência do BOT**__:\n\`${Math.round(Date.now() -  int.createdTimestamp)} ms\`\n\n__**Latência do API DISCORD**__:\`\n${Math.round(client.ws.ping)} ms\`\n\n__**UPTIME**__:\n\`${moment.duration(client.uptime).format(" D [dia(s)], H [hora(s)], m [minuto(s) e] s [segundo(s)]").replace('mins', 'min')}\``
    }]
    
    return int.editReply({ embeds });

  }
}