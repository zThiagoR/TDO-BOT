import { yellow, gray } from "colors";
import { Client } from "discord.js";

import BaseCommand from "../commands/BaseCommands";

export default class ReadyApplication {
  type: string;

  constructor() {
    this.type = "ready";
  };

  async execute(client: Client<true>) {

    client.user.setActivity({
      name: "Batalha Real na Craftlandia!",
      type: "LISTENING"
    });

    console.log(yellow("[CLIENT]") + " Aplicação " + gray(client.user.tag) + " Iniciada com Sucesso");

    new BaseCommand().PushCommand(client);
  };
};