import { MessageActionRow, MessageSelectMenu } from "discord.js"

export default function RecruiterMenu() {
  const menu = new MessageSelectMenu()
      .setCustomId('recrutar')
      .setPlaceholder('Selecione um cargo para o recrutado')
      .addOptions([
        {
          label: 'Jornalismo', emoji: '📝',
          description: 'Cargo de Jornalismo', value: 'jornalismo'
        },
        {
          label: 'Designer', emoji: '🌺',
          description: 'Cargo de Designer', value: 'designer'
        },
        {
          label: 'Movimento Call', emoji: '☎',
          description: 'Cargo de Movimento das calls', value: 'movcall'
        },
        {
          label: 'Movimento Chat', emoji: '⌨️',
          description: 'Cargo de Movimento de chat', value: 'movchat'
        },
        {
          label: 'Evento', emoji: '🎉',
          description: 'Cargo de Evento', value: 'evento'
        },
        {
          label: 'Recrutamento', emoji: '⭐',
          description: 'Cargo de Recrutamento', value: 'recrutamento'
        },
        {
          label: 'Recrutamento Externo', emoji: '📝',
          description: 'Cargo de Recrutamento Externo', value: 'recrutamento_externo'
        },
      ])

    const row = new MessageActionRow()
      .addComponents(menu)

    return row;
}