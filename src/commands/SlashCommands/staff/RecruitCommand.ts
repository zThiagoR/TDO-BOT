import { Client, CommandInteraction } from "discord.js";
import RecruiterMenu from "../../../Utils/Menus/RecruiterMenu";

import BaseCommand from "../../BaseCommands";

export default class RecruitCommand extends BaseCommand {
  constructor() {
    super();

    this.data = {
      name: "recrutar",
      description: "Recrutar um usuário do servidor",
      options: [
        {
          name: "user",
          type: 'USER',
          description: "Mencione usuário pra visualizar o perfil!",
        },
        {
          name: "id",
          type: "STRING",
          description: "insira o ID do usuário pra visualizar o perfil!"
        },
      ],
    };
    this.defer = true;
  }

  async execute(client: Client<true>, int: CommandInteraction) {
    const memberMention = int.options.getUser("user");
    const memberId = client.users.cache.get(int.options.getString("id"));
    const member = memberMention || memberId || int.user;

    if(!member) return int.editReply({ content: `${int.user}`, embeds: [{ color: 'RED', description: `**Você não selecionou um usuário!**`}]});
    if(memberMention && memberId) return int.editReply({ content: `${int.user}`, embeds: [{ color: 'RED', description: `**Você apenas pode mencionar um usuário ou inserir o ID do mesmo!**`}]});
    if(member === int.user) return int.editReply({ content: `${int.user}`, embeds: [{ color: 'RED', description: `**Você não pode recrutar a sí mesmo!**` }]});

    await int.editReply({
      content: `${int.user}`,
      embeds: [
        {
          color: 'GREEN',
          description: `Para qual cargo você deseja recrutar o usuário ${member}?`,
        },
      ],
      components: [RecruiterMenu()]
    });
  }
}