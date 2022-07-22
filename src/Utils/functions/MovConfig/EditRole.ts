import { 
  ButtonInteraction, 
  MessageActionRow, 
  MessageButton, 
  MessageComponentInteraction, 
  MessageEmbedOptions 
} from "discord.js";

export async function EditRole(int: ButtonInteraction) {
  let roleselected: string;

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
    time: 15000,
    max: 10
  })


  const filter = (i: MessageComponentInteraction) => i.user.id !== int.user.id ? i.deferUpdate() : ['confirmar'].includes(i.customId)
  const collectorButton = int.channel.createMessageComponentCollector({
    filter: filter as any,
    max: 1
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

      roleselected = m.content
    }
  })

  collectorMessage.on('end', async (collected, reason) => {
    if(reason === 'time') {
      int.editReply({
        embeds: [{
          title: `Configuração da ${int.customId === 'EditRoleChat' ? 'Mov.Chat' : 'Mov.Call'}`,
          description: `Você não confirmou o cargo, cancelando a operação`,
        }],
        components: []
      })
    }
  })

  collectorButton.on('collect', async (i) => {
    if(i.customId === 'confirmar') {
      int.editReply({
        embeds: [{
          title: `Configuração da ${int.customId === 'EditRoleChat' ? 'Mov.Chat' : 'Mov.Call'}`,
          description: `Você atualizou o cargo para <@&${roleselected}>`,
        }],
        components: []
      })

      int.client.db.roles.set(`${int.guildId}.cargos.${int.customId === 'EditRoleChat' ? 'movchat' : 'movcall'}`, roleselected)

      collectorMessage.stop()
      collectorButton.stop()
    }
  })
}