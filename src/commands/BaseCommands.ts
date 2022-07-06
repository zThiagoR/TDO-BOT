import { Client, ApplicationCommandDataResolvable } from 'discord.js';
import { readdirSync } from 'fs';
import { resolve } from 'path';

import { SlashCommand } from '../@types/TypeCommands';

export default class BaseCommand {

  protected data: ApplicationCommandDataResolvable;
  protected cooldown?: number;
  protected defer?: boolean;

  async PushCommand(client: Client<true>) {
    const SlashFolder = readdirSync(resolve(__dirname, "SlashCommands"));
    
    for (const dirs of SlashFolder) {
      const SlashCommand = readdirSync(resolve(__dirname, "SlashCommands", dirs))
        .filter((file) => file.endsWith('.ts'));

      for (const file of SlashCommand) {
        const CommandFile = await import(resolve(__dirname, "SlashCommands", dirs, file));
        const command: SlashCommand = new CommandFile.default();

        client.slashCommands.set(command.data.name, command);
        console.log(`[CLIENT] Comando ${command.data.name} adicionado com Sucesso`);
      }
    }

    client.guilds.cache.forEach((Guild) => Guild.commands.set(client.slashCommands.map((cmd) => cmd.data)));
  }
  
}