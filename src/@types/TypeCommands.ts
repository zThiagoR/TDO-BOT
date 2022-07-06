import { 
    Client, 
    Message, 
    PermissionString,
    CommandInteraction,
    ApplicationCommandDataResolvable
} from "discord.js";

type Command = {
    name: string;
    aliases?: string[];
    description: string;
    member_perm?: PermissionString[];
    client_perm?: PermissionString[];
    is_developer?: boolean;
    cooldown?: number;
    sub_cmd: string[];
    execute: (client: Client<true>, message: Message, args: string[]) => any | Promise<any>; 
};

type SlashCommand = {
    data: ApplicationCommandDataResolvable;
    cooldown?: number;
    defer?: boolean;
    execute: (client: Client<true>, int: CommandInteraction) => any | Promise<any>;
}

export { Command, SlashCommand };