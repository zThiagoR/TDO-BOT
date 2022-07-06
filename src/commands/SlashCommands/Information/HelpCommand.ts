import { Client, CommandInteraction, GuildMember  } from 'discord.js';
import moment from 'moment';
import("moment-duration-format");

import BaseCommand from "../../BaseCommands";
import { HelpButton } from '../../../Utils/Buttons/HelpButton';

export default class HelpCommand extends BaseCommand {

  constructor() {
    super();

    this.data = {
      name: 'help',
      description: 'Comando para ver a lista de comandos.',
    }
    this.cooldown = 10;
  }

  execute(client: Client<true>, int: CommandInteraction) {
    moment.locale('pt-BR');

    const member = int.member as GuildMember

    const embeds = [{
      color: 0x0099ff,
      description: `Prezado ${int.user.username},\nQual categoria você deseja ver a lista de comandos e as funcionalidades?\n\nAs opções só ficam disponível de acordo com o cargo que você possui`,
    }] 

    return int.editReply({ embeds, components: HelpButton(member)  });
  }
}
