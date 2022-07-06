import { Client, CommandInteraction } from "discord.js";
import BaseCommand from "../../BaseCommands";

export default class PingCommand extends BaseCommand {
  constructor() {
    super();

    this.data = {
      name: "loja",
      description: "Comando para ver a lista de comandos.",
      options: [
        {
          name: "background",
          type: 'SUB_COMMAND',
          description: "Compre o plano de fundo para seu perfil!",
        },
        {
          name: "hierarquia",
          type: "SUB_COMMAND",
          description: "Adquire o cargo de hierarquia",
        },
        {
          name: "animes",
          type: "SUB_COMMAND",
          description: "Adquire o cargo de animes!",
        }
      ],
    };
  }

  execute(client: Client<true>, int: CommandInteraction) {
    const subCommand = int.options.getSubcommand()

    if (subCommand === 'hierarquia') return;

}}