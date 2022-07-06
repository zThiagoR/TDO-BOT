import { Client, CommandInteraction, MessageActionRow, MessageButton, MessageComponentInteraction } from "discord.js";

import BaseCommand from "../../BaseCommands";

export default class AddPointsCommand extends BaseCommand {
  constructor() {
    super();

    this.data = {
      name: "addpontos",
      description: "Comando para ver a lista de comandos.",
      options: [
        {
          name: "user",
          type: 'USER',
          description: "Mencione usuário que receberá os pontos!",
        },
        {
          name: "id",
          type: "STRING",
          description: "insira o ID do usuário que receberá os pontos!"
        },
        {
          name: "pontos",
          type: "NUMBER",
          description: "insira o número de pontos que o usuário receberá!",
        }
      ],
    };
  }

  execute(client: Client<true>, int: CommandInteraction) {
    const user = int.options.getUser('user')
    const memberId = client.users.cache.get(int.options.getString('id'))
    const membro = user || memberId
    const pontos = int.options.getNumber('pontos')

    if(user && memberId) {
      return int.editReply({
        content: `${int.user}`,
        embeds: [{
          color: 'RED',
          description: `**Você apenas pode mencionar um usuário ou inserir o ID do mesmo!**`
        }],
      })
    }
// 
    const buttonConfirm = new MessageButton()
      .setCustomId('confirm')
      .setLabel('Confirmar')
      .setStyle('SUCCESS')
      
    const buttonCancel = new MessageButton()
      .setCustomId('cancel')
      .setLabel('Cancelar')
      .setStyle('DANGER')

    const rows = new MessageActionRow()
      .addComponents(buttonConfirm, buttonCancel)

    int.editReply({
      content: `${int.user}`,
      embeds: [{
        color: 'DARK_GOLD',
        title: 'Confirmação',
        description: `Você realmente deseja adicionar \`${pontos} pontos\` ao usuário ${membro}?`,
      }],
      components: [rows]
    })

    const filter = (i: MessageComponentInteraction) => i.user.id !== int.user.id ? i.deferUpdate() : ['confirm', 'cancel'].includes(i.customId)
    const collector = int.channel.createMessageComponentCollector({
      filter: filter as any,
      max: 1
    })

    collector.on('collect', async (int): Promise<any> => {
      if(int.customId === 'cancel') {
        return int.update({
          content: `${int.user}`,
          embeds: [{
            color: 'RED',
            description: `**Operação cancelada!**`
          }],
          components: []
        })
      } else {
        return int.update({
          content: `${int.user}`,
          embeds: [{
            color: 'DARK_GOLD',
            title: 'Confirmação',
            description: `Adicionado \`${pontos} pontos\` ao usuário ${membro}?`,
          }],
          components: []
        })
      }
    })
  }
}
