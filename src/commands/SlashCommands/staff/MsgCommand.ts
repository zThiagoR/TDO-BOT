import { Client, CommandInteraction } from "discord.js";

import BaseCommand from "../../BaseCommands";

export default class MsgCommand extends BaseCommand {
  constructor() {
    super();

    this.data = {
      name: "msg",
      description: "Comando para ver a a quantidade de mensagens",
      options: [
        {
          name: "user",
          type: 'USER',
          description: "Mencione usuário pra visualizar a quantidade de mensagens!",
        },
        {
          name: "id",
          type: "STRING",
          description: "insira o ID do usuário pra visualizar a quantidade de mensagens!"
        },
      ],
    };
  }

  execute(client: Client<true>, int: CommandInteraction) {
    const user = int.options.getUser('user')
    const memberId = client.users.cache.get(int.options.getString('id'))
    const membro = user || memberId || int.user

    const msgSemanal = client.db.messages.get(`${membro.id}.semanal`)
    const msgTotal = client.db.messages.get(`${membro.id}.acumulados`)

    if(user && memberId) return int.editReply({
      content: `${int.user}`,
      embeds: [{
        color: 'RED',
        description: `**Você apenas pode mencionar um usuário ou inserir o ID do mesmo!**`
      }],
    })

    const embed = {
      color: 0x050504,
      author: {
        name: `${int.guild.name}`,
        icon_url: `${int.guild.iconURL()}`,
      },
      description: 
        `> **Usuário:** <@${membro.id}>\n> **ID:** ${membro.id}\n` + 
        `╔\n` + 
        `╠ <:flood:954282688360112208> __Total de mensagens__: \`${msgTotal || '0'}\`\n` + 
        `╠ <:flood:954282688360112208> __Mensagens semanal__: \`${msgSemanal || '0'}\`\n` + 
        `╚`, 
      thumbnail: {
        url: int.guild.iconURL({ format: 'png', dynamic: true, size: 1024 })
      },
      footer: {
        text: `${int.user.username}`,
        icon_url: int.user.avatarURL({ format: 'png', dynamic: true, size: 1024 })
      }
    }

    int.editReply({
      embeds: [embed],
    })
  }
}
