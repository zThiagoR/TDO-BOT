import { MessageEmbedOptions } from "discord.js";

export default function MovConfigEmbed(value: string) {

  const descriptionMovCall = `Você deseja atualizar cargo ou categoria de Call?`;
  const descriptionMovChat = `Você deseja atualizar cargo ou canal de texto?`;
  const options = value === 'movchat' ? descriptionMovChat : descriptionMovCall;

  const embed = {
    title: `Configuração da ${value.replace('mov', 'mov.')}`,
    description: options,
  } as MessageEmbedOptions;

  return embed;
}