import { Client, CommandInteraction } from "discord.js";
import { writeFileSync, unlinkSync, readFile } from "fs";
import BaseCommand from "../../BaseCommands";

export default class MsgAllCommand extends BaseCommand {
  constructor() {
    super();

    this.data = {
      name: "msgall",
      description: "Comando para visualizar as mensagens semanais de todos membros da mov.chat",
    };
    this.defer = true;
  }

  async execute(client: Client<true>, int: CommandInteraction) {

    const roleMovChat = client.db.roles.get(`${int.guildId}.cargos.movchat`);

    const members = int.guild.members.cache
      .filter((member) => !member.user.bot && member.roles.cache.has(roleMovChat))
      .map((member) => member.user.id);
      
      let description;
      let i = 0;

      for(const member of members) {        
        const messages = client.db.messages.get(`${member}.semanal`);
        const messagesMember = messages ? `${messages} mensagens` : 'Não está registrado no banco de dados'
        i += 1
        
        if(!description) description = `${i}. <@${member}> - ${messagesMember}\n`;
        else description += `${i}. <@${member}> - ${messagesMember}\n`;
      }

      writeFileSync(`./src/commands/SlashCommands/Leaders/msgAll.txt`, description);

      await int.editReply({
        content: `${int.user}`,
        embeds: [{
          color: 'RED',
          description: `📝 **|** Mensagens semanal de todos membros da mov.chat`
        }],
        files: [{
          attachment: `./src/commands/SlashCommands/Leaders/msgAll.txt`,
        }]
      });

      
      unlinkSync(`./src/commands/SlashCommands/Leaders/msgAll.txt`);
  }
}