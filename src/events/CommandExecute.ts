import { Client, Message, Collection } from "discord.js";

import { CommandExecute as CommandEmbed } from "../Utils/embeds";
import PermissionsList from "../config/PermissionsList";
import { config } from "../config";
import BlacklistWords from "../Utils/functions/BlacklistWords";

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
      const roleMovChat = client.db.roles.get(`${msg.guildId}.cargos.movchat`)
      const channelMov = channelMovChat && channelMovChat === msg.channel.id;
      if (channelMov && msg.member.roles.cache.has(roleMovChat)) {
        client.db.messages.add(`${msg.author.id}.semanal`, 1, { write: true })
        client.db.messages.add(`${msg.author.id}.acumulados`, 1, { write: true })

        BlacklistWords(msg);
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