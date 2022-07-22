import {  
  ButtonInteraction, 
  MessageActionRow, 
  MessageButton, 
  MessageComponentInteraction, 
  MessageEmbedOptions 
} from "discord.js";

export async function EditChannel(int: ButtonInteraction) {
  let channelselected: string;

  const embed = {
    title: `Configuração da ${int.customId === 'EditChannel' ? 'Mov.Chat' : 'Mov.Call'}`,
    description: `Por favor, mencione o ID do canal/categoria que deseja atualizar`,
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
    max: 5
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
          title: `Configuração da ${int.customId === 'EditChannel' ? 'Mov.Chat' : 'Mov.Call'}`,
          description: `Você deseja atualizar o canal/categoria <#${m.content}>?`,
        }],
        components: [row]
      })

      channelselected = m.content
    }
  })

  collectorMessage.on('end', async (collected, reason) => {
    if(reason === 'time') {
      int.editReply({
        embeds: [{
          title: `Configuração da ${int.customId === 'EditChannel' ? 'Mov.Chat' : 'Mov.Call'}`,
          description: `Você não confirmou o canal/categoria, cancelando a operação`,
        }],
        components: []
      })
    }
  })

  collectorButton.on('collect', async (i) => {
    if(i.customId === 'confirmar') {
      int.editReply({
        embeds: [{
          title: `Configuração da ${int.customId === 'EditChannel' ? 'Mov.Chat' : 'Mov.Call'}`,
          description: `Você atualizou o canal para <#${channelselected}>`,
        }],
        components: []
      })

      int.client.db.config.set(`${int.guildId}.canais.${int.customId === 'EditChannel' ? 'movchat' : 'movcall'}`, channelselected)

      collectorMessage.stop()
      collectorButton.stop()
    }
  })
}