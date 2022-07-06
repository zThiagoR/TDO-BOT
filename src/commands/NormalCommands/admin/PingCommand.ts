import { Client, Message } from "discord.js";

export default class PingCommand {
  name: string;
  description: string;
  guild_only?: boolean;
  cooldown?: number;

  constructor() {
    this.name = "ping";
    this.description = "Comando para testar a comunicação do seu Bot.";
    this.guild_only = true;
    this.cooldown = 5;
  };

  async execute(client: Client<true>, msg: Message, args: string[]) {
    await msg.channel.send({
      content: `🏓 **|** ${msg.author.toString()}, Pong!`
    });
  };
};