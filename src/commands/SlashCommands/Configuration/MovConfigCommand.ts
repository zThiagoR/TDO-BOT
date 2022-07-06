import { Client, CommandInteraction, GuildMember  } from 'discord.js';
import MovConfigButton from '../../../Utils/Buttons/MovConfigButton';
import MovConfigEmbed from '../../../Utils/embeds/MovconfigEmbed';

import BaseCommand from "../../BaseCommands";

export default class MovConfigCommand extends BaseCommand {

  constructor() {
    super();

    this.data = {
      name: 'movconfig',
      description: 'Comando para configurações das Movs',
      options: [
        {
          name: 'info',
          type: 'SUB_COMMAND',
          description: 'Visualizar as configurações das Movs',
        },
        {
          name: 'movchat',
          type: 'SUB_COMMAND',
          description: 'Configurações da Mov.Chat'
        }, 
        {
          name: 'movcall',
          type: 'SUB_COMMAND',
          description: 'Configurações da Mov.Call'
        }
      ]
    }
  }
  execute(client: Client<true>, int: CommandInteraction) {
    const subCommand = int.options.getSubcommand()
    const movconfigEmbed = MovConfigEmbed(subCommand)
    const movconfigButton = MovConfigButton(subCommand)

    if(subCommand === 'movchat' || subCommand === 'movcall') {
      return int.editReply({
        embeds: [movconfigEmbed],
        components: [movconfigButton]
      })
    }

    if (subCommand === 'info') {
      const channelMovChat = client.db.config.get(`${int.guildId}.canais.movchat`)
      const channelMovCall = client.db.config.get(`${int.guildId}.canais.movcall`)
      const RoleMovChat = client.db.roles.get(`${int.guildId}.cargos.movchat`)
      const RoleMovCall = client.db.roles.get(`${int.guildId}.cargos.movcall`)

      return int.editReply({
        embeds: [{
          author: {
            name: `${int.guild.name}`,
            icon_url: int.guild.iconURL()
          },
          color: 0x050504,
          title: 'Configuração das Movs',
          description: 
          `> **Configuração da Mov.Chat**\n\n` +
          `<:Seta:870110875372105738> Cargo da Mov.Chat: <@&${RoleMovChat}>\n` +
          `<:Seta:870110875372105738> Canal que contará as mensagens: <#${channelMovChat}>\n\n` +
          `> **Configuração da Mov.Call**\n\n` +
          `<:Seta:870110875372105738> Cargo da Mov.Call: <@&${RoleMovCall}>\n` +
          `<:Seta:870110875372105738> Canal que contará o tempo: <#${channelMovCall}>\n\n` +
          `Caso deseja editar cargo ou canal, basta utilizar o comando \`movconfig movchat\` ou \`movconfig movcall\``,
          footer: {
            text: `${int.user.username}`,
            icon_url: int.user.avatarURL({ format: 'png', dynamic: true, size: 1024 })
          }
        }]
      })
    }
  }
}