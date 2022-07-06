import { MessageActionRow, MessageEmbedOptions, MessageSelectMenu, MessageActionRowOptions, MessagePayload, MessageOptions } from "discord.js"

export default class InteractionEvent {

  SendTicketMessage() {
    return {
      embeds: [{
        title: 'Sistema de atendimento',
        description: 'Faça orçamento da sua aplicação e peça seu bot! ou para tirar algumas dúvidas ou pedir suporte, basta clicar no botão abaixo.',
        color: 0x00ff00, 
      }], components: [this.UpdateTicketMessage()]
    } as MessageOptions;
  }

  UpdateTicketMessage() {
    return new MessageActionRow()
    .addComponents(new MessageSelectMenu()
      .setCustomId('ticket')
      .setPlaceholder('Deseja Pedir Orçamento ou Pedir Suporte ?')
      .addOptions([
        {
          label: 'Orçamento de BOT',
          description: 'Peça um orçamento e compre seu bot.',
          emoji: '956351167330418708',
          value: 'OrderBot'
        },
        {
          label: 'Pedir Suporte',
          description: 'Dúvidas gerais, Atualização/Manutenção, etc.',
          emoji: '956351557899812904',
          value: 'OpenTicket'
        }
      ])
    );
  }

}