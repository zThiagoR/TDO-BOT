import fs from "fs";
import path from "path";
import Discord from "discord.js";

import { ApplicationConfig } from "./config/ApplicationConfig";
import { Command } from "./@types/TypeCommands";
import { database } from "./Database";

export default class ClientApplication {
  client: Discord.Client<true>;

  constructor() {
    this.client = new Discord.Client(ApplicationConfig);
    this.client.commands = new Discord.Collection();
    this.client.cooldowns = new Discord.Collection();
    this.client.slashCommands = new Discord.Collection();

    this.client.db = new database().db;
    this.events();
    this.commands();
    this.client.login();
  };

  private events() {
    fs.readdirSync(path.resolve(__dirname, "events")).forEach(async file => {
      const EventFile = await import(path.resolve(__dirname, "events", file));
      const event = new EventFile.default();
      this.client.on(event.type, (...args) => event.execute(this.client, ...args));
    });
  };

  private commands() {
    fs.readdirSync(path.resolve(__dirname, "commands/NormalCommands")).forEach(dirs => {
      const commandFiles = fs.readdirSync(path.resolve(__dirname, "commands/NormalCommands", dirs));

      commandFiles.forEach(async file => {
        const CommandFile = await import(path.resolve(__dirname, "commands/NormalCommands", dirs, file));

        if (CommandFile.default.name) {
          const command: Command = new CommandFile.default();

          this.client.commands.set(command.name, command);
          console.log(`Command ${command.name} loaded!`);
        }
      });
    });
  };
};