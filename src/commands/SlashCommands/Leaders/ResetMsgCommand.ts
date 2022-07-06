import { Client, CommandInteraction, MessageActionRow, MessageButton, MessageComponentInteraction } from "discord.js";
import { relativeTimeThreshold } from "moment";

import BaseCommand from "../../BaseCommands";

export default class ResetMSGCommand extends BaseCommand {
  constructor() {
    super();

    this.data = {
      name: "resetmsg",
      description: "Comando para resetar a contagem de mensagens dos membros",
      options: [
        {
          name: "all",
          type: "SUB_COMMAND",
          description: "Resetar todas as mensagens de todos membros da mov.chat"
        },
        {
          name: "usuario",
          type: "SUB_COMMAND",
          description: "Resetar a mensagens de um usuário"
        }
      ],
    };
    this.defer = true;
  }

  execute(client: Client<true>, int: CommandInteraction) {
    const subCommand = int.options.getSubcommand()
    const roleMovChat = client.db.roles.get(`${int.guildId}.cargos.movchat`)

    if (subCommand === "all") {
      
      

      const members = int.guild.members.cache.filter(member => member.roles.cache.has(roleMovChat))
      const membersId = members.map(member => member.id)

      int.editReply({
        content: `${int.user}`,
        embeds: [{
          color: 'RED',
          description: `Resetando as mensagens semanais de ${members.size} membros da Mov.Chat...`
        }],
      })

      for (const memberId of membersId) {
        client.db.messages.set(`${memberId}.semanal`, 0)
      }

      setTimeout(() => {
        int.editReply({
          content: `${int.user}`,
          embeds: [{
            color: 'RED',
            description: `Todas as mensagens semanais dos ${members.size} membros da Mov.Chat foram resetadas!`
          }],
        })
      }, 7000)
    }

    if(subCommand === "usuario") {
      int.editReply({
        embeds: [{
          color: 0xFFFF50,
          description: `Mencione o usuário ou o ID do usuário que deseja resetar as mensagens`,
        }]
      }).then(() => {
        int.channel.awaitMessages({ filter: m => m.author.id === int.user.id,  max: 1, time: 60000, errors: ["time"] })
          .then(async (collected) => {
            const msg = collected.first(),
            user = msg.mentions.users.first() || int.guild.members.cache.get(isNaN(+msg.content) ? undefined : msg.content) 

            if(!user) {
              int.followUp({
                embeds: [{
                  color: 0xFFFF50,
                  description: `Usuário não encontrado`,
                }]
              })
              return
            }
          
            client.db.messages.set(`${user.id}.semanal`, 0)
            msg.delete()

            int.editReply({
              embeds: [{
                color: 0xFFFF50,
                description: `Mensagens semanais do <@${user.id}> resetadas com sucesso`,
              }]
            })
          })
        })
      }
    }
  }