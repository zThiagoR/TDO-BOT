import { Collection, CommandInteraction } from "discord.js";
import { Database } from "../../Database";

import { Command, SlashCommand } from "../TypeCommands";
import { DatabaseType } from "../TypeDatabase";

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, Command>;
        slashCommands: Collection<string, SlashCommand>;
        cooldowns: Collection<string, number>;
        db: DatabaseType;
    };
};