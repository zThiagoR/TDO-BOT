import { ButtonInteraction, MessageActionRow, MessageButton, MessageEmbedOptions } from "discord.js";
import { max } from "moment";

export async function EditRole(int: ButtonInteraction) {


  const embed = {
    title: `Configuração da ${int.customId === 'EditRoleChat' ? 'Mov.Chat' : 'Mov.Call'}`,
    description: `Por favor, mencione o ID do cargo que deseja atualizar`,
  } as MessageEmbedOptions;


  let row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('confirmar')
        .setLabel('Confirmar')
        .setDisabled(true)
        .setStyle('SUCCESS')
    )

  int.update({
    embeds: [embed],
    components: [row]
  })

  const collectorMessage = int.channel.createMessageCollector({
    filter: (m) => m.author.id === int.user.id,
    time: 60000,
    max: 10
  })

  collectorMessage.on('collect', async (m) => {
    console.log(m.content)

    if(m.content) {
      row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('confirmar')
            .setLabel('Confirmar')
            .setDisabled(false)
            .setStyle('SUCCESS')
        )
        
      int.editReply({
        embeds: [{
          title: `Configuração da ${int.customId === 'EditRoleChat' ? 'Mov.Chat' : 'Mov.Call'}`,
          description: `Você deseja atualizar o cargo <@&${m.content}>?`,
        }],
        components: [row]
      })
    }
  })
}


