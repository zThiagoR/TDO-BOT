import { Client, Message, Collection } from "discord.js";

import { CommandExecute as CommandEmbed } from "../Utils/embeds";
import PermissionsList from "../config/PermissionsList";
import { config } from "../config";


export default class CommandExecute {
  type: string;

  constructor() {
    this.type = "messageCreate";
  };

  async execute(client: Client<true>, msg: Message) {
    const commandEmbed = new CommandEmbed(client);

    if (msg.author.bot) return;
    if (!msg.content.startsWith(config.prefix)) {
      const channelMovChat = client.db.config.get(`${msg.guildId}.canais.movchat`)
      if (channelMovChat && channelMovChat === msg.channel.id) {
        client.db.messages.add(`${msg.author.id}.semanal`, 1, { write: true })
        client.db.messages.add(`${msg.author.id}.acumulados`, 1, { write: true })
      }
      // if(['sexo'].some(x => msg.author.username.toLowerCase().includes(x))) {
      //   msg.reply(`Não pode utilizar seu nick inadequado, e seu nick já foi alterado!`)
      //   msg.guild.members.cache.get(msg.author.id).setNickname(`Uso de nick inadequado!`)
      // }

      if(msg.content.match(/alguém namora/gi)) {
        return msg.reply({
          embeds: [{
            title: 'Estou solteiro, baby',
            description: 'Não sei como responder, mas você pode me chamar de **"namorado"** ou **"casado"** se preferir.\nMas prefiro ser chamado de amante ou ficante pra ter mais de 1 pessoa para formar trio romance',
          }]
        })
      }

      if(['gf', 'gozofone'].some(x => msg.content.toLowerCase().includes(x))) {
        msg.delete();
        msg.channel.send({
          content: `<@${msg.author.id}>`,
          embeds:[{
            title: `CARENTE FOI DETECTADO COM SUCESSO!`,
            color: 0xFFFF50,
            description: `**Tem coisa melhor que fazer GF**...\nOuvir a voz da pessoa que é magnifico, ver série, ver filme, fazer caminhada na rua, jogar joguinhos, ler livros, estudar pro curso, praticar e entre outros...`,
          }]
        }).then(msg => {
          setTimeout(() => { msg.delete(); }, 5000);
        })
      }

      if(['sexo', 'safada', 'me come', 'vibrador', 'pau de borracha', 'transar', 'mama'].some(x => msg.content.toLowerCase().includes(x))) {
        msg.delete();
        msg.channel.send({
          content: `<@${msg.author.id}>`,
          embeds: [{
            color: 0x000000,
            title: '🔞 ANTI-PUTARIA',
            description: 'Não é mais permitido falar de **ATOS LIBIDINOSOS** NESTE SERVIDOR!!!',
          }]
        }).then(msg => {
          setTimeout(() => { msg.delete(); }, 5000);
        })
      }

      if(msg.mentions.members.first()) {
        const afk = client.db.users.get(`${msg.mentions.members.first().id}.afk`);
        if(afk) {
          msg.reply({
            content: `Ele está afk!\nMotivo: \`${afk}\``,
          })
        }
      }

      if(client.db.users.has(`${msg.author.id}.afk`)) {
        msg.reply({
          content: `Você não está mais ausente, AFK removido!`,
        })

        client.db.users.delete(`${msg.author.id}.afk`)
      }
    };
    
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (command) {
      if (command.member_perm && !msg.member.permissions.has(command.member_perm)) {
        const permissions_map = command.member_perm.map(perm => PermissionsList[perm]).join("`, `");
  
        return msg.channel.send({
          content: msg.author.toString(),
          embeds: [commandEmbed.memberHasPerm(permissions_map)]
        }).then(msg => setTimeout(() => msg.delete(), 5000))
          .catch(() => null);
      };
  
      if (command.client_perm && !msg.guild.me.permissions.has(command.client_perm)) {
        const permissions_map = command.client_perm.map(perm => PermissionsList[perm]).join("`, `");
  
        return msg.channel.send({
          content: msg.author.toString(),
          embeds: [commandEmbed.clientHasPerm(permissions_map)]
        }).then(msg => setTimeout(() => msg.delete(), 5000))
          .catch(() => null);
      };
  
      if (command.is_developer && !config.developers.includes(msg.author.id)) {
        return msg.channel.send({
          content: msg.author.toString(),
          embeds: [commandEmbed.isNotDeveloper()]
        }).then(msg => setTimeout(() => msg.delete(), 5000))
          .catch(() => null);
      };
  
      if (!client.cooldowns.has(command.name)) {
        const time = command.cooldown * 1000;
        client.cooldowns.set(command.name, time);
      };
  
      const now = Date.now();
      const timestamps = client.cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 3) * 1000;
  
      if (now < timestamps) {
        const timeLeft = (timestamps - now) / 1000;
         return msg.channel.send({
            content: `**Menções:** ${msg.author}`,
            embeds: [commandEmbed.cooldownDeny(command, timeLeft)]
          })
          .then(msg => setTimeout(() => msg.delete(), 5000))
          .catch(() => null);
      }
  
      client.cooldowns.set(command.name, now + cooldownAmount);
  
      try {
        await command.execute(client, msg, args);
      } catch (error) {
        msg.delete().catch(() => null);
  
        return msg.channel.send({
          content: msg.author.toString(),
          embeds: [commandEmbed.errorCommand(error)]
        }).then(msg => setTimeout(() => msg.delete(), 5000))
          .catch(() => null);
      };
    };
  };
};